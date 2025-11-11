# evcc meter

Query configured meters

```
evcc meter [name] [flags]
```

## Options

```
  -b, --battery-mode string          Set battery mode (normal, hold, charge)
  -w, --battery-mode-wait duration   Wait given duration during which potential watchdogs are active
      --diagnose                     Diagnose
      --heartbeat                    After command, continue running device heartbeats (if any) until interrupted
  -r, --repeat                       Repeat until interrupted
      --repeat-interval duration     Interval between repetitions
      --timeout duration             Timeout (default 1s)
```

## Options inherited from parent commands

```
  -c, --config string          Config file (default "~/evcc.yaml" or "/etc/evcc.yaml")
      --custom-css string      Additional user-defined CSS file for custom styling. No compatibility guarantees.
      --database string        Database location (default "~/.evcc/evcc.db")
      --demo                   Enter demo mode. Disables auth, config ui and restart
  -h, --help                   Help
      --ignore-db              Run command ignoring service database
  -l, --log string             Log level (fatal, error, warn, info, debug, trace) (default "info")
      --log-headers            Log headers
      --template string        Add custom template file (debug only)
      --template-type string   Custom template type (charger, meter, tariff, vehicle) (debug only)
```

## See also

- [evcc](evcc.md) - evcc - open source solar charging
