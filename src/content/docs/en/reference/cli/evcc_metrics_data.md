---
title: "evcc metrics data"
---

Export energy data as a table

## Synopsis

Export aggregated energy data as a table.

Without arguments all entities are exported for the current day. Entities can be
selected by name or title; run the entities subcommand to list them.

```
evcc metrics data [entity ...] [flags]
```

## Options

```
      --aggregate string   Aggregation interval: 15m, hour, day or month (default "hour")
      --csv                Output CSV instead of a table
      --from string        Start date as YYYY-MM-DD (default today)
      --group string       Limit output to an entity group
      --range string       Quick timeframe: day, month or year
      --to string          End date as YYYY-MM-DD, inclusive (default today)
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
