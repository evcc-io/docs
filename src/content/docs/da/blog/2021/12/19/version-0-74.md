---
date: 2021-12-19
title: "Version 0.74"
description: "Udgivelsesnoter for evcc 0.74 fra december 2021, som viser de kørende timere for Sol-tilstand og faseskift i brugerfladen og bringer målopladning tilbage."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "4ec9acb9cce2"
---

I dag kommer der en lille opdatering, hovedsageligt med nogle fejlrettelser og flere forbedringer.

## Timere i brugerfladen

Brugerfladen viser nu de timere, der kører i baggrunden:

![Timer for faseskift](../../../../../en/blog/2021/12/19/1p3p.png)

<!-- excerpt -->

- I Sol-tilstand:
  - Hvornår opladningen afbrydes
  - Hvornår opladningen genoptages
- 1p3p-faseskift:
  - Hvornår der skiftes op til 3p
  - Hvornår der skiftes ned til 1p

Derudover vises det også, hvor mange faser der oplades med.

## Målopladning

![Brugerflade for målopladning](../../../../../en/blog/2021/12/19/zielladen.png)

Funktionen til målopladning er tilbage. Med den kan man oplade elbilen til det ønskede opladningsniveau inden en bestemt dato og et bestemt klokkeslæt.

## Download og installation

- [Debian, Ubuntu, Raspberry Pi](/da/installation/linux)
- [macOS Homebrew](/da/installation/macos)
- [Docker](/da/installation/docker)
- [Windows](/da/installation/windows)

## Changelog

- [Detaljeret liste over ændringer](https://github.com/evcc-io/evcc/releases/tag/0.74)
