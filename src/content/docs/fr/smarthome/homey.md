---
title: "Homey"
description: "L’application communautaire evcc pour Homey ajoute points de charge, site et batterie domestique comme appareils et pilote en local les modes et limites de charge."
translatedFrom: "d711ce90c00c"
---

[Homey](https://homey.app) est une box domotique qui relie des appareils de nombreux fabricants et les automatise à l’aide de Flows.
L’[application evcc pour Homey](https://homey.app/en-us/app/com.evcc.io/) relie Homey à votre instance evcc locale.
Il s’agit d’un projet communautaire de [rdvnit](https://github.com/rdvnit) qui ne fait pas partie d’evcc.

## Fonctionnalités

L’application propose trois types d’appareils :

- **Charging point** (point de charge) avec mode de charge, limite de charge, puissance de charge, énergie de la session, niveau de charge et autonomie du véhicule, ainsi que statut de connexion et de charge
- **Site** avec production solaire, puissance du réseau et consommation de la maison
- **Home battery** (batterie domestique) avec puissance de la batterie, niveau de charge et paramètres de pilotage de la batterie

Les cartes Flow vous permettent de définir le mode de charge, la limite de charge ainsi que les courants de charge minimal et maximal.
Les cartes de condition permettent de tester le mode de charge, le statut de charge et le statut de connexion.

L’application interroge votre instance evcc sur le réseau local et ne dépend d’aucun service cloud.

## Mise en place

1. Installez l’application **evcc** depuis l’[App Store Homey](https://homey.app/en-us/app/com.evcc.io/).
2. Ajoutez un appareil et choisissez **Charging point**, **evcc site** ou **Home battery**.
3. Saisissez l’URL de votre instance evcc (p. ex. `http://192.168.1.50:7070`) et le mot de passe, s’il est configuré.

Les détails et l’assistance sont disponibles dans le [dépôt GitHub](https://github.com/rdvnit/com.evcc.io).
