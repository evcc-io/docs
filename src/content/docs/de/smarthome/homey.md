---
title: "Homey"
---

[Homey](https://homey.app) ist ein Smart-Home-Hub, der Geräte vieler Hersteller verbindet und über Flows automatisiert.
Die [evcc App für Homey](https://homey.app/de-de/app/com.evcc.io/) verbindet Homey mit deiner lokalen evcc-Instanz.
Sie ist ein Community-Projekt von [rdvnit](https://github.com/rdvnit) und nicht Teil von evcc.

## Funktionen

Die App stellt drei Gerätetypen bereit:

- **Ladepunkt** mit Lademodus, Ladelimit, Ladeleistung, Sitzungsenergie, Ladestand und Reichweite des Fahrzeugs sowie Verbindungs- und Ladestatus
- **Standort** mit PV-Erzeugung, Netzleistung und Hausverbrauch
- **Hausbatterie** mit Batterieleistung, Ladestand und Batteriesteuerung

Flow-Karten setzen Lademodus, Ladelimit sowie minimalen und maximalen Ladestrom.
Flow-Bedingungen reagieren auf Lademodus, Ladestatus und Verbindungsstatus.

Die App fragt deine evcc-Instanz im lokalen Netzwerk ab und benötigt keinen Cloud-Dienst.

## Einrichtung

1. Die **evcc** App aus dem [Homey App Store](https://homey.app/de-de/app/com.evcc.io/) installieren.
2. Ein Gerät hinzufügen und **Ladepunkt**, **evcc Standort** oder **Hausbatterie** auswählen.
3. Die URL deiner evcc-Instanz angeben (z. B. `http://192.168.1.50:7070`) sowie das Passwort, falls konfiguriert.

Details und Support findest du im [GitHub-Repository](https://github.com/rdvnit/com.evcc.io).
