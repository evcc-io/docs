---
date: 2022-05-08
title: "Phasenumschaltung, Templates und Litauisch"
description: "Release-Rückblick zu evcc 0.81 bis 0.91 vom Mai 2022 mit neuen Wallboxen und Fahrzeugen, besserer Phasenumschaltung, Geräte-Templates und Oberfläche auf Litauisch."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "be2964228ce3"
---

Seit dem letzten Blogartikel sind schon wieder ein paar Monate vergangen. Wird also Zeit für eine kurze Zusammenfassung und einen Überblick darüber, was sich bei evcc in den letzten elf Releases (v0.81 bis v0.91) getan hat.

<!-- excerpt -->

## Neu unterstützte Geräte

Die Liste der von evcc unterstützten Hardware wächst stetig weiter.

### Wallboxen 🔌

Wir haben einige Wallbox-Anbindungen hinzugefügt. Da evcc nun auch den sehr verbreiteten [Bender-Controller](https://github.com/evcc-io/evcc/pull/3103) unterstützt, konnten wir das Spektrum der unterstützten Geräte deutlich erweitern.

Hier die Hersteller, die seit Anfang des Jahres neu dazugekommen sind: Alphatec, Ebee, Ensto, Garo, HardyBarth, Innogy, Juice, Mennekes, OpenWB Pro, Optec, PC Electric, SmartWB, TechniSat, Tapo Smarthome, Ubitricity, Vestel, Webasto. [(Alle Wallboxen)](/de/chargers)

### Fahrzeuge 🚗 🛵

Audi (e-tron), Cupra, Jaguar, Land Rover, Mercedes, Silence S01, Smart. [(Alle Fahrzeuge)](/de/vehicles)

### Wechselrichter ☀️ 🔋

SMA (Smart Energy Hybrid), Huawei (SUN2000), Solarwatt, Solax, Varta. [(Alle Zähler)](/de/meters)

### Netzzähler 📟

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Alle Zähler)](/de/meters)

### RFID-Unterstützung 🪪

Bei den Wallboxen von Easee und Warp kann nun auch die [RFID-Funktion zur Fahrzeugerkennung](/de/features/vehicle) von evcc verwendet werden.

## Verbesserte Phasenumschaltung (1P/3P)

Die erste Version der Phasenumschaltung für unterstützte Wallboxen gibt es in evcc bereits seit Mitte letzten Jahres. Wir konnten einige Erfahrungen sammeln und haben auf dieser Grundlage im Februar die Mechanik [grundlegend überarbeitet](https://github.com/evcc-io/evcc/pull/2613). Damit ist die Phasenumschaltung deutlich zuverlässiger geworden und verhält sich auch in Situationen mit unbekannten oder unplausiblen Konfigurations- oder Messwerten besser.

## Templates und Dokumentation

[Im Dezember](/de/blog/2021/12/12/version-0-73#evcc-configure) haben wir mit dem CLI-Einrichtungsassistenten `evcc configure` die Grundlagen für eine einfachere Ersteinrichtung gelegt.

Die Konfigurationssyntax von evcc ist sehr flexibel und leistungsfähig. So lassen sich z. B. noch nicht offiziell unterstützte Geräte oft rein per Konfiguration anbinden, wenn man die entsprechenden Modbus-Felder und JSON-Strukturen der Schnittstelle kennt. Im inzwischen archivierten Repository `evcc-io/config` hatten wir Beispielkonfigurationen gesammelt, die man per Copy & Paste in die eigene Konfiguration übernehmen konnte.

Zusammen mit dem Einrichtungsassistenten haben wir das Konzept der **Templates** eingeführt. Mit Templates können wir wiederkehrende Konfigurationsteile und internes Gerätewissen (Protokolle, Adressen, Datentypen, Feldnamen) sauber kapseln. Das folgende Beispiel für die Einrichtung eines Solarlog-Netzzählers zeigt die Umstellung ganz gut:

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

Man muss nun nur noch den Hostnamen oder die IP-Adresse der eigenen Solarlog-Instanz kennen und eingeben. Protokoll und Datenstruktur sind im Template `solarlog` gekapselt.

Zusätzlich erhalten Templates eine strukturierte Beschreibung aller erforderlichen und optionalen Parameter sowie Standardwerte und lokalisierte Hilfetexte.

[Im März](https://github.com/evcc-io/docs/pull/92) haben wir die [Gerätedokumentation auf docs.evcc.io](/de/chargers) auf Templates umgestellt. Die bisherigen Schreibweisen funktionieren natürlich weiterhin. Da zukünftige Funktionen wie die webbasierte Einrichtung (ja, die wird kommen 😄) auf `type: template` aufbauen, empfehlen wir dir, deine bestehende Konfiguration schon jetzt auf das neue Format umzustellen.

## Neue Sprache: Litauisch 🇱🇹

Mit v0.91 haben wir eine neue Übersetzung bekommen. Die evcc-Oberfläche ist nun auch auf Litauisch verfügbar. Das ist neben Deutsch, Englisch und Italienisch die vierte Sprache. Vielen Dank, [RTTTC](https://github.com/RTTTC) 💚.

Unsere eigenen Sprachkenntnisse sind begrenzt, daher freuen wir uns immer über Beiträge zu Übersetzungen. Eine Dokumentation dafür gibt es momentan noch nicht, aber wenn du Interesse hast, schau dir einfach [RTTTCs Pull Request](https://github.com/evcc-io/evcc/pull/3205) an.

## Wie geht es weiter?

Vielleicht hast du es schon gesehen. Mit dem nächsten Release bekommt evcc eine komplett überarbeitete Benutzeroberfläche. Sie ist bereits in den aktuellen Nightly-Builds verfügbar, und [hier](https://github.com/evcc-io/evcc/discussions/3149) und [hier](https://github.com/evcc-io/evcc/pull/2889) findest du Infos zum Entwicklungsprozess. Mehr dazu aber im nächsten Blogartikel.

## Fehlerkorrekturen

Die letzten Versionen enthielten eine Reihe von Fehlerkorrekturen und viele kleine Verbesserungen. Eine detaillierte Auflistung findest du über die Changelog-Links unten.

## Changelogs

Hier findest du mehr Details zu den letzten Änderungen:

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
