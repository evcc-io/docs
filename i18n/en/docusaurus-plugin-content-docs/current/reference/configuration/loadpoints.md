---
sidebar_position: 3
---

# `loadpoints`

`loadpoints` (charging points) is a list of charging points that combines a charger, vehicles, and, if necessary, a meter with additional optional parameters for each charging point. A minimal configuration requires a charger.

**For example**:

```yaml
loadpoints:
  - title: Garage # display name for UI
    charger: charger # charger reference
    vehicle: audi # reference to standard vehicle
    mode: pv # charge mode (off, now, minpv, pv)
```

References always correspond to the values of the `name` parameter (e.g., `charger`) in the respective device configuration.

Now, let's explain all possible parameters.

---

## Required Parameters

### `title`

A description of the charging point, displayed in the user interface (UI).

**For example**:

```yaml
title: Garage
```

---

### `charger`

Reference to a `charger` configuration.

**For example**:

```yaml
charger: charger
```

Where the value `charger` corresponds to the value of the `name` parameter in the [charger definition](chargers#name).

---

## Optional Parameters

### `meter`

Reference to a `meter` (current meter) configuration.

This entry is only needed if the used charger doesn't perform its own current measurement or if the measurement values cannot be read from the charger by evcc. However, even in this case, this entry is optional, because evcc assumes that the set maximum current will also be used for charging.

**For example**:

```yaml
meter: charge
```

Where the value `charge` corresponds to the value of the `name` parameter in the [current meter definition](meters#name).

---

### `vehicle`

`vehicle`: Reference to a `vehicle` configuration that is assigned as the default vehicle to the charging point.

When a vehicle is plugged into the charger, it is assumed that this vehicle is connected. Automatic vehicle detection is bypassed. If a different vehicle is connected (e.g., guest vehicle), this can be manually assigned later.

**For example**:

```yaml
vehicle: renault
```

Where the value `renault` corresponds to the value of the `name` parameter in the [vehicle definition](vehicles#name).

---

### `mode`

evcc rememerbers the last used charging mode.
With the `mode` parameter, you can specify the charging mode that should be used after the vehicle is disconnected.

**Possible values**:

- `off`: Charging is stopped, even if a vehicle is connected to the charger.
- `now`: Start charging immediately at the maximum possible power.
- `minpv`: Start charging immediately at the minimum possible power. If sufficient PV surplus is available, charge faster.
- `pv`: Charge only using PV surplus and pause if there isn't enough power available.

**Default value:** `pv`

:::info
In general, an EV requires a minimum of 1.4 kW power per phase for charging. With chargers and vehicles that communicate via the ISO15118 standard, a total of at least 1.4 kW power is needed regardless of the number of phases used for charging.
:::

**For example**:

```yaml
mode: pv
```

---

### `soc`

Defins the default settings for handling the State of Charge (SoC) of a connected vehicle.

**For example**:

```yaml
soc:
  poll:
    mode: charging
    interval: 60m
  estimate: true
```

#### `poll`

Defines how vehicle APIs are used to retrieve real-time information about the vehicle.

:::warning
Changing the default settings is **NOT** recommended, as it could lead to the vehicle's battery draining or the vehicle manufacturer actively preventing charging control via evcc. **Use at your own risk**.
:::

#### `poll.mode`

Defines under what conditions the vehicle data is retrieved.

**Possible values**:

- `charging`: Update data **ONLY** during a charging session (recommended default).
- `connected`: Update data when the vehicle is connected to the charger (not just when charging); the `interval` parameter defines the frequency.
- `always`: Update data always, even when the vehicle is not connected to the charger; the [`interval`](#pollinterval) parameter defines the frequency (only supported for one vehicle per charging point).

**Default value:** `charging`

**For example**:

```yaml
mode: charging
```

#### `poll.interval`

Defines how often the vehicle is queried for data when it is **NOT** charging.

**Default value:** `60m`

**For example**:

```yaml
interval: 60m
```

#### `estimate`

Calculate (interpolate) the current SoC between vehicle data queries.

**Possible values**:

- `true`: evcc interpolates the SoC values between vehicle data queries (recommended).
- `false`: evcc only uses the SoC values returned by the vehicle.

**Default value:** `true`

**For example**:

```yaml
estimate: false # No interpolation
```

---

### `enable`

Defines the behaviour of starting charging in PV mode. Additionally, it defines the behaviour during automatic phase switching from 1p to 3p.

**For example**:

```yaml
enable:
  threshold: 0
  delay: 1m
```

#### `threshold`

Defines the power threshold at the grid connection point in watts (W).

**Possible values**: A positive value for grid consumption, a negative value for grid export. When set to `0`, export must reach the minimum charging power.

**Default value:** `0`

**For example**:

```yaml
threshold: 0
```

:::info
If a residual power offset for the desired operating point of the surplus regulation is defined for the evcc site using the `residualPower` parameter, this value must be considered when setting the `threshold` value.

For example, if `residualPower` is set to 200 (the evcc control sets the desired operating point to 200W feed-in), then setting an `enable` `threshold` value of 100 doesn't mean that charging will start at 100W grid consumption. Instead, the remaining feed-in power will be reduced by 100W, starting the charging at 100W feed-in.

To start charging at 100W grid consumption in this case, the `threshold` value should be set to 300.
:::

#### `delay`

Defines how long the `threshold` must be met.

**Default value:** `1m`

**For example**:

```yaml
delay: 1m
```

---

### `disable`

Defines the behaviour of stopping charging in PV mode. Additionally, it defines the behaviour during automatic phase switching from 3p to 1p.

**For example**:

```yaml
disable:
  threshold: 200 # maximum import power (W)
  delay: 10m
```

#### `threshold`

Defines the power threshold at the grid connection point in watts (W).

**Possible values**: A positive value for grid consumption, a negative value for grid export.

**Default value:** `0`

**For example**:

```yaml
threshold: 200 # Maximum grid consumption of 200W is allowed
```

:::info
If a residual power offset for the desired operating point of the surplus regulation is defined for the evcc site using the `residualPower` parameter, this value must be considered when setting the `threshold` value. Refer to the example in the [`enable`](#enable) `threshold` info.
:::

#### `delay`

Defines how long the `threshold` must be met.

**Default value:** `3m`

**For example**:

```yaml
delay: 10m
```

---

### `guardduration`

Defines the minimum time interval during which the power must be locked or unlocked.
That includes both turning on and off the charging process and switching phases.
It is intended to prevent the contactors in the charging station and in the car from switching too frequently within a certain period of time.

**Default value:** `5m`

**For example**:

At least 15 minutes interval between turning on and off the charging process as well as phase switching.
Every one of the above mentioned actions can only be triggered once within the `guardduration` period by evcc.

```yaml
guardduration: 15m
```

---

### `phases`

**charger without automatic phase switching**:

Defines the number of phases with which the charger is connected.

This parameter does not change the physical connection of the charger but is used to determine the minimum starting power for charging in PV mode (in combination with `minCurrent`).

Recently, the incoming voltages are evaluated if the charger's meter provides them. Based on the voltages, the `phases` value is automatically changed via API. In cases where the charger is set to 1p or 3p using a switch, manual changes to the `phases` value are no longer necessary.

In cases where 1p/3p charging is realised using the corresponding charging cable rather than a switch, this "automatic" behaviour causes problems. In this case, the `phases` value must be adjusted in the `vehicle` accordingly. Since this value cannot be changed via API, the following workaround can be used:

Configure the vehicle twice: once with `phases: 1` and once with `phases: 3`. Depending on the desired charging mode, select the appropriate vehicle in the UI.

If a known vehicle is connected, the lower value between `vehicle: phases` and `loadpoint: phases` is used for calculation. For unknown vehicles, only `loadpoint: phases` is considered.

While the vehicle is charging and the charger or charging meter provide phase currents, the actual number of phases is detected, and (as long as the vehicle remains connected) this is used for further calculations. This only works for three-phase charging points.

**Default value:** `3`

**Possible values:** `1|3`

**For example**:

```yaml
phases: 1
```

**charger with automatic phase switching**:

The value controls whether the automatic phase switching is enabled or disabled.

`phases: 0` = Automatic switching enabled

`phases: 1 or 3` = Automatic switching disabled, and the set value is fixed

**Default value:** `3`

**Possible values:** `0|1|3`

**For example**:

```yaml
phases: 0
```

:::info
If the charging point is not assigned a charger but one of the supported controllable sockets (AVM FritzDECT, Shelly, Tasmota, TP-Link, etc.), `phases` must be set to **1** to ensure proper charging control.
:::

---

### `minCurrent`

Defines the minimum used current in amperes (A) per connected phase from the supply to the charger.

As mentioned with `phases`, this value sets the minimum charging power.

For chargers with automatic phase switching, it will continue to charge in 3p until this value (from above) is reached. Only then will it switch to 1p.

:::info
In general, an electric vehicle requires a minimum current of 6A per phase to charge. However, some vehicles might require a higher minimum current!

For chargers and vehicles communicating via the ISO15118 standard, it might be possible to charge with a lower current per phase if the total power is still at least around 1.4kW.
:::

**Default value:** `6`

**For example**:

```yaml
mincurrent: 6
```

---

### `maxCurrent`

Defines the maximum allowable current in amps (A) per connected phase from the supply to the charger.

For chargers with automatic phase switching, it will continue to charge in single phase until this value (from below) is reached. Only then will it switch to three-phase.

**Default value:** `16`

**For example**:

```yaml
maxcurrent: 16
```

---

### `priority`

During charging, this parameter prioritises loadpoints with each other.

The prioritised loadpoint is given the charging power of other non-prioritised loadpoints or those with lower priority. When a prioritised loadpoint accesses this power, it might lead to short-term grid consumption until the regulation stabilises.

Higher values indicate higher priority. Loadpoints without an entry have `priority: 0`.

When multiple loadpoints are present, this parameter doesn't influence the order in which the charging sessions are started. However, if a lower-priority loadpoint is charging, a higher-priority one might be switched on if it is given access to the unused charging power.

This prioritisation works in `pv` and `minpv` modes. In `minpv` mode, charging is not interrupted, only reduced to the minimum.

:::info

If a vehicle has a priority defined, it overrides the priority of the loadpoint it is connected to.

:::

**Default value:** `0`

**For example**:

```yaml
priority: 2
```

---
