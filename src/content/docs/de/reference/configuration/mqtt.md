---
title: "mqtt"
description: "So verbindest du deine evcc-Instanz per evcc.yaml mit einem MQTT-Broker, mit oder ohne TLS, inklusive Client-Zertifikaten und eigenem Topic."
sidebar:
  order: 15
translatedFrom: "3e4f582ed64e"
---

Stellt die Verbindung zu einem MQTT-Broker her.
Bei bestehender Verbindung veröffentlicht evcc automatisch alle internen Werte über den MQTT-Broker unter dem angegebenen Topic und empfängt dort auch Änderungen.
Siehe dazu auch die Dokumentation zur [`MQTT API`](/de/integrations/mqtt-api).

---

## MQTT ohne Verschlüsselung

**Beispiel**:

```yaml
mqtt:
  broker: localhost:1883
  topic: evcc # Root-Topic für Veröffentlichungen, leer lassen, um nichts zu veröffentlichen
  # clientid: foo
  # user:
  # password:
```

---

## MQTT mit TLS-Verschlüsselung

**Beispiel**:

```yaml
# MQTT-Broker
mqtt:
  broker: tls://localhost:8883
  topic: evcc # Root-Topic für Veröffentlichungen, leer lassen, um nichts zu veröffentlichen
  # clientid: foo
  # user:
  # password:
```

Bei Verwendung von TLS-Verschlüsselung (`tls://`) wird standardmäßig das TLS-Zertifikat des Brokers überprüft.
Falls du ein selbstsigniertes Zertifikat verwendest, gibt es zwei Möglichkeiten:

1. Das Zertifikat systemweit installieren (z. B. unter Linux in `/etc/ssl/certs`), damit evcc es automatisch verwendet
2. Die Zertifikatsüberprüfung mit `insecure: true` deaktivieren (siehe unten)

---

## Erforderliche Parameter

### `broker`

Verbindungsdaten (Hostname/IP und Port) des MQTT-Brokers, mit dem sich evcc als Client verbinden soll.

### `topic`

Legt das Root-Topic fest, das evcc verwendet.
Wenn hier nichts angegeben ist, findet keine MQTT-Kommunikation statt.

---

## Optionale Parameter

### `user`

Der Benutzername zur Anmeldung am MQTT-Broker.

### `password`

Das Passwort zur Anmeldung am MQTT-Broker.

### `clientid`

Legt eine feste MQTT-Client-ID fest.
Standardmäßig wird sie dynamisch vergeben.

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

Inhalt des CA-Zertifikats, mit dem das Broker-Zertifikat überprüft wird.

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

Inhalt des Client-Zertifikats für die gegenseitige TLS-Authentifizierung.
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

Inhalt des privaten Schlüssels zum Client-Zertifikat.
Muss zusammen mit `clientCert` verwendet werden.
