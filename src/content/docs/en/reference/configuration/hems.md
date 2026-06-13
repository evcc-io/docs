---
title: "hems"
sidebar:
  order: 7
---

The `hems` section configures external control of consumption and feed-in power.
This is used e.g. for implementing German §14a EnWG or §9 EEG regulations.
For background and setup details, see [External Control](../../features/external-control).

:::note[Note]
Curtailment and dimming of controllable consumers act directly on the device, no circuit configuration is required.
For the consumption limit to apply to charging points, configure [Load Management](../../features/loadmanagement) circuits.
An active limit then caps the top-level circuit.
:::

:::note[SMA Sunny Home Manager & SEMP Protocol]
The SMA Sunny Home Manager (SHM) integration is active by default and no longer needs to be configured under `hems:`.
For details and configuration options, see **Configuration > Sunny Home Manager**.
:::

---

## Required Parameters

### `type`

Defines the type of external control.

**Possible values**:

- `relay`: Connection via switch contact
- `fnn`: Connection via FNN control box with multiple switch contacts
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

[Plugin](/en/reference/plugins) configuration for reading the switch contact.
Expected return value: `true`/`1` = limited, `false`/`0` = normal.

#### `passthrough`

Optional [plugin](/en/reference/plugins) configuration for passing the limitation signal through to an external system.

#### `interval`

Polling interval for the switch contact.
Default: `10s`.

For more examples of different connections (GPIO, MQTT, HTTP), see [External Control](../../features/external-control#configuration-via-relay).

---

## `type: fnn`

Connection via an FNN control box with separate switch contacts.
Dimming of consumption (W4) and curtailment of feed-in (W3, S2, S1) are signaled via individual contacts.

```yaml
hems:
  type: fnn
  maxDimPower: 4200 # Consumption limit while dimmed (in watts)
  maxCurtailPower: 10000 # Installed PV power, base for curtailment steps (in watts)
  w4:
    source: gpio
    function: read
    pin: 17 # Read GPIO pin 17
    # Return value: false = normal, true = active
  w3:
    source: gpio
    function: read
    pin: 27
  s2:
    source: gpio
    function: read
    pin: 22
  s1:
    source: gpio
    function: read
    pin: 23
```

### Parameters

At least one of the signals `w4` or `w3` must be configured.

#### `maxDimPower`

Consumption limit in watts that is applied while the dim signal (W4) is active.
Required when `w4` is configured.

#### `maxCurtailPower`

Installed PV power in watts.
Base value for the curtailment steps (W3, S2, S1).

#### `w4`

[Plugin](/en/reference/plugins) configuration for reading the dim signal.
When active, consumption is limited to `maxDimPower`.

#### `w3`

[Plugin](/en/reference/plugins) configuration for reading the curtailment signal "0 %".
When active, feed-in is limited to 0 % of `maxCurtailPower`.

#### `s2`

[Plugin](/en/reference/plugins) configuration for reading the curtailment signal "30 %".
When active, feed-in is limited to 30 % of `maxCurtailPower`.

#### `s1`

[Plugin](/en/reference/plugins) configuration for reading the curtailment signal "60 %".
When active, feed-in is limited to 60 % of `maxCurtailPower`.

#### `interval`

Polling interval for the switch contacts.
Default: `10s`.

For setup details, see [External Control](../../features/external-control#configuration-via-fnn-control-box).

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

Optional [plugin](/en/reference/plugins) configuration for passing the limitation signal through to an external system.

#### `interval`

Polling interval.
Default: `10s`.

For setup and pairing details, see [External Control](../../features/external-control#configuration-via-eebus).
