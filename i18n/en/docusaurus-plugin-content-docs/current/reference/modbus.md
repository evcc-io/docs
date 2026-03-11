---
sidebar_position: 4
---

# Modbus

Some devices, such as meters ([`meters`](/docs/reference/configuration/meters#modbus)) or chargers ([`chargers`](/docs/reference/configuration/chargers)), are connected and addressed using the Modbus protocol.

The `meter` configuration includes the type of physical connection (interface), optional technical interface parameters, the Modbus protocol used, the unique Modbus ID of the device on the bus, and the number and type of the register to be read or written.

It is important to note that there are three different Modbus protocols: Modbus RTU, Modbus ASCII, and Modbus TCP. These can technically be transmitted over different types of interfaces. The classic version is Modbus RTU over a serial RS485 bus interface, commonly used with most meters or some chargers. Devices with a native network interface (Ethernet/WiFi), on the other hand, are typically addressed using the Modbus TCP protocol.

If a serial Modbus device needs to be connected through an interface converter via a network (Ethernet/WiFi/PowerLAN), Modbus RTU protocol over a TCP/IP connection is established. The Modbus RTU protocol is directly transmitted over the network (i.e., "tunnelled"). Even though the transport method (TCP/IP) is the same, the protocol is NOT the same as Modbus TCP. It's essential to distinguish between the protocol and the transport method. "Modbus (RTU) over TCP" is different from Modbus TCP!

:::caution
Caution: There are more complex interface converters that can optionally translate the Modbus protocol itself between Modbus RTU and Modbus TCP!
If this feature is active, evcc must communicate with the converter using Modbus TCP, while the converter communicates with the serial device via Modbus RTU and bidirectionally translates the two protocols.
In this case, careful attention must be paid to the device specification and configuration; otherwise, communication might not work!
:::

In the case of a configuration with an interface converter, the serial bus configuration is determined only on the converter. The evcc configuration then concerns only the section up to the converter.

## Physical Connection

### Serial Connection (RS485)

If the device is directly connected via an RS485 adapter (Modbus RTU), `device` and the serial communication parameters `baudrate` and `comset` must be specified according to the device configuration. Please refer to the respective user manual, data sheets, or system settings.

:::info
Multiple devices with identical communication parameters can be operated on a serial RS485 bus if each device is assigned a unique Modbus ID. If not all devices on a bus can be configured with uniform communication settings (but with different IDs), splitting into multiple independent bus systems is necessary.
:::

:::caution
Mixing devices with different serial communication parameters on a bus is not possible and leads to unpredictable communication errors.
:::

**For example**:

```yaml
source: modbus
id: 1
device: /dev/ttyUSB0
baudrate: 38400
comset: "8E1"
```

### Direct Network Connection

If the device is directly connected via a native network connection (Modbus TCP), a `uri` consisting of HOSTNAME:PORT or IP:PORT must be provided:

**For example**:

```yaml
source: modbus
id: 1
uri: 192.168.0.11:502
```

### Serial Device via Network Connection (with Interface Converter)

If a serial device is connected via an intermediate transparent RS485-IP interface converter (without protocol translation), the protocol must also be switched to Modbus RTU over the TCP/IP connection using `rtu: true`.

**For example**:

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU over TCP
```

## Predefined Devices

The integrated predefined device models `model` are identical to [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

     ABB       ABB A/B-Series meters
     DDM       DDM18SD
     DZG       DZG Metering GmbH DVH4013 meters
     IEM3000   Schneider Electric iEM3000 series
     INEPRO    Inepro Metering Pro 380
     JANITZA   Janitza meters
     MPM       Bernecker Engineering MPM3PM meters
     ORNO1P    ORNO WE-514 & WE-515
     ORNO1P504 ORNO WE-504
     ORNO3P    ORNO WE-516 & WE-517
     SBC       Saia Burgess Controls ALE3 meters
     SDM       Eastron SDM630/120/72DMv2
     SDM220    Eastron SDM220
     SDM230    Eastron SDM230
     SDM72     Eastron SDM72
     SEMTR     SolarEdge SE-MTR-3Y

Any `model` that deviates from these is

treated as a _SunSpec_ device type.

Use `value` to define the value to be read from the device. All supported values are predefined in [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28).

In the case of a _SunSpec_-compatible inverter or meter, the values to be read are specified in the format `model:[block:]point` according to the _SunSpec_ definition. For example, querying the DC power on the second string of a three-phase PV inverter (corresponding to SunSpec Model 103) is done as follows: `value: 103:2:W`.

The device `model` and the slave ID `id` are always required:

**For example**:

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

## Value Negation {#negation}

For MBMD meters, measurement values can be inverted by prefixing the alias name with a `-` (minus sign).
This is useful when meters are used in different configurations or mounting orientations and the sign of measurement values needs to be adjusted.

### Supported Measurements

Negation works for the following MBMD measurements:

- `power` - Total power
- `currents` - Currents per phase (array)
- `powers` - Powers per phase (array)

### Syntax

```yaml
meters:
  - name: my-meter
    type: modbus
    model: sdm
    power: -Power # inverts the power value
```

### Examples

#### Inverted Total Power

```yaml
meters:
  - name: pv-meter
    type: modbus
    model: sdm
    power: -Power # Power will be inverted (e.g. +1000 W becomes -1000 W)
```

#### Inverted Phase Powers

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    powers:
      - -PowerL1 # Phase 1 inverted
      - -PowerL2 # Phase 2 inverted
      - -PowerL3 # Phase 3 inverted
```

#### Inverted Currents (Individual Phases)

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    currents:
      - -CurrentL1 # Current Phase 1 inverted
      - CurrentL2 # Current Phase 2 normal
      - -CurrentL3 # Current Phase 3 inverted
```

### Use Cases

**Incorrectly Mounted Meters**:
If a current sensor/meter is physically installed in the wrong direction, you can correct the values in software.

**Grid Feed-in vs. Consumption**:
For solar meters where the sign convention needs to be reversed.

**Different CT Orientations**:
For multi-phase installations with differently oriented current transformers.

## Manual Configuration

If the Modbus device is not directly supported or if values deviating from the predefined models are to be read or written, the Modbus registers can also be configured manually.
For this purpose, in addition to the general 'modbus' settings (see above), a `register` must be defined instead of a `value`, as with predefined devices. It is not allowed to specify both `value` and `register`.

The definition of a register requires the following parameters:

- `address`: the register address
- `type`: The register type, allowed are `coil`, `input`, `holding`
- `decode`: The type of encoding of the data. Allowed are: `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. For type `coil` the encoding is ignored, but must still be specified.
- `bitmask`: An optional specification. The specified value is ANDed with the read value to extract individual bits.

Other allowed parameters of a manual configuration are:

- `scale`: Floating point number that can be used to convert read values (e.g. W to kW or vice versa). This value is multiplied with the read and decoded raw value.
- `timeout`: modbus timeout. Without unit the value is in ns, otherwise specify unit, e.g. 10s for 10 seconds.

**For example**:

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # coil, holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
  bitmask: 2 # Optional: a bitmask that is applied to the read value. Here the mask is 0000000000000010b, ignored if value is 0
scale: -1.0 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 2s # timeout, without unit in ns
```

For the `int32s/uint32s` decodings, the byte order is swapped, which is useful for E3/DC devices.

### Writing Registers

Both holding registers and coils can be written. For this, either `type: writeholding` for holding registers or `type: writecoil` for coils must be specified.
`type: writeholding` always writes a 16-bit register (int or bool16). Therefore, for `decode`, `uint16` must always be specified.
`type: writecoil` writes a coil. Specifications for `decode` are ignored.

**For example**:

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding or writecoil
```

### Complete Example

A complete example for a custom charger with modbus interface (here a Phoenix EM-CP-PP-ETH with the IP address 192.168.1.10) could look like this:

**For example**:

```yaml
chargers:
  - type: custom
    name: CustomCharger
    status:
      # Read the status of the charger
      # Either A,B,C or F
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      timeout: 3s
      register:
        address: 100
        type: input # Read an input register
        decode: int16
    enabled:
      # Is the charger enabled (1) or not (0)
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: coil # Read a coil
        decode: bool16 # Doesn't matter but required
    enable:
      # Enable the charger
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: writecoil # Write a coil
        decode: uint8 # Doesn't matter but required
    maxcurrent:
      # Set the maximum current
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 300
        type: writeholding # Write a holding register
        decode: uint16
```
