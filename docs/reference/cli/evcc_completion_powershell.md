# evcc completion powershell

Generate the autocompletion script for powershell

## Synopsis

Generate the autocompletion script for powershell.

To load completions in your current shell session:

```
evcc completion powershell | Out-String | Invoke-Expression
```

To load completions for every new session, add the output of the above command
to your powershell profile.


```
evcc completion powershell [flags]
```

## Options

```
      --no-descriptions   disable completion descriptions
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

* [evcc completion](evcc_completion.md)	 - Generate the autocompletion script for the specified shell


