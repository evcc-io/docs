---
sidebar_position: 3
---

# E3/DC

Current Modbus/TCP documentation can be found inside german E3/DC portal. Enable Modbus/TCP and select E3DC instead of SunSpec as desired protocol. All registers must be decremented by 1 to work.

Example configuration when running as a grid meter:

```yaml
meters:
- name: e3dc-grid
  type: default
  power:
    type: modbus
    uri: 192.0.2.1:502 # IP address of E3/DC device, configured port (default is 502)
    id: 1 # Configured Modbus Device ID ("Gerät")
    register: # manual register configuration
      address: 40073 # (40074 - 1) "Leistung am Netzübergabepunkt in Watt (negative Werte = Einspeisung)"
      type: holding
      decode: int32s
```

Example configuration when running as a charge meter, if you are using the original E3/DC wallbox connected to an E3/DC S10 (not tested):

```yaml
meters:
- name: e3dc-charge
  type: default
  power:
    type: modbus
    uri: 192.0.2.1:502 # IP address of E3/DC device, configured port (default is 502)
    id: 1 # Configured Modbus Device ID ("Gerät")
    register: # manual register configuration
      address: 40077 # (40078 - 1) "Leistung der Wallbox in Watt"
      type: holding
      decode: int32s
```
