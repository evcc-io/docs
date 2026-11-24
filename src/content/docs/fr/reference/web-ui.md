---
title: "Interface web"
description: "Chaque page de l’interface web a sa propre URL à mettre en favori ou à partager, et des paramètres d’URL permettent d’imposer le thème, la langue ou les unités."
sidebar:
  order: 3
translatedFrom: "e90418bf26a9"
---

L’interface web fonctionne sur le port `7070` et utilise un routage par hash.
L’URL peut définir à la fois la page et les paramètres d’affichage.

## Pages disponibles {#links}

Chaque page a sa propre route (après le # de l’URL).
Vous pouvez y accéder par un lien direct ou l’ajouter à vos favoris.

| Page                       | Route        | Connexion requise | Paramètres                                        |
| -------------------------- | ------------ | ----------------- | ------------------------------------------------- |
| Accueil / points de charge | `#/`         | non               | `lp`                                              |
| Batterie domestique        | `#/battery`  | non               | —                                                 |
| Prévisions                 | `#/forecast` | non               | —                                                 |
| Sessions de charge         | `#/sessions` | non               | `month`, `year`, `loadpoint`, `vehicle`, `period` |
| Configuration              | `#/config`   | oui               | —                                                 |
| Journaux                   | `#/log`      | oui               | `areas`, `level`                                  |
| Historique 🧪              | `#/history`  | non               | `day`, `month`, `year`, `period`                  |
| Optimisation 🧪            | `#/optimize` | non               | —                                                 |
| Signaler un problème       | `#/issue`    | oui               | —                                                 |

🧪 signale les pages expérimentales.

| Paramètre   | Description                                            |
| ----------- | ------------------------------------------------------ |
| `lp`        | Numéro du point de charge, à partir de `1`             |
| `year`      | Année à afficher, p. ex. `2026`                        |
| `month`     | Mois, `1`–`12`                                         |
| `day`       | Jour du mois, `1`–`31`                                 |
| `period`    | Période : `day`, `month`, `year` ou `total`            |
| `loadpoint` | Titre du point de charge                               |
| `vehicle`   | Titre du véhicule                                      |
| `areas`     | Zones de journal à afficher, séparées par des virgules |
| `level`     | Niveau de journal minimal                              |

### Exemples {#examples}

Présélectionner un point de charge sur l’écran d’accueil :

```
http://evcc.local:7070/#/?lp=1
```

Le plus simple pour obtenir le bon lien est de sélectionner le point de charge dans l’interface et de copier l’adresse depuis votre navigateur.

Filtrer **Sessions de charge** ou **Historique** par période ou par appareil :

```
http://evcc.local:7070/#/sessions?year=2026&month=3
```

## Appliquer des paramètres {#settings}

Les options sous **Plus → Interface utilisateur** peuvent aussi être définies via l’URL.
Cela impose l’apparence de l’interface indépendamment de toute préférence enregistrée dans le navigateur, ce qui est utile pour les écrans en mode kiosque, les tableaux de bord et les intégrations en iframe :

| Nom            | Paramètre | Valeurs                 |
| -------------- | --------- | ----------------------- |
| Thème          | `theme`   | `auto`, `light`, `dark` |
| Langue         | `lang`    | `auto`, `de`, …         |
| Unités         | `unit`    | `km`, `mi`              |
| Format d’heure | `format`  | `12`, `24`              |

### Exemple {#example}

```
http://evcc.local:7070/?theme=dark&lang=de&unit=mi&format=24
```

Les valeurs sont appliquées une seule fois au chargement, enregistrées comme préférence du navigateur puis retirées de la barre d’adresse.

`lang` accepte tout code de langue disposant d’une traduction dans le [dossier `i18n`](https://github.com/evcc-io/evcc/tree/master/i18n) (p. ex. `de`, `fr`, `zh-Hans`) ou `auto` pour suivre la langue du navigateur.

Une même URL peut contenir à la fois des paramètres et une page.
Les paramètres se placent avant le `#`, la page après :

```
http://evcc.local:7070/?theme=dark&lang=de#/sessions
```
