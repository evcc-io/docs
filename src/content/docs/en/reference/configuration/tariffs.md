---
title: "tariffs"
description: "How to configure grid import, grid export, CO₂ and solar forecast tariffs in evcc.yaml for savings statistics, smart charging plans and time-based grid fees."
sidebar:
  order: 12
---

You can specify your energy tariff and, if applicable, your grid export tariff.
evcc uses these values for a rough [savings calculation](/en/faq#statistical-data) that is displayed in the web UI.
This data is also used by the [planner](/en/features/plans) for price and CO₂-optimised charging.

**Structure**

```yaml
tariffs:
  grid:
    type: ...
  feedin:
    type: ...
  co2:
    type: ...
  solar:
    type: ...
  temperature:
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

More examples and a list of available providers can be found in the section [Tariffs](/en/tariffs).

## Combining Tariffs {#merged}

The `merged` tariff uses the prices of a primary tariff and continues with a secondary tariff where they end, for example real market prices extended by a longer-term price forecast.
In the UI, **Merged tariff** is available as provider for the grid, feed-in and planner tariff. Both tariffs are added directly from that form.
In `evcc.yaml` both tariffs are configured inline:

```yaml
tariffs:
  grid:
    type: merged
    primary:
      type: template
      template: tibber
      token: ...
    secondary:
      type: template
      template: energyforecast
      token: ...
```

## Time-Based Grid Fees {#charges-zones}

Use `charges` to add a fixed fee per kWh to every price value.
If your grid operator bills time-dependent grid fees (e.g. time-variable network charges according to § 14a EnWG in Germany), use `chargesZones` to override the default `charges` for specific periods.
This works with any grid tariff, no matter if it uses a provider template, a `fixed` price or a `custom` source.

Each zone has the following fields:

| Field     | Required | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| `charges` | yes      | Fee per kWh in this zone. Replaces the default `charges`. |
| `months`  | no       | e.g. `Nov-Mar` or `Jun`. Empty means all year.            |
| `days`    | no       | e.g. `Mon-Fri` or `Sat,Sun`. Empty means every day.       |
| `hours`   | no       | e.g. `17-20` or `15:30-21`. Empty means all day.          |

**Example**:

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "..."
    charges: 0.0941 # default grid fee per kWh
    chargesZones:
      - months: Nov-Mar
        days: Mon-Fri
        hours: 17-20
        charges: 0.1838 # peak
      - hours: 0-6
        charges: 0.0299 # low
```

If no zone matches, the default `charges` applies.
If zones overlap, the last matching zone wins.
When a `formula` is configured, the `charges` variable contains the zone value of the respective time slot.

A `fixed` tariff with `chargesZones` is treated like a dynamic tariff: the planner prefers cheap periods and the price chart is shown.

## Feature Flags

For custom tariffs (`type: custom`) you can influence behaviour via `features`:

| Feature   | Description                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------- |
| average   | Smooths fine-grained price slots (e.g. 15-minute values) into hourly averages.                 |
| cacheable | Persists fetched values. Used as fallback after a restart or provider outage (up to 24 hours). |

**Example**:

```yaml
tariffs:
  grid:
    type: custom
    features:
      - cacheable
    # ... additional attributes
```
