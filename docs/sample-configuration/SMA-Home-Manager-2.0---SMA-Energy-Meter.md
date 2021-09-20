---
sidebar_position: 4
---

# SMA Home Manager2.0 & SMA-Energy-Meter

Example configuration when running as a grid meter:

```yaml
meters:
- name: sma-grid
  type: sma
  serial: 1234567890 # Serial number of the device, if this is defined uri is not needed!
  uri: 192.168.1.4 # IP address of the device, if this is defined serial is not needed!
```

Example configuration when running as a PV meter:

```yaml
meters:
- name: sma-pv
  type: sma
  serial: 1234567890 # Serial number of the device, if this is defined uri is not needed!
  uri: 192.168.1.4 # IP address of the device, if this is defined serial is not needed!
```

Example configuration when running SMA Home Manager 2.0 and a SMA Inverter:

```yaml
meters:
- name: sma-grid
  type: sma
  serial: 1234567890 # Serial number of the Home Manager 2.0

- name: sma-pv
  type: modbus
  model: sunspec
  uri: 192.168.0.xxx:502 # IP address of the SMA inverter
  id: 126 # id 126 = 123 + modbus tcp id from the inverter, you must activate modbus tcp in the config from the inverter
```