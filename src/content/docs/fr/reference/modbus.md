---
title: "Modbus"
description: "Explique comment evcc communique en Modbus avec les compteurs et chargeurs, en série via RS485, en TCP ou via un convertisseur RTU-TCP, et comment configurer chaque cas."
sidebar:
  order: 4
translatedFrom: "01c339d6465c"
---

Certains appareils, comme les compteurs ([`meters`](/fr/reference/configuration/meters#modbus)) ou les chargeurs ([`chargers`](/fr/reference/configuration/chargers)), sont raccordés et pilotés via le protocole Modbus.

La configuration `meter` comprend le type de connexion physique (interface), des paramètres techniques d’interface facultatifs, le protocole Modbus utilisé, l’ID Modbus unique de l’appareil sur le bus, ainsi que le numéro et le type du registre à lire ou à écrire.

Il existe trois protocoles Modbus différents : Modbus RTU, Modbus ASCII et Modbus TCP. Techniquement, ils peuvent être transmis sur différents types d’interfaces. La variante classique est Modbus RTU sur une interface de bus série RS485, courante pour la plupart des compteurs et certains chargeurs. Les appareils dotés d’une interface réseau native (Ethernet/Wi-Fi) sont en revanche généralement pilotés via le protocole Modbus TCP.

Si un appareil Modbus série doit être raccordé au réseau (Ethernet/Wi-Fi/PowerLAN) via un convertisseur d’interface, on établit une liaison Modbus RTU sur une connexion TCP/IP. Le protocole Modbus RTU est transmis directement sur le réseau (c.-à-d. « tunnelé »). Le mode de transport (TCP/IP) est identique, mais le protocole n’est _pas_ celui de Modbus TCP. Il est essentiel de distinguer le protocole du mode de transport. « Modbus (RTU) sur TCP » est différent de Modbus TCP !

:::caution
Attention : il existe des convertisseurs d’interface plus complexes qui peuvent, en option, traduire le protocole Modbus lui-même entre Modbus RTU et Modbus TCP !

Si cette fonction est active, evcc doit communiquer avec le convertisseur en Modbus TCP, tandis que le convertisseur communique avec l’appareil série en Modbus RTU et traduit les deux protocoles dans les deux sens.
Dans ce cas, il faut prêter une attention particulière à la spécification et à la configuration de l’appareil, sinon la communication risque de ne pas fonctionner !
:::

Dans le cas d’une configuration avec convertisseur d’interface, la configuration du bus série se fait uniquement sur le convertisseur. La configuration d’evcc ne concerne alors que la partie allant jusqu’au convertisseur.

## Connexion physique

### Connexion série (RS485)

Si l’appareil est raccordé directement via un adaptateur RS485 (Modbus RTU), `device` et les paramètres de communication série `baudrate` et `comset` doivent être indiqués conformément à la configuration de l’appareil. Consultez pour cela le manuel d’utilisation, les fiches techniques ou les paramètres système correspondants.

:::note
Plusieurs appareils ayant des paramètres de communication identiques peuvent fonctionner sur un bus série RS485 si chaque appareil reçoit un ID Modbus unique. Si tous les appareils d’un bus ne peuvent pas être configurés avec des paramètres de communication uniformes (mais avec des ID différents), il faut les répartir sur plusieurs bus indépendants.
:::

:::caution
Il n’est pas possible de mélanger sur un même bus des appareils ayant des paramètres de communication série différents : cela entraîne des erreurs de communication imprévisibles.
:::

**Par exemple** :

```yaml
source: modbus
id: 1
device: /dev/ttyUSB0
baudrate: 38400
comset: "8E1"
```

### Connexion réseau directe

Si l’appareil est raccordé directement via une connexion réseau native (Modbus TCP), il faut indiquer une `uri` de la forme NOM_HÔTE:PORT ou IP:PORT :

**Par exemple** :

```yaml
source: modbus
id: 1
uri: 192.168.0.11:502
```

### Appareil série via une connexion réseau (avec convertisseur d’interface)

Si un appareil série est raccordé via un convertisseur d’interface RS485-IP transparent intercalé (sans traduction de protocole), il faut également basculer le protocole sur Modbus RTU via la connexion TCP/IP avec `rtu: true`.

**Par exemple** :

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU sur TCP
```

## Appareils prédéfinis

Les modèles d’appareils prédéfinis intégrés (`model`) sont identiques à ceux de [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options) :

     ABB       ABB A/B-Series meters
     DDM       DDM18SD
     DZG       DZG Metering GmbH DVH4013 meters
     IEM3000   Schneider Electric iEM3000 series
     INEPRO    Inepro Metering Pro 380
     JANITZA   Janitza meters
     MPM       Bernecker Engineering MPM3PM meters
     ORNO1P    ORNO WE-514 & WE-515
     ORNO1P504 ORNO WE-504
     ORNO3P    ORNO WE-516 & WE-517
     SBC       Saia Burgess Controls ALE3 meters
     SDM       Eastron SDM630/120/72DMv2
     SDM220    Eastron SDM220
     SDM230    Eastron SDM230
     SDM72     Eastron SDM72
     SEMTR     SolarEdge SE-MTR-3Y

Tout `model` qui diffère de ceux-ci est traité comme un type d’appareil _SunSpec_.

Utilisez `value` pour définir la valeur à lire depuis l’appareil. Toutes les valeurs prises en charge sont prédéfinies dans [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28).

Dans le cas d’un onduleur ou d’un compteur compatible _SunSpec_, les valeurs à lire sont indiquées au format `model:[block:]point` selon la définition _SunSpec_. Par exemple, la puissance CC de la deuxième chaîne d’un onduleur solaire triphasé (correspondant au SunSpec Model 103) s’interroge ainsi : `value: 103:2:W`.

Le modèle d’appareil `model` et l’ID Modbus `id` sont toujours obligatoires :

**Par exemple** :

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # facteur à virgule flottante appliqué au résultat, p. ex. pour convertir des kW en W
```

## Inversion des valeurs

Pour les compteurs MBMD, les valeurs mesurées peuvent être inversées en faisant précéder le nom de la mesure d’un `-` (signe moins).
C’est utile lorsque des compteurs sont utilisés dans différentes configurations ou orientations de montage et que le signe des valeurs mesurées doit être ajusté.

### Mesures prises en charge

L’inversion fonctionne pour les mesures MBMD suivantes :

- `power` : puissance totale
- `currents` : courants par phase (tableau)
- `powers` : puissances par phase (tableau)

### Syntaxe

```yaml
meters:
  - name: my-meter
    type: modbus
    model: sdm
    power: -Power # inverse la valeur de puissance
```

### Exemples

#### Puissance totale inversée

```yaml
meters:
  - name: pv-meter
    type: modbus
    model: sdm
    power: -Power # la puissance est inversée (p. ex. +1000 W devient -1000 W)
```

#### Puissances de phase inversées

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    powers:
      - -PowerL1 # phase 1 inversée
      - -PowerL2 # phase 2 inversée
      - -PowerL3 # phase 3 inversée
```

#### Courants inversés (phases individuelles)

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    currents:
      - -CurrentL1 # courant phase 1 inversé
      - CurrentL2 # courant phase 2 normal
      - -CurrentL3 # courant phase 3 inversé
```

### Cas d’usage

**Compteurs mal montés** :
Si un capteur de courant ou un compteur est installé physiquement dans le mauvais sens, vous pouvez corriger les valeurs par logiciel.

**Export vers le réseau ou consommation** :
Pour les compteurs solaires dont la convention de signe doit être inversée.

**Orientations de TC différentes** :
Pour les installations polyphasées avec des transformateurs de courant orientés différemment.

## Configuration manuelle

Si l’appareil Modbus n’est pas directement pris en charge ou si des valeurs différentes de celles des modèles prédéfinis doivent être lues ou écrites, les registres Modbus peuvent aussi être configurés manuellement.
Pour cela, en plus des paramètres généraux « modbus » (voir ci-dessus), il faut définir un `register` au lieu de la `value` utilisée pour les appareils prédéfinis. On ne peut pas indiquer à la fois `value` et `register`.

La définition d’un registre nécessite les paramètres suivants :

- `address` : l’adresse du registre
- `type` : le type de registre. Types de lecture autorisés : `coil`, `input`, `holding`. Types d’écriture : `writeholding`, `writeholdings`, `writecoil`
- `decode` : le type d’encodage des données. Sont autorisés : `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. Pour le type `coil`, l’encodage est ignoré mais doit tout de même être indiqué. Pour le type `writecoil`, il faut indiquer `bool8`.
- `bitmask` : facultatif. Ce masque est combiné par un ET logique avec la valeur lue afin d’extraire des bits individuels.

Autres paramètres autorisés d’une configuration manuelle :

- `scale` : nombre à virgule flottante permettant de convertir les valeurs lues (p. ex. de W en kW ou inversement). Cette valeur est multipliée par la valeur brute lue et décodée.
- `timeout` : délai d’attente Modbus. Sans unité, la valeur est en ns, sinon il faut préciser l’unité, p. ex. 10s pour 10 secondes.

**Par exemple** :

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # coil, holding ou input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 et u|int32s + float32s
  bitmask: 2 # facultatif : masque de bits appliqué à la valeur lue. Ici le masque vaut 0000000000000010b, ignoré si la valeur est 0
scale: -1.0 # facteur à virgule flottante appliqué au résultat, p. ex. pour convertir des kW en W
timeout: 2s # délai d’attente, sans unité en ns
```

Avec les types de décodage `int32s/uint32s`, l’ordre des mots est inversé (mot de poids faible en premier), ce qui est utile pour les appareils E3/DC.

### Écriture de registres

On peut écrire aussi bien des registres de type holding que des coils. Pour cela, il faut indiquer soit `type: writeholding` pour les registres de type holding, soit `type: writecoil` pour les coils. Pour écrire plusieurs registres (code de fonction 16), le type `writeholdings` est disponible.

`type: writeholding` écrit toujours un registre de 16 bits (int ou bool16). Pour `decode`, il faut donc toujours indiquer `uint16`.
`type: writecoil` écrit un coil. Pour `decode`, il faut indiquer `bool8`.

**Par exemple** :

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding, writeholdings ou writecoil
```

### Exemple complet

Un exemple complet pour un chargeur personnalisé avec interface Modbus (ici un Phoenix EM-CP-PP-ETH avec l’adresse IP 192.168.1.10) pourrait ressembler à ceci :

**Par exemple** :

```yaml
chargers:
  - type: custom
    name: CustomCharger
    status:
      # lire l’état du chargeur
      # A, B, C ou F
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      timeout: 3s
      register:
        address: 100
        type: input # lire un registre de type input
        decode: int16
    enabled:
      # le chargeur est-il activé (1) ou non (0)
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: coil # lire un coil
        decode: bool16 # sans importance mais obligatoire
    enable:
      # activer le chargeur
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: writecoil # écrire un coil
        decode: bool8
    maxcurrent:
      # définir le courant maximal
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 300
        type: writeholding # écrire un registre de type holding
        decode: uint16
```
