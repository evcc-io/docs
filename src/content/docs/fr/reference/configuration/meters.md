---
title: "meters"
description: "Définissez dans evcc.yaml les compteurs du réseau, de l’installation photovoltaïque, de la batterie domestique et des consommateurs, et découvrez la convention de signe."
sidebar:
  order: 5
translatedFrom: "dfa0dfa3f1e6"
---

Les _meters_ (compteurs) sont une liste d’appareils de la maison capables de mesurer la puissance et la consommation d’énergie, la production solaire ou l’utilisation de la batterie domestique. Un `meter` définit un point de mesure de l’énergie et peut être un appareil physique (p. ex. un compteur au point de raccordement au réseau), un onduleur solaire (AC ou DC dans le cas des onduleurs hybrides) ou un onduleur de batterie.

Les chargeurs peuvent disposer d’un compteur intégré, ou un compteur externe peut y être raccordé. Si un chargeur dispose d’un compteur intégré, il n’est pas nécessaire de créer une entrée pour lui dans `meters`. Si le chargeur ne dispose pas d’un tel compteur, evcc utilise le compteur configuré ici et attribué au chargeur sous [`meters`](/fr/reference/configuration/loadpoints#meter) dans la configuration du point de charge, ou suppose que la puissance de charge réglée est effectivement utilisée.

evcc applique une convention de signe cohérente pour les valeurs de puissance et de courant (`power`, `powers`, `currents`) :

- **Positif (+)** pour l’énergie entrante : import du réseau, production solaire, décharge de la batterie domestique
- **Négatif (-)** pour l’énergie sortante : export vers le réseau, consommation en veille de l’onduleur solaire, charge de la batterie domestique
- Les **consommateurs** (chargeur, compteurs auxiliaires) sont toujours **positifs (+)**

Si l’appareil renvoie des valeurs avec le signe inverse, vous pouvez le corriger dans la [configuration du plugin](/fr/reference/plugins) avec `scale: -1`.

La configuration `meters` est une liste des différents appareils disponibles.

**Par exemple** :

```yaml
meters:
  - name: grid
    type: ...
  - name: pv
    type: ...
  - name: battery
    type: ...
  - name: charge
    type: ...
  - name: aux
    type: ...
```

Vous trouverez les configurations des appareils connus sous [Appareils - Installation domestique](/fr/meters).

Les différents paramètres sont expliqués ci-dessous.

---

## Paramètres obligatoires

### `name`

Une désignation courte du compteur. Cette valeur sert à référencer l’appareil dans la configuration du [site](/fr/reference/configuration/site) ou du [point de charge](/fr/reference/configuration/loadpoints#meter).

**Par exemple** :

```yaml
name: charger1
```

---

### `type`

Il s’agit du type de compteur propre à evcc qui permet de communiquer avec l’appareil. Vous trouverez le type adapté aux appareils connus sous [Appareils - Installation domestique](/fr/meters).

**Par exemple** :

```yaml
type: modbus
```

Les différents types possibles et leurs paramètres supplémentaires sont documentés ci-dessous :

---

:::note[Remarque]
Les champs supplémentaires `title` et `icon` des compteurs ne sont pas pris en charge dans le fichier `evcc.yaml` pour des raisons techniques.
Les titres et les icônes (selon l’utilisation) ne peuvent être définis que pour les compteurs créés via l’interface de configuration.
:::

## Types pris en charge

### `movingaverage`

Ce type de compteur permet de lisser des valeurs de mesure fluctuantes. Il fonctionne avec toutes les utilisations de compteur (`usage`). Le paramètre `decay` indique le pourcentage de la nouvelle valeur pris en compte dans le calcul.

**Par exemple**

```yaml
meters:
- name: grid
  type: movingaverage
  decay: 0.1
  meter:
    type: template
    template: solarlog
    usage: grid
    host: 192.0.2.2
    ...
```

Dans cet exemple, 10 % de la nouvelle valeur est pris en compte. Après 10 cycles, la valeur la plus ancienne sort du calcul. La durée de ce processus dépend de l’`interval`.

---

### `modbus`

Appareils raccordés via l’interface Modbus et pris en charge par le projet [MBMD (ModBus Measurement Daemon)](https://github.com/volkszaehler/mbmd#supported-devices).

**Par exemple** :

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Paramètres obligatoires

En plus des paramètres définis ici, d’autres paramètres sont nécessaires. Ils sont décrits dans la documentation [Modbus](/fr/reference/modbus).

##### `power`

Définit la grandeur MBMD qui fournit la puissance, généralement `Power`.

**Par exemple** :

```yaml
power: Power
```

---

##### `energy`

Définit la grandeur MBMD qui fournit l’énergie, généralement `Sum`.

**Par exemple** :

```yaml
energy: Sum
```

---

#### Paramètres facultatifs

##### `soc`

Définit la grandeur MBMD qui fournit le niveau de charge de la batterie, généralement `ChargeState`.

**Par exemple** :

```yaml
soc: ChargeState
```

---

### `lgess`

Appareils LG ESS Home 8/10.

**Par exemple** :

```yaml
type: lgess
usage: grid
uri: https://192.0.2.2/
password: "DE200..."
```

:::note
Les paramètres `uri` et `password` ne sont nécessaires pour un appareil `meter` que si plusieurs appareils sont configurés.
:::

#### Paramètres obligatoires

##### `usage`

Indique quelles mesures sont nécessaires ici.

**Valeurs possibles** :

- **`grid`** : pour les mesures au point de raccordement au réseau
- **`pv`** : pour les mesures de la production solaire
- **`battery`** : pour les mesures de la batterie domestique

---

##### `uri`

Définit l’URL de l’appareil LG ESS dans le réseau domestique.

**Par exemple** :

```yaml
uri: https://192.0.2.2/
```

---

##### `password`

Le numéro d’enregistrement de l’onduleur LG ESS HOME doit être saisi ici.

**Par exemple** :

```yaml
password: "DE200..."
```

---

### `openwb`

Utilisation des mesures d’un chargeur OpenWB

**Par exemple** :

```yaml
type: openwb
usage: grid
broker: 192.0.2.2
```

:::note
Les paramètres `uri` et `password` ne sont nécessaires pour un appareil `meter` que si plusieurs appareils sont configurés.
:::

#### Paramètres obligatoires

##### `usage`

Indique quelles mesures sont nécessaires ici.

**Valeurs possibles** :

- **`grid`** : pour les mesures au point de raccordement au réseau
- **`pv`** : pour les mesures de la production solaire
- **`battery`** : pour les mesures de la batterie domestique

---

##### `broker`

Définit le nom d’hôte ou l’adresse IP ainsi que le port de l’OpenWB dans le réseau domestique.

**Par exemple** :

```yaml
broker: 192.0.2.2:1883
```

---

### `sma`

Pour utiliser le SMA Home Manager 2.0, le SMA Energy Meter ou un onduleur SMA. Les appareils doivent prendre en charge le protocole Speedwire.

**Par exemple** :

```yaml
type: sma
uri: 192.0.2.2
serial: 12345678
interface: eth0
```

---

#### Paramètres obligatoires

:::note
Il suffit de définir soit `uri`, soit `serial`.
:::

##### `uri`

Définit le nom d’hôte ou l’adresse IP de l’appareil dans le réseau domestique.

**Par exemple** :

```yaml
uri: 192.0.2.2
```

##### `serial`

Définit le numéro de série de l’appareil dont les mesures doivent être reçues.

**Par exemple** :

```yaml
serial: 12345678
```

#### Paramètres facultatifs

##### `interface`

Les messages multicast ne peuvent être reçus que sur une interface réseau donnée. Il s’agit généralement de la première interface du système. Si ce n’est pas l’interface reliée au compteur, l’interface doit être indiquée explicitement.

**Par exemple** :

```yaml
interface: eth0
```

---

### `tesla`

_`tesla`_ : pour utiliser les mesures d’une Tesla Powerwall.

**Par exemple** :

```yaml
type: tesla
usage: grid
uri: https://192.0.2.2/
password: "***"
```

---

#### Paramètres obligatoires

##### `usage`

Indique quelles mesures sont nécessaires ici.

**Valeurs possibles** :

- **`grid`** : pour les mesures au point de raccordement au réseau
- **`pv`** : pour les mesures de la production solaire
- **`battery`** : pour les mesures de la batterie domestique

---

##### `uri`

Définit le nom d’hôte ou l’adresse IP de l’appareil dans le réseau domestique.

**Par exemple** :

```yaml
uri: 192.0.2.2
```

---

##### `password`

Le mot de passe de l’utilisateur _customer_ doit être saisi ici.

**Par exemple** :

```yaml
password: "ThePassword"
```

---

### `custom`

Implémentation standard dans laquelle chaque valeur est définie via des [plugins](/fr/user-defined-devices#meter).

**Par exemple** :

```yaml
  type: custom
  power: # Power (W)
    source: # Plugin Type
    ...
  energy: # Energy (kWh)
    source: # Plugin Type
    ...
  returnenergy: # Energy in reverse direction (kWh)
    source: # Plugin Type
    ...
  soc: # Battery SOC (%)
    source: # Plugin Type
    ...
  capacity: # Optional Battery Capacity (kWh)
  currents: # Current (A) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  powers: # Power (W) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  voltages: # Voltage (V) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```

---

#### Paramètres obligatoires

##### `power`

Définition de plugin qui renvoie la puissance en watts (W).

**Par exemple** :

```yaml
  power: ... # Power (W)
    source: # Plugin Type
    ...
```

---

#### Paramètres facultatifs

##### `energy`

Définition de plugin qui renvoie l’énergie consommée en kilowattheures (kWh).

**Par exemple** :

```yaml
  energy: ... # Energy (kWh)
    source: # Plugin Type
    ...
```

---

##### `returnenergy`

Définition de plugin qui renvoie l’énergie dans le sens inverse en kilowattheures (kWh), p. ex. l’export vers le réseau.

**Par exemple** :

```yaml
  returnenergy: ... # Energy in reverse direction (kWh)
    source: # Plugin Type
    ...
```

---

#### `soc`

Définition de plugin qui renvoie le niveau de charge de la batterie en pourcentage (%).

**Par exemple** :

```yaml
  soc: ... # Battery SOC (%)
    source: # Plugin Type
    ...
```

---

#### `capacity`

Indique la capacité de la batterie. Elle n’est utile qu’en présence de plusieurs batteries et sert à calculer le niveau de charge global.

---

#### `currents`

Une liste de définitions de plugin qui renvoient le courant en ampères (A) par phase.

**Par exemple** :

```yaml
  currents: # Current (A) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```

---

#### `powers`

Une liste de définitions de plugin qui renvoient la puissance en watts (W) par phase.

**Par exemple** :

```yaml
  powers: # Power (W) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```

---

#### `voltages`

Une liste de définitions de plugin qui renvoient la tension en volts (V) par phase.

**Par exemple** :

```yaml
  voltages: # Voltage (V) per phase
    - source: # Phase 1 Plugin Type
      ...
    - source: # Phase 2 Plugin Type
      ...
    - source: # Phase 3 Plugin Type
      ...
  ...
```
