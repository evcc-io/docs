---
title: "API MQTT"
description: "Liste les topics MQTT qu’evcc publie pour votre site, vos points de charge, véhicules et batterie domestique, et ceux qui modifient les modes, limites ou plans de charge."
sidebar:
  order: 2
translatedFrom: "57bf7b20695d"
---

L’[état de l’API](/fr/reference/state) est également publié via MQTT.
Chaque champ devient un topic distinct ; les objets imbriqués et les listes sont convertis en sous-topics individuels (l’index commence à `1`).

## Topics en lecture seule

### Site

- `evcc/site/siteTitle` : titre du site
- `evcc/site/currency` : devise configurée
- `evcc/site/homePower` : consommation actuelle de la maison (W)
- `evcc/site/pvPower` : production solaire actuelle (W)
- `evcc/site/grid/power` : puissance actuelle du réseau (W, positive = import)
- `evcc/site/battery/power` : puissance de la batterie (W, positive = décharge)
- `evcc/site/battery/soc` : niveau de charge de la batterie (%)
- `evcc/site/greenShareHome` : part d’énergie autoproduite dans la consommation de la maison (0 à 1)
- `evcc/site/greenShareLoadpoints` : part d’énergie autoproduite dans la consommation des points de charge (0 à 1)
- `evcc/site/tariffGrid` : tarif actuel d’import du réseau
- `evcc/site/tariffFeedIn` : tarif actuel d’export vers le réseau
- `evcc/site/tariffCo2` : intensité de CO₂ actuelle
- `evcc/site/batteryGridChargeActive` : charge de la batterie depuis le réseau active (true/false)

### Points de charge

Tous les ID de points de charge commencent à `1`.

