---
title: "evcc metrics reset"
---

Reset the daily rollup after the stored slots were changed by SQL

## Synopsis

Drops the daily rollup, the slots are kept. A running evcc rebuilds the rollup within an hour, otherwise the next start does.

```
evcc metrics reset [flags]
```

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

- [evcc metrics](/en/reference/cli/evcc_metrics) - Inspect stored energy metrics
