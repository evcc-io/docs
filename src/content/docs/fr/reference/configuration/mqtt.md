---
title: "mqtt"
description: "Connectez votre instance evcc à un broker MQTT dans evcc.yaml, avec ou sans TLS, y compris avec des certificats client et un topic personnalisé."
sidebar:
  order: 15
translatedFrom: "3e4f582ed64e"
---

Établit la connexion avec un broker MQTT.
Lorsque la connexion est active, evcc publie automatiquement toutes les valeurs internes sur le topic indiqué via le broker MQTT et y reçoit également les modifications.
Pour plus d’informations, consultez la documentation [`MQTT API`](/fr/integrations/mqtt-api).

---

## MQTT sans chiffrement

**Par exemple** :

```yaml
mqtt:
  broker: localhost:1883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

---

## MQTT avec chiffrement TLS

**Par exemple** :

```yaml
# mqtt message broker
mqtt:
  broker: tls://localhost:8883
  topic: evcc # root topic for publishing, set empty to disable publishing
  # clientid: foo
  # user:
  # password:
```

Avec le chiffrement TLS (`tls://`), le certificat TLS du broker est vérifié par défaut.
Si vous utilisez un certificat auto-signé, deux options s’offrent à vous :

1. Installer le certificat pour tout le système (p. ex. sous Linux dans `/etc/ssl/certs`) afin qu’evcc l’utilise automatiquement
2. Désactiver la vérification du certificat avec `insecure: true` (voir ci-dessous)

---

## Paramètres obligatoires

### `broker`

Données de connexion (nom d’hôte ou adresse IP et port) du broker MQTT auquel evcc doit se connecter en tant que client.

### `topic`

Indique le topic racine utilisé par evcc.
S’il n’est pas indiqué ici, aucune communication MQTT n’est possible !

---

## Paramètres facultatifs

### `user`

Le nom d’utilisateur pour l’authentification auprès du broker MQTT.

### `password`

Le mot de passe pour l’authentification auprès du broker MQTT.

### `clientid`

Indique un identifiant client MQTT fixe.
Par défaut, il est attribué dynamiquement.

### `insecure`

Désactive la vérification du certificat TLS lors de l’utilisation de `tls://`.

**Par exemple** :

```yaml
mqtt:
  broker: tls://broker.example.com:8883
  topic: evcc
  insecure: true
```

### `caCert`

Certificat de l’autorité de certification pour vérifier le certificat du broker (contenu du certificat).

**Par exemple** :

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

Certificat client pour l’authentification TLS mutuelle (contenu du certificat).
Doit être utilisé avec `clientKey`.

**Par exemple** :

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

Clé privée du certificat client (contenu de la clé).
Doit être utilisée avec `clientCert`.
