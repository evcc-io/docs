# evcc checkconfig

Check config file for errors

## Synopsis

Check the (specified or default) config file for errors. Note that
	       checkconfig only checks the config file for parsing errors and does
		   not check that individual device configurations are valid.

```
evcc checkconfig [flags]
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


