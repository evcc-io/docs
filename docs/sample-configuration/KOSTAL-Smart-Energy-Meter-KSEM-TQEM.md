---
sidebar_position: 5
---

# KOSTAL Smart Energy Meter KSEM TQEM

The KSEM supports the SunSpec ModBus standard:

```yaml
meters:
- name: netz
  type: modbus
  model: ksem # unknown models will be interpreted as sunspec device
  uri: ...:502
  id: 1
  power: Power
  energy: Export
```

In case of direct connection to a Kostal Plenticore or (untested) Piko the Grid-Meter is published by the inverter modbus api and must be read using the register:
```yaml
 name: grid-kostal
  type: default
  power:
    type: modbus
    model: sunspec
    uri: 192.168.178.52:1502
    id: 71 # Configured Modbus Device ID
    register: # manual register configuration
      address: 252 # (see https://www.kostal-solar-electric.com/de-de/download/-/media/document-library-folder---kse/2018/08/30/08/53/ba_kostal_interface_modbus-tcp_sunspec.pdf)
      type: holding
      decode: float32s #swapped float encoding
```