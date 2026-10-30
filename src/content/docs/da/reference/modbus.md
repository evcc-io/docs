---
title: "Modbus"
description: "Sådan kommunikerer evcc med målere og opladere via Modbus, serielt over RS485, over TCP eller gennem en RTU-til-TCP-konverter, og sådan sætter du det op."
sidebar:
  order: 4
translatedFrom: "8cbbf87533c1"
---

Nogle enheder, f.eks. målere ([`meters`](/da/reference/configuration/meters#modbus)) eller opladere ([`chargers`](/da/reference/configuration/chargers)), tilsluttes og adresseres via Modbus-protokollen.

`meter`-konfigurationen omfatter typen af fysisk forbindelse (interface), valgfrie tekniske interfaceparametre, den anvendte Modbus-protokol, enhedens unikke Modbus-ID på bussen samt nummeret og typen af det register, der skal læses eller skrives.

Det er vigtigt at være opmærksom på, at der findes tre forskellige Modbus-protokoller: Modbus RTU, Modbus ASCII og Modbus TCP. Teknisk set kan de overføres via forskellige typer interfaces. Den klassiske variant er Modbus RTU via et serielt RS485-businterface, som bruges af de fleste målere og nogle opladere. Enheder med et indbygget netværksinterface (Ethernet/WiFi) adresseres derimod typisk via Modbus TCP-protokollen.

Hvis en seriel Modbus-enhed skal tilsluttes gennem en interfacekonverter via et netværk (Ethernet/WiFi/PowerLAN), køres Modbus RTU-protokollen over en TCP/IP-forbindelse. Protokollen overføres uændret over netværket (dvs. ”tunnelleret”). Selvom transportmetoden (TCP/IP) er den samme, er protokollen IKKE den samme som Modbus TCP. Det er afgørende at skelne mellem protokol og transportmetode. ”Modbus (RTU) over TCP” er noget andet end Modbus TCP!

:::caution
Advarsel: Der findes mere avancerede interfacekonvertere, som også kan oversætte selve Modbus-protokollen mellem Modbus RTU og Modbus TCP, hvis funktionen er slået til!

Hvis denne funktion er aktiv, skal evcc kommunikere med konverteren via Modbus TCP, mens konverteren kommunikerer med den serielle enhed via Modbus RTU og oversætter de to protokoller i begge retninger.
I så fald skal enhedens specifikation og konfiguration gennemgås omhyggeligt, ellers virker kommunikationen muligvis ikke!
:::

Ved en konfiguration med interfacekonverter bestemmes den serielle buskonfiguration udelukkende på konverteren. evcc-konfigurationen vedrører så kun strækningen frem til konverteren.

## Fysisk forbindelse

### Seriel forbindelse (RS485)

Hvis enheden er tilsluttet direkte via en RS485-adapter (Modbus RTU), skal `device` og de serielle kommunikationsparametre `baudrate` og `comset` angives i overensstemmelse med enhedens konfiguration. Se den pågældende brugsanvisning, datablade eller systemindstillinger.

:::note
Flere enheder med identiske kommunikationsparametre kan køre på en seriel RS485-bus, hvis hver enhed får tildelt et unikt Modbus-ID. Hvis ikke alle enheder på en bus kan konfigureres med ensartede kommunikationsindstillinger (men med forskellige ID'er), er det nødvendigt at opdele dem i flere uafhængige bussystemer.
:::

:::caution
Det er ikke muligt at blande enheder med forskellige serielle kommunikationsparametre på samme bus, og det fører til uforudsigelige kommunikationsfejl.
:::

**Eksempel**:

```yaml
source: modbus
id: 1
device: /dev/ttyUSB0
baudrate: 38400
comset: "8E1"
```

### Direkte netværksforbindelse

Hvis enheden er tilsluttet direkte via en indbygget netværksforbindelse (Modbus TCP), skal der angives en `uri` bestående af HOSTNAME:PORT eller IP:PORT:

**Eksempel**:

```yaml
source: modbus
id: 1
uri: 192.168.0.11:502
```

### Seriel enhed via netværksforbindelse (med interfacekonverter)

Hvis en seriel enhed er tilsluttet via en mellemliggende, transparent RS485-IP-interfacekonverter (uden protokoloversættelse), skal protokollen desuden skiftes til Modbus RTU over TCP/IP-forbindelsen med `rtu: true`.

**Eksempel**:

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU over TCP
```

## Foruddefinerede enheder

De integrerede, foruddefinerede enhedsmodeller `model` er identiske med [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

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

Enhver `model`, der afviger fra disse,

behandles som en _SunSpec_-enhedstype.

Med `value` angiver du den værdi, der skal læses fra enheden. Alle understøttede værdier er foruddefineret i [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28).

For en _SunSpec_-kompatibel inverter eller måler angives de værdier, der skal læses, i formatet `model:[block:]point` i henhold til _SunSpec_-definitionen. Hvis du f.eks. vil hente DC-effekten på den anden streng i en trefaset solcelleinverter (svarende til SunSpec Model 103), gøres det sådan: `value: 103:2:W`.

Enhedens `model` og slave-ID'et `id` er altid påkrævet:

**Eksempel**:

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

## Negering af værdier

For MBMD-målere kan måleværdier vendes ved at sætte et `-` (minustegn) foran aliasnavnet.
Det er nyttigt, når målere bruges i forskellige konfigurationer eller monteringsretninger, og fortegnet på måleværdierne skal tilpasses.

### Understøttede målinger

Negering virker for følgende MBMD-målinger:

- `power` - Samlet effekt
- `currents` - Strømme pr. fase (array)
- `powers` - Effekt pr. fase (array)

### Syntaks

```yaml
meters:
  - name: my-meter
    type: modbus
    model: sdm
    power: -Power # inverts the power value
```

### Eksempler

#### Vendt samlet effekt

```yaml
meters:
  - name: pv-meter
    type: modbus
    model: sdm
    power: -Power # Power will be inverted (e.g. +1000 W becomes -1000 W)
```

#### Vendt effekt pr. fase

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

#### Vendte strømme (enkelte faser)

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

### Typiske anvendelser

**Forkert monterede målere**:
Hvis en strømsensor eller måler er fysisk installeret i den forkerte retning, kan du rette værdierne i softwaren.

**Eksport til elnettet vs. forbrug**:
For solcellemålere, hvor fortegnskonventionen skal vendes.

**Forskellig orientering af strømtransformere**:
For flerfasede installationer med forskelligt orienterede strømtransformere.

## Manuel konfiguration

Hvis Modbus-enheden ikke understøttes direkte, eller hvis der skal læses eller skrives andre værdier end dem i de foruddefinerede modeller, kan Modbus-registrene også konfigureres manuelt.
Til det formål skal der ud over de generelle Modbus-indstillinger (se ovenfor) defineres et `register` i stedet for en `value` som ved foruddefinerede enheder. Det er ikke tilladt at angive både `value` og `register`.

Definitionen af et register kræver følgende parametre:

- `address`: Registeradressen
- `type`: Registertypen, tilladte læsetyper er `coil`, `input`, `holding`, skrivetyper er `writeholding`, `writeholdings`, `writecoil`
- `decode`: Dataenes kodningstype. Tilladte værdier er: `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. For typen `coil` ignoreres kodningen, men den skal stadig angives. For typen `writecoil` skal `bool8` angives.
- `bitmask`: En valgfri angivelse. Den angivne værdi kombineres med den læste værdi via AND for at udtrække enkelte bits.

Andre tilladte parametre i en manuel konfiguration er:

- `scale`: Decimaltal, der kan bruges til at omregne læste værdier (f.eks. W til kW eller omvendt). Værdien ganges med den læste og afkodede råværdi.
- `timeout`: Modbus-timeout. Uden enhed er værdien i ns, ellers angives enheden, f.eks. 10s for 10 sekunder.

**Eksempel**:

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

Ved kodningerne `int32s/uint32s` byttes byterækkefølgen om, hvilket er nyttigt for E3/DC-enheder.

### Skrivning af registre

Både holding-registre og coils kan skrives. Angiv i så fald `type: writeholding` for holding-registre eller `type: writecoil` for coils. Til skrivning af flere registre (funktionskode 16) findes typen `writeholdings`.

`type: writeholding` skriver altid et 16-bit-register (int eller bool16). Derfor skal der altid angives `uint16` for `decode`.
`type: writecoil` skriver en coil. For `decode` skal `bool8` angives.

**Eksempel**:

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding, writeholdings or writecoil
```

### Komplet eksempel

Et komplet eksempel på en brugerdefineret oplader med Modbus-interface (her en Phoenix EM-CP-PP-ETH med IP-adressen 192.168.1.10) kunne se sådan ud:

**Eksempel**:

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
