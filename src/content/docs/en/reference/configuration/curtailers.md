---
title: "curtailers"
sidebar:
  order: 6
---

_Curtailers_ (curtailment devices) is a list of devices that only limit the feed-in of the solar installation on request of the grid operator (§ 9 EEG).
Most inverters are curtailed through their [`meters`](/en/reference/configuration/meters) entry and don't need a separate device.
A curtailment device is only required when the inverter can't be curtailed via its meter configuration, for the SMA Sunny Home Manager 2.0, or for systems with several inverters where the limit has to be written to the leader inverter.
For background and the list of supported devices see [External Limit](/en/external-limit#curtailment-devices).

Curtailment devices are referenced from [`site.curtailers`](/en/reference/configuration/site#curtailers).
They only become active when the [`hems`](/en/reference/configuration/hems) integration signals a feed-in limit.
The limit is passed as a percentage of the installed generator power to all curtailable `pv` meters and curtailment devices alike.

**For example**:

```yaml
curtailers:
  - name: my_curtailer
    type: template
    template: solaredge
    modbus: tcpip
    host: 192.168.0.10
    port: 1502
    id: 1
    productionnominalmax: 15000 # installed generator power of the whole installation (Wp)

site:
  curtailers:
    - my_curtailer
```

---

## Required Parameters

### `name`

Unique name of the device.
Used as reference in [`site.curtailers`](/en/reference/configuration/site#curtailers).

---

### `type`

- `template`: One of the [supported devices](/en/external-limit#curtailment-devices). The device page shows the complete configuration block.
- `custom`: [User-defined device](/en/user-defined-devices#curtailer) with the `curtail` and `curtailed` plugins.
