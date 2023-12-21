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

## Manual Configuration

If the Modbus device is not directly supported, or if values different from the predefined models need to be read or written, Modbus registers can also be manually configured:

**For example**:

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
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
