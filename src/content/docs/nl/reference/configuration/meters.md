---
title: "meters"
description: "Zo definieert u in evcc.yaml meters voor net, zonne-energie, thuisbatterij en verbruikers, met de tekenconventie en de beschikbare metertypes."
sidebar:
  order: 5
translatedFrom: "731e5e09d04f"
---

De lijst _meters_ (meetapparaten) bevat de apparaten in huis die vermogen en energieverbruik, de productie van zonne-energie of het gebruik van de thuisbatterij kunnen meten. Een `meter` definieert een meetpunt voor energie en kan een fysiek apparaat zijn (bijv. een meter op het netaansluitpunt), een omvormer van het zonnepanelensysteem (AC of DC bij hybride omvormers) of een batterijomvormer.

Laders kunnen een ingebouwde meter hebben of een extern aangesloten meter gebruiken. Als een lader een ingebouwde meter heeft, hoeft daarvoor geen vermelding in `meters` te worden aangemaakt. Heeft de lader geen eigen meter, dan gebruikt evcc de meter die hier is geconfigureerd en in de configuratie van het laadpunt onder [`meter`](/nl/reference/configuration/loadpoints#meter) aan de lader is toegewezen. Is die er ook niet, dan gaat evcc ervan uit dat het ingestelde laadvermogen daadwerkelijk wordt gebruikt.

evcc gebruikt een consistente tekenconventie voor vermogens- en stroomwaarden (`power`, `powers`, `currents`):

- **Positief (+)** voor inkomende energie: netafname, productie van zonne-energie, batterijontlading
- **Negatief (-)** voor uitgaande energie: teruglevering, stand-byverbruik van de omvormer van het zonnepanelensysteem, laden van de thuisbatterij
- **Verbruikers** (lader, aux-meters) zijn altijd **positief (+)**

Als het apparaat waarden met het omgekeerde teken levert, kan dit in de [pluginconfiguratie](/nl/reference/plugins) worden gecorrigeerd met `scale: -1`.

De configuratie `meters` is een lijst van de verschillende beschikbare apparaten.

**Voorbeeld**:

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

**Voorbeeld**:

```yaml
name: charger1
```

---

### `type`

Dit is het evcc-specifieke metertype waarmee met het apparaat wordt gecommuniceerd. Het passende type voor bekende apparaten vindt u onder [Apparaten - Huisinstallatie](/nl/meters).

**Voorbeeld**:

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

**Voorbeeld**:

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

**Voorbeeld**:

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Verplichte parameters

Naast de hier gedefinieerde parameters zijn nog andere parameters nodig. Deze staan in de documentatie over [Modbus](/nl/reference/modbus).

##### `power`

Definieert de MBMD-meetwaarde die het vermogen levert, meestal `Power`.

**Voorbeeld**:

```yaml
power: Power
```

---

##### `energy`

Definieert de MBMD-meetwaarde die de energie levert, meestal `Sum`.

**Voorbeeld**:

```yaml
energy: Sum
```

---

#### Optionele parameters

##### `soc`

Definieert de MBMD-meetwaarde die het laadniveau van de batterij levert, meestal `ChargeState`.

**Voorbeeld**:

```yaml
soc: ChargeState
```

---

### `lgess`

Apparaten van het type LG ESS Home 8/10.

**Voorbeeld**:

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

**Voorbeeld**:

```yaml
uri: https://192.0.2.2/
```

---

##### `password`

Hier moet het registratienummer van de LG ESS HOME-omvormer worden ingevuld.

**Voorbeeld**:

```yaml
password: "DE200..."
```

---

### `openwb`

Gebruikt de metingen van een OpenWB-lader.

**Voorbeeld**:

```yaml
type: openwb
usage: grid
broker: 192.0.2.2
```

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

**Voorbeeld**:

```yaml
broker: 192.0.2.2:1883
```

---

### `sma`

Voor het gebruik van de SMA Home Manager 2.0, de SMA Energy Meter of een SMA-omvormer. De apparaten moeten het Speedwire-protocol ondersteunen.

**Voorbeeld**:

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

**Voorbeeld**:

```yaml
uri: 192.0.2.2
```

##### `serial`

Definieert het serienummer van het apparaat waarvan metingen moeten worden ontvangen.

**Voorbeeld**:

```yaml
serial: 12345678
```

#### Optionele parameters

##### `interface`

Multicastberichten kunnen alleen op een bepaalde netwerkinterface worden ontvangen. Meestal is dat de eerste interface van het systeem. Als dat niet de interface is die met de meter is verbonden, moet de interface expliciet worden opgegeven.

**Voorbeeld**:

```yaml
interface: eth0
```

---

### `tesla`

_`tesla`_: voor het gebruik van metingen van een Tesla Powerwall.

**Voorbeeld**:

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

**Voorbeeld**:

```yaml
uri: 192.0.2.2
```

---

##### `password`

Hier moet het wachtwoord van de gebruiker _customer_ worden ingevuld.

**Voorbeeld**:

```yaml
password: "ThePassword"
```

---

### `custom`

Standaardimplementatie waarbij de afzonderlijke waarden via [plugins](/nl/user-defined-devices#meter) worden gedefinieerd.

**Voorbeeld**:

```yaml
  type: custom
  power: # Vermogen (W)
    source: # Plugintype
    ...
  energy: # Energie (kWh)
    source: # Plugintype
    ...
  returnenergy: # Energie in omgekeerde richting (kWh)
    source: # Plugintype
    ...
  soc: # Laadniveau batterij (%)
    source: # Plugintype
    ...
  capacity: # Optionele batterijcapaciteit (kWh)
  currents: # Stroom (A) per fase
    - source: # Plugintype fase 1
      ...
    - source: # Plugintype fase 2
      ...
    - source: # Plugintype fase 3
      ...
  powers: # Vermogen (W) per fase
    - source: # Plugintype fase 1
      ...
    - source: # Plugintype fase 2
      ...
    - source: # Plugintype fase 3
      ...
  voltages: # Spanning (V) per fase
    - source: # Plugintype fase 1
      ...
    - source: # Plugintype fase 2
      ...
    - source: # Plugintype fase 3
      ...
  ...
```

---

#### Verplichte parameters

##### `power`

Plugindefinitie die het vermogen in watt (W) levert.

**Voorbeeld**:

```yaml
  power: ... # Vermogen (W)
    source: # Plugintype
    ...
```

---

#### Optionele parameters

##### `energy`

Plugindefinitie die de verbruikte energie in kilowattuur (kWh) levert.

**Voorbeeld**:

```yaml
  energy: ... # Energie (kWh)
    source: # Plugintype
    ...
```

---

##### `returnenergy`

Plugindefinitie die de energie in omgekeerde richting in kilowattuur (kWh) levert, bijv. teruglevering.

**Voorbeeld**:

```yaml
  returnenergy: ... # Energie in omgekeerde richting (kWh)
    source: # Plugintype
    ...
```

---

#### `soc`

Plugindefinitie die het laadniveau van de batterij in procent (%) levert.

**Voorbeeld**:

```yaml
  soc: ... # Laadniveau batterij (%)
    source: # Plugintype
    ...
```

---

#### `capacity`

De capaciteit van de batterij. Dit is alleen zinvol als er meerdere batterijen zijn. De waarde wordt dan gebruikt om het totale laadniveau te berekenen.

---

#### `currents`

Een lijst van plugindefinities die de stroom in ampère (A) per fase leveren.

**Voorbeeld**:

```yaml
  currents: # Stroom (A) per fase
    - source: # Plugintype fase 1
      ...
    - source: # Plugintype fase 2
      ...
    - source: # Plugintype fase 3
      ...
  ...
```

---

#### `powers`

Een lijst van plugindefinities die het vermogen in watt (W) per fase leveren.

**Voorbeeld**:

```yaml
  powers: # Vermogen (W) per fase
    - source: # Plugintype fase 1
      ...
    - source: # Plugintype fase 2
      ...
    - source: # Plugintype fase 3
      ...
  ...
```

---

#### `voltages`

Een lijst van plugindefinities die de spanning in volt (V) per fase leveren.

**Voorbeeld**:

```yaml
  voltages: # Spanning (V) per fase
    - source: # Plugintype fase 1
      ...
    - source: # Plugintype fase 2
      ...
    - source: # Plugintype fase 3
      ...
  ...
```
