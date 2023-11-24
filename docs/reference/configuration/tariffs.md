---
sidebar_position: 11
---

# `tariffs`

Hier kannst du deinen Energietarif und ggf. deine Einspeisevergütung angeben. Evcc verwendet diese Werte für eine grobe [Einsparungsberechnung](/docs/guides/setup#ersparnisberechnung), die in der Web-UI angezeigt wird.

Desweiteren nutzt der Planner diese Einstellungen für Preis- bzw. CO2-optimiertes Zielladen. Dabei werden die Einstellungen in der folgenden Reihenfolge berücksichtigt: "flexibler Grid-Tarif" vor "CO2 Tarif" vor "konstantem Grid-Tarif".

**Struktur**

```yaml
tariffs:
  grid:
    type: ...
  feedin:
    type: ...
  co2:
    type: ...
```

**Beispiel: Konstanter Energiepreis**

```yaml
tariffs:
  currency: EUR # (default EUR)
  grid:
    # static grid price
    type: fixed
    price: 0.294 # [currency]/kWh

  feedin:
    # rate for feeding excess (pv) energy to the grid
    type: fixed
    price: 0.08 # [currency]/kWh
```

**Beispiel: Konstanter Energiepreis mit zeitabhängigen Tarifen**

::: info
Tagesübergreifende Zeitbereiche müssen um Mitternacht (= 0) geteilt werden.
Es sind zwei Einträge (z.B. 20-0 und 0-5) notwendig.
:::

```yaml
tariffs:
  currency: EUR # (default EUR)
  grid:
    # static grid price with price zones)
    type: fixed
    price: 0.294 # EUR/kWh
    zones:
      - days: Mo-Fr
        hours: 20-0
        price: 0.2 # EUR/kWh
      - days: Sa,So
        price: 0.15 # EUR/kWh
```

evcc unterstützt die Verwendung von flexiblen Stromtarifen von [Awattar](https://www.awattar.de), [Tibber](https://tibber.com), oder [Octopus Energy](https://octopus.energy). Die Konfiguration erlaubt es "günstige" Preise zu definieren (siehe `smartCostLimit` in site), bei welchen das Laden vom Netz mit der maximal möglichen Leistung aktiviert wird, selbst wenn nicht genug PV Leistung zur Verfügung steht.

**Beispiel: Flexibler Energiepreis**

```yaml
tariffs:
  grid:
    # either
    type: tibber
    token: "476c477d8a039529478ebd690d35ddd80e3308ffc49b59c65b142321aee963a4" # access token
    homeid: "cc83e83e-8cbf-4595-9bf7-c3cf192f7d9c" # optional if multiple homes associated to account

    # or
    type: awattar
    region: de # optional, choose at for Austria
    charges: 0 # optional, additional charges per kWh
    tax: 0 # optional, additional tax (0.1 for 10%)
```

Im Folgenden werden nun alle möglichen Parameter erklärt.

---

## `currency`

Währung in der Energiepreise dargestellt und berechnet werden.

**Standardwert:** `EUR`

**Mögliche Werte:** `EUR|CHF|USD|NOK|GBP|...` Währungskürzel nach [ISO 4217](https://de.wikipedia.org/wiki/ISO_4217)

---

## `grid`

Folgende Tariftypen (`type`) werden unterstützt:

**Mögliche Werte** `fixed|custom|awattar|tibber|octopusenergy`

---

### `type:` **`fixed`**

Fester Energiepreis für Netzbezug.

**Beispiel**:

```yaml
type: fixed
price: 0.297 # 0,297 [currency]/kWh
```

### `type:` **`custom`**

Fester Energiepreis für Netzbezug, der per Plugin gesetzt werden kann

**Beispiel**:

```yaml
type: custom
price:
  source: ...
```

#### `price`

Den Preis in [currency]/kWh den du an deinen Stromversorger zahlst. Wird für die Ersparnisberechnung verwendet.

**Standardwert:** `0.30`

---

### `type:` **`awattar`**

Der Stromanbieter [Awattar](https://www.awattar.de)

**Beispiel**:

```yaml
type: awattar
region: de # optional
charges: 0 # optional, additional charges per kWh
tax: 0 # optional, additional tax (0.1 for 10%)
```

#### `region`

Die Region in der man sich befindet

**Mögliche Werte**:

- **`de`**: Deutschland
- **`at`**: Österreich

---

### `type:` **`tibber`**

Der Stromanbieter [Tibber](https://www.tibber.com)

**Beispiel**:

```yaml
type: tibber
token: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
homeid: "12345678-90ab-cdef-1234-567890abcdef" # optional
```

#### `token`

Das Zugangstoken des Anbieters

#### `homeid`

Die ID des Standortes, falls es unter dem Account mehrere gibt

---

### `type:` **`octopusenergy`**

Der Stromanbieter [Octopus Energy](https://octopus.energy) im Vereinigten Königreich.

:::tip Tarif- und Regionalcodes
Das Ermitteln des Tarif- und Regionalcodes ist nicht Gegenstand dieser Dokumentation.
:::

**Beispiel**:

```yaml
type: octopusenergy
tariff: AGILE-FLEX-22-11-25 # Tariff code
region: A # optional
```

#### `tariff`

Der Tarifcode für deinen Energievertrag.

#### `region`

Die DNO Region in der du dich befindest: [Weitere Informationen](https://www.energy-stats.uk/dno-region-codes-explained/)

**Mögliche Werte**:

- **`A`**: Eastern England
- **`B`**: East Midlands
- **`C`**: London
- **`D`**: Merseyside and Northern Wales
- **`E`**: West Midlands
- **`F`**: North Eastern England
- **`G`**: North Western England
- **`H`**: Southern England
- **`J`**: South Eastern England
- **`K`**: Southern Wales
- **`L`**: South Western England
- **`M`**: Yorkshire
- **`N`**: Southern Scotland
- **`P`**: Northern Scotland

---

### `type:` **`elering`**

Der Stromanbieter [Nordpool Estonia](https://elering.ee) in Estland.

**Beispiel**:

```yaml
type: elering # Nordpool
region: ee # or lt, lv, fi
charges: # optional, additional charges per kWh
tax: # optional, additional tax (0.1 for 10%)
```

---

### `type:` **`energinet`**

Der Stromanbieter [Energinet](https://energinet.dk) in Dänemark.

**Beispiel**:

```yaml
type: energinet # Energinet using the price in DKK
region: dk1 # or dk2
charges: # optional, additional charges per kWh
tax: # optional, additional tax (0.1 for 10%)
```

---

## `feedin`

Vergütung für eingespeisten Strom. Bei Alt-Anlagen (vor 1.4.2012) ist hier die Differenz zwischen der Einspeise- und der Selbstverbrauchsvergütung einzutragen.

**Mögliche Werte** `fixed|octopusenergy`

### `type:` **`fixed`**

Feste Einspeisevergütung

**Beispiel**:

```yaml
type: fixed
price: 0.12 # 0,12 [currency]/kWh
```

### `type:` **`custom`**

Feste Einspeisevergütung, die per Plugin gesetzt werden kann

```yaml
type: custom
price:
  source: ...
```

#### `price`

Den Preis in [currency]/kWh den du vom Netzbetreiber bekommst. Wird für die Ersparnisberechnung verwendet.

**Standardwert:** `0.08`

---

### `type:` **`octopusenergy`**

Der Stromanbieter [Octopus Energy](https://octopus.energy) im Vereinigten Königreich.

:::tip Tarif- und Regionalcodes
Das Ermitteln des Tarif- und Regionalcodes ist nicht Gegenstand dieser Dokumentation.
:::

**Beispiel**:

```yaml
type: octopusenergy
tariff: AGILE-FLEX-22-11-25 # Tariff code
region: A # optional
```

#### `tariff`

Der Tarifcode für Ihren Energievertrag. Stelle sicher, dass dies auf Ihren **Importtarifcode** eingestellt ist.

#### `region`

Die DNO Region in der man sich befindet: [Weitere Informationen](https://www.energy-stats.uk/dno-region-codes-explained/)

**Mögliche Werte**:

- **`A`**: Eastern England
- **`B`**: East Midlands
- **`C`**: London
- **`D`**: Merseyside and Northern Wales
- **`E`**: West Midlands
- **`F`**: North Eastern England
- **`G`**: North Western England
- **`H`**: Southern England
- **`J`**: South Eastern England
- **`K`**: Southern Wales
- **`L`**: South Western England
- **`M`**: Yorkshire
- **`N`**: Southern Scotland
- **`P`**: Northern Scotland

---

## `co2`

Neben der Optimierung der Ladeplanung nach Kosten kann diese auch nach anderen Kriterien erfolgen, z.B. nach CO2-Intensität. Damit ist CO2-optimales Laden auch möglich, wenn kein variabler Tarif verwendet wird. Die Optimierung kann mittels Grünstromindex oder ElectricityMaps erfolgen.

### `type:` **`grünstromindex`**

**Beispiel**:

```yaml
co2:
  type: grünstromindex
  zip: meine PLZ # PLZ mit führender Null mit in "" setzen
```

### `type:` **`electricitymaps`**

**Beispiel**:

```yaml
co2:
  type: electricitymaps
  uri: <uri>
  token: <token>
  zone: DE
```

### `type:` **`ngeso`**

Der National Grid Electricity Supply Operator (ESO) im Vereinigten Königreich.

Stellt standardmäßig nationale Daten bereit, kann jedoch durch die Angabe **entweder** einer [Regions-ID](https://api.carbonintensity.org.uk/) oder einer Postleitzahl genauer gemacht werden. **Geben Sie nicht beides an!**

**Beispiel**:

```yaml
co2:
  type: ngeso
  
  # Optionally either
  region: 1
  # OR
  postcode: SW1A1AA
```
