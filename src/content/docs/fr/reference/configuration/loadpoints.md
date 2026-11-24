---
title: "loadpoints"
description: "Configurez les points de charge dans evcc.yaml avec chargeur, compteur et véhicule, choisissez le mode par défaut et ajustez l’interrogation, les seuils et les phases."
sidebar:
  order: 3
translatedFrom: "05c846a87f23"
---

`loadpoints` (points de charge) est une liste de points de charge qui associe pour chacun un chargeur, des véhicules et, si nécessaire, un compteur, avec d’autres paramètres facultatifs. Une configuration minimale nécessite un chargeur.

**Exemple** :

```yaml
loadpoints:
  - title: Garage # nom affiché dans l’interface
    charger: charger # référence au chargeur
    vehicle: audi # référence au véhicule par défaut
    mode: smart # mode de charge (off, smart, now)
```

Les références correspondent toujours aux valeurs du paramètre `name` (p. ex. `charger`) dans la configuration de l’appareil concerné.

Voici maintenant l’explication de tous les paramètres possibles.

---

## Paramètres obligatoires

### `title`

Une désignation du point de charge, affichée dans l’interface utilisateur.

**Exemple** :

```yaml
title: Garage
```

---

### `charger`

Référence à une configuration `charger`.

**Exemple** :

```yaml
charger: charger
```

