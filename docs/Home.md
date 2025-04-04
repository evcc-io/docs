---
sidebar_position: 1
---

# Einführung

evcc ermöglicht das Laden von Elektrofahrzeugen (EV) bedarfsgerecht zu steuern und den dazu benötigten Energiebezug zu optimieren. Es kann eine Photovoltaikanlage (PV) angebunden werden, um so viel selbsterzeugte Energie wie möglich ins EV zu laden, oder es können auch Anbieter mit dynamischen Strompreisen angebunden werden.

Normalerweise muss die Wallbox dazu mit der bestehenden PV-Installation kompatibel, oft sogar vom selben Hersteller sein. evcc ermöglicht dies jedoch herstellerübergreifend und mit einer Vielzahl von Wallboxen, Strommessgeräten und PV-Wechselrichtern, ohne dass diese speziell dazu vorgesehen sein müssen.

Dazu wird evcc auf einem System im lokalen Netzwerk installiert, so dass es mit allen notwendigen Geräten kommunizieren kann. evcc selbst arbeitet dabei vollständig lokal und benötigt selbst keine Cloud-Anbindung, wenn keine der angebundenen Komponenten dies erfordert. Die Software ist sehr genügsam, so dass ein einfaches NAS (Netzwerkspeichergerät) oder ein Kleinstcomputersystem wie z. B. ein Raspberry Pi (oder ähnliches) völlig ausreichen.

![Screenshot](screenshot.webp)

## Funktionalitäten

- Einfache und klare Benutzeroberfläche
- Unterstützung von
  - [Wallboxen und schaltbaren Steckdosen](/docs/devices/chargers)
  - [Erzeugungsanlagen, Batteriespeichern und Energiemessgeräten (Zähler)](/docs/devices/meters)
  - [Fahrzeugen](/docs/devices/vehicles)
