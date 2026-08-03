---
title: "ioBroker"
---

[ioBroker](https://www.iobroker.net) ist eine Open-Source-Smart-Home-Plattform, die Geräte und Dienste über Adapter einbindet.
Der Adapter [ioBroker.evcc](https://github.com/Newan/ioBroker.evcc) verbindet ioBroker mit deiner evcc-Instanz.
Er ist ein Community-Projekt und nicht Teil von evcc.

## evcc Adapter

Der Adapter kommuniziert über die [REST API](/integrations/rest-api) mit deiner evcc-Instanz.
Er stellt Datenpunkte für Ladepunkte, Fahrzeuge und Standortdaten bereit und erlaubt die Steuerung von Lademodi und Limits aus ioBroker-Skripten und -Visualisierungen.

### Einrichtung

1. Den **evcc** Adapter über die ioBroker-Admin-Oberfläche installieren.
2. Adresse und Port deiner evcc-Instanz in der Adapter-Konfiguration angeben.

Details und Support findest du im [GitHub-Repository](https://github.com/Newan/ioBroker.evcc) und im [ioBroker-Forumsthread](https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc).

## MQTT

Alternativ kannst du Daten über MQTT mit ioBroker austauschen.
Konfiguriere in evcc unter **Konfiguration → MQTT** die Verbindung zum Broker und nutze den MQTT-Adapter von ioBroker mit dem gleichen Broker.
Die verfügbaren Topics sind in der [MQTT API](/de/integrations/mqtt-api) dokumentiert.
