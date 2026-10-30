---
date: 2021-12-12
title: "Version 0.73"
description: "Notes de version d’evcc 0.73 de décembre 2021 avec un assistant evcc configure amélioré, des réglages de charge par véhicule et une première détection de position."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "4f5a2d6ac51a"
---

Voici aujourd’hui une petite mise à jour, principalement avec quelques corrections de bugs et d’autres améliorations.

<!-- excerpt -->

## `evcc configure`

La commande de création guidée d’un fichier de configuration et les modèles sur lesquels elle repose ont reçu les améliorations suivantes :

- Pour un point de charge, il est désormais possible de choisir si les réglages de charge par défaut doivent être rétablis lorsque le câble de charge est débranché. Plus d’informations dans notre documentation sous `resetOnDisconnect`.
- Des réglages de charge par défaut propres à chaque véhicule peuvent désormais être définis. En mode interactif, ils sont disponibles avec `evcc configure --advanced`. Plus d’informations dans la documentation sous `onIdentify`.
- Les appareils Modbus génèrent désormais des configurations correctes.
- Meilleure gestion du cas où un fichier `evcc.yaml` existe déjà dans le dossier courant mais avec d’autres droits d’accès.

## Détection de la position

Pour certains véhicules, **evcc** peut désormais détecter la position actuelle. Cette information n’est toutefois pas encore utilisée activement.

## Téléchargement et installation

- [Debian, Ubuntu, Raspberry Pi](/fr/installation/linux)
- [macOS Homebrew](/fr/installation/macos)
- [Docker](/fr/installation/docker)
- [Windows](/fr/installation/windows)

## Journal des modifications

- [Liste détaillée des modifications](https://github.com/evcc-io/evcc/releases/tag/0.73)
