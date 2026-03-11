---
sidebar_position: 7
---

# `hems`

The `hems` section configures external control of consumption and feed-in power.
This is used e.g. for implementing German §14a EnWG or §9 EEG regulations.
For background and setup details, see [External Control](../../features/external-control).

:::info Note
When `hems` is configured, an "External Limit" circuit (`gridcontrol`) is automatically created.
No manual circuit configuration is required.
:::

:::info SMA Sunny Home Manager & SEMP Protocol
The SMA Sunny Home Manager (SHM) integration is active by default and no longer needs to be configured under `hems:`.
For details and configuration options, see **Configuration > Sunny Home Manager**.
:::

---

## Required Parameters

### `type`

Defines the type of external control.

**Possible values**:

- `relay`: Connection via switch contact
- `eebus`: Connection via the EEBus protocol

---

## `type: relay`

Connection via a switch contact (e.g. control box).
The contact signals whether a power limitation is active.

```yaml
hems:
  type: relay
  maxPower: 8400 # Total power limit when signal is active (in watts)
  limit:
    source: gpio
    function: read
    pin: 17
```

### Parameters

#### `maxPower`

Total power limit in watts that is applied when the signal is active.

#### `limit`

[Plugin](../../devices/plugins) configuration for reading the switch contact.
Expected return value: `true`/`1` = limited, `false`/`0` = normal.

#### `passthrough`

Optional [plugin](../../devices/plugins) configuration for passing the limitation signal through to an external system.

#### `interval`

Polling interval for the switch contact.
Default: `10s`.

For more examples of different connections (GPIO, MQTT, HTTP), see [External Control](../../features/external-control#configuration-via-relay).

---

## `type: eebus`

Connection via the EEBus protocol.
The control box automatically transmits the power limit.

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF" # SKI of the control box
```

### Parameters

#### `ski`

SKI (Subject Key Identifier) of the control box.
Required for pairing.

#### Advanced Limits

The following optional parameters can be set for EEBus communication:

- `contractualConsumptionNominalMax`: Contractual maximum consumption power (in watts)
- `failsafeConsumptionActivePowerLimit`: Failsafe limit for consumption power (in watts)
- `failsafeProductionActivePowerLimit`: Failsafe limit for feed-in power (in watts)
- `failsafeDurationMinimum`: Minimum failsafe duration (e.g. `2h`)

#### `passthrough`

Optional [plugin](../../devices/plugins) configuration for passing the limitation signal through to an external system.

#### `interval`

Polling interval.
Default: `10s`.

For setup and pairing details, see [External Control](../../features/external-control#configuration-via-eebus).
