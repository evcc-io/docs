---
date: 2022-01-09
title: "Version 0.80"
description: "Udgivelsesnoter for evcc 0.80 fra januar 2022 med forbedringer af evcc configure, en ny dialogboks for solandel og besparelse samt Docker-tags latest og nightly."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "9db66286559a"
---

Også i år bliver opdateringerne ved med at komme :) Ud over de mindre opdateringer i 0.78 og 0.79 bringer version 0.80 et par større ændringer.

<!-- excerpt -->

## `evcc configure`-forbedringer

Når du opretter en konfiguration med `evcc configure`, bliver du nu først spurgt om dit erfaringsniveau. På den måde kan øvede brugere finjustere de tekniske detaljer i konfigurationen. Denne tilstand er fortsat også direkte tilgængelig via `evcc configure --advanced`. Vi anbefaler den dog ikke til begyndere, da den kræver mere knowhow.

Derudover er der flere enhedsskabeloner, rettelser til eksisterende skabeloner og flere indstillinger.

## Solandel og besparelse

![Dialogboks for besparelse](../../../../../en/blog/2022/01/09/ersparnis.png)

Den nye besparelsesfunktion viser dig, hvor meget af din ladeenergi der blev dækket af selvproduceret solenergi.
Procentværdien vises nederst i højre hjørne.
Klik på den for at se flere detaljer i en dialogboks.
Ud over energimængden viser den din effektive energipris og din samlede besparelse sammenlignet med ren import fra elnettet.
Mere information om [beregning og priskonfiguration](/da/faq#savings-calculation) finder du i FAQ'en.

[Sponsorer](/da/sponsorship) finder, _\*trommehvirvel\*_, et link til vores nye evcc-klistermærker bag tak-konfetti-knappen i den nye dialogboks.
I er de bedste. Tak for jeres støtte! 💚🥳

## Docker

Hvis du bruger Docker, kan du nu bruge tagget `latest` for altid at få den aktuelle version. Tagget `nightly` leverer nye builds hver dag, som måske endnu ikke er lige så gennemtestede. Mere information om Docker-installationen finder du her: [Docker, Synology](/da/installation/docker)

## Fejlrettelser

Som altid indeholder denne version en række fejlrettelser og mange små forbedringer. Se changelog-linkene nedenfor for en detaljeret liste.

## Download og installation

- [Debian, Ubuntu, Raspberry Pi](/da/installation/linux)
- [macOS Homebrew](/da/installation/macos)
- [Docker](/da/installation/docker)
- [Windows](/da/installation/windows)

## Changelog

### Version 0.80

- [Detaljeret liste over ændringer](https://github.com/evcc-io/evcc/releases/tag/0.80)

### Version 0.79

- [Detaljeret liste over ændringer](https://github.com/evcc-io/evcc/releases/tag/0.79)

### Version 0.78

- [Detaljeret liste over ændringer](https://github.com/evcc-io/evcc/releases/tag/0.78)
