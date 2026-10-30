---
date: 2021-12-12
title: "Version 0.73"
description: "Release Notes zu evcc 0.73 vom Dezember 2021 mit besserem evcc configure, fahrzeugspezifischen Standard-Ladeeinstellungen und einer ersten Standorterkennung."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "3c89983a8f03"
---

Heute gibt es ein kleines Update, hauptsächlich mit einigen Fehlerkorrekturen und weiteren Verbesserungen.

<!-- excerpt -->

## `evcc configure`

Der Befehl zur geführten Erstellung einer Konfigurationsdatei und die darunterliegenden Templates haben folgende Verbesserungen erhalten:

- Bei einem Ladepunkt kann nun eingestellt werden, ob beim Abstecken des Ladekabels die Standard-Ladeeinstellungen wiederhergestellt werden sollen. Mehr dazu in unserer Dokumentation unter `resetOnDisconnect`.
- Es können nun fahrzeugspezifische Standard-Ladeeinstellungen eingerichtet werden. Interaktiv sind diese mit `evcc configure --advanced` verfügbar. Mehr dazu in der Dokumentation unter `onIdentify`.
- Geräte mit Modbus erzeugen nun korrekte Konfigurationen.
- Eine `evcc.yaml`-Datei, die bereits im aktuellen Ordner existiert, aber andere Zugriffsrechte hat, wird nun besser behandelt.

## Standorterkennung

Für einige Fahrzeuge kann **evcc** nun den aktuellen Standort erkennen.
Dies wird momentan jedoch noch nicht aktiv verwendet.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/de/installation/linux)
- [macOS Homebrew](/de/installation/macos)
- [Docker](/de/installation/docker)
- [Windows](/de/installation/windows)

## Changelog

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.73)
