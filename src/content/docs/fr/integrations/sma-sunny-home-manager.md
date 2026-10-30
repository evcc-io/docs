---
title: "Sunny Home Manager"
description: "Explique comment evcc affiche ses points de charge pour un SMA Sunny Home Manager 2.0 dans le Sunny Portal et lui permet, en option, d’influer sur la puissance de charge."
sidebar:
  order: 5
translatedFrom: "3e7eabc9fd7e"
---

evcc prend en charge l’intégration avec le [SMA Sunny Home Manager 2.0 (SHM)](https://www.sma.de/produkte/energiemanagement/sunny-home-manager).
Cette intégration rend les points de charge visibles dans le Sunny Portal et permet, en option, au SHM de les piloter.

## Fonctionnement

L’intégration est active en permanence.
Dès qu’evcc tourne, il fournit automatiquement un point de terminaison SEMP (Smart Energy Management Protocol) et l’annonce via mDNS sur le réseau local.
Le SHM peut ainsi détecter et intégrer automatiquement les points de charge.

Grâce à l’intégration, tous les points de charge d’evcc apparaissent comme consommateurs dans le Sunny Portal, avec des données de consommation détaillées.
De plus, le SHM peut influer sur la puissance de charge si vous l’y autorisez explicitement.

Le point de terminaison SEMP est accessible à l’adresse `http://[evcc-IP]:7070/semp/` et affiche une vue d’ensemble XML des appareils enregistrés.

## Configuration dans le Sunny Home Manager

Une fois evcc configuré, les points de charge sont automatiquement proposés comme nouveaux appareils dans le Sunny Portal sous **Configuration > Aperçu des appareils**.
Vous pouvez les y activer et suivre l’assistant de configuration.
Consultez le [manuel SMA](https://manuals.sma.de/HM-20/en-US/10426801547.html) pour les détails de la configuration.

## ID des appareils

Aucune configuration n’est nécessaire côté evcc.
evcc génère automatiquement les ID d’appareils nécessaires.

Chaque point de charge reçoit un ID unique au format :

```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Où :

- **AAAAAAAA** : l’ID du fabricant (8 caractères hexadécimaux)
- **BBBBBBBBBBBB** : l’ID de l’appareil (12 caractères hexadécimaux)

Si vous souhaitez remplacer ces ID générés automatiquement (p. ex. lorsque votre instance evcc change de matériel), vous pouvez copier les ID existants depuis le point de terminaison `/semp/` de l’ancien système et les saisir sous **Paramètres > Sunny Home Manager**.
Le SHM continue ainsi de reconnaître les appareils.
