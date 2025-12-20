---
sidebar_position: 14
---

# `mqtt`

Stellt die Konnektivität mit einem MQTT-Broker her.
Bei bestehender Verbindung pusht evcc automatisch alle internen Werte via MQTT-Broker auf das angegebene Topic und empfängt dort auch Änderungen.
Siehe dazu auch die Dokumentation zur [`MQTT API`](/docs/integrations/mqtt-api).

---

## MQTT ohne Verschlüsselung

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

## MQTT mit TLS-Verschlüsselung

**Beispiel**:

```yaml
# mqtt message broker
mqtt:
  broker: tls://localhost:8883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

Bei Verwendung von TLS-Verschlüsselung (`tls://`) wird standardmäßig das TLS-Zertifikat des Brokers überprüft.
Falls ein selbst-signiertes Zertifikat verwendet wird, gibt es zwei Möglichkeiten:

1. Das Zertifikat systemweit installieren (z. B. unter Linux in `/etc/ssl/certs`), damit evcc es automatisch verwendet
2. Die Zertifikatsüberprüfung mit `insecure: true` deaktivieren (siehe unten)

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

Erlaubt eine feste MQTT-Client ID vorzugegeben.
Andernfalls wird diese dynamisch vergeben.

### `insecure`

Deaktiviert die TLS-Zertifikatsüberprüfung bei Verwendung von `tls://`.

**Beispiel**:

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  insecure: true
```

### `caCert`

CA-Zertifikat für die Überprüfung des Broker-Zertifikats (Zertifikatsinhalt).

**Beispiel**:

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  caCert: |
    -----BEGIN CERTIFICATE-----
    MIIDXTCCAkWgAwIBAgIJAKZm...
    ...
    -----END CERTIFICATE-----
```

### `clientCert`

Client-Zertifikat für gegenseitige TLS-Authentifizierung (Zertifikatsinhalt).
Muss zusammen mit `clientKey` verwendet werden.

**Beispiel**:

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  clientCert: |
    -----BEGIN CERTIFICATE-----
    MIIDXTCCAkWgAwIBAgIJAKZm...
    ...
    -----END CERTIFICATE-----
  clientKey: |
    -----BEGIN PRIVATE KEY-----
    MIIEvQIBADANBgkqhkiG9w0B...
    ...
    -----END PRIVATE KEY-----
```

### `clientKey`

Privater Schlüssel des Client-Zertifikats (Schlüsselinhalt).
Muss zusammen mit `clientCert` verwendet werden.
