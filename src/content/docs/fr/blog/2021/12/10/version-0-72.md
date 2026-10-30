---
date: 2021-12-10
title: "Version 0.72"
description: "Notes de version d’evcc 0.72 de décembre 2021 avec des guides d’installation simplifiés et le nouvel assistant de configuration interactif evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "fe9b6c445f25"
---

Il s’est passé beaucoup de choses ces dernières semaines, et nous aimerions aujourd’hui vous présenter un peu plus en détail ce qu’il y a de nouveau à découvrir dans la version 0.72.

![Exemple d’evcc configure](../../../../../en/blog/2021/12/10/configure.gif)

<!-- excerpt -->

## Installation simplifiée

Jusqu’à présent, démarrer avec **evcc** demandait certaines connaissances techniques sur votre système d’exploitation. Pour Linux (Debian, Ubuntu, Raspberry Pi OS) et macOS, l’installation est désormais nettement plus simple. **evcc** peut maintenant être installé avec les gestionnaires de paquets `apt` sous Linux et [`homebrew`](https://brew.sh) sous macOS.

Nous avons à nouveau remanié les guides d’installation pour rendre l’installation encore plus simple. Jetez un œil à la [documentation correspondante](/fr/installation).

## Configuration simplifiée

La configuration d’**evcc** était elle aussi jusqu’ici très technique. Qu’il s’agisse des règles de mise en forme de [YAML](https://yaml.org), qui définit la syntaxe de la configuration, ou de la description et de l’adaptation de vos propres appareils dans le fichier de configuration, ces étapes représentent pour certains des obstacles importants. Mais le projet est encore jeune et l’équipe réduite, surtout si l’on considère que ce n’est « que » un loisir pour les développeurs.

Pour réduire un peu ces obstacles, cette nouvelle version 0.72 d’**evcc** introduit une nouvelle fonctionnalité : la configuration guidée avec `evcc configure`.

Cette commande vous permet de créer de manière interactive un fichier de configuration fonctionnel pour votre propre installation ! Il y aura sûrement quelques problèmes et erreurs ici et là, mais nous espérons que c’est un premier pas dans la bonne direction.

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
