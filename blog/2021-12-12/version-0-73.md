---
title: Version 0.73
authors: [derandereandi]
tags: [release]
hide_table_of_contents: false
---

Heute gibt es ein kleines Update hauptsächlich mit einigen Fehlerkorrekturen und weiteren Verbesserungen.

<!-- truncate -->

## `evcc configure`

Das Kommando zur geführten Erstellung einer Konfigurationsdatei und die darunterliegenden Templates hat folgende Verbesserungen erhalten:

- Bei einem Ladepunkt kann nun eingestellt werden, ob beim Abstecken des Ladekabels die Lade-Standardeinstellungen wieder hergestellt werden sollen. Mehr dazu in unserer Dokumentation unter `resetOnDisconnect`
- Es können nun Fahrzeugspezifische Lade-Standardwerte eingerichtet werden. Interaktiv sind diese mit `evcc configure --advanced` verfügbar. Mehr dazu in der Dokumentation unter `onIdentify`
- Geräte mit Modbus erzeugen nun korrekte Konfigurationen
- Verbesserter Umgang wenn eine `evcc.yaml` Datei bereits im aktuellen Ordner existiert aber andere Zugriffsrechte hat.

## Standort-Erkennung

Für einige Fahrzeuge kann **evcc** nun den aktuellen Standort erkennen. Dies wird momentan jedoch noch nicht aktiv verwendet.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/docs/installation/linux)
- [macOS Homebrew](/docs/installation/macos)
- [Docker](/docs/installation/docker)
- [Windows](/docs/installation/windows)

## Changelog

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.73)
