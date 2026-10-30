---
title: "mqtt"
description: "Popisuje, jak v evcc.yaml připojit vaši instanci evcc k brokeru MQTT, s TLS nebo bez něj, včetně klientských certifikátů a vlastního topicu."
sidebar:
  order: 15
translatedFrom: "3e4f582ed64e"
---

Naváže spojení s brokerem MQTT.
Když je spojení aktivní, evcc automaticky odesílá všechny interní hodnoty přes broker MQTT do zadaného topicu a zároveň z něj přijímá změny.
Další informace najdete v dokumentaci [`MQTT API`](/cs/integrations/mqtt-api).

---

## MQTT bez šifrování

**Příklad**:

```yaml
mqtt:
  broker: localhost:1883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

---

## MQTT se šifrováním TLS

**Příklad**:

```yaml
# mqtt message broker
mqtt:
  broker: tls://localhost:8883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

Při použití šifrování TLS (`tls://`) se certifikát TLS brokeru ve výchozím stavu ověřuje.
Pokud používáte self-signed certifikát, máte dvě možnosti:

1. Nainstalujte certifikát do systémového úložiště certifikátů (např. na Linuxu do `/etc/ssl/certs`), aby ho evcc použilo automaticky.
2. Vypněte ověřování certifikátu pomocí `insecure: true` (viz níže).

---

## Povinné parametry

### `broker`

Údaje o spojení (název hostitele/IP a port) brokeru MQTT, ke kterému se má evcc připojit jako klient.

### `topic`

Určuje kořenový topic, který evcc používá.
Pokud zde není zadán, nemůže probíhat žádná komunikace MQTT!

---

## Volitelné parametry

### `user`

Uživatelské jméno pro ověření u brokeru MQTT.

### `password`

Heslo pro ověření u brokeru MQTT.

### `clientid`

Určuje pevné ID klienta MQTT.
Ve výchozím stavu se přiděluje dynamicky.

### `insecure`

Vypne ověřování certifikátu TLS při použití `tls://`.

**Příklad**:

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  insecure: true
```

### `caCert`

Certifikát CA pro ověření certifikátu brokeru (obsah certifikátu).

**Příklad**:

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

Klientský certifikát pro vzájemné ověření TLS (obsah certifikátu).
Musí se používat společně s `clientKey`.

**Příklad**:

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

Privátní klíč klientského certifikátu (obsah klíče).
Musí se používat společně s `clientCert`.
