---
title: "evcc charger"
---

Query configured chargers

```
evcc charger [name] [flags]
```

## Options

```
  -i, --current float            Set maximum current
  -u, --curtail int              Curtail feed-in to percent (0-100, only available if supported by device) (default -1)
      --diagnose[=true|false]    Diagnose
  -m, --dim int                  Dim (0/1 to switch, only available if supported by device) (default -1)
  -d, --disable[=true|false]     Disable
  -e, --enable[=true|false]      Enable
      --heartbeat[=true|false]   After command, continue running device heartbeats (if any) until interrupted
  -p, --phases int               Set usable phases (1 or 3)
      --template string          Add custom template file (debug only)
      --template-type string     Custom template type (charger, meter, tariff, vehicle) (debug only)
      --timeout duration         Timeout (default 1s)
  -w, --wakeup[=true|false]      Wake up
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
- [evcc charger ramp](/en/reference/cli/evcc_charger_ramp) - Ramp current from 6..16A in configurable steps
