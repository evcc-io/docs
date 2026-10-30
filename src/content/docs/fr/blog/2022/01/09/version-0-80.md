---
date: 2022-01-09
title: "Version 0.80"
description: "Notes de version d’evcc 0.80 de janvier 2022, qui améliore evcc configure, affiche la part solaire et les économies et ajoute les tags Docker latest et nightly."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "9db66286559a"
---

Cette année aussi, les nouveautés continuent :) En plus des petites mises à jour 0.78 et 0.79, la version 0.80 apporte quelques changements plus importants.

<!-- excerpt -->

## Améliorations d’`evcc configure`

Lorsque vous créez une configuration avec `evcc configure`, l’assistant vous demande d’abord votre niveau de connaissances. Les utilisateurs avancés peuvent ainsi régler la configuration plus finement sur les aspects techniques. Ce mode reste aussi directement accessible via `evcc configure --advanced`. Nous ne le recommandons cependant pas aux débutants, car il demande davantage de connaissances.

Il y a en outre davantage de modèles d’appareils, des corrections des modèles existants et davantage de paramètres.

## Part solaire et économies

![Boîte de dialogue des économies](../../../../../en/blog/2022/01/09/ersparnis.png)

La nouvelle fonction d’économies vous indique quelle part de votre énergie de charge a été couverte par l’énergie solaire autoproduite.
Le pourcentage s’affiche dans le coin inférieur droit.
Cliquez dessus pour afficher plus de détails dans une boîte de dialogue.
En plus de la quantité d’énergie, elle indique votre prix effectif de l’énergie et vos économies totales par rapport à un import exclusivement depuis le réseau.
Vous trouverez plus d’informations sur le [calcul et la configuration des prix](/fr/faq#savings-calculation) dans la FAQ.

Les [parrains](/fr/sponsorship) trouveront, _\*roulement de tambour\*_, un lien vers nos nouveaux autocollants evcc : il suffit de cliquer sur le bouton « Merci » (avec confettis) dans la nouvelle boîte de dialogue.
Vous êtes les meilleurs. Merci pour votre soutien ! 💚🥳

## Docker

Si vous utilisez Docker, vous pouvez désormais utiliser le tag `latest` pour toujours obtenir la version actuelle. Le tag `nightly` fournit chaque jour de nouveaux builds, qui peuvent toutefois être moins bien testés. Vous trouverez plus d’informations sur l’installation avec Docker ici : [Docker, Synology](/fr/installation/docker)

## Corrections de bugs

Comme toujours, cette version contient une série de corrections de bugs et de nombreuses petites améliorations. Consultez la liste détaillée via les liens vers le journal des modifications ci-dessous.

## Téléchargement et installation

- [Debian, Ubuntu, Raspberry Pi](/fr/installation/linux)
- [macOS Homebrew](/fr/installation/macos)
- [Docker](/fr/installation/docker)
- [Windows](/fr/installation/windows)

## Journal des modifications

### Version 0.80

- [Liste détaillée des modifications](https://github.com/evcc-io/evcc/releases/tag/0.80)

### Version 0.79

- [Liste détaillée des modifications](https://github.com/evcc-io/evcc/releases/tag/0.79)

### Version 0.78

- [Liste détaillée des modifications](https://github.com/evcc-io/evcc/releases/tag/0.78)
