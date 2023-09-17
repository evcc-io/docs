---
sidebar_position: 17
---

# `modbusproxy`

The `modbusproxy` setting is a list of devices that are exposed for third-party systems via Modbus TCP on the network.

Some devices allow only a very limited number of Modbus TCP clients. In the worst case, only a single connection is allowed, as is the case with SolarEdge components. Additionally, in serial Modbus RTU RS485 bus systems, only one master is allowed.
With the help of `modbusproxy`, it's possible to set up evcc as a Modbus proxy that can share existing Modbus connections with other systems. This allows evcc to communicate directly with the device, while other systems communicate with evcc, which bundles the communication connections and forwards them to the target device.

The `modbusproxy` configuration is a list of different proxy configurations.

**For example**:

```yaml
modbusproxy:
  - port: 5021
    uri: 192.0.2.2:502
  - port: 5022
    device: /dev/ttyUSB0
    baudrate: 9600
    comset: "8N1"
  - port: 5023
    uri: 192.0.2.3:502
    rtu: true
```

:::info
_Incoming_ (from third-party systems such as home automation, loggers), the proxy function exclusively supports Modbus TCP.

_Outgoing_ towards the target device to be queried (e.g., inverter, energy meter), the protocol may be translated according to the target device's configuration.
:::

:::tip Sponsortoken required

For more information about evcc sponsorship, please visit [the sponsorship page](../../sponsorship).

:::

---

## Required Parameters

### `port`

The local TCP/IP port under which a connection is provided as a proxy server, and from which incoming Modbus TCP connections from third-party systems are accepted.

**For example**:

```yaml
port: 5021
```

## Optional Parameters

### `rtu`

Modbus TCP is typically used for communication with network targets. If needed, you can switch to Modbus RTU over TCP by specifying `rtu: true`. A typical use case is for simple transparent RS485-TCP converters (without protocol translation). This must match the device's configuration. It's ignored for serial target systems.

**For example**:

```yaml
rtu: true
```

### `readonly`

By setting `readonly: true`, you can prevent Modbus write accesses by third-party systems.

**For example**:

```yaml
readonly: true
```
