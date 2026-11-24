---
title: "MQTT-API"
description: "Listet alle MQTT-Topics auf, die evcc zu Standort, Ladepunkten, Fahrzeugen und Hausbatterie sendet, und die Topics zum Ändern von Modi, Limits oder Ladeplänen."
sidebar:
  order: 2
translatedFrom: "2c690ff491d7"
---

Der [API State](/de/reference/state) wird auch per MQTT veröffentlicht.
Jedes Feld wird zu einem eigenen Topic, verschachtelte Objekte und Listen werden in einzelne Sub-Topics aufgelöst (Index beginnt bei `1`).

## Nur lesbare Topics

### Standort

- `evcc/site/siteTitle`: Titel des Standorts
- `evcc/site/currency`: konfigurierte Währung
- `evcc/site/homePower`: aktueller Hausverbrauch (W)
- `evcc/site/pvPower`: aktuelle PV-Erzeugung (W)
- `evcc/site/grid/power`: aktuelle Netzleistung (W, positiv = Bezug)
- `evcc/site/battery/power`: Batterieleistung (W, positiv = Entladung)
- `evcc/site/battery/soc`: Batterieladestand (%)
- `evcc/site/greenShareHome`: PV-Anteil am Hausverbrauch (0 bis 1)
- `evcc/site/greenShareLoadpoints`: PV-Anteil am Ladepunktverbrauch (0 bis 1)
- `evcc/site/tariffGrid`: aktueller Netzbezugstarif
- `evcc/site/tariffFeedIn`: aktuelle Einspeisevergütung
- `evcc/site/tariffCo2`: aktuelle CO₂-Intensität
- `evcc/site/batteryGridChargeActive`: Netzladen der Batterie aktiv (true/false)

### Ladepunkte

Alle Ladepunkt-IDs beginnen bei `1`.

