---
title: "meters"
description: "Sådan definerer du målere i evcc.yaml til elnet, sol, hjemmebatteri og forbrugsenheder, hvilken fortegnskonvention der gælder, og hvilke målertyper der findes."
sidebar:
  order: 5
translatedFrom: "dfa0dfa3f1e6"
---

_Målere_ (elmålere) er en liste over enheder i huset, der kan måle effekt- og energiforbrug, solproduktion eller brugen af hjemmebatteriet. En `meter` definerer et målepunkt for energi og kan være en fysisk enhed (f.eks. en måler ved tilslutningspunktet til elnettet), en solcelleinverter (AC eller DC ved hybridinvertere) eller en batteriinverter.

Opladere kan have en indbygget måler, eller der kan tilsluttes en ekstern. Hvis en oplader har en indbygget måler, skal der ikke oprettes en post til den under `meters`. Hvis opladeren ikke har en sådan måler, bruger evcc den måler, der er konfigureret her og tildelt opladeren under [`meters`](/da/reference/configuration/loadpoints#meter) i konfigurationen af ladepunktet, eller går ud fra, at den indstillede ladeeffekt faktisk bliver brugt.

evcc bruger en ensartet fortegnskonvention for effekt- og strømværdier (`power`, `powers`, `currents`):

- **Positiv (+)** for indgående energi: import fra elnettet, solproduktion, batteriafladning
- **Negativ (-)** for udgående energi: eksport til elnettet, solcelleinverterens standbyforbrug, batteriopladning
- **Forbrugsenheder** (oplader, aux-målere) er altid **positive (+)**

Hvis enheden leverer værdier med modsat fortegn, kan det rettes i [plugin-konfigurationen](/da/reference/plugins) med `scale: -1`.

`meters`-konfigurationen er en liste over forskellige tilgængelige enheder.

**Eksempel**:

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

Konfigurationer til kendte enheder finder du under [Enheder - Hjemmeinstallation](/da/meters).

Nedenfor forklares de forskellige parametre.

---

## Påkrævede parametre

### `name`

En kort betegnelse for måleren. Værdien bruges, når der henvises til enheden i konfigurationen af [anlægget](/da/reference/configuration/site) eller [ladepunktet](/da/reference/configuration/loadpoints#meter).

**Eksempel**:

```yaml
name: charger1
```

---

### `type`

Dette er den evcc-specifikke målertype, der muliggør kommunikationen med enheden. Den passende type til kendte enheder finder du under [Enheder - Hjemmeinstallation](/da/meters).

**Eksempel**:

```yaml
type: modbus
```

De forskellige mulige typer og deres yderligere parametre er dokumenteret nedenfor:

---

:::note[Bemærk]
Målerens ekstra felter `title` og `icon` understøttes af tekniske årsager ikke i filen `evcc.yaml`.
Titler og ikoner (afhængigt af anvendelsen) kan kun defineres for målere, der er oprettet via konfigurationsfladen.
:::

## Understøttede typer

### `movingaverage`

Denne målertype kan udjævne svingende måleværdier. Den kan bruges i alle måleranvendelser (`usage`). Parameteren `decay` angiver, hvor stor en procentdel af den nye værdi der indgår i beregningen.

**Eksempel**

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

I dette eksempel indgår 10 % af den nye værdi. Efter 10 cyklusser er den ældste værdi fjernet fra beregningen. Hvor lang tid det tager, afhænger af `interval`.

---

### `modbus`

Enheder, der er tilsluttet via ModBus-grænsefladen og understøttes af projektet [MBMD (ModBus Measurement Daemon)](https://github.com/volkszaehler/mbmd#supported-devices).

**Eksempel**:

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Påkrævede parametre

Ud over de parametre, der er defineret her, kræves yderligere parametre. De er beskrevet i [Modbus](/da/reference/modbus)-dokumentationen.

##### `power`

Definerer den MBMD-måleværdi, der leverer effekten, typisk `Power`.

**Eksempel**:

```yaml
power: Power
```

---

##### `energy`

Definerer den MBMD-måleværdi, der leverer energien, typisk `Sum`.

**Eksempel**:

```yaml
energy: Sum
```

---

#### Valgfrie parametre

##### `soc`

Definerer den MBMD-måleværdi, der leverer batteriets opladningsniveau, typisk `ChargeState`.

**Eksempel**:

```yaml
soc: ChargeState
```

---

### `lgess`

LG ESS Home 8/10-enheder.

**Eksempel**:

```yaml
type: lgess
usage: grid
uri: https://192.0.2.2/
password: "DE200..."
```

:::note
Parametrene `uri` og `password` er kun påkrævede for en `meter`-enhed, hvis der er konfigureret flere enheder.
:::

#### Påkrævede parametre

##### `usage`

Definerer, hvilke målinger der skal bruges her.

**Mulige værdier**:

- **`grid`**: Til målinger ved tilslutningspunktet til elnettet
- **`pv`**: Til målinger af solproduktionen
- **`battery`**: Til målinger af hjemmebatteriet

---

##### `uri`

Definerer URL'en til LG ESS-enheden i hjemmenetværket.

**Eksempel**:

```yaml
uri: https://192.0.2.2/
```

---

##### `password`

Her skal registreringsnummeret for LG ESS Home-inverteren indtastes.

**Eksempel**:

```yaml
password: "DE200..."
```

---

### `openwb`

Brug af målinger fra en OpenWB-oplader

**Eksempel**:

```yaml
type: openwb
usage: grid
broker: 192.0.2.2
```

:::note
Parametrene `uri` og `password` er kun påkrævede for en `meter`-enhed, hvis der er konfigureret flere enheder.
:::

#### Påkrævede parametre

##### `usage`

Definerer, hvilke målinger der skal bruges her.

**Mulige værdier**:

- **`grid`**: Til målinger ved tilslutningspunktet til elnettet
- **`pv`**: Til målinger af solproduktionen
- **`battery`**: Til målinger af hjemmebatteriet

---

##### `broker`

Definerer værtsnavnet eller IP-adressen og porten for OpenWB i hjemmenetværket.

**Eksempel**:

```yaml
broker: 192.0.2.2:1883
```

---

### `sma`

Til brug af SMA Home Manager 2.0, SMA Energy Meter eller en SMA-inverter. Enhederne skal understøtte Speedwire-protokollen.

**Eksempel**:

```yaml
type: sma
uri: 192.0.2.2
serial: 12345678
interface: eth0
```

---

#### Påkrævede parametre

:::note
Det er nok at definere enten `uri` eller `serial`.
:::

##### `uri`

Definerer enhedens værtsnavn eller IP-adresse i hjemmenetværket.

**Eksempel**:

```yaml
uri: 192.0.2.2
```

##### `serial`

Definerer serienummeret på den enhed, som målingerne skal modtages fra.

**Eksempel**:

```yaml
serial: 12345678
```

#### Valgfrie parametre

##### `interface`

Multicast-meddelelser kan kun modtages på en bestemt netværksgrænseflade. Normalt er det systemets første grænseflade. Hvis det ikke er den grænseflade, der er forbundet med måleren, skal grænsefladen angives eksplicit.

**Eksempel**:

```yaml
interface: eth0
```

---

### `tesla`

_`tesla`_: Til brug af målinger fra en Tesla Powerwall.

**Eksempel**:

```yaml
type: tesla
usage: grid
uri: https://192.0.2.2/
password: "***"
```

---

#### Påkrævede parametre

##### `usage`

Definerer, hvilke målinger der skal bruges her.

**Mulige værdier**:

- **`grid`**: Til målinger ved tilslutningspunktet til elnettet
- **`pv`**: Til målinger af solproduktionen
- **`battery`**: Til målinger af hjemmebatteriet

---

##### `uri`

Definerer enhedens værtsnavn eller IP-adresse i hjemmenetværket.

**Eksempel**:

```yaml
uri: 192.0.2.2
```

---

##### `password`

Her skal adgangskoden til brugeren _customer_ indtastes.

**Eksempel**:

```yaml
password: "ThePassword"
```

---

### `custom`

Standardimplementering, hvor de enkelte værdier defineres via [plugins](/da/user-defined-devices#meter).

**Eksempel**:

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

#### Påkrævede parametre

##### `power`

Plugin-definition, der leverer effekten i watt (W).

**Eksempel**:

```yaml
  power: ... # Power (W)
    source: # Plugin Type
    ...
```

---

#### Valgfrie parametre

##### `energy`

Plugin-definition, der leverer den forbrugte energi i kilowatttimer (kWh).

**Eksempel**:

```yaml
  energy: ... # Energy (kWh)
    source: # Plugin Type
    ...
```

---

##### `returnenergy`

Plugin-definition, der leverer energien i modsat retning i kilowatttimer (kWh), f.eks. eksport til elnettet.

**Eksempel**:

```yaml
  returnenergy: ... # Energy in reverse direction (kWh)
    source: # Plugin Type
    ...
```

---

#### `soc`

Plugin-definition, der leverer batteriets opladningsniveau i procent (%).

**Eksempel**:

```yaml
  soc: ... # Battery SOC (%)
    source: # Plugin Type
    ...
```

---

#### `capacity`

Angivelse af batteriets kapacitet. Kun relevant, når der er flere batterier. Bruges til at bestemme det samlede opladningsniveau.

---

#### `currents`

En liste med plugin-definitioner, der leverer strømmen i ampere (A) pr. fase.

**Eksempel**:

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

En liste med plugin-definitioner, der leverer effekten i watt (W) pr. fase.

**Eksempel**:

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

En liste med plugin-definitioner, der leverer spændingen i volt (V) pr. fase.

**Eksempel**:

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
