---
title: "evcc discovery"
---

Scan the local network for devices

## Synopsis

Discovery scans the local network with the same unprivileged methods the configuration
UI uses for host suggestions (mDNS, SSDP, neighbor table, reverse DNS) and lists the hosts
found with their vendor and the configured devices they belong to.

The devices section is redacted (no addresses, vendor part of the MAC only, serial numbers
masked) and is meant to be shared on GitHub to improve the template discovery hints. The
hosts section is unredacted and stays local.

```
evcc discovery [flags]
```

## Options

```
      --json   Print the report as json
```

## Options inherited from parent commands

```
  -c, --config string     Config file (default "~/evcc.yaml" or "/etc/evcc.yaml")
      --database string   Database location (default "~/.evcc/evcc.db")
  -h, --help              Help
      --ignore-db         Run command ignoring service database
  -l, --log string        Log level (fatal, error, warn, info, debug, trace) (default "info")
      --log-headers       Log headers
```

## See also

- [evcc](/en/reference/cli/evcc) - evcc - open source solar charging