- `evcc/loadpoints`: Anzahl der verfügbaren Ladepunkte
- `evcc/loadpoints/<id>/title`: Ladepunkttitel
- `evcc/loadpoints/<id>/connected`: Fahrzeug verbunden (true/false)
- `evcc/loadpoints/<id>/charging`: lädt gerade (true/false)
- `evcc/loadpoints/<id>/enabled`: Ladepunkt aktiviert (true/false)
- `evcc/loadpoints/<id>/mode`: Lademodus (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: Option Dauerhaft laden (`off`, `on`, `once`)
- `evcc/loadpoints/<id>/chargePower`: aktuelle Ladeleistung (W)
- `evcc/loadpoints/<id>/chargedEnergy`: geladene Energie im Ladevorgang (Wh)
- `evcc/loadpoints/<id>/chargeDuration`: Ladedauer (ns)
- `evcc/loadpoints/<id>/chargeRemainingDuration`: verbleibende Ladedauer (ns)
- `evcc/loadpoints/<id>/chargeRemainingEnergy`: verbleibende Energie (Wh)
- `evcc/loadpoints/<id>/chargeTotalImport`: Zählerstand Ladezähler (Wh)
- `evcc/loadpoints/<id>/vehicleName`: Fahrzeugbezeichner
- `evcc/loadpoints/<id>/vehicleTitle`: Anzeigename des Fahrzeugs
- `evcc/loadpoints/<id>/vehicleSoc`: Fahrzeugladestand (%)
- `evcc/loadpoints/<id>/vehicleRange`: Reichweite des Fahrzeugs (km)
- `evcc/loadpoints/<id>/phasesActive`: aktive Phasen
- `evcc/loadpoints/<id>/planActive`: Ladeplan gerade aktiv (true/false)
- `evcc/loadpoints/<id>/sessionEnergy`: Energie des Ladevorgangs (Wh)
- `evcc/loadpoints/<id>/sessionSolarPercentage`: PV-Anteil des Ladevorgangs (%)
- `evcc/loadpoints/<id>/smartCostActive`: Smartes Netzladen gerade aktiv (true/false)
- `evcc/loadpoints/<id>/effectivePriority`: effektive Priorität

:::caution[Weitere Topics]
Diese Liste ist nicht vollständig.
Alle verfügbaren Topics kannst du mit [MQTT Explorer](https://mqtt-explorer.com/) einsehen.
:::

## Schreibbare Topics

Um den Wert eines schreibbaren Topics zu ändern, hänge `/set` an das Topic an und sende den neuen Wert.

```bash
mosquitto_pub -t "evcc/loadpoints/1/phasesConfigured/set" -m "3"
```

Zeitangaben erfolgen in UTC im Format `yyyy-mm-ddThh:mm:ssZ`, z. B. `2023-03-05T07:00:00Z` (= 5. März 2023, 8:00 Uhr MEZ).

Folgende Zeichenfolgen werden als leere Werte erkannt: `nil`, `null`, `none`, `-`.
Damit lassen sich zuvor gesetzte Schwellenwerte zurücksetzen:

```bash
mosquitto_pub -t "evcc/site/batteryGridChargeLimit/set" -m "none"
```

### Standort

- `evcc/site/prioritySoc`: Prioritäts-Ladestand der Batterie
- `evcc/site/bufferSoc`: Puffer-Ladestand der Batterie
- `evcc/site/bufferStartSoc`: Start-Ladestand für den Batteriepuffer
- `evcc/site/residualPower`: Residualleistung am Netzanschluss
- `evcc/site/batteryGridChargeLimit`: Preislimit für das Netzladen der Batterie
- `evcc/site/batteryDischargeControl`: Entladesteuerung der Batterie aktivieren/deaktivieren (true/false)
- `evcc/site/batteryMode`: externer Batteriemodus (`normal`, `hold`, `charge`, `holdcharge`, `discharge`), steuert alle regelbaren Batterien direkt, überschreibt andere evcc-Modi und wird nach 60 s zurückgesetzt
- `evcc/site/smartCostLimit`: Preislimit für smartes Netzladen aller Ladepunkte
- `evcc/site/smartFeedInPriorityLimit`: Einspeisegrenze für alle Ladepunkte

### Ladepunkte

- `evcc/loadpoints/<id>/mode`: Lademodus (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: Option Dauerhaft laden (`off`, `on`, `once`), nur im Smart-Modus
- `evcc/loadpoints/<id>/minSoc`: Mindestladung
- `evcc/loadpoints/<id>/limitSoc`: Ladelimit in %, nur für Online-Fahrzeuge
- `evcc/loadpoints/<id>/limitEnergy`: Energielimit in kWh, nur für Offline-Fahrzeuge
- `evcc/loadpoints/<id>/planEnergy`: Ladeplan-Energie (JSON-Payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phasesConfigured`: konfigurierte Phasen
- `evcc/loadpoints/<id>/minCurrent`: minimaler Ladestrom
- `evcc/loadpoints/<id>/maxCurrent`: maximaler Ladestrom
- `evcc/loadpoints/<id>/solarShare`: PV-Anteil an der Mindestladeleistung (0 bis 1)
- `evcc/loadpoints/<id>/enableThreshold`: Einschaltschwelle
- `evcc/loadpoints/<id>/enableDelay`: Einschaltverzögerung (s)
- `evcc/loadpoints/<id>/disableThreshold`: Ausschaltschwelle
- `evcc/loadpoints/<id>/disableDelay`: Ausschaltverzögerung (s)
- `evcc/loadpoints/<id>/batteryboost`: Batterie Boost aktiviert (1/0)
- `evcc/loadpoints/<id>/batteryBoostLimit`: Ladestandlimit für Batterie Boost
- `evcc/loadpoints/<id>/priority`: Prioritätswert
- `evcc/loadpoints/<id>/smartCostLimit`: Preislimit für smartes Netzladen
- `evcc/loadpoints/<id>/smartFeedInPriorityLimit`: Einspeisegrenze
- `evcc/loadpoints/<id>/planStrategy`: Ladeplan-Strategie (JSON)
- `evcc/loadpoints/<id>/vehicle`: Fahrzeug setzen (Fahrzeugname)

### Fahrzeuge

Die Fahrzeugnamen findest du unter `evcc/vehicles`.

- `evcc/vehicles/<name>/minSoc`: Mindestladung in %
- `evcc/vehicles/<name>/limitSoc`: Ladelimit in %
- `evcc/vehicles/<name>/planSoc`: Ladeplan-Ladestand (JSON-Payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/vehicles/<name>/planStrategy`: Ladeplan-Strategie (JSON)
