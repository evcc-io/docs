---
sidebar_position: 2
---

# MQTT API

:::note
The documentation is not yet complete.
The most of the data and functions available via the [REST API](./rest-api) are also available via MQTT.
Use tools like [MQTT Explorer](https://mqtt-explorer.com/) to visualize your data.
:::

The MQTT API has the same structure as the [REST API](./rest-api).
All API IDs (e.g. the loadpoint ID) begin at `1`.

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
To set any of the writable values, add a `/set` at the end of the topic for which a
change should be made.

Example: `mosquitto_pub -t "evcc/loadpoints/1/phases/set" -m "3"` to set the number of
phases for the first loadpoint to `3`.
:::

:::info
\*\* Times are in UTC in the following format: `yyyy-mm-ddThh:mm:ssZ`

Examples:

`2023-03-05T07:00:00Z` = 5th of March 2023 at 8:00 CET

`2023-08-17T19:30:00Z` = 17th of August 2023 at 21:30 CEST
:::

:::note
\*\* Support for empty values:
The following strings are recognized as empty values:

- `nil`
- `null`
- `none`
- `-`

Examples:

- `evcc/site/batteryGridChargeLimit/set`: 'none'

To set the price threshold for charging the battery to 'none' or to delete it.
:::
