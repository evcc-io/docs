---
date: 2021-12-12
title: "Version 0.73"
description: "Udgivelsesnoter for evcc 0.73 fra december 2021 med en bedre opsætningsguide evcc configure, køretøjsspecifikke standardindstillinger og første positionsgenkendelse."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "3c89983a8f03"
---

I dag kommer der en lille opdatering, hovedsageligt med nogle fejlrettelser og yderligere forbedringer.

<!-- excerpt -->

## `evcc configure`

Kommandoen til guidet oprettelse af en konfigurationsfil og de underliggende skabeloner har fået følgende forbedringer:

- For et ladepunkt kan du nu indstille, om standardindstillingerne for opladning gendannes, når ladekablet tages ud. Mere om det i vores dokumentation under `resetOnDisconnect`.
- Køretøjsspecifikke standardindstillinger for opladning kan nu opsættes. De er tilgængelige interaktivt med `evcc configure --advanced`. Mere om det i dokumentationen under `onIdentify`.
- Modbus-enheder genererer nu korrekte konfigurationer.
- Forbedret håndtering, når en `evcc.yaml`-fil allerede findes i den aktuelle mappe, men har andre adgangsrettigheder.

## Positionsgenkendelse

For nogle køretøjer kan **evcc** nu genkende den aktuelle position.
Den bliver dog endnu ikke brugt aktivt.

## Download og installation

- [Debian, Ubuntu, Raspberry Pi](/da/installation/linux)
- [macOS Homebrew](/da/installation/macos)
- [Docker](/da/installation/docker)
- [Windows](/da/installation/windows)

## Changelog

- [Detaljeret liste over ændringer](https://github.com/evcc-io/evcc/releases/tag/0.73)
