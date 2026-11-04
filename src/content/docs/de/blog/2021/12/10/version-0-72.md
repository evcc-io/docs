---
date: 2021-12-10
title: "Version 0.72"
description: "Release Notes zu evcc 0.72 vom Dezember 2021 mit vereinfachten Installationsanleitungen und dem neuen interaktiven Einrichtungsassistenten evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "fe9b6c445f25"
---

In den letzten Wochen hat sich viel getan, und heute möchten wir dir etwas ausführlicher erzählen, was es in Version 0.72 alles Neues zu entdecken gibt.

![Beispiel für evcc configure](../../../../../en/blog/2021/12/10/configure.gif)

<!-- excerpt -->

## Einfachere Installation

Der Einstieg in **evcc** erforderte bisher einige technische Kenntnisse im Umgang mit dem jeweiligen Betriebssystem. Für Linux (Debian, Ubuntu, Raspberry Pi OS) und macOS gibt es nun eine deutlich einfachere Installation. **evcc** lässt sich jetzt über die Paketmanager `apt` unter Linux und [`homebrew`](https://brew.sh) unter macOS installieren.

Wir haben die Installationsanleitungen nochmals überarbeitet, um die Installation weiter zu vereinfachen. Schau doch mal in die [dazugehörige Dokumentation](/de/installation).

## Einfachere Konfiguration

Auch die Einrichtung von **evcc** war bisher sehr technisch. Ob die Formatierungsregeln von [YAML](https://yaml.org), das die Syntax der Konfiguration vorgibt, oder die Beschreibung und Anpassung der eigenen Geräte in der Konfigurationsdatei: Für manche sind das recht hohe Hürden. Aber das Projekt ist noch jung und das Team überschaubar, vor allem wenn man bedenkt, dass es für die Entwickler „nur“ ein Hobby ist.

Um diese Hürden etwas zu senken, führt Version 0.72 von **evcc** eine neue Funktion ein: die geführte Konfiguration mit `evcc configure`.

Mit diesem Kommando kannst du interaktiv eine funktionierende Konfigurationsdatei für deine eigene Installation erstellen! Es wird sicher hier und da noch einige Probleme und Fehler geben, aber wir hoffen, es ist ein guter erster Schritt in die richtige Richtung.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/de/installation/linux)
- [macOS Homebrew](/de/installation/macos)
- [Docker](/de/installation/docker)
- [Windows](/de/installation/windows)

## Changelog

### Version 0.72

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.72)

### Version 0.71

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.71)
