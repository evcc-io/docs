---
sidebar_position: 4
---

# Battery Inverter

Any type of battery inverter is supported which conforms to the SunSpec ModBus specification.

## Device specific setup

### E3/DC using Modbus/TCP E3/DC Simple-Mode

Current Modbus/TCP documentation can be found inside german E3/DC portal. Enable Modbus/TCP and select E3DC instead of SunSpec as desired protocol. All registers must be decremented by 1 to work.

Example configuration when running as a charge meter, if you are using the original E3/DC wallbox connected to an E3/DC S10 (not tested):

```yaml
meters:
- name: e3dc-battery
  type: default
  power:
    type: modbus
    uri: 192.0.2.1:502 # IP address of E3/DC device, configured port (default is 502)
    id: 1 # Configured Modbus Device ID ("Gerät")
    register: # manual register configuration
      address: 40069 # (40070 - 1) "Batterie-Leistung in Watt (negative Werte = Entladung)"
      length: 2
      type: holding
      decode: int32s
    scale: -1 # reverse direction, because the battery meter is expected to deliver negative values when charging and positive values when discharging.
```

### SunSpec-kompatibel, z.B. Sunny Island

```yaml
meters:
- name: battery
  type: modbus
  model: sunny-island # generic name for sunspec-compatible inverter
  uri: 192.168.0.23:502
  id: 126

loadpoints:
- name: home
  meters:
    grid: ...
    battery: battery
```

Tested with:
- SMA Sunny Island

### Kostal Plenticore with connected battery (eg. BYD)
```yaml
- name: battery-kostal
  type: modbus
  power: 802:W
  uri: 192.168.178.52:1502
  id: 71 # Configured Modbus Device ID ("Gerät")
```
see also [calculation of DC-Power setup with Plenticore and attached battery](https://github.com/andig/evcc/wiki/4.-PV-inverter#kostal-plenticore)

