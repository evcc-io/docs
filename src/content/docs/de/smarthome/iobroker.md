---
title: "ioBroker"
description: "Verbinde ioBroker mit deiner evcc-Instanz, entweder über den Community-Adapter ioBroker.evcc, der die REST-API nutzt, oder über einen gemeinsamen MQTT-Broker."
translatedFrom: "d7b49d124f14"
---

[ioBroker](https://www.iobroker.net) ist eine Open-Source-Smart-Home-Plattform, die Geräte und Dienste über Adapter einbindet.
Der Adapter [ioBroker.evcc](https://github.com/Newan/ioBroker.evcc) verbindet ioBroker mit deiner evcc-Instanz.
Er ist ein Community-Projekt und nicht Teil von evcc.

## evcc-Adapter

Der Adapter kommuniziert über die [REST-API](/integrations/rest-api) mit deiner evcc-Instanz.
Er stellt Datenpunkte für Ladepunkte, Fahrzeuge und Standortdaten bereit und lässt dich Lademodi und Limits aus ioBroker-Skripten und -Visualisierungen steuern.

### Einrichtung

1. Installiere den Adapter **evcc** über die ioBroker-Admin-Oberfläche.
2. Gib Adresse und Port deiner evcc-Instanz in der Adapter-Konfiguration ein.

Details und Support findest du im [GitHub-Repository](https://github.com/Newan/ioBroker.evcc) und im [ioBroker-Forumsthread](https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc).

## MQTT

Alternativ kannst du Daten über MQTT mit ioBroker austauschen.
Konfiguriere in evcc unter **Konfiguration → MQTT** die Verbindung zum Broker und nutze den MQTT-Adapter von ioBroker mit demselben Broker.
Die verfügbaren Topics sind in der [MQTT-API](/de/integrations/mqtt-api) dokumentiert.
