---
sidebar_position: 3
---

# Plugins

Plugins can be used to integrate various devices and external data sources into evcc. These can be used through the `custom` value of the `type` parameter in [`meter`](/docs/reference/configuration/meters#custom) (power meters), [`charger`](/docs/reference/configuration/chargers#type) (charging stations), or [`vehicle`](/docs/devices/vehicles#custom) (vehicles).

Plugins allow both _write access_ and _read access_. When the plugin is used for _writing_, the data is provided in the `${var[:format]}` format. If `format` is not specified, the data is provided in the default `%v` [Go Format](https://golang.org/pkg/fmt/). The variables are replaced with their corresponding values before the plugin is executed. Additionally the full functionality of the [Go template library](https://pkg.go.dev/text/template) can be used to implement more complex data transformations.

## Modbus (read/write)

The `modbus` plugin can read data from any Modbus-capable device or SunSpec-compatible inverter. Many power meters are already pre-configured (see [MBMD Supported Devices](https://github.com/volkszaehler/mbmd#supported-devices)). It is also possible to write Modbus registers to integrate additional charging stations.

For more details, see the [Modbus Documentation](modbus).

## MQTT (read/write)

The `mqtt` plugin allows reading values via MQTT topics. This is particularly useful for power meters, for example, if they already provide their data via MQTT.
Refer to [MBMD](https://github.com/volkszaehler/mbmd) for an example of how to get Modbus measurement data into MQTT. The plugin also offers the ability to read or parse JSON data structures using jq-like queries (See [HTTP plugin](#http-readwrite)).

**Example of reading from a device**:

```yaml
meters:
- name: grid-meter
  type: custom
  power:
    source: mqtt
    topic: mbmd/sdm1-1/Power # MQTT topic to listen vor values
    timeout: 30s # don't accept values older than 30s
    scale: 0.001 # floating point factor applied to result to convert to W
                 # (here, a received kW value is converter to W)
```

For write access, the data is provided with the `payload` attribute. If this parameter is missing from the configuration, the value is written in the default format.

**Example of writing to a device**:

```yaml
chargers:
- name: go-e-gemini-11kw
  type: custom
    source: mqtt
    topic: mbmd/charger/maxcurrent
    # Format parameter "var" as integer value
    payload: ${var:%d}
```

The following parameters can be used for the MQTT plugin:

- **`source:`** Must be set to `mqtt`.
- **`topic:`** Specifies the MQTT topic where the value is received.
- **`timeout:`** (read) Defines how old a value received via MQTT can be to still be considered valid. For example, a timeout of 30 seconds means that only values received within the last 30 seconds are used for calculations and display.
- **`scale:`** (read) A scaling factor to convert the received value to watts. For instance, if the value is received in kW, `scale: 0.001` should be set to convert it to watts.
- **`payload:`** (write) Describes the format in which a value is written (e.g., to control a `charger` via MQTT).

When an MQTT value is read, it can also be in a more complex format, such as JSON. 
If the message is received as XML, it is converted to JSON before further processing. 
The actual scalar value can be extracted in various ways, configured with the following parameters:

- **`regex:`** A regular expression to extract the value from the received MQTT message. If the regular expression does not contain groups (`(....)`), the longest text matching the entire regex is selected. Otherwise, the first matching group is used. For example, a regex ` (\d+) ` applied to a message `Energy= 200 W` extracts the number `200`. With `default:`, a value can be defined to be used if the regex does not match.
- **`jq:`** Can be used to define a jq expression to extract the value from a received JSON message. For example, the jq expression `.power` applied to a JSON structure `{ "power": 2300, "energy": 300, ...}` extracts the numeric value `2300`. The jq syntax offers many possibilities, all of which are described in the [jq documentation](https://jqlang.github.io/jq/manual/).
- **`unpack:`** Allows converting a value from another numeric representation. Currently, only `unpack: hex` is supported, which converts hexadecimal values from a string representation (e.g., "F1EA"). Unpack is applied after any extraction using `regex` or `jq`.
- **`decode:`** Can evaluate various binary formats. For instance, `decode: uint32` converts unsigned 32-bit integers contained in the MQTT payload for further processing. The following binary formats are currently supported: _float32_, _float32s_, _float64_, _uint16_, _uint32_, _uint64_, _int16_, _int32_, _int32s_, _ieee754_, _ieee754s_.


## HTTP (read/write)

The `http` plugin performs HTTP calls to read or update data. It also includes the ability to read or transform JSON data structures using jq queries (e.g., for REST APIs). The full set of functionalities can be found in the [official jq documentation](https://jqlang.github.io/jq/manual/).

:::important
XML documents are automatically converted to JSON format internally, which can then be filtered like a native JSON response using jq. Attributes are prefixed with `attr`.
:::

:::tip
For testing jq queries, tools like https://jqplay.org/ for JSON queries and https://regex101.com/ for regular expression tests can be helpful.
:::

**Example of reading from a device**:

```yaml
meters:
- name: grid-meter
  type: custom
    source: http
    uri: https://volkszaehler/api/data/<uuid>.json?from=now
    method: GET # default HTTP method
    headers:
    - content-type: application/json
    auth: # basic authentication
      type: basic
      user: foo
      password: bar
    insecure: false # set to true to trust self-signed certificates
    jq: .data.tuples[0][1] # parse response json
    scale: 0.001 # floating point factor applied to result, 
                 # e.g. for kW to W conversion
    timeout: 10s # request timeout in golang duration format, 
                 # see https://golang.org/pkg/time/#ParseDuration
```

```yaml
source: http
uri: http://charger/status
jq: .total_power > 10 # Converts a json integer to a boolean value
```

**Example of writing to a device**:

```yaml
body: %v # only applicable for PUT or POST requests
```

```yaml
enable:
  source: http
  uri: "http://charger/relay/0?turn={{if .enable}}on{{else}}off{{end}}"
```

## Websocket (read only)

The `websocket` plugin provides a WebSocket listener. It also includes the ability to read or parse JSON data structures using jq-like queries. This can be used, for example, to receive data from Volkszähler's push server.

**Example of reading from a device**:

```yaml
source: http
uri: ws://<volkszaehler host:port>/socket
jq: .data | select(.uuid=="<uuid>") .tuples[0][1] # parse message json
scale: 0.001 # floating point factor applied to result, e.g. for converting Wh to kWh
timeout: 30s # error if no update received in 30 seconds
```

## SMA/Speedwire (read only)

The `sma` plugin provides an interface to SMA devices that support the Speedwire protocol.

**Example of reading from a device**:

```yaml
source: sma
uri: 192.168.4.51 # alternative to serial
serial: 123456 # alternative to uri
value: ActivePowerPlus # ID of value to read
password: "0000" # optional (default: 0000)
interface: eth0 # optional
scale: 1 # optional scale factor for value
```

Supported values for `value` can be found in the diagnostic output using the `evcc meter` command (with configured SMA `meter` devices).

All possible values can be found as constants [here](https://gitlab.com/bboehmke/sunny/-/blob/master/values.go#L24) (use the constant name for `value`).

## Javascript (read/write)

evcc integrates a Javascript interpreter with the [Underscore.js](https://underscorejs.org) library, which is directly accessible through `_.`, e.g., `_.random(0,5)`. The `js` plugin can execute JavaScript code using the `script` parameter. Very helpful for quickly creating prototypes:

**Example of reading from a device**:

```yaml
source: js
script: |
  var res = 500;
  2 * res; // returns 1000
```

When the `js` plugin is used for writing, the value to be written is passed to the script as a variable:

**Example of writing to a device**:

```yaml
charger:
  - type: custom
    maxcurrent:
      source: js
      script: |
        console.log(maxcurrent);
```

## Shell Script (read/write)

The `script` plugin executes external scripts to read or update data. The plugin is useful for integrating any kind of external functionality.

**Example of reading from a device**:

```yaml
source: script
cmd: /bin/bash -c "cat /dev/urandom"
timeout: 5s
```

**Example of writing to a device**:

```yaml
source: script
cmd: /home/user/my-script.sh ${enable:%b} # format boolean enable as 0/1
timeout: 5s
```

## Const (read only)

The `const` plugin returns a constant value. It is suitable, for example, to apply fixed correction values (offsets) to a variable value using the `calc` plugin, or to simulate measurement and status values for testing purposes.

**Example of reading from a device**:

```yaml
source: const
value: -16247
```

## Calc (read only)

The `calc` plugin allows for further processing of multiple individual values mathematically:

**Example of reading from a device**:

```yaml
source: calc
add:
- source: ...
  ...
- source: ...
  ...
```

```yaml
source: calc
mul:
- source

: calc
  sign:
    source: ... (power)
  ...
- source: ... (current)
  ...
```

The basic arithmetic operations of addition (add) and multiplication (mul) are supported as operands.

With `scale: -1`, a simple subtraction can be performed, and with `scale: 0.001`, division can be used, for example, to convert kWh to Wh.

With `sign:` (every positive number becomes +1, every negative number becomes -1, 0 remains 0), signs can be transferred to other values (in conjunction with `mul`). For example, to transfer the "direction" of power (injection or consumption) to the measured currents.

The `calc` plugin is helpful for:

- Summing power values from individual PV strings (addition)
- Calculating apparent power from voltage and current (multiplication)
- Combining separate power values for import and export into a signed single value (subtraction)
- Calculating percentage fill levels (division)
- Determining the correct direction of current flow (sign)
- Eliminating known offsets (addition with `const` plugin)

:::tip
Constant auxiliary values (e.g., for offsets) can be generated as operands using the `const` plugin.
:::

## Combined Status (read only)

The `combined` status plugin is used to convert mixed boolean status values of `Plugged` / `Charging` into an evcc-compatible charging status of A..F. It is used, for example, with the OpenWB MQTT integration.

**Example of reading from a device**:

```yaml
source: combined
plugged:
  source: mqtt
  topic: openWB/lp/1/boolPlugStat
charging:
  source: mqtt
  topic: openWB/lp/1/boolChargeStat
```
