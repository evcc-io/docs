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
  -c, --config string          Config file (default "~/evcc.yaml" or "/etc/evcc.yaml")
      --database string        Database location (default "~/.evcc/evcc.db")
  -h, --help                   Help
      --ignore-db              Run command ignoring service database
  -l, --log string             Log level (fatal, error, warn, info, debug, trace) (default "info")
      --log-headers            Log headers
      --template string        Add custom template file (debug only)
      --template-type string   Custom template type (charger, meter, tariff, vehicle (debug only)
```

## See also

* [evcc](evcc.md)	 - evcc - open source solar charging


