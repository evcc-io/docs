---
date: 2021-12-10
title: "Version 0.72"
description: "Notes de version d’evcc 0.72 de décembre 2021 avec des guides d’installation simplifiés et le nouvel assistant de configuration interactif evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "853d43f3c405"
---

Il s’est passé beaucoup de choses ces dernières semaines, et nous aimerions aujourd’hui vous présenter un peu plus en détail tout ce qu’il y a de nouveau à découvrir dans la version 0.72.

![Exemple d’evcc configure](../../../../../en/blog/2021/12/10/configure.gif)

<!-- excerpt -->

## Installation simplifiée

Jusqu’à présent, l’accès à **evcc** demandait tout de même certaines connaissances techniques du système d’exploitation utilisé. Pour Linux (Debian, Ubuntu, Raspberry Pi OS) et macOS, l’installation est désormais nettement simplifiée. **evcc** prend ainsi désormais en charge l’installation via les gestionnaires de paquets `apt` sous Linux et [`homebrew`](https://brew.sh) sous macOS.

Nous avons également remanié les guides d’installation pour qu’ils soient plus simples à suivre. Jetez donc un œil à la [documentation correspondante](/fr/installation).

## Configuration simplifiée

La configuration d’**evcc** était elle aussi jusqu’ici très technique. Qu’il s’agisse des règles de mise en forme de [YAML](https://yaml.org), qui définit la syntaxe, ou de la description de ses propres appareils dans le fichier de configuration, ce sont pour certains des obstacles assez importants. Mais le projet est encore jeune et l’équipe réduite, surtout si l’on considère que ce n’est « que » un loisir pour les développeurs.

Pour réduire un peu ces obstacles, nous introduisons avec cette nouvelle version 0.72 d’**evcc** une nouvelle fonctionnalité : la configuration guidée avec `evcc configure`.

Cette commande permet de créer de manière interactive un fichier de configuration fonctionnel pour votre propre installation ! Il reste sûrement encore quelques problèmes et erreurs ici et là, mais nous espérons que c’est un bon premier pas dans la bonne direction.

## Téléchargement et installation

- [Debian, Ubuntu, Raspberry Pi](/fr/installation/linux)
- [macOS Homebrew](/fr/installation/macos)
- [Docker](/fr/installation/docker)
- [Windows](/fr/installation/windows)

## Journal des modifications

### Version 0.72

- [Liste détaillée des modifications](https://github.com/evcc-io/evcc/releases/tag/0.72)

### Version 0.71

- [Liste détaillée des modifications](https://github.com/evcc-io/evcc/releases/tag/0.71)
