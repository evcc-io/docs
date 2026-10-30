---
date: 2022-01-09
title: "Version 0.80"
description: "Udgivelsesnoter for evcc 0.80 fra januar 2022 med forbedringer af evcc configure, en ny dialogboks for solandel og besparelse samt Docker-tags latest og nightly."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "c8cad4e6288a"
---

Også i år fortsætter vi med flere opdateringer :) Ud over de mindre opdateringer med 0.78 og 0.79 er der nu også et par større ændringer med version 0.80.

<!-- excerpt -->

## `evcc configure`-forbedringer

Når man opretter en konfiguration med `evcc configure`, bliver man først spurgt om sin egen erfaring. På den måde kan øvede brugere indstille konfigurationen lidt mere præcist på de tekniske områder. Denne tilstand er fortsat også direkte tilgængelig via `evcc configure --advanced`. Vi anbefaler dog ikke denne tilstand til begyndere, da den kræver mere erfaring.

Derudover er der flere enhedstemplates, rettelser til eksisterende templates og flere indstillingsmuligheder.

## Solandel og besparelse

![Dialogboks for besparelse](../../../../../en/blog/2022/01/09/ersparnis.png)

Den nye besparelsesfunktion viser dig, hvor meget af din ladestrøm der kunne dækkes af selvproduceret solenergi.
Procentværdien vises nederst i højre hjørne.
Når du klikker på den, får du vist flere detaljer i en dialogboks.
Dér ser du ud over energimængden også din effektive energipris og den samlede besparelse sammenlignet med ren import fra elnettet.
Her finder du mere information om [beregning og priskonfiguration](/da/faq#savings-calculation).

Under tak-konfetti-knappen i den nye dialogboks finder [sponsorer](/da/sponsorship) (_\*trommehvirvel\*_) et link til vores nye evcc-klistermærker.
I er de bedste. Tak for jeres støtte! 💚🥳

## Docker

Hvis du bruger Docker, kan du nu altid bruge den aktuelle version via tagget `latest`. Med tagget `nightly` kommer der nye builds hver dag, som til gengæld ikke er lige så gennemtestede. Mere information om Docker-installationen finder du her: [Docker, Synology](/da/installation/docker)

## Fejlrettelser

Denne version indeholder naturligvis igen en række fejlrettelser og mange små forbedringer. Se gerne en detaljeret liste via changelog-linket nedenfor.

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
