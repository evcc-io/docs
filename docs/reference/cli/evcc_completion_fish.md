# evcc completion fish

Generate the autocompletion script for fish

## Synopsis

Generate the autocompletion script for the fish shell.

To load completions in your current shell session:

```
evcc completion fish | source
```

To load completions for every new session, execute once:

```
evcc completion fish > ~/.config/fish/completions/evcc.fish
```

You will need to start a new shell for this setup to take effect.


```
evcc completion fish [flags]
```

## Options

```
      --no-descriptions   disable completion descriptions
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

* [evcc completion](evcc_completion.md)	 - Generate the autocompletion script for the specified shell


