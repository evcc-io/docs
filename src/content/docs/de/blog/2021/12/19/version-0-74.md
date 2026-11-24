---
date: 2021-12-19
title: "Version 0.74"
description: "Release Notes zu evcc 0.74 vom Dezember 2021, das die laufenden Timer für PV-Modus und Phasenumschaltung in der Oberfläche zeigt und das Zielladen zurückbringt."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "df005046697e"
---

Das heutige Update ist ein kleines, hauptsächlich mit einigen Fehlerkorrekturen und weiteren Verbesserungen.

## Timer in der Oberfläche

Die Oberfläche zeigt dir nun die im Hintergrund laufenden Timer an:

![Timer Phasenumschaltung](../../../../../en/blog/2021/12/19/1p3p.png)

<!-- excerpt -->

- Im PV-Modus:
  - Wann das Laden unterbrochen wird
  - Wann das Laden wieder beginnt
- 1P/3P-Phasenumschaltung:
  - Wann auf 3P hochgeschaltet wird
  - Wann auf 1P heruntergeschaltet wird

Zusätzlich wird angezeigt, mit wie vielen Phasen geladen wird.

## Zielladen

![Zielladen-Oberfläche](../../../../../en/blog/2021/12/19/zielladen.png)

Das Zielladen ist zurück. Damit kannst du das Fahrzeug bis zu einem bestimmten Datum und einer bestimmten Uhrzeit auf den gewünschten Ladestand laden.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/de/installation/linux)
- [macOS Homebrew](/de/installation/macos)
- [Docker](/de/installation/docker)
- [Windows](/de/installation/windows)

## Changelog

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.74)
