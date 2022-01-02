---
sidebar_position: 14
---

# `mqtt`

Ermöglicht es Daten per MQTT mit einem Broker auszutauschen.

**Beispiel**:

```yaml
# mqtt message broker
mqtt:
  broker: localhost:1883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # user:
  # password:
```
