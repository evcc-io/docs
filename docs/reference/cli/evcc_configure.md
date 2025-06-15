# evcc configure

Create configuration (evcc.yaml)

```
evcc configure [flags]
```

## Options

```
      --advanced          Enables handling of advanced configuration options
      --category string   Pre-select device category for advanced configuration (implies advanced)
      --expand            Enables rendering expanded configuration files
      --lang string       Define the localization to be used (en, de)
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


