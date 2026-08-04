---
title: "openHAB"
---

[openHAB](https://www.openhab.org) ist eine Open-Source-Smart-Home-Plattform, die Geräte und Dienste vieler Hersteller verbindet.
Das offizielle [evcc Binding](https://www.openhab.org/addons/bindings/evcc/) bringt Daten und Steuerungen deiner evcc-Instanz in openHAB.

## evcc Binding

Das Binding verbindet sich über das lokale Netzwerk mit deiner evcc-Instanz und fragt deren API in einem konfigurierbaren Intervall ab.
Es benötigt evcc-Version 0.209.8 oder neuer.

Nach der Einrichtung der Verbindung werden deine konfigurierten Geräte automatisch erkannt.
Das Binding stellt Things bereit für:

- Ladepunkte mit Ladeleistung, Lademodus, Stromgrenzen und Sitzungsdaten
- Fahrzeuge mit Ladestand und Ladeplänen
- Standortdaten wie Netzleistung, PV-Erzeugung und Hausbatterie
- Heizgeräte

Du kannst das Laden in openHAB-Dashboards beobachten und Lademodi, Limits und Ladepläne aus Regeln und Automationen heraus steuern.

### Einrichtung

1. Das **evcc** Binding aus dem openHAB Add-on-Store installieren.
2. Das evcc Bridge Thing anlegen und Adresse und Port deiner evcc-Instanz angeben.
3. Die automatisch erkannten Things aus der Inbox übernehmen.

Konfigurationsdetails und die vollständige Liste der Channels sind in der [Binding-Dokumentation](https://www.openhab.org/addons/bindings/evcc/) beschrieben.

## MQTT

Alternativ kannst du Daten über MQTT mit openHAB austauschen.
Konfiguriere in evcc unter **Konfiguration → MQTT** die Verbindung zum Broker und nutze das MQTT Binding von openHAB mit dem gleichen Broker.
Die verfügbaren Topics sind in der [MQTT API](/de/integrations/mqtt-api) dokumentiert.
