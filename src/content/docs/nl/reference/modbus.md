---
title: "Modbus"
description: "Hier leest u hoe evcc via Modbus met meters en laders communiceert, serieel via RS485, via TCP of via een RTU-naar-TCP-converter, en hoe u elke variant configureert."
sidebar:
  order: 4
translatedFrom: "8cbbf87533c1"
---

Sommige apparaten, zoals meters ([`meters`](/nl/reference/configuration/meters#modbus)) of laders ([`chargers`](/nl/reference/configuration/chargers)), worden via het Modbus-protocol aangesloten en aangesproken.

De `meter`-configuratie omvat het type fysieke verbinding (interface), optionele technische interfaceparameters, het gebruikte Modbus-protocol, de unieke Modbus-ID van het apparaat op de bus en het nummer en type van het register dat gelezen of geschreven moet worden.

Het is belangrijk om te weten dat er drie verschillende Modbus-protocollen bestaan: Modbus RTU, Modbus ASCII en Modbus TCP. Deze kunnen technisch gezien over verschillende soorten interfaces worden overgedragen. De klassieke variant is Modbus RTU over een seriële RS485-businterface, die bij de meeste meters en sommige laders wordt gebruikt. Apparaten met een eigen netwerkinterface (ethernet/wifi) worden daarentegen meestal via het Modbus-TCP-protocol aangesproken.

Als een serieel Modbus-apparaat via een interfaceconverter over een netwerk (ethernet/wifi/PowerLAN) moet worden aangesloten, wordt het Modbus-RTU-protocol over een TCP/IP-verbinding gebruikt. Het Modbus-RTU-protocol wordt daarbij rechtstreeks over het netwerk overgedragen (d.w.z. “getunneld”). Hoewel de transportmethode (TCP/IP) dezelfde is, is het protocol NIET hetzelfde als Modbus TCP. Het is essentieel om onderscheid te maken tussen het protocol en de transportmethode. “Modbus (RTU) over TCP” is iets anders dan Modbus TCP!

:::caution
Let op: er bestaan complexere interfaceconverters die optioneel het Modbus-protocol zelf tussen Modbus RTU en Modbus TCP kunnen vertalen!

Als deze functie actief is, moet evcc met de converter via Modbus TCP communiceren, terwijl de converter met het seriële apparaat via Modbus RTU communiceert en de twee protocollen in beide richtingen vertaalt.
In dat geval moet goed op de specificatie en configuratie van het apparaat worden gelet, anders werkt de communicatie mogelijk niet!
:::

Bij een configuratie met een interfaceconverter wordt de configuratie van de seriële bus alleen op de converter vastgelegd. De evcc-configuratie heeft dan alleen betrekking op het deel tot aan de converter.

## Fysieke verbinding

### Seriële verbinding (RS485)

Als het apparaat rechtstreeks via een RS485-adapter (Modbus RTU) is aangesloten, moeten `device` en de seriële communicatieparameters `baudrate` en `comset` overeenkomstig de apparaatconfiguratie worden opgegeven. Raadpleeg hiervoor de betreffende handleiding, datasheets of systeeminstellingen.

:::note
Op een seriële RS485-bus kunnen meerdere apparaten met identieke communicatieparameters worden gebruikt, als elk apparaat een unieke Modbus-ID krijgt. Als niet alle apparaten op een bus met dezelfde communicatie-instellingen (maar met verschillende ID’s) kunnen worden geconfigureerd, is een opsplitsing in meerdere onafhankelijke bussystemen nodig.
:::

:::caution
Apparaten met verschillende seriële communicatieparameters op één bus combineren is niet mogelijk en leidt tot onvoorspelbare communicatiefouten.
:::

**Voorbeeld:**

```yaml
source: modbus
id: 1
device: /dev/ttyUSB0
baudrate: 38400
comset: "8E1"
```

### Directe netwerkverbinding

Als het apparaat rechtstreeks via een eigen netwerkverbinding (Modbus TCP) is aangesloten, moet een `uri` bestaande uit HOSTNAME:PORT of IP:PORT worden opgegeven:

**Voorbeeld:**

```yaml
source: modbus
id: 1
uri: 192.168.0.11:502
```

### Serieel apparaat via netwerkverbinding (met interfaceconverter)

Als een serieel apparaat via een tussengeschakelde transparante RS485-IP-interfaceconverter (zonder protocolvertaling) is aangesloten, moet het protocol met `rtu: true` ook worden omgeschakeld naar Modbus RTU over de TCP/IP-verbinding.

**Voorbeeld:**

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU over TCP
```

## Voorgedefinieerde apparaten

De ingebouwde voorgedefinieerde apparaatmodellen `model` zijn identiek aan die van [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

     ABB       ABB A/B-Series meters
     DDM       DDM18SD
     DZG       DZG Metering GmbH DVH4013 meters
     IEM3000   Schneider Electric iEM3000 series
     INEPRO    Inepro Metering Pro 380
     JANITZA   Janitza meters
     MPM       Bernecker Engineering MPM3PM meters
     ORNO1P    ORNO WE-514 & WE-515
     ORNO1P504 ORNO WE-504
     ORNO3P    ORNO WE-516 & WE-517
     SBC       Saia Burgess Controls ALE3 meters
     SDM       Eastron SDM630/120/72DMv2
     SDM220    Eastron SDM220
     SDM230    Eastron SDM230
     SDM72     Eastron SDM72
     SEMTR     SolarEdge SE-MTR-3Y

Elk `model` dat hiervan afwijkt, wordt

behandeld als _SunSpec_-apparaattype.

Met `value` legt u de waarde vast die van het apparaat moet worden gelezen. Alle ondersteunde waarden zijn voorgedefinieerd in [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28).

Bij een _SunSpec_-compatibele omvormer of meter worden de te lezen waarden in het formaat `model:[block:]point` volgens de _SunSpec_-definitie opgegeven. Het DC-vermogen van de tweede string van een driefasige PV-omvormer (overeenkomstig SunSpec Model 103) vraagt u bijvoorbeeld zo op: `value: 103:2:W`.

Het apparaatmodel `model` en de Modbus-ID `id` zijn altijd vereist:

**Voorbeeld:**

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

## Waarden omkeren

Bij MBMD-meters kunnen meetwaarden worden omgekeerd door een `-` (minteken) vóór de aliasnaam te zetten.
Dat is handig als meters in verschillende configuraties of montagerichtingen worden gebruikt en het voorteken van de meetwaarden moet worden aangepast.

### Ondersteunde metingen

Omkeren werkt voor de volgende MBMD-metingen:

- `power`: totaal vermogen
- `currents`: stromen per fase (array)
- `powers`: vermogens per fase (array)

### Syntaxis

```yaml
meters:
  - name: my-meter
    type: modbus
    model: sdm
    power: -Power # inverts the power value
```

### Voorbeelden

#### Omgekeerd totaal vermogen

```yaml
meters:
  - name: pv-meter
    type: modbus
    model: sdm
    power: -Power # Power will be inverted (e.g. +1000 W becomes -1000 W)
```

#### Omgekeerde fasevermogens

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    powers:
      - -PowerL1 # Phase 1 inverted
      - -PowerL2 # Phase 2 inverted
      - -PowerL3 # Phase 3 inverted
```

#### Omgekeerde stromen (afzonderlijke fasen)

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    currents:
      - -CurrentL1 # Current Phase 1 inverted
      - CurrentL2 # Current Phase 2 normal
      - -CurrentL3 # Current Phase 3 inverted
```

### Toepassingen

**Verkeerd gemonteerde meters**:
Als een stroomsensor of meter fysiek in de verkeerde richting is geïnstalleerd, kunt u de waarden softwarematig corrigeren.

**Teruglevering vs. verbruik**:
Voor meters van zonnepanelensystemen waarbij de tekenconventie moet worden omgekeerd.

**Verschillend georiënteerde stroomtransformatoren**:
Voor meerfasige installaties met verschillend georiënteerde stroomtransformatoren.

## Handmatige configuratie

Als het Modbus-apparaat niet rechtstreeks wordt ondersteund of als er andere waarden dan die van de voorgedefinieerde modellen moeten worden gelezen of geschreven, kunnen de Modbus-registers ook handmatig worden geconfigureerd.
Daarvoor definieert u naast de algemene Modbus-instellingen (zie hierboven) een `register` in plaats van de `value` die voorgedefinieerde apparaten gebruiken. Het is niet toegestaan om zowel `value` als `register` op te geven.

De definitie van een register vereist de volgende parameters:

- `address`: het registeradres
- `type`: het registertype. Leestypen zijn `coil`, `input` en `holding`, schrijftypen zijn `writeholding`, `writeholdings`, `writecoil`
- `decode`: het type codering van de gegevens. Toegestaan zijn: `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. Bij type `coil` wordt de codering genegeerd, maar die moet wel worden opgegeven. Bij type `writecoil` moet `bool8` worden opgegeven.
- `bitmask`: een optionele specificatie. De opgegeven waarde wordt met een AND-bewerking op de gelezen waarde toegepast om afzonderlijke bits uit te lezen.

Andere toegestane parameters van een handmatige configuratie zijn:

- `scale`: kommagetal waarmee gelezen waarden kunnen worden omgerekend (bijv. W naar kW of omgekeerd). De gelezen en gedecodeerde ruwe waarde wordt met deze waarde vermenigvuldigd.
- `timeout`: Modbus-timeout. Zonder eenheid is de waarde in ns, anders geeft u de eenheid op, bijv. 10s voor 10 seconden.

**Voorbeeld:**

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # coil, holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
  bitmask: 2 # Optional: a bitmask that is applied to the read value. Here the mask is 0000000000000010b, ignored if value is 0
scale: -1.0 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 2s # timeout, without unit in ns
```

Bij de decoderingen `int32s/uint32s` wordt de bytevolgorde omgedraaid, wat handig is voor E3/DC-apparaten.

### Registers schrijven

Zowel holding registers als coils kunnen worden geschreven. Daarvoor moet `type: writeholding` voor holding registers of `type: writecoil` voor coils worden opgegeven. Voor het schrijven van meerdere registers (functiecode 16) is het type `writeholdings` beschikbaar.

`type: writeholding` schrijft altijd een 16-bitsregister (int of bool16). Daarom moet bij `decode` altijd `uint16` worden opgegeven.
`type: writecoil` schrijft een coil. Bij `decode` moet `bool8` worden opgegeven.

**Voorbeeld:**

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding, writeholdings or writecoil
```

### Volledig voorbeeld

Een volledig voorbeeld voor een gebruikergedefinieerde lader met Modbus-interface (hier een Phoenix EM-CP-PP-ETH met het IP-adres 192.168.1.10) kan er zo uitzien:

**Voorbeeld:**

```yaml
chargers:
  - type: custom
    name: CustomCharger
    status:
      # Read the status of the charger
      # Either A,B,C or F
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      timeout: 3s
      register:
        address: 100
        type: input # Read an input register
        decode: int16
    enabled:
      # Is the charger enabled (1) or not (0)
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: coil # Read a coil
        decode: bool16 # Doesn't matter but required
    enable:
      # Enable the charger
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: writecoil # Write a coil
        decode: bool8
    maxcurrent:
      # Set the maximum current
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 300
        type: writeholding # Write a holding register
        decode: uint16
```
