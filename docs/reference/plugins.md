---
sidebar_position: 4
---

# Plugins

Plugins are used to integrate various devices and external data sources with evcc. Plugins can be used in combination with a `custom` type meter, charger or vehicle.

Plugins support both _read_ and _write_ access. When using plugins for _write_ access, the actual data is provided as variable in form of `${var[:format]}`. If `format` is omitted, data is formatted according to the default Go `%v` [format](https://golang.org/pkg/fmt/). The variable is replaced with the actual data before the plugin is executed.

### Modbus (read/write)

The `modbus` plugin is able to read data from any Modbus meter or SunSpec-compatible solar inverter. Many meters are already pre-configured (see [MBMD Supported Devices](https://github.com/volkszaehler/mbmd#supported-devices)). It also supports writing Modbus registers for integration of additional chargers.

The meter configuration consists of the actual physical connection and the value to be read.

#### Physical connection <!-- omit in toc -->

If the device is physically connected using an RS485 adapter, `device` and serial configuration `baudrate`, `comset` must be specified:

```yaml
source: modbus
device: /dev/ttyUSB0
baudrate: 9600
comset: "8N1"
```

If the device is a grid inverter or a Modbus meter connected via TCP, `uri` must be specified:

```yaml
source: modbus
uri: 192.168.0.11:502
id: 1 # modbus slave id
```

If the device is a Modbus RTU device connected using an RS485/Ethernet adapter, set `rtu: true`. The serial configuration must be done directly on the adapter. Example:

```yaml
source: modbus
uri: 192.168.0.10:502
id: 3 # modbus slave id
rtu: true
```

#### Logical connection <!-- omit in toc -->

The device's type `model` and the device's slave id `id` are always required:

```yaml
source: modbus
uri/device/id: ...
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

Supported meter models are the same as supported by [MBMD](https://github.com/volkszaehler/mbmd#supported-devices):

- RTU:
  - `ABB` ABB A/B-Series meters
  - `MPM` Bernecker Engineering MPM3PM meters
  - `DZG` DZG Metering GmbH DVH4013 meters
  - `INEPRO` Inepro Metering Pro 380
  - `JANITZA` Janitza B-Series meters
  - `SBC` Saia Burgess Controls ALD1 and ALE3 meters
  - `SDM` Eastron SDM630
  - `SDM220` Eastron SDM220
  - `SDM230` Eastron SDM230
  - `SDM72` Eastron SDM72
  - `ORNO1P` ORNO WE-514 & WE-515
  - `ORNO3P` ORNO WE-516 & WE-517
- TCP: Sunspec-compatible grid inverters (SMA, SolarEdge, Kaco, KOSTAL, Fronius, Steca etc)

Use `value` to define the value to read from the device. All values that are supported by [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28) are pre-configured.

In case of SunSpec-compatible inverters, values can also be configured in the form of `model:[block:]point` according to SunSpec definition. For example, a 3-phase inverter's DC power of the 2nd string would be configurable as `103:2:W`.

#### Manual configuration <!-- omit in toc -->

If the Modbus device is not supported by MBMD, the Modbus register can also be manually configured:

```yaml
source: modbus
uri/device/id: ...
register:
  address: 40070
  source: holding # holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

The `int32s/uint32s` decodings apply swapped word order and are useful e.g. with E3/DC devices.

To write a register use `type: writesingle` which writes a single 16bit register (either `int` or `bool`). The encoding is always `uint16` in this case.

### MQTT (read/write)

The `mqtt` plugin allows to read values from MQTT topics. This is particularly useful for meters, e.g. when meter data is already available on MQTT. See [MBMD][6] for an example how to get Modbus meter data into MQTT. Includes the ability to read and parse JSON using jq-like queries (see [HTTP plugin](#http-readwrite)).

Sample configuration:

```yaml
source: mqtt
topic: mbmd/sdm1-1/Power
timeout: 30s # don't accept values older than timeout
scale: 0.001 # floating point factor applied to result, e.g. for Wh to kWh conversion
```

Sample write configuration:

```yaml
source: mqtt
topic: mbmd/charger/maxcurrent
payload: ${var:%d}
```

For write access, the data is provided using the `payload` attribute. If `payload` is missing, the value will be written in default format.

### HTTP (read/write)

The `http` plugin executes HTTP requests to read or update data. Includes the ability to read and parse JSON using jq-like queries for REST apis.

Sample read configuration:

```yaml
source: http
uri: https://volkszaehler/api/data/<uuid>.json?from=now
method: GET # default HTTP method
headers:
- content-type: application/json
auth: # basic authorization
  type: basic
  user: foo
  password: bar
insecure: false # set to true to trust self-signed certificates
jq: .data.tuples[0][1] # parse response json
scale: 0.001 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 10s # timeout in golang duration format, see https://golang.org/pkg/time/#ParseDuration
```

Sample write configuration:

```yaml
body: %v # only applicable for PUT or POST requests
```

### Websocket (read only)

The `websocket` plugin implements a web socket listener. Includes the ability to read and parse JSON using jq-like queries. It can for example be used to receive messages from Volkszähler's push server.

Sample configuration (read only):

```yaml
source: http
uri: ws://<volkszaehler host:port>/socket
jq: .data | select(.uuid=="<uuid>") .tuples[0][1] # parse message json
scale: 0.001 # floating point factor applied to result, e.g. for Wh to kWh conversion
timeout: 30s # error if no update received in 30 seconds
```

### SMA/Speedwire (read only)

The `sma` plugin provides an interface to SMA devices via the Speedwire protocol.

Sample configuration (read only):

```yaml
source: sma
uri: 192.168.4.51 # alternative to serial
serial: 123456 # alternative to uri
value: ActivePowerPlus # ID of value to read
password: "0000" # optional (default: 0000)
interface: eth0 # optional
scale: 1 # optional scale factor for value
```

Supported values for `value` can be found in the diagnostic dump of the command
`evcc meter` (with a configured SMA meter).

All possible values can be found as const [here](https://gitlab.com/bboehmke/sunny/-/blob/master/values.go#L24)
(use the names of the const for `value`).


### Javascript (read/write)

evcc includes a bundled Javascript interpreter with Underscore.js library installed, which is directly accessible via `_.` e.g. `_.random(0,5)`. The `js` plugin is able to execute Javascript code from the `script` tag. Useful for quick prototyping:

```yaml
source: js
script: |
  var res = 500;
  2 * res; // returns 1000
```

When using the `js` plugin for writing, the value to write is handed to the script as pre-populated variable:

```yaml
charger:
- type: custom
  maxcurrent:
    source: js
    script: |
      console.log(maxcurrent);
```

### Shell Script (read/write)

The `script` plugin executes external scripts to read or update data. This plugin is useful to implement any type of external functionality.

Sample read configuration:

```yaml
source: script
cmd: /bin/bash -c "cat /dev/urandom"
timeout: 5s
```

Sample write configuration:

```yaml
source: script
cmd: /home/user/my-script.sh ${enable:%b} # format boolean enable as 0/1
timeout: 5s
```

### Calc (read only)

The `calc` plugin allows calculating the sum of other plugins:

```yaml
source: calc
add:
- source: ...
  ...
- source: ...
  ...
```

The `calc` plugin is useful e.g. to combine power values if import and export power are separate like with S0 meters. Use `scale: -1` on one of the elements to implement a subtraction or `scale: 1000` to implement Wh to kWh conversion.

### Combined status (read only)

The `combined` status plugin is used to convert a mixed boolean status of plugged/charging into an evcc-compatible charger status of A..F. It is typically used together with OpenWB MQTT integration.

Sample configuration (read only):

```yaml
source: combined
plugged:
  source: mqtt
  topic: openWB/lp/1/boolPlugStat
charging:
  source: mqtt
  topic: openWB/lp/1/boolChargeStat
```