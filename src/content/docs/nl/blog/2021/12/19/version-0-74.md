---
date: 2021-12-19
title: "Versie 0.74"
description: "Release notes voor evcc 0.74 uit december 2021, die de lopende timers voor de PV-modus en faseomschakeling in de UI toont en doelladen terugbrengt."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "df005046697e"
---

De update van vandaag is klein en bevat vooral enkele bugfixes en verdere verbeteringen.

## Timers in de UI

De interface toont u nu de timers die op de achtergrond lopen:

![Timer faseomschakeling](../../../../../en/blog/2021/12/19/1p3p.png)

<!-- excerpt -->

- In de PV-modus:
  - Wanneer het laden wordt onderbroken
  - Wanneer het laden wordt hervat
- 1p3p-faseomschakeling:
  - Wanneer er wordt opgeschakeld naar 3p
  - Wanneer er wordt teruggeschakeld naar 1p

Daarnaast wordt weergegeven met hoeveel fasen er geladen wordt.

## Doelladen

![UI voor doelladen](../../../../../en/blog/2021/12/19/zielladen.png)

Doelladen is terug. Daarmee laadt u de EV uiterlijk op een bepaalde datum en tijd tot het gewenste laadniveau.

## Download & installatie

- [Debian, Ubuntu, Raspberry Pi](/nl/installation/linux)
- [macOS Homebrew](/nl/installation/macos)
- [Docker](/nl/installation/docker)
- [Windows](/nl/installation/windows)

## Changelog

- [Gedetailleerde lijst met wijzigingen](https://github.com/evcc-io/evcc/releases/tag/0.74)
