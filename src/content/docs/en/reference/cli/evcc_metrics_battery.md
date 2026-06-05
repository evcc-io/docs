---
title: "evcc metrics battery"
---

Compare battery charge and discharge energy

## Synopsis

Compare charge and discharge energy per battery.

Without arguments all batteries are compared for the current day. Batteries can
be selected by name or title.

```
evcc metrics battery [name ...] [flags]
```

## Options

```
      --from string    Start date as YYYY-MM-DD (default today)
      --range string   Quick timeframe: day, month or year
      --to string      End date as YYYY-MM-DD, inclusive (default today)
```

## Options inherited from parent commands

```
  -c, --config string     Config file (default "~/evcc.yaml" or "/etc/evcc.yaml")
      --database string   Database location (default "~/.evcc/evcc.db")
  -h, --help              Help
      --ignore-db         Run command ignoring service database
  -l, --log string        Log level (fatal, error, warn, info, debug, trace) (default "info")
      --log-headers       Log headers
```

## See also

- [evcc metrics](evcc_metrics.md) - Inspect stored energy metrics
