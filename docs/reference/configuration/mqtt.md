---
sidebar_position: 14
---

# `mqtt`

Stellt die Konnektivität mit einem MQTT-Broker her.
Bei bestehender Verbindung pusht evcc automatisch alle internen Werte via MQTT-Broker auf das angegebene Topic und empfängt dort auch Änderungen.
Siehe dazu auch die Dokumentation zur [`MQTT API`](/docs/reference/api/#mqtt-api).

**Beispiel**:

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

## Erforderliche Parameter

### `broker`

Verbindungsdaten (Hostname/IP und Port) des verwendeten MQTT-Brokers zu dem sich evcc als Client verbinden soll.

### `topic`

Gibt das Wurzeltopic an welches evcc verwendet.
Wenn hier nichts angegeben wird findet keine MQTT-Kommunikation statt!

---

## Optionale Parameter

### `user`

Der Benutzernamen zur Anmeldung am MQTT-Broker.

### `password`

Das Anmeldepasswort am MQTT-Broker.

### `clientid`

Erlaubt eine feste MQTT-Client ID vorzugegeben. Andernfalls wird diese dynamisch vergeben.
