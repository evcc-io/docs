---
sidebar_position: 14
---

# `mqtt`

Establishes connectivity with an MQTT broker.
When the connection is active, evcc automatically pushes all internal values to the specified topic via the MQTT broker and also receives changes there.
For more information, refer to the [`MQTT API`](/docs/reference/api#mqtt-api) documentation.

**For example**:

```yaml
# mqtt message broker
mqtt:
  broker: localhost:1883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

---

## Required Parameters

### `broker`

Connection details (hostname/IP and port) of the MQTT broker to which evcc should connect as a client.

### `topic`

Specifies the root topic that evcc uses.
If not specified here, no MQTT communication can take place!

---

## Optional Parameters

### `user`

The username for authentication to the MQTT broker.

### `password`

The authentication password for the MQTT broker.

### `clientid`

Specifies a fixed MQTT client ID. By default, it will be assigned dynamically.
