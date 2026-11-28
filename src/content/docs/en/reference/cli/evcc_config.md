---
title: "evcc config"
---

Dump database configuration

```
evcc config [flags]
```

## Options

```
      --class string   Device class (charger|meter|vehicle|tariff|loadpoint|circuit|messenger|hems|curtailer)
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

- [evcc](/en/reference/cli/evcc) - evcc - smart charging
- [evcc config delete](/en/reference/cli/evcc_config_delete) - Delete device
