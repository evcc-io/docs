# evcc vehicle

Query configured vehicles

```
evcc vehicle [name] [flags]
```

## Options

```
      --cloud         Use cloud service (requires sponsor token)
  -i, --current int   Set maximum current
      --diagnose      Diagnose
  -a, --start         Start charging
  -o, --stop          Stop charging
  -w, --wakeup        Wake up
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


