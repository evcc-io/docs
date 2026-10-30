---
date: 2021-12-19
title: "Version 0.74"
description: "Notes de version d’evcc 0.74 de décembre 2021, qui affiche les minuteries actives du mode Solaire et de la commutation de phases et rétablit la charge programmée."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "4ec9acb9cce2"
---

Voici aujourd’hui une petite mise à jour, principalement avec quelques corrections de bugs et d’autres améliorations.

## Minuteries dans l’interface

L’interface vous affiche désormais les minuteries qui tournent en arrière-plan :

![Minuterie de commutation de phases](../../../../../en/blog/2021/12/19/1p3p.png)

<!-- excerpt -->

- En mode Solaire :
  - Quand la charge est interrompue
  - Quand la charge reprend
- Commutation de phases 1p3p :
  - Quand le passage en 3p a lieu
  - Quand le retour en 1p a lieu

Le nombre de phases utilisées pour la charge est également affiché.

## Charge programmée

![Interface de charge programmée](../../../../../en/blog/2021/12/19/zielladen.png)

La fonction de charge programmée est de retour. Elle permet de charger le véhicule électrique jusqu’au niveau de charge souhaité pour une date et une heure données.

## Téléchargement et installation

- [Debian, Ubuntu, Raspberry Pi](/fr/installation/linux)
- [macOS Homebrew](/fr/installation/macos)
- [Docker](/fr/installation/docker)
- [Windows](/fr/installation/windows)

## Journal des modifications

- [Liste détaillée des modifications](https://github.com/evcc-io/evcc/releases/tag/0.74)