- `evcc/loadpoints` : nombre de points de charge disponibles
- `evcc/loadpoints/<id>/title` : titre du point de charge
- `evcc/loadpoints/<id>/connected` : véhicule branché (true/false)
- `evcc/loadpoints/<id>/charging` : charge en cours (true/false)
- `evcc/loadpoints/<id>/enabled` : chargeur activé (true/false)
- `evcc/loadpoints/<id>/mode` : mode de charge (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge` : option « Toujours en charge » (`off`, `on`, `once`)
- `evcc/loadpoints/<id>/chargePower` : puissance de charge actuelle (W)
- `evcc/loadpoints/<id>/chargedEnergy` : énergie chargée pendant la session (Wh)
- `evcc/loadpoints/<id>/chargeDuration` : durée de charge (ns)
- `evcc/loadpoints/<id>/chargeRemainingDuration` : durée de charge restante (ns)
- `evcc/loadpoints/<id>/chargeRemainingEnergy` : énergie restante (Wh)
- `evcc/loadpoints/<id>/chargeTotalImport` : index total du compteur de charge (Wh)
- `evcc/loadpoints/<id>/vehicleName` : identifiant du véhicule
- `evcc/loadpoints/<id>/vehicleTitle` : nom d’affichage du véhicule
- `evcc/loadpoints/<id>/vehicleSoc` : niveau de charge du véhicule (%)
- `evcc/loadpoints/<id>/vehicleRange` : autonomie du véhicule (km)
- `evcc/loadpoints/<id>/phasesActive` : phases actives
- `evcc/loadpoints/<id>/planActive` : plan de charge actuellement actif (true/false)
- `evcc/loadpoints/<id>/sessionEnergy` : énergie de la session (Wh)
- `evcc/loadpoints/<id>/sessionSolarPercentage` : part d’énergie autoproduite de la session (%)
- `evcc/loadpoints/<id>/smartCostActive` : charge réseau intelligente actuellement active (true/false)
- `evcc/loadpoints/<id>/effectivePriority` : priorité effective

:::caution[Autres topics]
Cette liste est incomplète.
Pour voir tous les topics disponibles, utilisez [MQTT Explorer](https://mqtt-explorer.com/).
:::

## Topics en écriture

Pour modifier une valeur, ajoutez `/set` au topic et publiez la nouvelle valeur.

```bash
mosquitto_pub -t "evcc/loadpoints/1/phasesConfigured/set" -m "3"
```

Les heures sont en UTC au format `yyyy-mm-ddThh:mm:ssZ`, p. ex. `2023-03-05T07:00:00Z` (= 5 mars 2023, 8 h 00 CET).

Les chaînes suivantes sont reconnues comme valeurs vides : `nil`, `null`, `none`, `-`.
Utilisez-les pour réinitialiser des seuils définis auparavant :

```bash
mosquitto_pub -t "evcc/site/batteryGridChargeLimit/set" -m "none"
```

### Site

- `evcc/site/prioritySoc` : niveau de charge prioritaire de la batterie
- `evcc/site/bufferSoc` : niveau de charge tampon de la batterie
- `evcc/site/bufferStartSoc` : niveau de charge de démarrage du tampon de la batterie
- `evcc/site/residualPower` : puissance résiduelle au réseau
- `evcc/site/batteryGridChargeLimit` : limite de prix pour la charge intelligente
- `evcc/site/batteryDischargeControl` : activer/désactiver le contrôle de la décharge de la batterie (true/false)
- `evcc/site/batteryMode` : mode de batterie externe (`normal`, `hold`, `charge`, `holdcharge`, `discharge`), pilote directement toutes les batteries contrôlables, prime sur les autres modes d’evcc et se réinitialise après 60 s
- `evcc/site/smartCostLimit` : limite de prix pour la charge intelligente pour tous les points de charge
- `evcc/site/smartFeedInPriorityLimit` : limite de prix pour la priorité à l’export pour tous les points de charge

### Points de charge

- `evcc/loadpoints/<id>/mode` : mode de charge (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge` : option « Toujours en charge » (`off`, `on`, `once`), uniquement en mode Intelligent
- `evcc/loadpoints/<id>/minSoc` : niveau de charge minimal
- `evcc/loadpoints/<id>/limitSoc` : limite de niveau de charge en %, uniquement pour les véhicules en ligne
- `evcc/loadpoints/<id>/limitEnergy` : limite d’énergie en kWh, uniquement pour les véhicules hors ligne
- `evcc/loadpoints/<id>/planEnergy` : énergie du plan de charge (charge utile JSON : `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phasesConfigured` : phases configurées
- `evcc/loadpoints/<id>/minCurrent` : valeur du courant minimal
- `evcc/loadpoints/<id>/maxCurrent` : valeur du courant maximal
- `evcc/loadpoints/<id>/solarShare` : part solaire de la puissance de charge minimale (0 à 1)
- `evcc/loadpoints/<id>/enableThreshold` : valeur de seuil
- `evcc/loadpoints/<id>/enableDelay` : valeur de délai (s)
- `evcc/loadpoints/<id>/disableThreshold` : valeur de seuil
- `evcc/loadpoints/<id>/disableDelay` : valeur de délai (s)
- `evcc/loadpoints/<id>/batteryboost` : boost batterie activé (1/0)
- `evcc/loadpoints/<id>/batteryBoostLimit` : limite de niveau de charge du boost batterie
- `evcc/loadpoints/<id>/priority` : valeur de priorité
- `evcc/loadpoints/<id>/smartCostLimit` : limite de prix pour la charge intelligente
- `evcc/loadpoints/<id>/smartFeedInPriorityLimit` : limite de prix pour la priorité à l’export
- `evcc/loadpoints/<id>/planStrategy` : stratégie du plan de charge (JSON)
- `evcc/loadpoints/<id>/vehicle` : définir le véhicule par son nom

### Véhicules

Pour les noms de véhicules, voir `evcc/vehicles`.

- `evcc/vehicles/<name>/minSoc` : niveau de charge minimal en %
- `evcc/vehicles/<name>/limitSoc` : limite de niveau de charge en %
- `evcc/vehicles/<name>/planSoc` : niveau de charge du plan de charge (charge utile JSON : `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/vehicles/<name>/planStrategy` : stratégie du plan de charge (JSON)
