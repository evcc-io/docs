---
date: 2022-05-08
title: "Phasenhandling, Templates und Lithauisch"
authors: [naltatis]
tags: [release]
prev: false
next: false
---

Seit dem letzten Blogartikel sind schon wieder ein paar Monate vergangen. Wird also Zeit, dass wir hier mal wieder eine kurze Zusammenfassung und einen Überblick über das geben was sich bei evcc in den letzten elf Releases (v0.81 bis v0.91) getan an.

<!-- excerpt -->

## Neu unterstützte Geräte

Die Liste der von evcc unterstützten Hardware wächst fleißig weiter.

### Wallboxen 🔌

Wir haben einige Wallbox-Anbindungen hinzugefügt. Da evcc nun auch den sehr verbreiteten [Bender Controller unterstützt](https://github.com/evcc-io/evcc/pull/3103) konnten wir unsere Unterstützung deutlich verbreitern.

Hier die Hersteller, die seit Anfang des Jahres neu dazu gekommen sind: Alphatec, Ebee, Ensto, Garo, HardyBarth, Innogy, Juice, Mennekes, OpenWB Pro, Optec, PC Electric, SmartWB, TechniSat, Tapo Smarthome, Ubitricity Vestel, Webasto. [(Alle Wallboxen)](/de/chargers)

### Fahrzeuge 🚗 🛵

Audi (e-tron), Cupra, Jaguar, Landrover, Mercedes, Silence S01, Smart. [(Alle Fahrzeuge)](/de/vehicles)

### Wechselrichter ☀️ 🔋

SMA (Smart Energy Hybrid), Huawei (SUN2000), Solarwatt, Solax, Varta. [(Alle Wechselrichter)](/de/meters)

### Netzzähler 📟

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Alle Messgeräte)](/de/meters)

### RFID Support 🪪

Bei den Wallboxen von Easee und Warp kann nun auch evcc's [RFID Funktion zur Fahrzeugerkennung](/de/features/vehicle) verwendet werden.

## Verbesserte Phasenumschaltung (1P/3P)

Die erste Version der Phasenumschaltung für unterstützte Wallboxen ist bereits seit Mitte letzten Jahres in evcc vorhanden. Wir konnten einige Erfahrungen sammeln und haben auf dieser Grundlage im Februar [ein größeres Redesign](https://github.com/evcc-io/evcc/pull/2613) an der Mechanik durchgeführt. Damit ist die Phasenumschaltung deutlich zuverlässiger geworden und verhält sich auch in Situationen mit unbekannten oder unplausiblen Konfigurations-/ bzw. Messwerten besser.

## Templates und Dokumentation

[Im Dezember](/de/blog/2021/12/12/version-0-73#evcc-configure) haben wir mit dem CLI Einrichtungsassistenten `evcc configure` die Grundlagen für eine einfachere Ersteinrichtung gelegt.

Die Konfigurationssyntax von evcc ist sehr flexibel und mächtig. So lassen sich bspw. noch nicht offiziell unterstützte Geräte oft rein per Konfiguration anbinden, wenn man die entsprechenden Modbus Felder und JSON Strukturen der Schnittstelle kennt. Im nun archivierten `evcc-io/config` Repository hatten wir Beispielkonfigurationen gesammelt, die man per Copy & Paste in seine eigene Konfiguration übernehmen konnte.

Zusammen mit dem Kommandozeilenwizzard haben wir das Konzept von **Templates** eingeführt. Durch Templates ist es uns möglich Boilerplate und internes Gerätewissen (Protokolle, Adresse, Datentypen, Feldnamen) sauber zu kapseln. Das folgende Beispiel für die Einrichtung eines Solarlog Netzzählers illustriert die Umstellung ganz gut:

Vorher:

```yaml
meters:
  - name: my_solarlog
    type: custom
    power:
      source: calc
      add:
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3502
            type: input
            decode: uint32s
          scale: -1
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3518
            type: input
            decode: uint32s
```

Nachher:

```yaml
meters:
  - name: my_solarlog
    type: template
    template: solarlog
    usage: grid
    host: 192.168.0.77
```

Der Nutzer muss nun nur noch den Hostnamen oder die IP-Adresse seiner Solarlog Instanz wissen und eingeben - Protokoll und Datenstruktur werden im `solarlog` Template gekapselt.

Zusätzlich erhalten Templates auch eine strukturierte Beschreibung aller erforderlichen und optionalen Parameter, sowie ggf. Standardwerte und lokalisierte Hilfetexte.

[Seit März](https://github.com/evcc-io/docs/pull/92) haben wir die [Gerätedokumentation unter docs.evcc.io](/de/chargers) auf Templates umgestellt. Die bisherigen Schreibweisen funktionieren natürlich weiterhin. Da zukünftige Feature wie die webbasierte Einrichtung (ja, das wird kommen 😄) auf `type: template` aufbauen werden empfehlen wir, dass ihr eure bestehenden Konfigurationen bereits jetzt auf das neue Format umschreibt.

## Neue Lokalisierung: Litauisch 🇱🇹

Mit v0.91 haben wir eine neue Lokalisation erhalten. Die evcc UI ist nun auch auf lithauisch verfügbar. Das ist neben Deutsch, Englisch und Italiänisch nun die vierte Sprache. Vielen Dank [RTTTC](https://github.com/RTTTC) 💚.

Da unser Sprachwissen relativ beschränkt ist sind wir immer dankbar für Übersetzungs-Contributions. Eine Dokumentation dafür gibts momentan noch nicht, aber schaut euch bei Interesse einfach [RTTC's Pull Request](https://github.com/evcc-io/evcc/pull/3205) an. Das ist kein Hexenwerk 🧙‍♀️.

## What's next?

Einige von euch werden es sicher schon gesehen haben. Mit dem nächsten Release wird evcc eine optisch komplett überarbeitete Benutzeroberfläche bekommen. Diese ist bereits in den aktuellen Nightly Builds verfügbar und ihr findet [hier](https://github.com/evcc-io/evcc/discussions/3149) und [hier](https://github.com/evcc-io/evcc/pull/2889) Infos zum Entwicklungsprozess. Mehr dazu aber im nächsten Blogartikel.

## Fehlerkorrekturen

Die letzten Versionen erhalten natürlich wieder eine Reihe von Fehlerkorrekturen und vielen kleinen Verbesserungen. Schaut euch gerne über den Changelog Link unten eine detaillierte Auflistung an.

## Changelogs

Hier findet ihr mehr Details zu den letzten Neuerungen:

- [Version 0.91](https://github.com/evcc-io/evcc/releases/tag/0.91)
- [Version 0.90](https://github.com/evcc-io/evcc/releases/tag/0.90)
- [Version 0.89](https://github.com/evcc-io/evcc/releases/tag/0.89)
- [Version 0.88](https://github.com/evcc-io/evcc/releases/tag/0.88)
- [Version 0.87](https://github.com/evcc-io/evcc/releases/tag/0.87)
- [Version 0.86](https://github.com/evcc-io/evcc/releases/tag/0.86)
- [Version 0.85](https://github.com/evcc-io/evcc/releases/tag/0.85)
- [Version 0.84](https://github.com/evcc-io/evcc/releases/tag/0.84)
- [Version 0.83](https://github.com/evcc-io/evcc/releases/tag/0.83)
- [Version 0.82](https://github.com/evcc-io/evcc/releases/tag/0.82)
- [Version 0.81](https://github.com/evcc-io/evcc/releases/tag/0.81)
