---
title: "mqtt"
description: "Collega la tua istanza evcc a un broker MQTT in evcc.yaml, con o senza TLS, anche con certificati client e un topic personalizzato."
sidebar:
  order: 15
translatedFrom: "3e4f582ed64e"
---

Stabilisce la connessione con un broker MQTT.
Quando la connessione è attiva, evcc pubblica automaticamente tutti i valori interni sul topic indicato tramite il broker MQTT e da lì riceve anche le modifiche.
Per maggiori informazioni, consulta la documentazione [`MQTT API`](/it/integrations/mqtt-api).

---

## MQTT senza crittografia

**Esempio**:

```yaml
mqtt:
  broker: localhost:1883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

---

## MQTT con crittografia TLS

**Esempio**:

```yaml
# mqtt message broker
mqtt:
  broker: tls://localhost:8883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

Con la crittografia TLS (`tls://`), il certificato TLS del broker viene verificato per impostazione predefinita.
Se usi un certificato autofirmato, hai due possibilità:

1. Installare il certificato a livello di sistema (ad es. su Linux in `/etc/ssl/certs`), così evcc lo usa automaticamente
2. Disattivare la verifica del certificato con `insecure: true` (vedi sotto)

---

## Parametri obbligatori

### `broker`

Dati di connessione (hostname/IP e porta) del broker MQTT a cui evcc deve connettersi come client.

### `topic`

Indica il topic radice usato da evcc.
Se non viene indicato qui, non può avvenire alcuna comunicazione MQTT!

---

## Parametri facoltativi

### `user`

Il nome utente per l’autenticazione presso il broker MQTT.

### `password`

La password per l’autenticazione presso il broker MQTT.

### `clientid`

Imposta un ID client MQTT fisso.
Per impostazione predefinita viene assegnato dinamicamente.

### `insecure`

Disattiva la verifica del certificato TLS quando si usa `tls://`.

**Esempio**:

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  insecure: true
```

### `caCert`

Certificato CA per la verifica del certificato del broker (contenuto del certificato).

**Esempio**:

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

Certificato client per l’autenticazione TLS reciproca (contenuto del certificato).
Va usato insieme a `clientKey`.

**Esempio**:

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

Chiave privata del certificato client (contenuto della chiave).
Va usata insieme a `clientCert`.
