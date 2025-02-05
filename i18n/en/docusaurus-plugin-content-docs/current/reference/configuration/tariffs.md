---
sidebar_position: 11
---

# `tariffs`

You can specify your energy tariff and, if applicable, your feed-in tariff.
evcc uses these values for a rough [savings calculation](/docs/faq#statistical-data) that is displayed in the web UI.
This data is also used by the [planner](/docs/features/plans) for price and CO₂-optimized charging.

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

More examples and a list of available providers can be found in the section [Tariffs](/docs/tariffs).
