# evcc detect

Auto-detect compatible hardware

## Synopsis

Automatic discovery using detect scans the local network for available devices.
Scanning focuses on devices that are commonly used that are detectable with reasonable efforts.

On successful detection, suggestions for EVCC configuration can be made. The suggestions should simplify
configuring EVCC but are probably not sufficient for fully automatic configuration.

```
evcc detect [host ...] [subnet ...] [flags]
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


