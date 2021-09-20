---
sidebar_position: 3
---

import Config from "./Config"

# PV Inverter

This is a list of the currently known supported PV inverter devices. Below are the setup instructions for hardware and the EVCC configuration settings.

- Sunspec-compatible grid inverters (SMA, SolarEdge, KOSTAL, Fronius, Steca etc)

## Device specific setup

### E3/DC using Modbus/TCP E3/DC Simple-Mode

Current Modbus/TCP documentation can be found inside german E3/DC portal. Enable Modbus/TCP and select E3DC instead of SunSpec as desired protocol. All registers must be decremented by 1 to work.

Example configuration when running as a PV meter:

<Config file="meters/custom-modbus-e3dc-pv" />

### Kostal Plenticore

Example configuration:

<Config file="meters/custom-modbus-kostal-inverter-grid" />

With an installed battery, the total DC-Power cannot be seen by using power, because it reflects the inverters current power subtracted by the power of the charging battery.
The total DC power has to be calculated by using the added string power (see following example for 2 strings)
```yaml
meters:
- name: pv-dc-kostal
  type: default
  power:
    type: calc
    add: # The add plugin sums up both string values
    - type: modbus
      model: sunspec
      value: 160:1:DCW # string 1
      uri: 192.168.178.52:1502
      id: 71 # Configured Modbus Device ID
    - type: modbus
      value: 160:2:DCW # string 2
      uri: 192.168.178.52:1502
      id: 71 # Configured Modbus Device ID
```

### Two SMA PV inverter using Modbus/TCP Sunspec connection

Current Modbus/TCP documentation can be found on [SMA Modbus Information Pages](https://www.sma.de/produkte/monitoring-control/modbus-protokoll-schnittstelle.html). Enable Modbus/TCP on each inverter. If this option is missing you may need to update the firmware first.
SMA inverters use configured Modbus ID + 123 for Sunspec. As the ID defaults to 3 the default Sunspec-ID is 126.

Example configuration snippet using a SMA SHM 2.0 as gridmeter and two SMA PV inverters:

```yaml
# meters
meters:
- name: sma
  type: sma # SMA Home Manager 2.0 or SMA Energy Meter 30
  uri: 192.168.178.100 # IP address of the device
- name: pv-gesamt
  type: default
  power:
    type: calc
    add:
    - type: modbus
      value: Power
      model: sunspec
      uri: 192.168.178.101:502 # IP address, configured port (default is 502)
      id: 126 # Configured Modbus Device ID ("Gerät")
    - type: modbus
      value: Power
      model: sunspec
      uri: 192.168.178.102:502 # IP address, configured port (default is 502)
      id: 126 # Configured Modbus Device ID ("Gerät")
```