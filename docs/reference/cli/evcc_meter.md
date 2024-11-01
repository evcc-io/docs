# evcc meter

Query configured meters

```
evcc meter [name] [flags]
```

## Options

```
  -b, --battery-mode string          Set battery mode (normal, hold, charge)
  -w, --battery-mode-wait duration   Wait given duration during which potential watchdogs are active
  -r, --repeat                       Repeat until interrupted
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


