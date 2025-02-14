---
sidebar_position: 2
---

# MQTT API

:::note
Die Dokumentation ist noch nicht vollständig.
Die meisten der über die [REST API](./rest-api) verfügbaren Daten und Funktionen sind auch via MQTT verfügbar.
Nutze Tools wie [MQTT Explorer](https://mqtt-explorer.com/) um die Daten zu visualisieren.
:::

Die MQTT API folgt der [REST API](./rest-api) Struktur.
Alle API IDs (z.B. die Loadpoint ID) beginnen bei `1`.

- `evcc`: root topic
- `evcc/status`: status (`online`/`offline`)
- `evcc/updated`: timestamp of last update

## Site

- `evcc/site`: site dynamic state
- `evcc/site/prioritySoc`: battery priority SoC (writable)
- `evcc/site/bufferSoc`: battery buffer SoC (writable)
- `evcc/site/bufferStartSoc`: battery buffer start SoC (writable)
- `evcc/site/residualPower`: grid residual power (writable)
- `evcc/site/smartCostLimit`: smart charging cost limit (previously known as "cheap" tariff) (writable)
- `evcc/site/batteryDischargeControl`: enable/disable battery discharge control (true/false) (writable)

## Vehicles

**Note**: for vehicle names see `evcc/vehicles`.

- `evcc/vehicles`: number of vehicles
- `evcc/vehicles/<name>/minSoc`: minimum soc in % (writable)
- `evcc/vehicles/<name>/limitSoc`: limit soc in % (writable)
- `evcc/vehicles/<name>/planSoc`: plan soc (writable using JSON payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)

## Loadpoints

- `evcc/loadpoints`: number of available loadpoints
- `evcc/loadpoints/<id>`: dynamic state
- `evcc/loadpoints/<id>/mode`: charge mode (writable)
- `evcc/loadpoints/<id>/minSoc`: minimum SoC (writable)
- `evcc/loadpoints/<id>/limitSoc`: limit SoC in % (writable) - only applicable for online vehicles
- `evcc/loadpoints/<id>/limitEnergy`: limit energy in kWh (writable) - only applicable for offline vehicles
- `evcc/loadpoints/<id>/plan/energy`: plan energy (writable using JSON payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phases`: enabled phases (writable)
- `evcc/loadpoints/<id>/minCurrent`: current minCurrent value (writable)
- `evcc/loadpoints/<id>/maxCurrent`: current maxCurrent value (writable)
- `evcc/loadpoints/<id>/enableThreshold`: threshold value (writable)
- `evcc/loadpoints/<id>/enableDelay`: delay value (s) (writable)
- `evcc/loadpoints/<id>/disableThreshold`: threshold value (writable)
- `evcc/loadpoints/<id>/disableDelay`: delay value (s) (writable)
- `evcc/loadpoints/<id>/batteryboost`: battery boost enabled (writeable: [1/0])
- `evcc/loadpoints/<id>/priority`: priority value (writable)

:::note
Um schreibbare Einstellungen durchzuführen, muss ein `/set` am Ende des Topics hinzugefügt werden an welches der neue Wert gesendet wird.
Beispiel: `mosquitto_pub -t "evcc/loadpoints/1/phases/set" -m "3"` um die Anzahl der netzseitigen Phasen am 1. Ladepunkt auf `3` festzulegen.
:::

:::info
\*\* Zeitangabe efolgt in UTC im Format `yyyy-mm-ddThh:mm:ssZ`

Beispiele:

`2023-03-05T07:00:00Z` = 5. März 2023 um 8:00 Uhr MEZ

`2023-08-17T19:30:00Z` = 17. August 2023 um 21:30 Uhr MESZ
:::
