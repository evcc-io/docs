---
date: 2021-12-10
title: "Versie 0.72"
description: "Release notes voor evcc 0.72 uit december 2021 met vereenvoudigde installatiehandleidingen en de nieuwe interactieve installatiewizard evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "fe9b6c445f25"
---

Er is de afgelopen weken veel gebeurd, en vandaag vertellen we wat uitgebreider wat er in versie 0.72 allemaal nieuw te ontdekken is.

![Voorbeeld van evcc configure](../../../../../en/blog/2021/12/10/configure.gif)

<!-- excerpt -->

## Eenvoudigere installatie

Tot nu toe had u wat technische kennis van uw besturingssysteem nodig om met **evcc** te beginnen. Voor Linux (Debian, Ubuntu, Raspberry Pi OS) en macOS is de installatie nu flink vereenvoudigd. **evcc** kan nu worden geïnstalleerd met de pakketbeheerders `apt` onder Linux en [`homebrew`](https://brew.sh) onder macOS.

We hebben de installatiehandleidingen nogmaals herzien om de installatie nog eenvoudiger te maken. Neem gerust een kijkje in de [bijbehorende documentatie](/nl/installation).

## Eenvoudigere configuratie

Ook het instellen van **evcc** was tot nu toe erg technisch. Of het nu gaat om de opmaakregels van [YAML](https://yaml.org), dat de syntaxis van de configuratie bepaalt, of om het beschrijven en aanpassen van uw eigen apparaten in het configuratiebestand: voor sommigen zijn dat behoorlijk hoge drempels. Maar het project is nog jong en het team klein, zeker als u bedenkt dat dit voor de ontwikkelaars “maar” een hobby is.

Om die drempels wat te verlagen, introduceert versie 0.72 van **evcc** een nieuwe functie: de begeleide configuratie met `evcc configure`.

Met deze opdracht kunt u interactief een werkend configuratiebestand voor uw eigen installatie aanmaken! Er zullen hier en daar vast nog wat problemen en fouten opduiken, maar we hopen dat het een goede eerste stap in de juiste richting is.

## Download & installatie

- [Debian, Ubuntu, Raspberry Pi](/nl/installation/linux)
- [macOS Homebrew](/nl/installation/macos)
- [Docker](/nl/installation/docker)
- [Windows](/nl/installation/windows)

## Changelog

### Versie 0.72

- [Gedetailleerde lijst met wijzigingen](https://github.com/evcc-io/evcc/releases/tag/0.72)

### Versie 0.71

- [Gedetailleerde lijst met wijzigingen](https://github.com/evcc-io/evcc/releases/tag/0.71)
