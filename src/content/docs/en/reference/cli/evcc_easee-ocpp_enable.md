---
title: "evcc easee-ocpp enable"
---

Enable local OCPP on Easee charger

```
evcc easee-ocpp enable [flags]
```

## Options

```
      --url string   OCPP Central System URL (e.g. ws://192.168.1.100:8887/)
```

## Options inherited from parent commands

```
      --charger string    Easee charger serial number
  -c, --config string     Config file (default "~/evcc.yaml" or "/etc/evcc.yaml")
      --database string   Database location (default "~/.evcc/evcc.db")
  -h, --help              Help
      --ignore-db         Run command ignoring service database
  -l, --log string        Log level (fatal, error, warn, info, debug, trace) (default "info")
      --log-headers       Log headers
      --password string   Easee account password
      --user string       Easee account email
```

## See also

- [evcc easee-ocpp](evcc_easee-ocpp.md) - Manage Easee local OCPP configuration
