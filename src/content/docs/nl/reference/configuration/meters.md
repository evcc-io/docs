---
title: "meters"
description: "Zo definieert u in evcc.yaml meters voor net, zonne-energie, thuisbatterij en verbruikers, met de tekenconventie en de beschikbare metertypes."
sidebar:
  order: 5
translatedFrom: "dfa0dfa3f1e6"
---

De lijst _meters_ (meetapparaten) bevat de apparaten in huis die vermogen en energieverbruik, de productie van zonne-energie of het gebruik van de thuisbatterij kunnen meten. Een `meter` definieert een meetpunt voor energie en kan een fysiek apparaat zijn (bijv. een meter op het netaansluitpunt), een omvormer van het zonnepanelensysteem (AC of DC bij hybride omvormers) of een batterijomvormer.

Laders kunnen een ingebouwde meter hebben of een extern aangesloten meter gebruiken. Als een lader een interne stroommeter heeft, hoeft daarvoor geen vermelding in `meters` te worden aangemaakt. Als de lader zo’n meter niet heeft, gebruikt evcc de meter die hier is geconfigureerd en in de configuratie van het laadpunt onder [`meters`](/nl/reference/configuration/loadpoints#meter) aan de lader is toegewezen, of gaat evcc ervan uit dat het ingestelde laadvermogen ook daadwerkelijk wordt gebruikt.

evcc gebruikt een consistente tekenconventie voor vermogens- en stroomwaarden (`power`, `powers`, `currents`):

- **Positief (+)** voor inkomende energie: netafname, productie van zonne-energie, batterijontlading
- **Negatief (-)** voor uitgaande energie: teruglevering, stand-byverbruik van de omvormer van het zonnepanelensysteem, laden van de thuisbatterij
- **Verbruikers** (lader, aux-meters) zijn altijd **positief (+)**

Als het apparaat waarden met het omgekeerde teken levert, kan dit in de [pluginconfiguratie](/nl/reference/plugins) worden gecorrigeerd met `scale: -1`.

De configuratie `meters` is een lijst van de verschillende beschikbare apparaten.

**Bijvoorbeeld**:

```yaml
meters:
  - name: grid
    type: ...
  - name: pv
    type: ...
  - name: battery
    type: ...
  - name: charge
    type: ...
  - name: aux
    type: ...
```

Configuraties voor bekende apparaten vindt u onder [Apparaten - Huisinstallatie](/nl/meters).

Hieronder worden de verschillende parameters toegelicht.

---

## Verplichte parameters

### `name`

Een korte aanduiding van de meter. De waarde wordt gebruikt om naar het apparaat te verwijzen in de configuratie van de [locatie](/nl/reference/configuration/site) of van het [laadpunt](/nl/reference/configuration/loadpoints#meter).

**Bijvoorbeeld**:

```yaml
name: charger1
```

---

### `type`

Dit is het evcc-specifieke metertype waarmee met het apparaat wordt gecommuniceerd. Het passende type voor bekende apparaten vindt u onder [Apparaten - Huisinstallatie](/nl/meters).

**Bijvoorbeeld**:

```yaml
type: modbus
```

De verschillende mogelijke types en hun aanvullende parameters zijn hieronder beschreven:

---

:::note[Opmerking]
De aanvullende metervelden `title` en `icon` worden om technische redenen niet ondersteund in het bestand `evcc.yaml`.
Titels en pictogrammen (afhankelijk van het gebruik) kunnen alleen worden ingesteld voor meters die via de configuratie-interface zijn aangemaakt.
:::

## Ondersteunde types

### `movingaverage`

Dit metertype kan schommelende meterwaarden afvlakken. Het kan voor elk gebruik van een meter (`usage`) worden ingezet. De parameter `decay` geeft aan welk percentage van de nieuwe waarde in de berekening wordt meegenomen.

**Bijvoorbeeld**

```yaml
meters:
- name: grid
  type: movingaverage
  decay: 0.1
  meter:
    type: template
    template: solarlog
    usage: grid
    host: 192.0.2.2
    ...
```

In dit voorbeeld wordt 10% van de nieuwe waarde meegenomen. Na 10 cycli valt de oudste waarde uit de berekening. Hoe lang dit duurt, hangt af van het `interval`.

---

### `modbus`

Apparaten die via de Modbus-interface zijn aangesloten en door het project [MBMD (ModBus Measurement Daemon)](https://github.com/volkszaehler/mbmd#supported-devices) worden ondersteund.

**Bijvoorbeeld**:

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Verplichte parameters

Naast de hier gedefinieerde parameters zijn nog extra parameters nodig. Deze staan in de documentatie over [Modbus](/nl/reference/modbus).

##### `power`

Definieert de MBMD-meetwaarde die het vermogen levert, meestal `Power`.

**Bijvoorbeeld**:

```yaml
power: Power
```

---

##### `energy`

Definieert de MBMD-meetwaarde die de energie levert, meestal `Sum`.

**Bijvoorbeeld**:

```yaml
energy: Sum
```

---

#### Optionele parameters

##### `soc`

Definieert de MBMD-meetwaarde die het laadniveau van de batterij levert, meestal `ChargeState`.

**Bijvoorbeeld**:

```yaml
soc: ChargeState
```

---

### `lgess`

Apparaten van het type LG ESS Home 8/10.

**Bijvoorbeeld**:

```yaml
type: lgess
usage: grid
uri: https://192.0.2.2/
password: "DE200..."
```

:::note
De parameters `uri` en `password` zijn voor een `meter`-apparaat alleen nodig als er meerdere apparaten zijn geconfigureerd.
:::

#### Verplichte parameters

##### `usage`

Definieert welke metingen hier nodig zijn.

**Mogelijke waarden**:

- **`grid`**: voor metingen op het netaansluitpunt
- **`pv`**: voor metingen van de productie van zonne-energie
- **`battery`**: voor metingen van de thuisbatterij

---

##### `uri`

Definieert de URL van het LG ESS-apparaat in het thuisnetwerk.

**Bijvoorbeeld**:

```yaml
uri: https://192.0.2.2/
```

---

##### `password`

Hier moet het registratienummer van de LG ESS HOME-omvormer worden ingevuld.

**Bijvoorbeeld**:

```yaml
password: "DE200..."
```

---

### `openwb`

Gebruik van metingen van een OpenWB-lader

**Bijvoorbeeld**:

```yaml
type: openwb
usage: grid
broker: 192.0.2.2
```

:::note
De parameters `uri` en `password` zijn voor een `meter`-apparaat alleen nodig als er meerdere apparaten zijn geconfigureerd.
:::

#### Verplichte parameters

##### `usage`

Definieert welke metingen hier nodig zijn.

**Mogelijke waarden**:

- **`grid`**: voor metingen op het netaansluitpunt
- **`pv`**: voor metingen van de productie van zonne-energie
- **`battery`**: voor metingen van de thuisbatterij

---

##### `broker`

Definieert de hostnaam of het IP-adres en de poort van de OpenWB in het thuisnetwerk.

**Bijvoorbeeld**:

```yaml
broker: 192.0.2.2:1883
```

---

### `sma`

Voor het gebruik van de SMA Home Manager 2.0, de SMA Energy Meter of een SMA-omvormer. De apparaten moeten het Speedwire-protocol ondersteunen.

**Bijvoorbeeld**:

```yaml
type: sma
uri: 192.0.2.2
serial: 12345678
interface: eth0
```

---

#### Verplichte parameters

:::note
Het volstaat om `uri` of `serial` te definiëren.
:::

##### `uri`

Definieert de hostnaam of het IP-adres van het apparaat in het thuisnetwerk.

**Bijvoorbeeld**:

```yaml
uri: 192.0.2.2
```

##### `serial`

Definieert het serienummer van het apparaat waarvan metingen moeten worden ontvangen.

**Bijvoorbeeld**:

```yaml
serial: 12345678
```

#### Optionele parameters

##### `interface`

Multicastberichten kunnen alleen op een bepaalde netwerkinterface worden ontvangen. Meestal is dat de eerste interface van het systeem. Als dat niet de interface is die met de meter is verbonden, moet de interface expliciet worden opgegeven.

**Bijvoorbeeld**:

```yaml
interface: eth0
```

---

### `tesla`

_`tesla`_: voor het gebruik van metingen van een Tesla Powerwall.

**Bijvoorbeeld**:

```yaml
type: tesla
usage: grid
uri: https://192.0.2.2/
password: "***"
```

---

#### Verplichte parameters

##### `usage`

Definieert welke metingen hier nodig zijn.

**Mogelijke waarden**:

- **`grid`**: voor metingen op het netaansluitpunt
- **`pv`**: voor metingen van de productie van zonne-energie
- **`battery`**: voor metingen van de thuisbatterij

---

##### `uri`

Definieert de hostnaam of het IP-adres van het apparaat in het thuisnetwerk.

**Bijvoorbeeld**:

```yaml
uri: 192.0.2.2
```

---

##### `password`

Hier moet het wachtwoord van de gebruiker _customer_ worden ingevuld.

**Bijvoorbeeld**:

```yaml
password: "ThePassword"
```

---

### `custom`

Standaardimplementatie waarbij de afzonderlijke waarden via [plugins](/nl/user-defined-devices#meter) worden gedefinieerd.

**Bijvoorbeeld**:

```yaml
  type: custom
  power: # Power (W)
    source: # Plugin Type
    ...
  energy: # Energy (kWh)
    source: # Plugin Type
    ...
  returnenergy: # Energy in reverse direction (kWh)
    source: # Plugin Type
    ...
  soc: # Battery SOC (%)
    source: # Plugin Type
    ...
  capacity: # Optional Battery Capacity (kWh)
  currents: # Current (A) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  powers: # Power (W) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  voltages: # Voltage (V) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```

---

#### Verplichte parameters

##### `power`

Plugindefinitie die het vermogen in watt (W) levert.

**Bijvoorbeeld**:

```yaml
  power: ... # Power (W)
    source: # Plugin Type
    ...
```

---

#### Optionele parameters

##### `energy`

Plugindefinitie die de verbruikte energie in kilowattuur (kWh) levert.

**Bijvoorbeeld**:

```yaml
  energy: ... # Energy (kWh)
    source: # Plugin Type
    ...
```

---

##### `returnenergy`

Plugindefinitie die de energie in omgekeerde richting in kilowattuur (kWh) levert, bijv. teruglevering.

**Bijvoorbeeld**:

```yaml
  returnenergy: ... # Energy in reverse direction (kWh)
    source: # Plugin Type
    ...
```

---

#### `soc`

Plugindefinitie die het laadniveau van de batterij in procent (%) levert.

**Bijvoorbeeld**:

```yaml
  soc: ... # Battery SOC (%)
    source: # Plugin Type
    ...
```

---

#### `capacity`

Opgave van de batterijcapaciteit. Alleen zinvol als er meerdere batterijen aanwezig zijn. Wordt gebruikt om het totale laadniveau te bepalen.

---

#### `currents`

Een lijst van plugindefinities die de stroom in ampère (A) per fase leveren.

**Bijvoorbeeld**:

```yaml
  currents: # Current (A) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```

---

#### `powers`

Een lijst van plugindefinities die het vermogen in watt (W) per fase leveren.

**Bijvoorbeeld**:

```yaml
  powers: # Power (W) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```

---

#### `voltages`

Een lijst van plugindefinities die de spanning in volt (V) per fase leveren.

**Bijvoorbeeld**:

```yaml
  voltages: # Voltage (V) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```
