---
sidebar_position: 7
---

# `hems`

evcc supports integration with Home Energy Management Systems (HEMS) for grid-friendly control according to § 14a EnWG.

There are two options for integration: **relay** (analogue via switching contact) or **EEBus** (digital via EEBus protocol).

For more information on configuration, see [§ 14a EnWG & SteuVE](../../features/14a-enwg-steuve).

---

## `type: relay`

Analogue connection via switching contact.

**Example**:

```yaml
hems:
  type: relay
  maxPower: 8400
  limit:
    source: mqtt
    topic: hems/limit/status
```

---

### `maxPower`

**Required**

Total power limit when a reduction signal is active, in watts.

---

### `limit`

**Required**

Plugin for determining the switch state.
Supports all [plugin sources](../../devices/plugins).
Expected values: `0`/`false` = not limited, `1`/`true` = limited.

---

## `type: eebus`

Digital connection via EEBus protocol.

**Example**:

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF"
```

---

### `ski`

**Required**

SKI (Subject Key Identifier) of the control box.

:::note
The power limit is automatically transmitted by the control box.
:::