- [Plugins](/docs/devices/plugins) um nahezu beliebige Wallboxen / Zähler / Fahrzeuge hinzuzufügen: Modbus, HTTP, MQTT, Javascript, WebSockets und Shell Skripte
- Status [Benachrichtigungen](/docs/reference/configuration/messaging) über [Telegram](https://telegram.org), [PushOver](https://pushover.net) und [viele mehr](https://containrrr.dev/shoutrrr/)
- Datenanalyse mit [InfluxDB](https://www.influxdata.com) und [Grafana](https://grafana.com/grafana/)
- Stufenlose Regelung der Ladeströme mit unterstützten Wallboxen (z. B. bei smartWB als [OLC](https://board.evse-wifi.de/viewtopic.php?f=16&t=187) bezeichnet)
- [REST](/docs/integrations/rest-api)- und [MQTT](/docs/integrations/mqtt-api)-APIs zur Integration in andere Heimautomationssysteme (z. B. [HomeAssistant](/docs/integrations/home-assistant))

## Anforderungen

Um evcc zu verwenden, wird mindestens folgendes benötigt:

- eine unterstützte [Wallbox oder schaltbare Steckdose](/docs/devices/chargers)
- ein unterstütztes [Messgerät](/docs/devices/meters) am Hausanschluss, oder alternativ ein unterstützter PV-Wechselrichter bzw. anderes Messgerät, welches die aktuelle Erzeugungsleistung misst
- ein unterstütztes System auf welchem evcc läuft

Optional:

- ein oder mehrere unterstützte [Fahrzeuge](/docs/devices/vehicles), deren Ladezustand abgerufen wird
- weitere unterstützte Wallboxen, schaltbare Steckdosen, PV-Erzeugungs- und Batteriespeichersysteme
- ein unterstütztes [Energiemanagementsystem](/docs/reference/configuration/hems) (wie z. B. SMA Sunny Home Manager) oder ein dynamischer Stromtarif

Über diese Wege sind wir zu erreichen:

- Support, Konfiguration, Fragen zu Geräten: [Community Support Forum](https://github.com/evcc-io/evcc/discussions)
- Chat zu Entwicklungsthemen: [Slack](https://evcc.io/slack).

:::note
evcc kommt ohne jede Art von Garantie. Du verwendest die Software auf eigenes Risiko. Es liegt in deiner Verantwortung, dass evcc so läuft wie es beabsichtigt ist.
:::

## Videos

### Kieler Open Source und Linux Tage 2024

Projektupdate von [Michael](https://github.com/naltatis) mit kleinem Fokus auf neue Funktionen rund um dynamische Stromtarife. Hier gibts die [Folien zum Vortrag](https://speakerdeck.com/naltatis/evcc-sonne-autos-and-dynamische-stromtarife).

[![Vortrag evcc: Sonne, Autos und dynamische Stromtarife](youtube_kielux2024.webp)](https://www.youtube.com/watch?v=PejujWgAAlw)

### Night of open Knowledge 2023 in Lübeck

[Michael](https://github.com/naltatis) gibt einen Überblick über den Funktionsumfang und die Möglichkeiten von evcc.

Hier gibts die [Folien zum Vortrag](https://speakerdeck.com/naltatis/evcc-open-source-sonne-tanken).

[![YouTube NooK2023](youtube_nook2023.webp)](https://www.youtube.com/watch?v=NDojtAABuiw)

### Augsburger Linux Infotag 2023

[Michael](https://github.com/naltatis) stellt das Projekt vor, erzählt was zum Arbeitsalltag und zur Finanzierung des Projekts.

[![YouTube LIT2023](youtube_linux_infotag.webp)](https://www.youtube.com/watch?v=qN8JwBWOlzw)

### verdrahtet: PV Überschussladen mit evcc

Behandelt die Themen evcc Einrichtung und Grundlagen, Integration mit ioBroker und die Einbindung eines Homematic Schalters.

[![YouTube verdrahtet](youtube_verdrahtet.webp)](https://youtu.be/6JxktkEaZ2o)

### haus-automatisierung.com: PV-Überschuss ins E-Auto laden

Behandelt die Themen evcc Einrichtung, Grundlagen und Custom Plugins, Steuerung über MQTT und ioBroker, unterschiedliche Installationsmöglichkeiten.

[![YouTube Haus Automatisierung](youtube_hausautomatisierung.webp)](https://youtu.be/93C47QUjomQ)

### smart home & more: evcc mit Home Assistant integrieren

Video-Serie zur Einrichtung und Nutzung von evcc mit Home Assistant.

[![YouTube smart home & more](youtube_smart_home_and_more.webp)](https://youtube.com/playlist?list=PLg6A-C9bBxoFSNRSKtvAG567avEuZr5-D)

- [Home Assistant: evcc Basisinstallation und Konfiguration](https://youtu.be/aPq8k2MronY)
- [Home Assistant: Schritt für Schritt - MQTT-Sensor mit Hilfe des MQTT-Explorer einrichten](https://youtu.be/0QQ3y8fgRVA)
- [evcc-Daten nutzen: Effizientes Energiedashboard für Home Assistant](https://youtu.be/V3p5-16U_oU)

## Blogartikel

### hobbyblogging.de

- Einführung in die Grundkonzepte: [evcc - Was soll das sein?](https://hobbyblogging.de/evcc-was-soll-das-sein)
- Einrichtung mit Balkonsolar und smarten Steckdosen: [evcc installieren – So einfach geht’s!](https://hobbyblogging.de/evcc-installieren)

### elefacts.de

- Grundlagen, detaillierte Anleitung für Raspberry Pi Installation, Fernzugriff via Fritz!Box & DynDNS: [evcc Anleitung für intelligentes PV Überschussladen mit vielen Wallboxen](https://www.elefacts.de/test-206-evcc_anleitung_fuer_intelligentes_pv_ueberschussladen_mit_vielen_wallboxen)
- InfluxDB & Grafana: [Von evcc erfasste Daten langfristig speichern und aufbereiten](https://www.elefacts.de/test-208-von_evcc_erfasste_daten_langfristig_speichern_und_aufbereiten)

### the-ninth.com

- [A closer look at the inner workings of evcc](https://www.the-ninth.com/blog/a-closer-look-at-the-inner-workings-of-evcc)
- [Running evcc in our second home with Fronius](https://www.the-ninth.com/blog/running-evcc-in-our-second-home-with-fronius)
- [Running evcc on Synology with Huawei, go-e and VW](https://www.the-ninth.com/blog/running-evcc-synology-huawei-go-e-vw)
- [Comparing evcc and the go-e Controller for solar charging](https://www.the-ninth.com/blog/comparing-evcc-go-e-controller)
