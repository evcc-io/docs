---
title: "hems"
description: "Configurez dans evcc.yaml les limites externes de consommation et d’export vers le réseau, p. ex. pour le § 14a EnWG ou le § 9 EEG, via relais, boîtier FNN ou EEBUS."
sidebar:
  order: 8
translatedFrom: "426c429c285d"
---

La section `hems` configure la commande externe de la puissance de consommation et d’export vers le réseau.
Elle sert p. ex. à mettre en œuvre les réglementations allemandes du § 14a EnWG ou du § 9 EEG.
Pour le contexte et les détails de mise en place, consultez [Limite externe](/fr/external-limit).

:::note[Remarque]
Le bridage agit directement sur les compteurs `pv` bridables et les [appareils de bridage](/fr/reference/configuration/curtailers), tandis que la réduction de puissance agit directement sur les consommateurs pilotables.
Ni l’un ni l’autre ne nécessite de configuration de circuit.
Pour appliquer la limite de consommation aux points de charge, des circuits doivent être configurés dans la [gestion de la charge](/fr/features/loadmanagement).
Une limite active plafonne alors le circuit racine.
:::

:::note[SMA Sunny Home Manager et protocole SEMP]
L’intégration du SMA Sunny Home Manager (SHM) est active par défaut et n’a plus besoin d’être configurée sous `hems:`.
Pour les détails et les options de configuration, consultez **Configuration → Sunny Home Manager**.
:::

---

## Paramètres obligatoires

### `type`

Définit le type de commande externe.

**Valeurs possibles** :

- `relay` : raccordement via un contact de commutation
- `fnn` : raccordement via un boîtier de commande FNN à plusieurs contacts de commutation
- `eebus` : raccordement via le protocole EEBUS

---

## `type: relay`

Raccordement via un contact de commutation (p. ex. boîtier de commande).
Le contact signale si une limitation de puissance est active.

```yaml
hems:
  type: relay
  maxPower: 8400 # Total power limit when signal is active (in watts)
  limit:
    source: gpio
    function: read
    pin: 17
```

### Paramètres

#### `maxPower`

Limite de puissance totale en watts appliquée lorsque le signal est actif.

#### `limit`

Configuration du [plugin](/fr/reference/plugins) qui lit le contact de commutation.
Valeur de retour attendue : `true`/`1` = limité, `false`/`0` = normal.

#### `passthrough`

Configuration facultative d’un [plugin](/fr/reference/plugins) qui transmet le signal de limitation à un système externe.

#### `interval`

Intervalle d’interrogation du contact de commutation.
Valeur par défaut : `10s`.

Pour d’autres exemples de raccordement (GPIO, MQTT, HTTP), consultez les [intégrations définies par l’utilisateur](/fr/user-defined-devices#external-limit).

---

## `type: fnn`

Raccordement via un boîtier de commande FNN à contacts de commutation séparés.
La réduction de la consommation (W4) et le bridage de l’export vers le réseau (W3, S2, S1) sont signalés par des contacts distincts.

```yaml
hems:
  type: fnn
  maxDimPower: 4200 # Consumption limit while dimmed (in watts)
  maxCurtailPower: 10000 # Installed PV power, base for curtailment steps (in watts)
  w4:
    source: gpio
    function: read
    pin: 17 # Read GPIO pin 17
    # Return value: false = normal, true = active
  w3:
    source: gpio
    function: read
    pin: 27
  s2:
    source: gpio
    function: read
    pin: 22
  s1:
    source: gpio
    function: read
    pin: 23
```

### Paramètres

Au moins l’un des signaux `w4` ou `w3` doit être configuré.

#### `maxDimPower`

Limite de consommation en watts appliquée tant que le signal de réduction de puissance (W4) est actif.
Obligatoire lorsque `w4` est configuré.

#### `maxCurtailPower`

Puissance solaire installée en watts.
Valeur de base des paliers de bridage (W3, S2, S1).

#### `w4`

Configuration du [plugin](/fr/reference/plugins) qui lit le signal de réduction de puissance.
Lorsqu’il est actif, la consommation est limitée à `maxDimPower`.

#### `w3`

Configuration du [plugin](/fr/reference/plugins) qui lit le signal de bridage « 0 % ».
Lorsqu’il est actif, l’export vers le réseau est limité à 0 % de `maxCurtailPower`.

#### `s2`

Configuration du [plugin](/fr/reference/plugins) qui lit le signal de bridage « 30 % ».
Lorsqu’il est actif, l’export vers le réseau est limité à 30 % de `maxCurtailPower`.

#### `s1`

Configuration du [plugin](/fr/reference/plugins) qui lit le signal de bridage « 60 % ».
Lorsqu’il est actif, l’export vers le réseau est limité à 60 % de `maxCurtailPower`.

#### `interval`

Intervalle d’interrogation des contacts de commutation.
Valeur par défaut : `10s`.

Pour les détails de mise en place, consultez [Limite externe](/fr/external-limit).

---

## `type: eebus`

Raccordement via le protocole EEBUS.
Le boîtier de commande transmet automatiquement la limite de puissance.

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF" # SKI of the control box
```

### Paramètres

#### `ski`

SKI (Subject Key Identifier) du boîtier de commande.
Nécessaire pour l’appairage.

#### Limites avancées

Les paramètres facultatifs suivants peuvent être définis pour la communication EEBUS :

- `contractualConsumptionNominalMax` : puissance de consommation maximale contractuelle (en watts)
- `failsafeConsumptionActivePowerLimit` : limite de sécurité de la puissance de consommation (en watts)
- `productionNominalMax` : puissance installée du générateur (Wc, en watts)
- `failsafeProductionActivePowerLimit` : limite de sécurité de la puissance d’export vers le réseau (en watts)
- `failsafeDurationMinimum` : durée minimale du mode de sécurité (p. ex. `2h`)

#### `passthrough`

Configuration facultative d’un [plugin](/fr/reference/plugins) qui transmet le signal de limitation à un système externe.

#### `interval`

Intervalle d’interrogation.
Valeur par défaut : `10s`.

Pour les détails de mise en place et d’appairage, consultez [Limite externe](/fr/external-limit#eebus-pairing).
