---
sidebar_position: 10
---

# `log, levels`

## `log`

Defines the level of detail for logging information to the console.

**Possible values**:

- `fatal`: Only messages of the `fatal` category will be displayed. These are errors that prevent the system from functioning.
- `error`: Only messages of the `error` category will be displayed. There are very few of this type of message.
- `warn`: Includes `error`, additionally shows messages of the `warn` category.
- `info`: Includes `warn`, additionally shows messages of the `info` category.
- `debug`: Includes `info`, additionally shows messages of the `debug` category. This is necessary for error analysis.
- `trace`: Includes `debug`, additionally shows messages of the `trace` category. This is the most detailed category and can result in very large log data. In general, this is not usually needed!

When running evcc in the console, the `log` messages are simply directed to the standard output.  
If evcc is run as a Linux systemd service, messages can be tracked using `sudo journalctl -fau evcc`, see [Logfile zur Fehleranalyse](/docs/guides/setup#how-can-i-create-a-logfile-for-error-analysis).  
In the case of a Docker installation, you can view the messages using `docker logs`, see [Docker Documentation](https://docs.docker.com/config/containers/logging/).

**For example**:

```yaml
log: error
```

---

## `levels`

Allows configuring different logging levels for various components of evcc.

Defines the level of detail for logging for different evcc components.

**Possible components**:

- `site`: The central evcc component (control, calculations, ...)
- `lp-X`: The respective charging point, where `X` is numbered according to the order of [`loadpoints`](loadpoints) configuration (charging points), starting at `1`
- `sma`: The SMA HEMS component if SMA Sunny Home Manager 2.0 is integrated using [`hems`](hems)
- _`vehicle`_: Each [`vehicle`](vehicles) (vehicle), where you must specify the corresponding value of the [`type`](vehicles#type) parameter (or template).
- Additionally, depending on the use case, additional components can be specified (e.g. `cache`, `db`, `influx`, `mqtt`, ...)

**Possible values for each component**: Identical to the values of [`log`](#log)

**For example**:

```yaml
levels:
  site: debug
  lp-1: debug
  lp-2: debug
  tesla: trace
```