La valeur `charger` correspond ici à la valeur du paramètre `name` dans la [définition du chargeur](/fr/reference/configuration/chargers#name).

---

## Paramètres facultatifs

### `meter`

Référence à une configuration `meter` (compteur électrique).

Cette entrée n’est nécessaire que si le chargeur utilisé n’effectue pas sa propre mesure du courant ou si evcc ne peut pas lire les valeurs mesurées depuis le chargeur. Même dans ce cas, cette entrée reste facultative, car evcc suppose que le courant maximal réglé est aussi utilisé pour la charge.

**Exemple** :

```yaml
meter: charge
```

La valeur `charge` correspond ici à la valeur du paramètre `name` dans la [définition du compteur électrique](/fr/reference/configuration/meters#name).

---

### `vehicle`

`vehicle` : référence à une configuration `vehicle` attribuée au point de charge comme véhicule par défaut.

Lorsqu’un véhicule est branché au chargeur, evcc suppose que c’est ce véhicule qui est connecté. La détection automatique du véhicule n’a pas lieu. Si un autre véhicule est connecté (p. ex. un véhicule invité), il peut être attribué manuellement par la suite.

**Exemple** :

```yaml
vehicle: renault
```

La valeur `renault` correspond ici à la valeur du paramètre `name` dans la [définition du véhicule](/fr/reference/configuration/vehicles#name).

---

### `mode`

evcc mémorise le dernier mode de charge utilisé.
Le paramètre `mode` vous permet d’indiquer le mode de charge à utiliser après la déconnexion du véhicule.

**Valeurs possibles** :

- `off` : la charge est arrêtée, même si un véhicule est connecté au chargeur.
- `smart` : charge avec le surplus solaire, les heures bon marché d’un tarif dynamique et les plans de charge. La charge est suspendue si aucune énergie bon marché n’est disponible.
- `now` : la charge démarre immédiatement à la puissance maximale possible.

**Valeur par défaut :** `smart`

Les valeurs obsolètes `pv` et `minpv` sont encore acceptées en écriture :
`pv` active `smart` et désactive [Toujours en charge](/fr/features/modes#always-charge), `minpv` active `smart` et active « Toujours en charge ».

:::caution[Changement incompatible]
En lecture, l’état et l’API (`/api/state`, websocket, MQTT) renvoient `smart` au lieu de `pv` ; `minpv` n’apparaît plus en lecture.
Les automatisations externes qui comparent avec `pv` ou `minpv` lors de la lecture doivent être mises à jour.
Les intégrations peuvent détecter le nouveau schéma des modes grâce à la présence de `loadpoints[].alwaysCharge` dans `/api/state`.
:::

:::note
En général, un véhicule électrique a besoin d’au moins 1,4 kW de puissance par phase pour charger. Avec les chargeurs et véhicules qui communiquent selon la norme ISO 15118, il faut au total au moins 1,4 kW de puissance, quel que soit le nombre de phases utilisées pour la charge.
:::

**Exemple** :

```yaml
mode: smart
```

---

### `soc`

Définit les réglages par défaut pour la gestion du niveau de charge d’un véhicule connecté.

**Exemple** :

```yaml
soc:
  poll:
    mode: charging
    interval: 60m
  estimate: true
```

#### `poll`

Définit comment les API du véhicule sont utilisées pour récupérer des informations en temps réel sur le véhicule.

Si le drapeau `integrateddevice` est configuré dans les `features` du chargeur, les données sont récupérées en continu.
Dans ce cas, aucun réglage `poll` n’est nécessaire, et ceux qui sont définis sont ignorés.

:::caution
Il est **DÉCONSEILLÉ** de modifier les réglages par défaut, car cela peut décharger la batterie du véhicule ou amener le constructeur à bloquer activement le pilotage de la charge par evcc. **À vos propres risques**.
:::

#### `poll.mode`

Définit dans quelles conditions les données du véhicule sont récupérées.

**Valeurs possibles** :

- `charging` : mise à jour des données **UNIQUEMENT** pendant une session de charge (réglage par défaut recommandé).
- `connected` : mise à jour des données lorsque le véhicule est connecté au chargeur (pas seulement pendant la charge) ; le paramètre `interval` définit la fréquence.
- `always` : mise à jour permanente des données, même lorsque le véhicule n’est pas connecté au chargeur ; le paramètre [`interval`](#pollinterval) définit la fréquence (pris en charge uniquement pour un seul véhicule par point de charge).

**Valeur par défaut :** `charging`

**Exemple** :

```yaml
mode: charging
```

#### `poll.interval`

Définit à quelle fréquence le véhicule est interrogé lorsqu’il ne charge **PAS**.

**Valeur par défaut :** `60m`

**Exemple** :

```yaml
interval: 60m
```

#### `estimate`

Estime le niveau de charge actuel à partir de l’énergie de charge mesurée (extrapolation) entre les interrogations du véhicule définies par `interval`.

**Valeurs possibles** :

- `true` : evcc extrapole les valeurs du niveau de charge entre les interrogations des données du véhicule (recommandé).
- `false` : evcc utilise uniquement les valeurs du niveau de charge renvoyées par le véhicule.

**Valeur par défaut :** `true`

**Exemple** :

```yaml
estimate: false # pas d’extrapolation
```

---

### `enable`

Définit le comportement au démarrage de la charge avec le surplus solaire en mode Intelligent. Il définit en outre le comportement lors de la commutation automatique du monophasé au triphasé.

:::note
Pour autoriser une part d’énergie du réseau, utilisez plutôt le curseur **Part solaire** dans les paramètres du point de charge (voir [Pas assez de surplus ?](/fr/features/solar-charging#not-enough-surplus)).
Le curseur est désactivé tant qu’un seuil `enable` ou `disable` est défini.
:::

**Exemple** :

```yaml
enable:
  threshold: 0
  delay: 1m
```

#### `threshold`

Définit le seuil de puissance au point de raccordement au réseau, en watts (W).

**Valeurs possibles** : une valeur positive pour l’import du réseau, une valeur négative pour l’export vers le réseau. Avec `0`, l’export doit atteindre la puissance de charge minimale.

**Valeur par défaut :** `0`

**Exemple** :

```yaml
threshold: 0
```

:::note
Si le site définit `residualPower` (décalage du point de fonctionnement visé par la régulation du surplus), tenez compte de cette valeur pour régler `threshold`.

Par exemple, si `residualPower` vaut 200 (la régulation d’evcc fixe le point de fonctionnement visé à 200 W d’export vers le réseau), une valeur `threshold` de 100 pour `enable` ne signifie pas que la charge démarre à 100 W d’import du réseau. La puissance d’export restante est au contraire réduite de 100 W, et la charge démarre à 100 W d’export vers le réseau.

Pour démarrer la charge à 100 W d’import du réseau dans ce cas, la valeur `threshold` doit être réglée sur 300.
:::

#### `delay`

Définit pendant combien de temps le `threshold` doit être atteint.

**Valeur par défaut :** `1m`

**Exemple** :

```yaml
delay: 1m
```

---

### `disable`

Définit le comportement à l’arrêt de la charge avec le surplus solaire en mode Intelligent. Il définit en outre le comportement lors de la commutation automatique du triphasé au monophasé.

**Exemple** :

```yaml
disable:
  threshold: 200 # puissance d’import maximale (W)
  delay: 10m
```

#### `threshold`

Définit le seuil de puissance au point de raccordement au réseau, en watts (W).

**Valeurs possibles** : une valeur positive pour l’import du réseau. Avec `0`, la charge s’arrête dès que le surplus ne couvre plus la puissance de charge minimale.

**Valeur par défaut :** `0`

**Exemple** :

```yaml
threshold: 200 # import du réseau de 200 W maximum autorisé
```

:::note
Si le site définit `residualPower` (décalage du point de fonctionnement visé par la régulation du surplus), tenez compte de cette valeur pour régler `threshold`. Reportez-vous à l’exemple dans la remarque sur le `threshold` de [`enable`](#enable).
:::

:::caution
Les valeurs négatives n’ont aucun effet : tant qu’un surplus est disponible, evcc continue de charger et ne vérifie jamais le seuil.
:::

#### `delay`

Définit pendant combien de temps le `threshold` doit être atteint.

**Valeur par défaut :** `3m`

**Exemple** :

```yaml
delay: 10m
```

---

### `phases`

:::note[Obsolète en YAML]
Cette valeur peut désormais être réglée dans la boîte de dialogue des paramètres du point de charge.
:::

**Chargeur sans commutation automatique des phases** :

Définit le nombre de phases avec lequel le chargeur est raccordé.

Ce paramètre ne modifie pas le raccordement physique du chargeur, mais sert à déterminer la puissance minimale de démarrage pour la charge avec le surplus solaire (en combinaison avec `minCurrent`).

Depuis peu, les tensions de phase sont évaluées si le compteur du chargeur les fournit. En fonction des tensions, la valeur `phases` est modifiée automatiquement via l’API. Lorsque le chargeur est réglé en monophasé ou en triphasé à l’aide d’un commutateur, il n’est plus nécessaire de modifier manuellement la valeur `phases`.

Lorsque la charge en monophasé ou en triphasé est réalisée avec le câble de charge correspondant plutôt qu’avec un commutateur, ce comportement « automatique » pose problème. Dans ce cas, la valeur `phases` doit être adaptée en conséquence dans le `vehicle`. Comme cette valeur ne peut pas être modifiée via l’API, la solution de contournement suivante peut être utilisée :

Configurez le véhicule deux fois : une fois avec `phases: 1` et une fois avec `phases: 3`. Selon le nombre de phases souhaité, sélectionnez le véhicule correspondant dans l’interface.

Si un véhicule connu est connecté, la plus petite valeur entre `vehicle: phases` et `loadpoint: phases` est utilisée pour le calcul. Pour les véhicules inconnus, seul `loadpoint: phases` est pris en compte.

Pendant la charge du véhicule, si le chargeur ou le compteur de charge fournit les courants par phase, le nombre réel de phases est détecté, puis utilisé pour calculer les seuils de commutation tant que le véhicule reste connecté. Cela ne fonctionne que pour les points de charge triphasés.

**Valeur par défaut :** `3`

**Valeurs possibles :** `1|3`

**Exemple** :

```yaml
phases: 1
```

**Chargeur avec commutation automatique des phases** :

La valeur détermine si la commutation automatique des phases est activée ou désactivée.

`phases: 0` = commutation automatique activée

`phases: 1 or 3` = commutation automatique désactivée, la valeur réglée est fixe

**Valeur par défaut :** `3`

**Valeurs possibles :** `0|1|3`

**Exemple** :

```yaml
phases: 0
```

:::note
Si le point de charge n’est pas associé à un chargeur mais à l’une des prises commutables compatibles (AVM FritzDECT, Shelly, Tasmota, TP-Link, etc.), `phases` doit être réglé sur **1** pour garantir un pilotage correct de la charge.
:::

---

### `priority`

Pendant la charge, ce paramètre établit des priorités entre les points de charge.

Le point de charge prioritaire reçoit la puissance de charge des autres points de charge non prioritaires ou de priorité inférieure. Lorsqu’un point de charge prioritaire utilise cette puissance, un import du réseau de courte durée peut se produire jusqu’à ce que la régulation se stabilise.

Plus la valeur est élevée, plus la priorité est haute. Les points de charge sans entrée ont `priority: 0`.

Lorsque plusieurs points de charge sont présents, ce paramètre n’influence pas l’ordre dans lequel les sessions de charge démarrent. En revanche, si un point de charge de priorité inférieure est en train de charger, un point de charge de priorité supérieure peut être activé s’il obtient l’accès à la puissance de charge inutilisée.

Cette priorisation fonctionne en mode `smart`. Lorsque [Toujours en charge](/fr/features/modes#always-charge) est actif, la charge n’est pas interrompue, mais seulement réduite au minimum.

:::note
Si une priorité est définie pour un véhicule, elle remplace la priorité du point de charge auquel il est connecté.
:::

**Valeur par défaut :** `0`

**Exemple** :

```yaml
priority: 2
```

---
