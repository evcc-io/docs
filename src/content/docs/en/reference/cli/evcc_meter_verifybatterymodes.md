---
title: "evcc meter verifybatterymodes"
---

Cycle through battery mode transitions and verify battery power interactively

```
evcc meter verifybatterymodes [name] [flags]
```

## Options

```
      --delay duration         observation window after setting mode (battery power is polled every second) (default 30s)
      --full[=true|false]      test all mode transitions instead of only from/to normal
      --template string        Add custom template file (debug only)
      --template-type string   Custom template type (charger, meter, tariff, vehicle) (debug only)
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

- [evcc meter](/en/reference/cli/evcc_meter) - Query configured meters
