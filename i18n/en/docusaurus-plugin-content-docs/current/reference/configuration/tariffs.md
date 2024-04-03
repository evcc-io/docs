---
sidebar_position: 11
---

# `tariffs`

Here you can specify your energy tariff and, if applicable, your feed-in remuneration. evcc uses these values for a rough [Einsparungsberechnung](/docs/faq#statistical-data) displayed in the web UI.

Furthermore, the planner uses these settings for price- or CO₂-optimised target charging. These settings are taken into account in the following order: "flexible grid tariff" before "CO₂ tariff" before "constant grid tariff".

**Structure**

```yaml
tariffs:
  grid:
    type: ...
  feedin:
    type: ...
  co2:
    type: ...
```

**For example: Constant Energy Price**

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

**For example: Constant Energy Price with Time-dependent Tariffs**

```yaml
tariffs:
  currency: EUR # (default EUR)
  grid:
    # static grid price with price zones)
    type: fixed
    price: 0.294 # EUR/kWh
    zones:
      - days: Mo-Fr
        hours: 2-5
        price: 0.2 # EUR/kWh
      - days: Sa,So
        price: 0.15 # EUR/kWh
```

evcc supports the use of flexible electricity tariffs from [Awattar](https://www.awattar.de), [Tibber](https://tibber.com), or [Octopus Energy](https://octopus.energy). The configuration allows defining "cheap" prices (see `smartCostLimit` in site), where charging from the grid with the maximum possible power is enabled even if there is not enough PV power available.

**For example: Flexible Energy Price**

```yaml
tariffs:
  grid:
    # either
    type: tibber
    token: "476c477d8a039529478ebd690d35ddd80e3308ffc49b59c65b142321aee963a4" # access token
    homeid: "cc83e83e-8cbf-4595-9bf7-c3cf192f7d9c" # optional if multiple homes associated with account

    # or
    type: awattar
    region: de # optional, choose at for Austria
    charges: 0 # optional, additional charges per kWh
    tax: 0 # optional, additional tax (0.1 for 10%)
```

Below, the various parameters are explained:

---

## `currency`

Currency in which energy prices are presented and calculated.

**Default value:** `EUR`

**Possible values:** `EUR|CHF|USD|NOK|GBP|...` Currency codes according to [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)

---

## `grid`

The following tariff types (`type`) are supported:

**Possible values:** `fixed|awattar|tibber|octopusenergy`

---

### `type:` **`fixed`**

Fixed energy price for grid consumption.

**For example**:

```yaml
type: fixed
price: 0.297 # 0.297 [currency]/kWh
```

#### `price`

The price in [currency]/kWh that you pay to your electricity supplier. Used for savings calculation.

**Default value:** `0.30`

---

### `type:` **`awattar`**

The electricity provider [Awattar](https://www.awattar.de).

**For example**:

```yaml
type: awattar
region: de # optional
charges: 0 # optional, additional charges per kWh
tax: 0 # optional, additional tax (0.1 for 10%)
```

#### `region`

The region you are located in.

**Possible values**:

- **`de`**: Germany
- **`at`**: Austria

---

### `type:` **`tibber`**

The electricity provider [Tibber](https://www.tibber.com).

**For example**:

```yaml
type: tibber
token: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
homeid: "12345678-90ab-cdef-1234-567890abcdef" # optional
```

#### `token`

The access token of the provider.

#### `homeid`

The ID of the location, if there are multiple locations associated with the account.

---

### `type:` **`octopusenergy`**

The electricity provider [Octopus Energy](https://octopus.energy) in the United Kingdom.

:::tip Tariff and Regional Codes
Determining the tariff and regional codes is not covered in this documentation.
:::

**For example**:

```yaml
type: octopusenergy
tariff: AGILE-FLEX-22-11-25 # Tariff code
region: A # optional
```

#### `tariff`

The tariff code for your energy contract.

#### `region`

The DNO region you are in: [More information](https://www.energy-stats.uk/dno-region-codes-explained/)

**Possible values**:

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

The electricity provider [Nordpool Estonia](https://elering.ee) in Estonia.

**For example**:

```yaml
type: elering # Nordpool
region: ee # or lt, lv, fi
charges: # optional, additional charges per kWh
tax: # optional, additional tax (0.1 for 10%)
```

---

### `type:` **`energinet`**

The electricity provider [Energinet](https://energinat.dk) in Denmark.

**For example**:

```yaml
type: energinet # Energinet using the price in DKK
region: dk1 # or dk2
charges: # optional, additional charges per kWh
tax: # optional, additional tax (0.1 for 10%)
```

---

### `type:` **`ENTSO-E`**

European market date

**Beispiel**:

```yaml
type: entsoe # Entso-E european market data
domain: BZN|DE-LU # https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_areas
securitytoken: # api token
charges: # optional, additional charges per kWh
tax: # optional, additional tax (0.1 for 10%)
```

---

## `feedin`

Feed-in tariffs. For older German installations (before 1.4.2012), enter the difference between the feed-in and self-use tariff here.

**Possible values:** `fixed|octopusenergy`

### `type:` **`fixed`**

Fixed feed-in remuneration.

**For example**:

```yaml
type: fixed
price: 0.12 # 0.12 [currency]/kWh
```

#### `price`

The price in [currency]/kWh that you receive from the grid operator. Used for savings calculation.

**Default value:** `0.08`

---

### `type:` **`octopusenergy`**

The electricity provider [Octopus Energy](https://octopus.energy) in the United Kingdom.

:::tip Tariff and Regional Codes
Determining the tariff and regional codes is not covered in this documentation.
:::

**For example**:

```yaml
type: octopusenergy
tariff: AGILE-FLEX-22-11-25 # Tariff code
region: A # optional
```

#### `tariff`

The tariff code for your energy contract. Make sure this is set to your **import tariff code**.

#### `region`

The DNO region you are in: [More information](https://www.energy-stats.uk/dno-region-codes-explained/)

**Possible values**:

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

In addition to optimising the charging schedule based on costs, optimisation can also be done based on other criteria, such as CO<sub>2</sub> emissions. This enables CO₂-optimised charging even when a variable tariff is not used. Optimisation can be done using the Grünstromindex or ElectricityMaps.

### `type:` **`grünstromindex`**

Uses [Grünstromindex](https://gruenstromindex.de) forecast data.
Only available in Germany.

**For example**:

```yaml
co2:
  type: grünstromindex
  zip: my post code # For post codes with leading zeros, enclose in ""
```

### `type:` **`electricitymaps`**

Uses [Electricity Maps](https://app.electricitymaps.com/) forecast data.
[API access](https://api-portal.electricitymaps.com) is required for this feature.
The "Free Personal Tier" is not sufficient, since it does not provide forecast data.

**For example**:

```yaml
co2:
  type: electricitymaps
  uri: <uri>
  token: <token>
  zone: DE
```

### `type:` **`ngeso`**

National Grid Electricity System Operator Data (GB Only)

**For example**:

```yaml
co2:
  type: ngeso # provides national data if both region and postcode are omitted - Choose ONE only!
  region: 1 # optional, coarser than using a postcode - The region details are at https://carbon-intensity.github.io/api-definitions/#region-list
  postcode: SW1 # optional - Outward postcode i.e. RG41 or SW1 or TF8. Do not include full postcode, outward postcode only
```
