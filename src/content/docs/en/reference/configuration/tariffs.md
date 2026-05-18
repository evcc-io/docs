---
title: "tariffs"
sidebar:
  order: 11
---

You can specify your energy tariff and, if applicable, your feed-in tariff.
evcc uses these values for a rough [savings calculation](/en/faq#statistical-data) that is displayed in the web UI.
This data is also used by the [planner](/en/features/plans) for price and CO₂-optimized charging.

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

More examples and a list of available providers can be found in the section [Tariffs](/en/tariffs).

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
