# evcc charger ramp

Ramp current from 6..16A in configurable steps

```
evcc charger ramp [name] [flags]
```

## Options

```
      --delay string    ramp delay (default "1s")
      --digits string   fractional digits (0..2) (default "0")
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

* [evcc charger](evcc_charger.md)	 - Query configured chargers


