---
sidebar_position: 14
---

# `mqtt`

Establishes connectivity with an MQTT broker.
When the connection is active, evcc automatically pushes all internal values to the specified topic via the MQTT broker and also receives changes there.
For more information, refer to the [`MQTT API`](/docs/integrations/mqtt-api) documentation.

---

## MQTT without Encryption

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

## MQTT with TLS Encryption

**For example**:

```yaml
# mqtt message broker
mqtt:
  broker: tls://localhost:8883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

When using TLS encryption (`tls://`), the broker's TLS certificate is verified by default.
If you're using a self-signed certificate, there are two options:

1. Install the certificate system-wide (e.g. on Linux in `/etc/ssl/certs`) so that evcc uses it automatically
2. Disable certificate verification with `insecure: true` (see below)

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

Specifies a fixed MQTT client ID.
By default, it will be assigned dynamically.

### `insecure`

Disables TLS certificate verification when using `tls://`.

**For example**:

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  insecure: true
```

### `caCert`

CA certificate for broker certificate verification (certificate content).

**For example**:

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

Client certificate for mutual TLS authentication (certificate content).
Must be used together with `clientKey`.

**For example**:

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

Private key of the client certificate (key content).
Must be used together with `clientCert`.
