---
title: "mqtt"
description: "Sådan forbinder du din evcc-installation med en MQTT-broker i evcc.yaml, med eller uden TLS, inkl. klientcertifikater og et brugerdefineret topic."
sidebar:
  order: 15
translatedFrom: "3e4f582ed64e"
---

Opretter forbindelse til en MQTT-broker.
Når forbindelsen er aktiv, sender evcc automatisk alle interne værdier til det angivne topic via MQTT-brokeren og modtager også ændringer via samme topic.
Mere information finder du i dokumentationen til [`MQTT API`](/da/integrations/mqtt-api).

---

## MQTT uden kryptering

**Eksempel**:

```yaml
mqtt:
  broker: localhost:1883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

---

## MQTT med TLS-kryptering

**Eksempel**:

```yaml
# mqtt message broker
mqtt:
  broker: tls://localhost:8883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

Ved brug af TLS-kryptering (`tls://`) verificeres brokerens TLS-certifikat som standard.
Hvis du bruger et selvsigneret certifikat, er der to muligheder:

1. Installer certifikatet på systemniveau (f.eks. på Linux i `/etc/ssl/certs`), så evcc bruger det automatisk
2. Deaktiver verificeringen af certifikatet med `insecure: true` (se nedenfor)

---

## Påkrævede parametre

### `broker`

Forbindelsesoplysninger (værtsnavn/IP og port) for den MQTT-broker, som evcc skal forbinde til som klient.

### `topic`

Angiver det rod-topic, som evcc bruger.
Hvis det ikke angives her, kan der ikke foregå nogen MQTT-kommunikation!

---

## Valgfrie parametre

### `user`

Brugernavnet til login hos MQTT-brokeren.

### `password`

Adgangskoden til login hos MQTT-brokeren.

### `clientid`

Angiver et fast MQTT-klient-ID.
Som standard tildeles det dynamisk.

### `insecure`

Deaktiverer verificeringen af TLS-certifikatet ved brug af `tls://`.

**Eksempel**:

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  insecure: true
```

### `caCert`

CA-certifikat til verificering af brokerens certifikat (certifikatets indhold).

**Eksempel**:

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

Klientcertifikat til gensidig TLS-autentificering (certifikatets indhold).
Skal bruges sammen med `clientKey`.

**Eksempel**:

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

Klientcertifikatets private nøgle (nøglens indhold).
Skal bruges sammen med `clientCert`.
