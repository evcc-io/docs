---
title: "Sunny Home Manager"
description: "evcc macht deine Ladepunkte für einen SMA Sunny Home Manager 2.0 im Sunny Portal sichtbar und lässt den Home Manager auf Wunsch die Ladeleistung steuern."
sidebar:
  order: 5
translatedFrom: "64de8f1d87ba"
---

evcc lässt sich in den [SMA Sunny Home Manager 2.0 (SHM)](https://www.sma.de/produkte/energiemanagement/sunny-home-manager) einbinden.
Durch diese Integration werden die Ladepunkte im Sunny Portal sichtbar und können optional vom SHM gesteuert werden.

## Funktionsweise

Die Integration ist dauerhaft aktiv.
Sobald evcc läuft, stellt es automatisch einen SEMP-Endpunkt (Smart Energy Management Protocol) bereit und kündigt diesen per mDNS im lokalen Netzwerk an.
Der SHM kann die Ladepunkte dadurch erkennen und einbinden.

Alle evcc-Ladepunkte erscheinen im Sunny Portal als Verbraucher mit detaillierten Messwerten.
Zusätzlich kann der SHM die Ladeleistung beeinflussen, wenn dies ausdrücklich erlaubt ist.

Der SEMP-Endpunkt ist unter `http://[evcc-IP]:7070/semp/` erreichbar und zeigt eine XML-Übersicht der registrierten Geräte.

## Einrichtung im Sunny Home Manager

Sobald deine Ladepunkte in evcc eingerichtet sind, werden sie automatisch im Sunny Portal unter **Konfiguration → Geräteübersicht** als neue Geräte vorgeschlagen.
Dort kannst du sie aktivieren und dem Konfigurationsassistenten folgen.
Details zur Einrichtung findest du in der [SMA-Anleitung](https://manuals.sma.de/HM-20/de-DE/10426801547.html).

## Geräte-IDs

Auf evcc-Seite ist keine Konfiguration nötig.
evcc erzeugt die notwendigen IDs selbstständig.

Jeder Ladepunkt erhält eine eindeutige ID im Format:

```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Dabei gilt:

- **AAAAAAAA**: Die Hersteller-ID (8 Zeichen, hexadezimal)
- **BBBBBBBBBBBB**: Die gerätespezifische Kennung (12 Zeichen, hexadezimal)

Möchtest du die automatisch erzeugten IDs ersetzen (z. B. beim Umzug auf andere evcc-Hardware), kannst du die bestehenden IDs aus dem `/semp/`-Endpunkt des alten Systems übernehmen und unter **Konfiguration → Sunny Home Manager** anpassen.
Damit erkennt der SHM die Geräte weiterhin.
