---
date: 2022-01-09
title: "Version 0.80"
description: "Release Notes zu evcc 0.80 vom Januar 2022 mit Verbesserungen an evcc configure, einem neuen Dialog für PV-Anteil und Ersparnis sowie den Docker-Tags latest und nightly."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "9db66286559a"
---

Auch dieses Jahr geht es weiter mit Aktualisierungen :) Zusätzlich zu den kleineren Updates mit 0.78 und 0.79 bringt die Version 0.80 ein paar größere Änderungen.

<!-- excerpt -->

## Verbesserungen an `evcc configure`

Wenn du eine Konfiguration mit `evcc configure` erstellst, wirst du jetzt zuerst nach deinem Kenntnisstand gefragt. So können fortgeschrittene Anwender die Konfiguration in technischen Bereichen genauer einstellen. Dieser Modus ist weiterhin auch direkt über `evcc configure --advanced` verfügbar. Für Einsteiger empfehlen wir ihn jedoch nicht, da er mehr Know-how erfordert.

Zusätzlich gibt es weitere Geräte-Templates, Korrekturen an bestehenden Templates und weitere Einstellmöglichkeiten.

## PV-Anteil und Ersparnis

![Ersparnisdialog](../../../../../en/blog/2022/01/09/ersparnis.png)

Die neue Ersparnis-Funktion zeigt dir, wie viel deiner Ladeenergie durch selbst erzeugten Sonnenstrom gedeckt wurde.
Der Prozentwert wird unten rechts in der Ecke angezeigt.
Klickst du darauf, bekommst du weitere Details in einem Dialog angezeigt.
Dort siehst du neben der Energiemenge auch deinen effektiven Energiepreis und deine Gesamtersparnis gegenüber reinem Netzbezug.
Mehr Informationen zur [Berechnung und Preiskonfiguration](/de/faq#savings-calculation) findest du in den FAQ.

[Sponsoren](/de/sponsorship) finden im neuen Dialog hinter dem Dankeschön-Konfetti-Button, _\*Trommelwirbel\*_, einen Link, um unsere neuen evcc-Sticker zu bekommen.
Ihr seid die Besten. Danke für eure Unterstützung! 💚🥳

## Docker

Wenn du Docker verwendest, bekommst du jetzt über das Tag `latest` immer die aktuelle Version. Das Tag `nightly` liefert täglich neue Builds, die aber möglicherweise noch nicht so gründlich getestet sind. Weitere Informationen zur Docker-Installation findest du hier: [Docker, Synology](/de/installation/docker)

## Fehlerkorrekturen

Wie immer enthält diese Version eine Reihe von Fehlerkorrekturen und viele kleine Verbesserungen. Eine detaillierte Auflistung findest du über die Changelog-Links unten.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/de/installation/linux)
- [macOS Homebrew](/de/installation/macos)
- [Docker](/de/installation/docker)
- [Windows](/de/installation/windows)

## Changelog

### Version 0.80

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.80)

### Version 0.79

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.79)

### Version 0.78

- [Detaillierte Liste der Änderungen](https://github.com/evcc-io/evcc/releases/tag/0.78)
