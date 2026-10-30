---
date: 2021-12-19
title: "Version 0.74"
description: "Notes de version d’evcc 0.74 de décembre 2021, qui affiche les minuteries actives du mode Solaire et de la commutation de phases et rétablit la charge programmée."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "df005046697e"
---

La mise à jour du jour est modeste : surtout des corrections de bugs et quelques autres améliorations.

## Minuteries dans l’interface

L’interface vous affiche désormais les minuteries qui tournent en arrière-plan :

![Minuterie de commutation de phases](../../../../../en/blog/2021/12/19/1p3p.png)

<!-- excerpt -->

- En mode Solaire :
  - Quand la charge sera interrompue
  - Quand la charge reprendra
- Commutation de phases 1P/3P :
  - Quand le passage en 3P aura lieu
  - Quand le retour en 1P aura lieu

Le nombre de phases utilisées pour la charge est également affiché.

## Charge programmée

![Interface de charge programmée](../../../../../en/blog/2021/12/19/zielladen.png)

La charge programmée est de retour. Elle permet de charger le véhicule électrique jusqu’au niveau de charge souhaité pour une date et une heure données.

## Téléchargement et installation

- [Debian, Ubuntu, Raspberry Pi](/fr/installation/linux)
- [macOS Homebrew](/fr/installation/macos)
- [Docker](/fr/installation/docker)
- [Windows](/fr/installation/windows)

## Journal des modifications

- [Liste détaillée des modifications](https://github.com/evcc-io/evcc/releases/tag/0.74)
