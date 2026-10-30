---
date: 2021-12-12
title: "Versie 0.73"
description: "Release notes voor evcc 0.73 uit december 2021 met een verbeterd evcc configure, voertuigspecifieke standaardlaadinstellingen en een eerste vorm van locatieherkenning."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "3c89983a8f03"
---

Vandaag verschijnt er een kleine update met vooral enkele bugfixes en verdere verbeteringen.

<!-- excerpt -->

## `evcc configure`

De opdracht voor het begeleid aanmaken van een configuratiebestand en de onderliggende templates hebben de volgende verbeteringen gekregen:

- Bij een laadpunt kunt u nu instellen of de standaardlaadinstellingen worden hersteld wanneer de laadkabel wordt losgekoppeld. Meer daarover in onze documentatie onder `resetOnDisconnect`
- Er kunnen nu voertuigspecifieke standaardlaadinstellingen worden ingesteld. Interactief zijn die beschikbaar met `evcc configure --advanced`. Meer daarover in de documentatie onder `onIdentify`
- Modbus-apparaten genereren nu correcte configuraties
- Betere afhandeling wanneer er al een bestand `evcc.yaml` in de huidige map staat, maar met andere toegangsrechten.

## Locatieherkenning

Voor enkele voertuigen kan **evcc** nu de huidige locatie herkennen.
Dit wordt echter nog niet actief gebruikt.

## Download & installatie

- [Debian, Ubuntu, Raspberry Pi](/nl/installation/linux)
- [macOS Homebrew](/nl/installation/macos)
- [Docker](/nl/installation/docker)
- [Windows](/nl/installation/windows)

## Changelog

- [Gedetailleerde lijst met wijzigingen](https://github.com/evcc-io/evcc/releases/tag/0.73)
