---
title: "evcc metrics"
---

Inspect stored energy metrics

## Options inherited from parent commands

```
  -c, --config string              Config file (default "~/evcc.yaml" or "/etc/evcc.yaml")
      --database string            Database location (default "~/.evcc/evcc.db")
  -h, --help[=true|false]          Help
      --ignore-db[=true|false]     Run command ignoring service database
  -l, --log string                 Log level (fatal, error, warn, info, debug, trace) (default "info")
      --log-headers[=true|false]   Log headers
```

## See also

- [evcc](/en/reference/cli/evcc) - evcc - smart charging
- [evcc metrics battery](/en/reference/cli/evcc_metrics_battery) - Compare battery charge and discharge energy
- [evcc metrics data](/en/reference/cli/evcc_metrics_data) - Export energy data as a table
- [evcc metrics entities](/en/reference/cli/evcc_metrics_entities) - List metric entities
- [evcc metrics forecast](/en/reference/cli/evcc_metrics_forecast) - Compare solar forecast against actual PV production
- [evcc metrics reset](/en/reference/cli/evcc_metrics_reset) - Reset the daily rollup after the stored slots were changed by SQL
