# evcc charger

Query configured chargers

```
evcc charger [name] [flags]
```

## Options

```
  -i, --current float   Set maximum current
      --diagnose        Diagnose
  -d, --disable         Disable
  -e, --enable          Enable
      --heartbeat       After command, continue running device heartbeats (if any) until interrupted
  -p, --phases int      Set usable phases (1 or 3)
  -w, --wakeup          Wake up
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
      --template-type string   Custom template type (charger, meter, tariff, vehicle (debug only)
```

## See also

* [evcc](evcc.md)	 - evcc - open source solar charging
* [evcc charger ramp](evcc_charger_ramp.md)	 - Ramp current from 6..16A in configurable steps


