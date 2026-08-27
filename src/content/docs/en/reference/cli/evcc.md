---
title: "evcc"
---

evcc - open source solar charging

```
evcc [flags]
```

## Options

```
  -c, --config string          Config file (default "~/evcc.yaml" or "/etc/evcc.yaml")
      --custom-css string      Additional user-defined CSS file for custom styling. No compatibility guarantees.
      --database string        Database location (default "~/.evcc/evcc.db")
      --demo                   Enter demo mode. Disables auth, config ui and restart
      --disable-auth           Disable authentication (dangerous)
  -h, --help                   Help
      --ignore-db              Run command ignoring service database
  -l, --log string             Log level (fatal, error, warn, info, debug, trace) (default "info")
      --log-headers            Log headers
      --metrics                Expose metrics
      --profile                Expose pprof profiles
      --template string        Add custom template file (debug only)
      --template-type string   Custom template type (charger, meter, tariff, vehicle) (debug only)
```

## See also

- [evcc cache](/en/reference/cli/evcc_cache) - Manage cache entries
- [evcc charger](/en/reference/cli/evcc_charger) - Query configured chargers
- [evcc checkconfig](/en/reference/cli/evcc_checkconfig) - Check config file for errors
- [evcc completion](/en/reference/cli/evcc_completion) - Generate the autocompletion script for the specified shell
- [evcc config](/en/reference/cli/evcc_config) - Dump database configuration
- [evcc detect](/en/reference/cli/evcc_detect) - Auto-detect compatible hardware
- [evcc device](/en/reference/cli/evcc_device) - Query database-configured devices (debug only)
- [evcc discuss](/en/reference/cli/evcc_discuss) - Request support at Github Discussions (https://github.com/evcc-io/evcc/discussions/categories/erste-hilfe)
- [evcc dump](/en/reference/cli/evcc_dump) - Dump configuration
- [evcc easee-ocpp](/en/reference/cli/evcc_easee-ocpp) - Manage Easee local OCPP configuration
- [evcc meter](/en/reference/cli/evcc_meter) - Query configured meters
- [evcc metrics](/en/reference/cli/evcc_metrics) - Inspect stored energy metrics
- [evcc migrate](/en/reference/cli/evcc_migrate) - Migrate yaml to database (deprecated), reset only
- [evcc password](/en/reference/cli/evcc_password) - Password administration
- [evcc settings](/en/reference/cli/evcc_settings) - Manage configuration settings
- [evcc sponsor](/en/reference/cli/evcc_sponsor) - Validate sponsor token
- [evcc sunspec](/en/reference/cli/evcc_sunspec) - Dump SunSpec model information
- [evcc tariff](/en/reference/cli/evcc_tariff) - Query configured tariff
- [evcc token](/en/reference/cli/evcc_token) - Generate token credentials
- [evcc vehicle](/en/reference/cli/evcc_vehicle) - Query configured vehicles
