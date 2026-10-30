---
title: "modbusproxy"
description: "Configurez le proxy Modbus dans evcc.yaml pour partager la connexion Modbus d’un onduleur ou d’un compteur entre votre instance evcc et d’autres systèmes."
sidebar:
  order: 18
translatedFrom: "7191bc3757f6"
---

Le paramètre `modbusproxy` est une liste d’appareils mis à disposition des systèmes tiers via Modbus TCP sur le réseau.

Certains appareils n’autorisent qu’un nombre très limité de clients Modbus TCP. Dans le pire des cas, une seule connexion est autorisée, comme pour les composants SolarEdge. De plus, un seul maître est autorisé sur les bus série Modbus RTU RS485.
Grâce à `modbusproxy`, evcc peut servir de proxy Modbus et partager des connexions Modbus existantes avec d’autres systèmes. evcc communique ainsi directement avec l’appareil, tandis que les autres systèmes communiquent avec evcc, qui regroupe les connexions et les transmet à l’appareil cible.

Chaque entrée de `modbusproxy` définit un proxy distinct.

**Par exemple** :

```yaml
modbusproxy:
  - port: 5021
    uri: 192.0.2.2:502
  - port: 5022
    device: /dev/ttyUSB0
    baudrate: 9600
    comset: "8N1"
  - port: 5023
    uri: 192.0.2.3:502
    rtu: true
```

:::note
En _entrée_ (depuis des systèmes tiers comme une box domotique ou des enregistreurs de données), la fonction proxy prend exclusivement en charge Modbus TCP.

En _sortie_, vers l’appareil cible interrogé (p. ex. onduleur, compteur d’énergie), le protocole peut être converti selon la configuration de l’appareil cible.
:::

:::tip[Jeton de parrain requis]

Pour plus d’informations sur le parrainage d’evcc, consultez [la page de parrainage](/fr/sponsorship).

:::

---

## Paramètres obligatoires

### `port`

Le port TCP/IP local sur lequel le serveur proxy écoute et accepte les connexions Modbus TCP entrantes des systèmes tiers.

**Par exemple** :

```yaml
port: 5021
```

## Paramètres facultatifs

### `uri`

L’adresse IP et le port de l’appareil cible, au format URI habituel.

Chaque port indiqué doit être unique et ne pas être déjà utilisé par une autre application sur l’hôte evcc, mais il peut être identique au port de l’appareil cible. Vous pouvez donc définir une configuration pour le port 502 qui redirige vers le port 502 de l’appareil cible.

**Par exemple** :

```yaml
- port: 502
  uri: 192.0.2.2:502
```

### `rtu`

Modbus TCP est généralement utilisé pour communiquer avec des appareils cibles en réseau. Si nécessaire, vous pouvez passer à Modbus RTU over TCP en indiquant `rtu: true`. Un cas d’usage typique concerne les convertisseurs RS485-TCP simples et transparents (sans conversion de protocole). Ce paramètre doit correspondre à la configuration de l’appareil. Il est ignoré pour les appareils cibles raccordés par liaison série.

**Par exemple** :

```yaml
rtu: true
```

### `readonly`

Ce paramètre permet d’empêcher les systèmes tiers d’écrire sur l’appareil via Modbus.

**Valeurs possibles** :

- `true` : l’accès en écriture est bloqué sans réponse
- `deny` : l’accès en écriture est bloqué avec une erreur Modbus en réponse
- `false` : l’accès en écriture est transmis

Les codes de fonction que le proxy ne traite pas lui-même, comme le code de fonction 0x41 propre à Huawei, peuvent contenir des opérations d’écriture.
Les deux modes en lecture seule les bloquent donc avec une erreur Modbus.
Avec `readonly: false`, le proxy les transmet sans modification, mais uniquement aux appareils connectés via Modbus TCP.
L’intégration Home Assistant pour les onduleurs Huawei, par exemple, nécessite `readonly: false`.

:::caution
Le proxy ne vérifie pas qui se connecte.
Avec `readonly: false` (la valeur par défaut), tout appareil de votre réseau qui peut atteindre le port peut écrire sur l’appareil cible.
N’utilisez le proxy que dans un réseau de confiance.
:::

**Par exemple** :

```yaml
readonly: true
```
