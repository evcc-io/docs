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

- [evcc charger](evcc_charger.md) - Query configured chargers
