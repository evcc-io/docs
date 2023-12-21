---
sidebar_position: 5
---

# `meters`

_Meters_ (current measurement devices) is a list of devices in the house that can measure power and energy consumption, PV generation, or house battery usage. A `meter` defines a point of energy measurement and can be a physical device (e.g., a meter at the grid connection point), a PV inverter (AC or DC in the case of hybrid inverters), or a battery inverter.

Chargers may have an integrated meter or it can be externally connected. If a charger has an internal current measurement device, no entry for it needs to be created in `meters`. If the charger doesn't have such a meter, evcc will use the meter configured here and assigned to the charger under [`meters`](loadpoints#meter) in the charging point configuration, or assume that the charging power set is actually being used.

evcc uses positive (+) values for incoming currents (grid consumption, PV generation, house battery discharge) and negative (-) values for outgoing currents (grid feed-in, PV inverter standby consumption, or house battery charging). Any other current consumption, including from the charger, is always a positive (+) value.

The `meters` configuration is a list of different available devices.

**For example**:

```yaml
meters:
  - name: grid
    type: ...
  - name: pv
    type: ...
  - name: battery
    type: ...
  - name: charge
    type: ...
  - name: aux
    type: ...
```

Configurations for known devices can be found under [Devices - House Installation](/docs/devices/meters).

Below, the various parameters are explained.

---

## Required Parameters

### `name`

A short designation of the meter. The value is used when referencing the device in the configuration of the [site](site) or the [charger](loadpoints#meter).

**For example**:

```yaml
name: charger1
```

---

### `type`

This is the evcc-specific meter type that allows communication with the device. The appropriate type for known devices can be found under [Devices - House Installation](/docs/devices/meters).

**For example**:

```yaml
type: modbus
```

The various possible types and their additional parameters are documented below:

---

## Supported Types

### `movingaverage`

This meter type can smooth fluctuating meter values. It can be used in all meter applications (`usage`). The `decay` parameter indicates the percentage of the new value to be included in the calculation.

**For example**

```yaml
meters:
- name: grid
  type: movingaverage
  decay: 0.1
  meter:
    type: template
    template: solarlog
    usage: grid
    host: 192.0.2.2
    ...
```

In this example, 10% of the new value is included. After 10 cycles, the oldest value is removed from the calculation. The duration of this process depends on the `interval`.

---

### `modbus`

Devices connected via the ModBus interface and supported by the [MBMD (ModBus Measurement Daemon)](https://github.com/volkszaehler/mbmd#supported-devices) project.

**For example**:

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Required Parameters

In addition to the parameters defined here, additional parameters are necessary. These are listed in the [Modbus](/docs/reference/modbus) documentation.

##### `power`

Defines the MBMD measurement value that returns the power, typically `Power`.

**For example**:

```yaml
power: Power
```

---

##### `energy`

Defines the method of measurement that MBMD returns for energy, typically `Sum`.

**For example**:

```yaml
energy: Sum
```

---

#### Optional Parameters

##### `soc`

Defines the method of measurement that MBMD returns for battery state of charge (SoC), typically `ChargeState`.

**For example**:

```yaml
soc: ChargeState
```

---

### `lgess`

LG ESS Home 8/10 devices.

**For example**:

```yaml
type: lgess
usage: grid
uri: https://192.0.2.2/
password: "DE200..."
```

:::note
The `uri` and `password` parameters are only required for a `meter` device if multiple devices are configured.
:::

#### Required Parameters

##### `usage`

Defines which measurements are needed here.

**Possible Values**:

- **`grid`**: For measurements at the grid connection point
- **`pv`**: For measurements of PV generation
- **`battery`**: For measurements of the house battery

---

##### `uri`

Defines the URL within the home network of the LG ESS device.

**For example**:

```yaml
uri: https://192.0.2.2/
```

---

##### `password`

The registration number of the LG ESS HOME inverter must be entered here.

**For example**:

```yaml
password: "DE200..."
```

---

### `openwb`

Using measurements from an OpenWB charger

**For example**:

```yaml
type: openwb
usage: grid
broker: 192.0.2.2
```

:::note
The `uri` and `password` parameters are only required for a `meter` device if multiple devices are configured.
:::

#### Required Parameters

##### `usage`

Defines which measurements are needed here.

**Possible Values**:

- **`grid`**: For measurements at the grid connection point
- **`pv`**: For measurements of PV generation
- **`battery`**: For measurements of the house battery

---

##### `broker`

Defines the hostname or IP address and port address within the home network of the OpenWB.

**For example**:

```yaml
broker: 192.0.2.2:1883
```

---

### `sma`

For using the SMA Home Manager 2.0, SMA Energy Meter, or an SMA inverter. Devices must support the Speedwire protocol.

**For example**:

```yaml
type: sma
uri: 192.0.2.2
serial: 12345678
interface: eth0
```

---

#### Required Parameters

:::note
It is sufficient to define either `uri` or `serial`.
:::

##### `uri`

Defines the hostname or IP address within the home network of the device.

**For example**:

```yaml
uri: 192.0.2.2
```

##### `serial`

Defines the serial number of the device from which measurements should be received.

**For example**:

```yaml
serial: 12345678
```

#### Optional Parameters

##### `interface`

Multicast messages can only be received on a specific network interface. Usually, this is the first interface on the system. If it is not the interface connected to the meter, the interface needs to be explicitly specified.

**For example**:

```yaml
interface: eth0
```

---

### `tesla`

_`tesla`_: For using measurements from a Tesla Powerwall.

**For example**:

```yaml
type: tesla
usage: grid
uri: https://192.0.2.2/
password: "***"
```

---

#### Required Parameters

##### `usage`

Defines which measurements are needed here.

**Possible Values**:

- **`grid`**: For measurements at the grid connection point
- **`pv`**: For measurements of PV generation
- **`battery`**: For measurements of the house battery

---

##### `uri`

Defines the hostname or IP address within the home network of the device.

**For example**:

```yaml
uri: 192.0.2.2
```

---

##### `password`

The password for the _customer_ user must be entered here.

**For example**:

```yaml
password: "ThePassword"
```

---

### `custom`

Standard implementation, in which individual values are defined via [plugins](/docs/reference/plugins).

**For example**:

```yaml
  type: custom
  power: # Power (W)
    source: # Plugin Type
    ...
  energy: # Energy (kWh)
    source: # Plugin Type
    ...
  soc: # Battery SOC (%)
    source: # Plugin Type
    ...
  capacity: # Optional Battery Capacity (kWh)
  currents: # Current (A) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```

---

#### Required Parameters

##### `power`

Plugin definition to return power in watts (W).

**For example**:

```yaml
  power: ... # Power (W)
    source: # Plugin Type
    ...
```

---

#### Optional Parameters

##### `energy`

Plugin definition to return consumed energy in kilowatt-hours (kWh).

**For example**:

```yaml
  energy: ... # Energy (kWh)
    source: # Plugin Type
    ...
```

---

#### `soc`

Plugin definition to return battery state of charge (SoC) in percentage (%).

**For example**:

```yaml
  soc: ... # Battery SOC (%)
    source: # Plugin Type
    ...
```

---

#### `capacity`

Indication of battery capacity. Only useful when multiple batteries are present. Used to determine the overall SoC.

---

#### `currents`

A list of plugin definitions to return current in amperes (A) per phase.

**For example**:

```yaml
  currents: # Current (A) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```
