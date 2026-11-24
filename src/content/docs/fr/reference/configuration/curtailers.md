---
title: "curtailers"
description: "Ajoutez dans evcc.yaml des appareils de bridage qui limitent l’export solaire vers le réseau à la demande du gestionnaire de réseau, et découvrez quand ils sont requis."
sidebar:
  order: 6
translatedFrom: "ca8194269ca0"
---

Les _curtailers_ (appareils de bridage) sont une liste d’appareils qui ne limitent que l’export vers le réseau de l’installation photovoltaïque à la demande du gestionnaire de réseau (§ 9 EEG).
La plupart des onduleurs sont bridés via leur déclaration sous [`meters`](/fr/reference/configuration/meters) et n’ont pas besoin d’un appareil distinct.
Un appareil de bridage n’est nécessaire que si l’onduleur ne peut pas être bridé via sa configuration de compteur, pour le SMA Sunny Home Manager 2.0 ou pour les installations à plusieurs onduleurs où la limite doit être écrite dans l’onduleur principal.
Pour le contexte et la liste des appareils pris en charge, consultez [Limite externe](/fr/external-limit#curtailment-devices).

Les appareils de bridage sont référencés depuis [`site.curtailers`](/fr/reference/configuration/site#curtailers).
Ils ne deviennent actifs que lorsque l’intégration [`hems`](/fr/reference/configuration/hems) signale une limite d’export vers le réseau.
La limite est transmise de la même manière à tous les compteurs `pv` bridables et à tous les appareils de bridage, sous forme de pourcentage de la puissance installée du générateur.

**Par exemple** :

```yaml
curtailers:
  - name: my_curtailer
    type: template
    template: solaredge
    modbus: tcpip
    host: 192.168.0.10
    port: 1502
    id: 1
    productionnominalmax: 15000 # installed generator power of the whole installation (Wp)

site:
  curtailers:
    - my_curtailer
```

---

## Paramètres obligatoires

### `name`

Nom unique de l’appareil.
Sert de référence dans [`site.curtailers`](/fr/reference/configuration/site#curtailers).

---

### `type`

- `template` : l’un des [appareils pris en charge](/fr/external-limit#curtailment-devices). La page de l’appareil indique le bloc de configuration complet.
- `custom` : [appareil défini par l’utilisateur](/fr/user-defined-devices#curtailer) avec les plugins `curtail` et `curtailed`.
