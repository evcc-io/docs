---
title: Version 0.72
authors: [derandereandi]
tags: [release]
hide_table_of_contents: false
---

Es hat sich in den letzten Wochen viel getan, und darüber möchten wir heute etwas ausführlicher berichten was es alles in Version 0.72 an Neuem zu entdecken gibt.

![evcc configure example](configure.gif)

<!-- truncate -->

## Einfachere Installation

Der Zugang zu **evcc** erforderte bisher doch einige technische Kenntnisse im Umgang mit dem jeweiligen Betriebssystem. Für Linux (Debian, Ubuntu, Raspberry Pi OS) und macOS gibt es nun eine deutlich vereinfachte Installation. So unterstützt **evcc** nun die Installation über die Paketmanager `apt` unter Linux und [`homebrew`](https://brew.sh) unter macOS.

Hierfür haben wir die Installationsanleitungen nochmals überarbeitet und damit die Installation weiter vereinfacht. Schaut doch mal in der [dazugehörigen Dokumentation](/docs/installation) vorbei.

## Einfachere Konfiguration

Auch die Einrichtung von **evcc** war bisher noch sehr technisch geprägt. Seien es die Formatierungsvorgaben von [YAML](https://yaml.org), welches die Synthax der Konfigurations vorgibt, oder die Ausgestaltung und Anpassung der Konfiguration der eigenen Geräte in der Konfigurationsdatei. Für den ein oder anderen sind das doch recht hohe Hürden. Aber das Projektk ist noch jung und das Team überschaubar, vor allem wenn man bedenkt dass dies für die Entwickler "nur" ein Hobby ist.

Um diese Hürden etwas zu minimieren, führen wir mit dieser neuen Version 0.72 von **evcc** eine neue Funktionalität ein: Die geführte Konfiguration mit `evcc configure`.

Mit diesem Kommando lässt sich interaktiv eine funktionierende Konfigurationsdatei für die eigene Installation erstellen! Es gibt sicher hier und da noch einige Probleme und Fehler, aber wir hoffen es ist ein guter erster Schritt in die richtige Richtung.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/docs/installation/linux)
- [macOS Homebrew](/docs/installation/macos)
- [Docker](/docs/installation/docker)
- [Windows](/docs/installation/windows)

## Changelog

### Version 0.72

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.72)

### Version 0.71

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.71)
