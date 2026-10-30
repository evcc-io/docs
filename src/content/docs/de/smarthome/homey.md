---
title: "Homey"
description: "Die Community-App evcc für Homey stellt Ladepunkte, Standort und Hausbatterie als Geräte bereit, sodass du Lademodus und Limits im lokalen Netzwerk über Flows steuerst."
translatedFrom: "d711ce90c00c"
---

[Homey](https://homey.app) ist ein Smart-Home-Hub, der Geräte vieler Hersteller verbindet und über Flows automatisiert.
Die [evcc-App für Homey](https://homey.app/de-de/app/com.evcc.io/) verbindet Homey mit deiner lokalen evcc-Instanz.
Sie ist ein Community-Projekt von [rdvnit](https://github.com/rdvnit) und nicht Teil von evcc.

## Funktionen

Die App stellt drei Gerätetypen bereit:

- **Charging point** mit Lademodus, Ladelimit, Ladeleistung, Energie des Ladevorgangs, Ladestand und Reichweite des Fahrzeugs sowie Verbindungs- und Ladestatus
- **Site** mit PV-Erzeugung, Netzleistung und Hausverbrauch
- **Home battery** mit Batterieleistung, Ladestand und Einstellungen zur Batteriesteuerung

Mit Flow-Karten setzt du Lademodus, Ladelimit sowie minimalen und maximalen Ladestrom.
Mit Flow-Bedingungen prüfst du Lademodus, Ladestatus und Verbindungsstatus.

Die App fragt deine evcc-Instanz im lokalen Netzwerk ab und benötigt keinen Cloud-Dienst.

## Einrichtung

1. Installiere die App **evcc** aus dem [Homey App Store](https://homey.app/de-de/app/com.evcc.io/).
2. Füge ein Gerät hinzu und wähle **Charging point**, **evcc site** oder **Home battery**.
3. Gib die URL deiner evcc-Instanz (z. B. `http://192.168.1.50:7070`) und das Passwort ein, falls eines konfiguriert ist.

Details und Support findest du im [GitHub-Repository](https://github.com/rdvnit/com.evcc.io).
