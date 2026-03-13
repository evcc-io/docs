---
sidebar_position: 2
---

# MQTT API

Alle Daten des [REST API](./rest-api) Endpunkts `/api/state` werden auch per MQTT veröffentlicht.
Listen werden dabei in einzelne Sub-Topics aufgelöst (Index beginnt bei `1`).

## Lesbare Topics {#read}

### Site {#site-read}

- `evcc/site/siteTitle`: Seitentitel
- `evcc/site/currency`: konfigurierte Währung
- `evcc/site/homePower`: aktueller Hausverbrauch (W)
- `evcc/site/pvPower`: aktuelle PV-Erzeugung (W)
- `evcc/site/grid/power`: aktuelle Netzleistung (W, positiv = Bezug)
- `evcc/site/battery/power`: Batterieleistung (W, positiv = Entladung)
- `evcc/site/battery/soc`: Batterie-Ladestand (%)
- `evcc/site/greenShareHome`: Eigenerzeugungs-Anteil am Hausverbrauch (0–1)
- `evcc/site/greenShareLoadpoints`: Eigenerzeugungs-Anteil am Ladepunktverbrauch (0–1)
- `evcc/site/tariffGrid`: aktueller Netztarif
- `evcc/site/tariffFeedIn`: aktuelle Einspeisevergütung
- `evcc/site/tariffCo2`: aktuelle CO₂-Intensität
- `evcc/site/batteryGridChargeActive`: Netzladen der Batterie aktiv (true/false)

### Loadpoints {#loadpoint-read}

Alle Loadpoint IDs beginnen bei `1`.

- `evcc/loadpoints`: Anzahl der verfügbaren Ladepunkte
- `evcc/loadpoints/<id>/title`: Ladepunkt-Titel
- `evcc/loadpoints/<id>/connected`: Fahrzeug verbunden (true/false)
- `evcc/loadpoints/<id>/charging`: lädt gerade (true/false)
- `evcc/loadpoints/<id>/enabled`: Ladepunkt aktiviert (true/false)
- `evcc/loadpoints/<id>/chargePower`: aktuelle Ladeleistung (W)
- `evcc/loadpoints/<id>/chargedEnergy`: geladene Energie in Sitzung (Wh)
- `evcc/loadpoints/<id>/chargeDuration`: Ladedauer (ns)
- `evcc/loadpoints/<id>/chargeRemainingDuration`: verbleibende Ladedauer (ns)
- `evcc/loadpoints/<id>/chargeRemainingEnergy`: verbleibende Energie (Wh)
- `evcc/loadpoints/<id>/chargeTotalImport`: Zählerstand Ladezähler (Wh)
- `evcc/loadpoints/<id>/vehicleName`: Fahrzeug-Bezeichner
- `evcc/loadpoints/<id>/vehicleTitle`: Fahrzeug-Anzeigename
- `evcc/loadpoints/<id>/vehicleSoc`: Fahrzeug-SoC (%)
- `evcc/loadpoints/<id>/vehicleRange`: Fahrzeug-Reichweite (km)
- `evcc/loadpoints/<id>/phasesActive`: aktive Phasen
- `evcc/loadpoints/<id>/planActive`: Plan aktiv (true/false)
- `evcc/loadpoints/<id>/sessionEnergy`: Sitzungsenergie (Wh)
- `evcc/loadpoints/<id>/sessionSolarPercentage`: Eigenerzeugungs-Anteil der Sitzung (%)
- `evcc/loadpoints/<id>/smartCostActive`: Smart Cost aktiv (true/false)
- `evcc/loadpoints/<id>/effectivePriority`: effektive Priorität

