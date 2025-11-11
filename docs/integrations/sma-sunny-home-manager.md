---
sidebar_position: 5
---

# Sunny Home Manager

evcc unterstützt die Integration mit dem [SMA Sunny Home Manager 2.0 (SHM)](https://www.sma.de/produkte/energiemanagement/sunny-home-manager).
Durch diese Integration werden die Ladepunkte im Sunny Portal sichtbar und können optional vom SHM gesteuert werden.

## Funktionsweise

Die Integration ist dauerhaft aktiv.
Sobald evcc läuft, stellt es automatisch einen SEMP-Endpunkt (Smart Energy Management Protocol) bereit und kündigt diesen per mDNS im lokalen Netzwerk an.
Der SHM kann dadurch die Ladepunkte automatisch erkennen und einbinden.

Durch die Integration erscheinen alle evcc-Ladepunkte als Verbraucher im Sunny Portal mit detaillierten Verbrauchsdaten.
Zusätzlich kann der SHM bei Bedarf die Ladeleistung beeinflussen, wenn dies explizit erlaubt wird.

Der SEMP-Endpunkt ist unter `http://[evcc-IP]:7070/semp/` erreichbar und zeigt eine XML-Übersicht der registrierten Geräte.

## Einrichtung im Sunny Home Manager

Nach der evcc-Konfiguration werden die Ladepunkte automatisch im Sunny Portal unter **Konfiguration > Geräteübersicht** als neue Geräte vorgeschlagen.
Dort kannst du sie aktivieren und dem Konfigurations-Assistenten folgen.
Details zur Einrichtung findest du in der [SMA-Anleitung](https://manuals.sma.de/HM-20/de-DE/10426801547.html).

## Gerätekennungen

Es ist keine Konfiguration auf evcc-Seite erforderlich.
evcc generiert die notwendigen Gerätekennungen selbstständig.

Jeder Ladepunkt erhält eine eindeutige ID im Format:

```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Dabei ist:

- **AAAAAAAA**: Die Vendor ID (8 Zeichen, hexadezimal)
- **BBBBBBBBBBBB**: Die Device ID (12 Zeichen, hexadezimal)

Möchtest du diesen Automatismus überschreiben (z. B. bei Umzug auf andere evcc-Hardware), kannst du die bestehenden IDs aus dem `/semp/` Endpunkt des alten Systems übernehmen und unter **Einstellungen > Sunny Home Manager** anpassen.
Damit erkennt der SHM die Geräte weiterhin.
