---
title: "mqtt"
description: "Beschrijft hoe u uw evcc-installatie in evcc.yaml met een MQTT-broker verbindt, met of zonder TLS, inclusief clientcertificaten en een eigen topic."
sidebar:
  order: 15
translatedFrom: "3e4f582ed64e"
---

Maakt een verbinding met een MQTT-broker.
Zolang de verbinding actief is, publiceert evcc automatisch alle interne waarden via de MQTT-broker op het opgegeven topic en ontvangt daar ook wijzigingen.
Meer informatie vindt u in de documentatie van de [`MQTT API`](/nl/integrations/mqtt-api).

---

## MQTT zonder versleuteling

**Voorbeeld**:

```yaml
mqtt:
  broker: localhost:1883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

---

## MQTT met TLS-versleuteling

**Voorbeeld**:

```yaml
# mqtt message broker
mqtt:
  broker: tls://localhost:8883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

Bij gebruik van TLS-versleuteling (`tls://`) wordt het TLS-certificaat van de broker standaard gecontroleerd.
Als u een zelfondertekend certificaat gebruikt, zijn er twee mogelijkheden:

1. Installeer het certificaat systeembreed (bijv. onder Linux in `/etc/ssl/certs`), zodat evcc het automatisch gebruikt.
2. Schakel de certificaatcontrole uit met `insecure: true` (zie hieronder).

---

## Verplichte parameters

### `broker`

Verbindingsgegevens (hostnaam/IP en poort) van de MQTT-broker waarmee evcc als client verbinding moet maken.

### `topic`

Legt het root-topic vast dat evcc gebruikt.
Als het hier niet is opgegeven, kan er geen MQTT-communicatie plaatsvinden!

---

## Optionele parameters

### `user`

De gebruikersnaam voor authenticatie bij de MQTT-broker.

### `password`

Het wachtwoord voor authenticatie bij de MQTT-broker.

### `clientid`

Legt een vaste MQTT-client-ID vast.
Standaard wordt deze dynamisch toegewezen.

### `insecure`

Schakelt de controle van het TLS-certificaat uit bij gebruik van `tls://`.

**Voorbeeld**:

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  insecure: true
```

### `caCert`

CA-certificaat voor de controle van het brokercertificaat (inhoud van het certificaat).

**Voorbeeld**:

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

Clientcertificaat voor wederzijdse TLS-authenticatie (inhoud van het certificaat).
Moet samen met `clientKey` worden gebruikt.

**Voorbeeld**:

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

Private sleutel van het clientcertificaat (inhoud van de sleutel).
Moet samen met `clientCert` worden gebruikt.