:::warning Weitere Topics
Diese Liste ist nicht vollständig.
Alle verfügbaren Topics kannst du mit [MQTT Explorer](https://mqtt-explorer.com/) einsehen.
:::

## Schreibbare Topics {#write}

Um schreibbare Topics zu ändern, hänge `/set` an das Topic an und sende den neuen Wert.

```bash
mosquitto_pub -t "evcc/loadpoints/1/phasesConfigured/set" -m "3"
```

Zeitangaben erfolgen in UTC im Format `yyyy-mm-ddThh:mm:ssZ`, z. B. `2023-03-05T07:00:00Z` (= 5. März 2023, 8:00 MEZ).

Folgende Zeichenfolgen werden als leere Werte erkannt: `nil`, `null`, `none`, `-`.
Damit lassen sich z. B. gesetzte Schwellenwerte zurücksetzen:

```bash
mosquitto_pub -t "evcc/site/batteryGridChargeLimit/set" -m "none"
```

### Site {#site-write}

- `evcc/site/prioritySoc`: Batterie-Prioritäts-SoC
- `evcc/site/bufferSoc`: Batterie-Puffer-SoC
- `evcc/site/bufferStartSoc`: Batterie-Puffer-Start-SoC
- `evcc/site/residualPower`: Netz-Residualleistung
- `evcc/site/batteryGridChargeLimit`: Preisschwelle für Netzladen
- `evcc/site/batteryDischargeControl`: Entladeregelung aktivieren/deaktivieren (true/false)
- `evcc/site/batteryMode`: externer Batteriemodus (`normal`, `hold`, `charge`) – steuert alle regelbaren Batterien direkt, überschreibt andere evcc-Modi, wird nach 60 s zurückgesetzt
- `evcc/site/smartCostLimit`: Smart-Cost-Limit für alle Ladepunkte
- `evcc/site/smartFeedInPriorityLimit`: Einspeise-Prioritäts-Limit für alle Ladepunkte

### Loadpoints {#loadpoint-write}

- `evcc/loadpoints/<id>/mode`: Lademodus
- `evcc/loadpoints/<id>/minSoc`: minimaler SoC
- `evcc/loadpoints/<id>/limitSoc`: Limit-SoC in % – nur für Online-Fahrzeuge
- `evcc/loadpoints/<id>/limitEnergy`: Limit-Energie in kWh – nur für Offline-Fahrzeuge
- `evcc/loadpoints/<id>/planEnergy`: Planenergie (JSON-Payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phasesConfigured`: konfigurierte Phasen
- `evcc/loadpoints/<id>/minCurrent`: minimaler Ladestrom
- `evcc/loadpoints/<id>/maxCurrent`: maximaler Ladestrom
- `evcc/loadpoints/<id>/enableThreshold`: Einschaltschwelle
- `evcc/loadpoints/<id>/enableDelay`: Einschaltverzögerung (s)
- `evcc/loadpoints/<id>/disableThreshold`: Ausschaltschwelle
- `evcc/loadpoints/<id>/disableDelay`: Ausschaltverzögerung (s)
- `evcc/loadpoints/<id>/batteryboost`: Battery Boost aktiviert (1/0)
- `evcc/loadpoints/<id>/batteryBoostLimit`: Battery Boost SoC-Limit
- `evcc/loadpoints/<id>/priority`: Priorität
- `evcc/loadpoints/<id>/smartCostLimit`: Smart-Cost-Limit
- `evcc/loadpoints/<id>/smartFeedInPriorityLimit`: Einspeise-Prioritäts-Limit
- `evcc/loadpoints/<id>/planStrategy`: Planstrategie (JSON)
- `evcc/loadpoints/<id>/vehicle`: Fahrzeug setzen (Fahrzeugname)

### Vehicles {#vehicle-write}

Fahrzeugnamen siehe `evcc/vehicles`.

- `evcc/vehicles/<name>/minSoc`: minimaler SoC in %
- `evcc/vehicles/<name>/limitSoc`: Limit-SoC in %
- `evcc/vehicles/<name>/planSoc`: Plan-SoC (JSON-Payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/vehicles/<name>/planStrategy`: Planstrategie (JSON)
