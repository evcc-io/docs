---
title: "openHAB"
description: "Über das offizielle evcc-Binding, das Ladepunkte, Fahrzeuge und Standortdaten automatisch erkennt, oder über MQTT bindest du deine evcc-Instanz in openHAB ein."
translatedFrom: "a70270e36e27"
---

[openHAB](https://www.openhab.org) ist eine Open-Source-Smart-Home-Plattform, die Geräte und Dienste vieler Hersteller verbindet.
Das offizielle [evcc-Binding](https://www.openhab.org/addons/bindings/evcc/) bringt Daten und Steuerungen deiner evcc-Instanz in openHAB.

## evcc-Binding

Das Binding verbindet sich über das lokale Netzwerk mit deiner evcc-Instanz und fragt deren API in einem konfigurierbaren Intervall ab.
Es benötigt evcc 0.209.8 oder neuer.

Nach der Einrichtung der Verbindung werden deine konfigurierten Geräte automatisch erkannt.
Das Binding stellt Things bereit für:

- Ladepunkte mit Ladeleistung, Lademodus, Stromgrenzen und Daten zum Ladevorgang
- Fahrzeuge mit Ladestand und Ladeplänen
- Standortdaten wie Netzleistung, PV-Erzeugung und Hausbatterie
- Heizgeräte

Du kannst das Laden in openHAB-Dashboards beobachten und Lademodi, Limits und Ladepläne aus Regeln und Automatisierungen heraus steuern.

### Einrichtung

1. Installiere das Binding **evcc** aus dem openHAB-Add-on-Store.
2. Lege das evcc-Bridge-Thing an und gib Adresse und Port deiner evcc-Instanz ein.
3. Übernimm die automatisch erkannten Things aus der Inbox.

Konfigurationsdetails und die vollständige Liste der Channels sind in der [Binding-Dokumentation](https://www.openhab.org/addons/bindings/evcc/) beschrieben.

## MQTT

Alternativ kannst du Daten über MQTT mit openHAB austauschen.
Konfiguriere in evcc unter **Konfiguration → MQTT** die Verbindung zum Broker und nutze das MQTT-Binding von openHAB mit demselben Broker.
Die verfügbaren Topics sind in der [MQTT-API](/de/integrations/mqtt-api) dokumentiert.
