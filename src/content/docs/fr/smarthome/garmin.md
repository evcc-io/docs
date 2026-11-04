---
title: "Garmin"
description: "L’application communautaire evccg affiche en direct les données d’evcc sur les montres Garmin : batterie domestique, véhicules, flux d’énergie et prévision solaire."
translatedFrom: "f9d195eb5934"
---

L’application [evccg](https://github.com/METIQ-Solutions/evcc-garmin) de [TheNinth7](https://github.com/TheNinth7) affiche les données en direct de votre instance evcc sur les montres connectées [Garmin](https://www.garmin.com).
Il s’agit d’un projet communautaire qui ne fait pas partie d’evcc.

## Fonctionnalités

L’application propose deux vues :

- **Glance** : un aperçu rapide de votre batterie domestique et des véhicules connectés avec leur niveau de charge et leur statut de charge
- **Widget** : des vues détaillées avec les flux d’énergie actuels, les détails des points de charge, la prévision solaire, les prix du réseau et des statistiques sur l’énergie solaire

Plusieurs instances evcc (sites) sont prises en charge.

## Mise en place

1. Installez l’application depuis le [Garmin Connect IQ Store](https://apps.garmin.com/apps/2bc2ba9d-b117-4cdf-8fa7-078c1ac90ab0).
2. Dans l’application Garmin Connect de votre téléphone, ouvrez les paramètres d’evccg et saisissez l’URL de votre instance evcc.

Si votre montre est appairée à un iPhone, l’application peut accéder directement à votre instance evcc en HTTP sur le réseau local.
Avec un téléphone Android, la connexion nécessite HTTPS avec un certificat valide.
Le [manuel d’utilisation](https://evccg.metiq.com) décrit les options en détail et couvre la mise en place, les appareils pris en charge et le dépannage.
