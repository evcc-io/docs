---
sidebar_position: 2
---

# MQTT API

All data from the [REST API](./rest-api) endpoint `/api/state` is also published via MQTT.
Lists are converted into individual sub-topics (index starts at `1`).

## Read-Only Topics {#read}

### Site {#site-read}

- `evcc/site/siteTitle`: site title
- `evcc/site/currency`: configured currency
- `evcc/site/homePower`: current home consumption (W)
- `evcc/site/pvPower`: current solar production (W)
- `evcc/site/grid/power`: current grid power (W, positive = import)
- `evcc/site/battery/power`: battery power (W, positive = discharge)
- `evcc/site/battery/soc`: battery state of charge (%)
- `evcc/site/greenShareHome`: self-produced energy share of home consumption (0–1)
- `evcc/site/greenShareLoadpoints`: self-produced energy share of loadpoint consumption (0–1)
- `evcc/site/tariffGrid`: current grid tariff
- `evcc/site/tariffFeedIn`: current feed-in tariff
- `evcc/site/tariffCo2`: current CO₂ intensity
- `evcc/site/batteryGridChargeActive`: battery grid charging active (true/false)

### Loadpoints {#loadpoint-read}

All loadpoint IDs begin at `1`.

- `evcc/loadpoints`: number of available loadpoints
- `evcc/loadpoints/<id>/title`: loadpoint title
- `evcc/loadpoints/<id>/connected`: vehicle connected (true/false)
- `evcc/loadpoints/<id>/charging`: currently charging (true/false)
- `evcc/loadpoints/<id>/enabled`: charger enabled (true/false)
- `evcc/loadpoints/<id>/chargePower`: current charge power (W)
- `evcc/loadpoints/<id>/chargedEnergy`: energy charged in session (Wh)
- `evcc/loadpoints/<id>/chargeDuration`: charge duration (ns)
- `evcc/loadpoints/<id>/chargeRemainingDuration`: remaining charge duration (ns)
- `evcc/loadpoints/<id>/chargeRemainingEnergy`: remaining energy (Wh)
- `evcc/loadpoints/<id>/chargeTotalImport`: charge meter total (Wh)
- `evcc/loadpoints/<id>/vehicleName`: vehicle identifier
- `evcc/loadpoints/<id>/vehicleTitle`: vehicle display name
- `evcc/loadpoints/<id>/vehicleSoc`: vehicle SoC (%)
- `evcc/loadpoints/<id>/vehicleRange`: vehicle range (km)
- `evcc/loadpoints/<id>/phasesActive`: active phases
- `evcc/loadpoints/<id>/planActive`: plan currently active (true/false)
- `evcc/loadpoints/<id>/sessionEnergy`: session energy (Wh)
- `evcc/loadpoints/<id>/sessionSolarPercentage`: self-produced energy share of session (%)
- `evcc/loadpoints/<id>/smartCostActive`: smart cost currently active (true/false)
- `evcc/loadpoints/<id>/effectivePriority`: effective priority

:::warning More Topics
This list is incomplete.
For all available topics, use [MQTT Explorer](https://mqtt-explorer.com/).
:::

## Writable Topics {#write}

To change writable topics, append `/set` to the topic and send the new value.

```bash
mosquitto_pub -t "evcc/loadpoints/1/phasesConfigured/set" -m "3"
```

Times are in UTC using the format `yyyy-mm-ddThh:mm:ssZ`, e.g. `2023-03-05T07:00:00Z` (= 5 March 2023, 8:00 CET).

The following strings are recognised as empty values: `nil`, `null`, `none`, `-`.
Use these to reset previously set thresholds:

```bash
mosquitto_pub -t "evcc/site/batteryGridChargeLimit/set" -m "none"
```

### Site {#site-write}

- `evcc/site/prioritySoc`: battery priority SoC
- `evcc/site/bufferSoc`: battery buffer SoC
- `evcc/site/bufferStartSoc`: battery buffer start SoC
- `evcc/site/residualPower`: grid residual power
- `evcc/site/batteryGridChargeLimit`: smart charging cost limit
- `evcc/site/batteryDischargeControl`: enable/disable battery discharge control (true/false)
- `evcc/site/batteryMode`: external battery mode (`normal`, `hold`, `charge`) — directly controls all controllable batteries, overrules other evcc modes, resets after 60 s
- `evcc/site/smartCostLimit`: smart cost limit for all loadpoints
- `evcc/site/smartFeedInPriorityLimit`: feed-in priority limit for all loadpoints

### Loadpoints {#loadpoint-write}

- `evcc/loadpoints/<id>/mode`: charge mode
- `evcc/loadpoints/<id>/minSoc`: minimum SoC
- `evcc/loadpoints/<id>/limitSoc`: limit SoC in % — only applicable for online vehicles
- `evcc/loadpoints/<id>/limitEnergy`: limit energy in kWh — only applicable for offline vehicles
- `evcc/loadpoints/<id>/planEnergy`: plan energy (JSON payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phasesConfigured`: configured phases
- `evcc/loadpoints/<id>/minCurrent`: minimum current value
- `evcc/loadpoints/<id>/maxCurrent`: maximum current value
- `evcc/loadpoints/<id>/enableThreshold`: threshold value
- `evcc/loadpoints/<id>/enableDelay`: delay value (s)
- `evcc/loadpoints/<id>/disableThreshold`: threshold value
- `evcc/loadpoints/<id>/disableDelay`: delay value (s)
- `evcc/loadpoints/<id>/batteryboost`: battery boost enabled (1/0)
- `evcc/loadpoints/<id>/batteryBoostLimit`: battery boost SoC limit
- `evcc/loadpoints/<id>/priority`: priority value
- `evcc/loadpoints/<id>/smartCostLimit`: smart cost limit
- `evcc/loadpoints/<id>/smartFeedInPriorityLimit`: feed-in priority limit
- `evcc/loadpoints/<id>/planStrategy`: plan strategy (JSON)
- `evcc/loadpoints/<id>/vehicle`: set vehicle by name

### Vehicles {#vehicle-write}

For vehicle names see `evcc/vehicles`.

- `evcc/vehicles/<name>/minSoc`: minimum SoC in %
- `evcc/vehicles/<name>/limitSoc`: limit SoC in %
- `evcc/vehicles/<name>/planSoc`: plan SoC (JSON payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/vehicles/<name>/planStrategy`: plan strategy (JSON)
