---
title: Version 0.73
authors: [derandereandi]
tags: [release]
hide_table_of_contents: false
---
Heute gibt es ein kleines Update hauptsächlich mit einigen Fehlerkorrekturen und weiteren Verbesserungen.

## `evcc configure`

Unser neues Kommando zur geführten Erstellung einer Konfigurationsdatei und die darunterliegenden Templates haben folgende Verbesserungen erhalten:

- Bei einem Ladepunkt kann nun eingestellt werden, ob beim Abstecken des Ladekabels die Lade-Standardeinstellungen wieder hergestellt werden sollen. Mehr dazu in unserer Dokumentation unter [`resetOnDisconnect`](/docs/reference/configuration/loadpoints#resetondisconnect)
- Es können nun Fahrzeugspezifische Lade-Standardwerte eingerichtet werden. Interaktiv sind diese mit `evcc configure --advanced` verfügbar. Mehr dazu in der Dokumentation unter [`onIdentify`](/docs/reference/configuration/vehicles#onidentify)
- Geräte mit Modbus erzeugen nun korrekte Konfigurationen
- Verbesserter Umgang wenn eine `evcc.yaml` Datei bereits im aktuellen Ordner existiert aber andere Zugriffsrechte hat.

## Fahrzeug Positionserkennung

Für einige Fahrzeuge kann **evcc** nun die Position erkennen. Dies wird momentan jedoch noch nicht aktiv verwendet.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/docs/installation/linux)
- [macOS Homebrew](/docs/installation/macos)
- [Docker, Synology](/docs/installation/docker)
- [Manuell (inkl. Windows)](/docs/installation/manual)

## Changelog

### Version 0.73

Vehicles:

- [981b23d](https://github.com/evcc-io/evcc/commit/981b23d) Add vehicle position api ([#2021](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2021))
- [69c923a](https://github.com/evcc-io/evcc/commit/69c923a) Audi/Seat/Skoda/VW: add position api ([#2032](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2032))
- [16bfc70](https://github.com/evcc-io/evcc/commit/16bfc70) PSA: add position api ([#2023](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2023))
- [553bf56](https://github.com/evcc-io/evcc/commit/553bf56) Tesla: add position api ([#2024](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2024))
- [05e3eed](https://github.com/evcc-io/evcc/commit/05e3eed) Fix dumping ActionConfig structure ([#2029](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2029))

Chargers:

- [8faa36a](https://github.com/evcc-io/evcc/commit/8faa36a) Easee: fix rest api maxcircuitcurrent data type
- [cd43f09](https://github.com/evcc-io/evcc/commit/cd43f09) Make waiter always expect initial value even if timeout is zero ([#2031](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2031))

Miscellaneous:

- [8323f2f](https://github.com/evcc-io/evcc/commit/8323f2f) Mqtt: allow secure connection using client options ([#2025](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2025))
- [cbc272d](https://github.com/evcc-io/evcc/commit/cbc272d) Services definition improvements ([#2017](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2017))
- [96a0475](https://github.com/evcc-io/evcc/commit/96a0475) Template improvements ([#2019](https://github.com/evcc-io/evcc/pull/2011), [#1997](https://github.com/evcc-io/evcc/pull/2019))
