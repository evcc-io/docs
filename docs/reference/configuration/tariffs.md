---
sidebar_position: 11
---

# `tariffs`

Hier kannst du deinen Energietarif und ggf. deine Einspeisevergütung angeben. Evcc verwendet diese Werte für eine grobe [Einsparungsberechnung](/docs/guides/setup#ersparnisberechnung), die in der Web-UI angezeigt wird.

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

evcc unterstützt die Verwendung von flexiblen Stromtarifen von [Awattar](https://www.awattar.de) oder [Tibber](https://tibber.com). Die Konfiguration erlaubt es "günstige" Preise zu definieren, bei welchen das Laden vom Netz mit der maximal möglichen Leistung aktiviert wird, selbst wenn nicht genug PV Leistung zur Verfügung steht.

**Beispiel: Flexibler Energiepreis**

```yaml
tariffs:
  grid:
    # either
    type: tibber
    cheap: 0.2 # [currency]/kWh
    token: "476c477d8a039529478ebd690d35ddd80e3308ffc49b59c65b142321aee963a4" # access token
    homeid: "cc83e83e-8cbf-4595-9bf7-c3cf192f7d9c" # optional if multiple homes associated to account

    # or
    type: awattar
    cheap: 0.2 # [currency]/kWh
    region: de # optional, choose at for Austria
```

Im Folgenden werden nun alle möglichen Parameter erklärt.

---

## `currency`

Währung in der Energiepreise dargestellt und berechnet werden.

**Standardwert:** `EUR`

**Mögliche Werte:** `EUR|CHF|USD|NOK|...` Währungskürzel nach [ISO 4217](https://de.wikipedia.org/wiki/ISO_4217)

---

## `grid`

Folgende Tariftypen (`type`) werden unterstützt:

**Mögliche Werte** `fixed|awattar|tibber`

---

### `type:` **`fixed`**

Fester Energiepreis für Netzbezug.

**Beispiel**:

```yaml
type: fixed
price: 0.297 # 0,297 [currency]/kWh
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
cheap: 0.2 # [currency]/kWh
region: de # optional
```

#### `cheap`

Energiepreis pro kWh der als günstig gewertet werden soll.

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
cheap: 0.2 # [currency]/kWh
token: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
homeid: "12345678-90ab-cdef-1234-567890abcdef" # optional
```

#### `cheap`

Energiepreis pro kWh der als günstig gewertet werden soll.

#### `token`

Das Zugangstoken des Anbieters

#### `homeid`

Die ID des Standards, falls es unter dem Account mehrere gibt

---

## `feedin`

Vergütung für eingespeisten Strom

**Mögliche Werte** `fixed`

### `type:` **`fixed`**

Feste Einspeisevergütung

**Beispiel**:

```yaml
type: fixed
price: 0.12 # 0,12 [currency]/kWh
```

#### `price`

Den Preis in [currency]/kWh den du vom Netzbetreiber bekommst. Wird für die Ersparnisberechnung verwendet.

**Standardwert:** `0.08`
