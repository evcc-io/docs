---
sidebar_position: 1
---

# Wallbox

## Overview

There are different interfaces to control a specific charger hardware.
While EVCC support also generic ways to control a charger it also provides plugins for for many well kown devices.

You can find the most up to date list of charger plugins in the README https://github.com/evcc-io/evcc#charger


Below are the setup instructions for charger hardware and which needs special attention or undocumented steps to set up a proper connection to EVCC.


## Device specific setup

### Wallbe Eco

#### Hardware preparation

Wallbe chargers are supported out of the box. The Wallbe must be connected using Ethernet. If not configured, the default address `192.168.0.8:502` is used.

To allow controlling charge start/stop, the Wallbe physical configuration must be modified. This requires opening the Wallbe. Once opened, DIP 10 must be set to ON:

![dip10](https://raw.githubusercontent.com/andig/evcc/master/docs/dip10.jpeg)

More information on interacting with Wallbe chargers can be found at [GoingElectric](https://www.goingelectric.de/forum/viewtopic.php?p=1212583). Use with care.

**NOTE:** The Wallbe products come in two flavors. Older models (2017 known to be "old", 2019 known to be "new") use the Phoenix EV-CC-AC1-M3-CBC-RCM controller. For such models make sure to set `legacy: true`. You can find you which one you have using [MBMD](5):

```sh
mbmd read -a 192.168.0.8:502 -d 255 -t holding -e int 300 1
```

Compare the value to what you see as *Actual Charge Current Setting* in the Wallbe web UI. If the numbers match, it's a Phoenix controller, if the reading is factor 10x the UI value then it's a Wallbe controller.

**NOTE:** Opening the wall box **must** only be done by certified professionals. The box **must** be disconnected from mains before opening.

Example configuration:

```yaml
chargers:
- name: wallbe
  type: wallbe
  uri: 192.168.0.8:502
```

### Wallbe pre 2019

Example configuration:

```yaml
chargers:
- name: wallbe
  type: wallbe
  legacy: true
```

### OpenWB

Example configuration:

```yaml
chargers:
- name: openwb
  type: openwb
  status:
    # with openWB, charging status (A..F) this is split between "plugged" and "charging"
    # the openwb type combines both into status (charging=C, plugged=B, otherwise=A)
    type: openwb
    plugged:
      type: mqtt
      topic: openWB/lp/1/boolPlugStat
    charging:
      type: mqtt
      topic: openWB/lp/1/boolChargeStat
  enabled:
    type: mqtt
    topic: openWB/lp/1/ChargePointEnabled
    timeout: 30s
  enable:
    type: mqtt
    topic: openWB/set/lp1/ChargePointEnabled
    payload: ${enable:%d}
  maxcurrent:
    type: mqtt
    topic: openWB/set/lp1/DirectChargeAmps
```

### Phoenix EM-CP-PP-ETH controller

Hardware setup:
DIP switch 10 needs to be "on", DIP switch 7 needs to be "off" in order to enable control

Example configuration:

```yaml
chargers:
- name: phoenix
  type: phoenix-emcp
  uri: 192.168.0.4:23
  id: 255 # only if different from default 180
```

### Phoenix EV-CC-AC1-M controller

Example ModBus configuration if meter is directly connected:

```yaml
chargers:
- name: phoenix
  type: phoenix-evcc
  id: 1
  device: /dev/ttyUSB0
  baudrate: 9600
  comset: "8N1"
```

Example ModBus configuration if meter is connected using RS485<->Ethernet adapter:

```yaml
chargers:
- name: phoenix
  type: phoenix-evcc
  id: 1
  uri: 192.168.0.4:23
```

### SimpleEVSE Modbus

Example configuration:

```yaml
chargers:
- name: simpleevse
  type: simpleevse
  id: 1
```

### SimpleEVSE

Example configuration:

```yaml
chargers:
- name: evsewifi
  type: evsewifi
  uri: 192.168.0.4
```

### NRGKick Connect

Example configuration:

```yaml
chargers:
- name: nrgkick
  type: nrgkick
  uri: http://192.168.0.4
```

### go-eCharger

Example configuration:

```yaml
chargers:
- name: go
  type: go-e
  uri: http://192.168.0.4
```

### KEBA KeContact

#### Hardware Preparation

Requires enabled UDP function with DIP switch 1.3 = ON, see installation manual.

#### Example configuration:
**NOTE:** rfid tag and serial tag are optional.
RFID enables EVCC to start charging even if the Wallbox was not unlocked using the chip/card.
Serial enables EVCC to communicate with the Wallbox when run in Docker. UDP-Port 7090 must be added to the Docker port settings!

```yaml
chargers:
- name: keba
  type: keba
  uri: 192.168.0.4
  serial: 12345678
  rfid:
     tag: XXXXXXXX00000000
```

### Mobile Charger Connect

**NOTE:** This charger does **NOT** support enabling or disabling charging. So the only useful modes are _Sofort Laden_ and _Min + PV_!

Example configuration:

```yaml
chargers:
- name: mcc
  type: mcc
  uri: 192.168.0.4
  password: homeuserpassword
```

### WARP Charger

Communicating with a WARP Charger requires a MQTT broker. The MQTT connection then has to be configured in the charger's web UI. [(see here for German documentation)](https://www.warp-charger.com/api.html#mqtt)

Example configuration:

```yaml
chargers:
- name: warp
  type: warp
  broker: 127.0.0.1 # IP of your MQTT broker
  topic: warp/abc # The global topic prefix configured in the Charger's web UI
  usemeter: true # true to use the WARP Charger Pro's energy meter. false for a WARP Charger Smart
  timeout: 30s
  user: username # optional
  password: password #optional
```