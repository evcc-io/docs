---
title: "tariffs"
description: "Configurez dans evcc.yaml les tarifs du réseau et les prévisions CO₂ et solaires pour les statistiques d’économies, les plans de charge et les frais de réseau horaires."
sidebar:
  order: 12
translatedFrom: "104e48d142a6"
---

Vous pouvez indiquer votre tarif d’électricité et, le cas échéant, votre tarif d’export vers le réseau.
evcc utilise ces valeurs pour un [calcul approximatif des économies](/fr/faq#statistical-data) affiché dans l’interface web.
Ces données sont également utilisées par la [planification](/fr/features/plans) pour une charge optimisée selon le prix et le CO₂.

**Structure**

```yaml
tariffs:
  grid:
    type: ...
  feedin:
    type: ...
  co2:
    type: ...
  solar:
    type: ...
  temperature:
    type: ...
```

**Exemple : prix de l’énergie constant**

```yaml
tariffs:
  currency: EUR # (default EUR)
  grid:
    # static grid price
    type: fixed
    price: 0.294 # [currency]/kWh

  feedin:
    # rate for feeding excess (pv) energy to the grid
    type: fixed
    price: 0.08 # [currency]/kWh
```

Vous trouverez d’autres exemples et une liste des fournisseurs disponibles dans la section [Tarifs](/fr/tariffs).

## Frais de réseau selon l’heure {#charges-zones}

Utilisez `charges` pour ajouter des frais fixes par kWh à chaque valeur de prix.
Si votre gestionnaire de réseau facture des frais de réseau variables dans le temps (p. ex. les tarifs d’acheminement variables selon le § 14a EnWG en Allemagne), utilisez `chargesZones` pour remplacer la valeur par défaut de `charges` pendant certaines périodes.
Cela fonctionne avec n’importe quel tarif du réseau, qu’il utilise un modèle de fournisseur, un prix `fixed` ou une source `custom`.

Chaque zone comporte les champs suivants :

| Champ     | Obligatoire | Description                                                                      |
| --------- | ----------- | -------------------------------------------------------------------------------- |
| `charges` | oui         | Frais par kWh dans cette zone. Ils remplacent la valeur par défaut de `charges`. |
| `months`  | non         | p. ex. `Nov-Mar` ou `Jun`. Si vide : toute l’année.                              |
| `days`    | non         | p. ex. `Mon-Fri` ou `Sat,Sun`. Si vide : tous les jours.                         |
| `hours`   | non         | p. ex. `17-20` ou `15:30-21`. Si vide : toute la journée.                        |

**Exemple** :

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "..."
    charges: 0.0941 # default grid fee per kWh
    chargesZones:
      - months: Nov-Mar
        days: Mon-Fri
        hours: 17-20
        charges: 0.1838 # peak
      - hours: 0-6
        charges: 0.0299 # low
```

Si aucune zone ne correspond, la valeur par défaut de `charges` s’applique.
Si des zones se chevauchent, la dernière zone correspondante l’emporte.
Lorsqu’une `formula` est configurée, la variable `charges` contient la valeur de la zone pour le créneau horaire concerné.

Un tarif `fixed` avec `chargesZones` est traité comme un tarif dynamique : la planification privilégie les périodes bon marché et le graphique des prix s’affiche.

## Fonctionnalités optionnelles

Pour les tarifs personnalisés (`type: custom`), vous pouvez influer sur le comportement via `features` :

| Fonctionnalité | Description                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| average        | Regroupe les prix à pas fin (p. ex. au quart d’heure) en moyennes horaires.                                                               |
| cacheable      | Conserve les valeurs récupérées. Elles servent de solution de repli après un redémarrage ou une panne du fournisseur (jusqu’à 24 heures). |

**Exemple** :

```yaml
tariffs:
  grid:
    type: custom
    features:
      - cacheable
    # ... additional attributes
```
