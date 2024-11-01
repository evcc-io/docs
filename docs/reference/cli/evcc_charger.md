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
  -p, --phases int      Set usable phases (1 or 3)
  -w, --wakeup          Wake up
```

## Options inherited from parent commands

```
  -c, --config string   Config file (default "~/evcc.yaml" or "/etc/evcc.yaml")
  -h, --help            Help
      --ignore-db       Run command ignoring service database
  -l, --log string      Log level (fatal, error, warn, info, debug, trace) (default "info")
      --log-headers     Log headers
```

## See also

* [evcc](evcc.md)	 - evcc - open source solar charging
* [evcc charger ramp](evcc_charger_ramp.md)	 - Ramp current from 6..16A in configurable steps


