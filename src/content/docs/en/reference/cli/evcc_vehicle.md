---
title: "evcc vehicle"
---

Query configured vehicles

```
evcc vehicle [name] [flags]
```

## Options

```
      --cloud[=true|false]      Use cloud service (requires sponsor token)
  -i, --current int             Set maximum current
      --diagnose[=true|false]   Diagnose
  -a, --start[=true|false]      Start charging
  -o, --stop[=true|false]       Stop charging
      --template string         Add custom template file (debug only)
      --template-type string    Custom template type (charger, meter, tariff, vehicle) (debug only)
      --timeout duration        Timeout (default 1s)
  -w, --wakeup[=true|false]     Wake up
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
