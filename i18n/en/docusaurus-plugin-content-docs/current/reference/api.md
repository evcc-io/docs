---
sidebar_position: 5
---

# API

evcc can interact with REST and MQTT APIs.

All API IDs (e.g., Loadpoint ID) start at `1`.

## REST API

- `GET  /api/state`: evcc state (static configuration and dynamic state as JSON object)
- `GET  /api/health`: evcc health check
- `POST /api/prioritysoc/<soc>`: battery priority SoC in %
- `POST /api/buffersoc/<soc>`: battery buffer SoC in %
- `POST /api/bufferstartsoc/<soc>`: battery buffer start SoC in %
- `POST /api/residualpower/<power>`: grid residual power in W
- `POST /api/smartcostlimit/<cost>`: smart charging cost limit (previously known as "cheap" tariff)
- `GET  /api/tariff/<type>`: list of prices (grid/feedin/planner)
- `GET  /api/sessions[?format=csv&lang=<lang>]`: charging sessions
- `GET  /api/telemetry`: telemetry enabled status
- `POST /api/telemetry/<status>`: enable/disable telemetry (true/false)

### Loadpoint

- `POST   /api/loadpoints/<id>/mode/<mode>`: charge mode (off/pv/minpv/now)
- `POST   /api/loadpoints/<id>/minsoc/<soc>`: minimum SoC in %
- `POST   /api/loadpoints/<id>/target/soc/<soc>`: target SoC in %
- `POST   /api/loadpoints/<id>/target/energy/<energy>`: target energy in kWh
- `POST   /api/loadpoints/<id>/target/time/<time>`: target time in RFC3339 / ISO format \*\*
- `DELETE /api/loadpoints/<id>/target/time`: disable target charging
- `GET    /api/loadpoints/<id>/target/plan[?targetTime=<time>]`: charging plan details
- `POST   /api/loadpoints/<id>/phases/<phases>`: enabled phases (0=auto/1=1p/3=3p)
- `POST   /api/loadpoints/<id>/mincurrent/<current>`: current minCurrent value in A
- `POST   /api/loadpoints/<id>/maxcurrent/<current>`: current maxCurrent value in A
- `POST   /api/loadpoints/<id>/enable/threshold/<threshold>`: threshold value in W
- `POST   /api/loadpoints/<id>/disable/threshold/<threshold>`: threshold value in W
- `POST   /api/loadpoints/<id>/vehicle/<vehicleId>`: set currently selected vehicle

:::note
Example: `curl -X POST http://evcc:7070/api/loadpoints/1/mode/pv` to set the charging mode of the 1st Loadpoint to `pv`.
:::

## MQTT API

The MQTT API follows the REST API structure:

- `evcc`: root topic
- `evcc/status`: status (`online`/`offline`)
- `evcc/updated`: timestamp of last update

- `evcc/site`: site dynamic state
- `evcc/site/prioritySoc`: battery priority SoC (writable)
- `evcc/site/bufferSoc`: battery buffer SoC (writable)
- `evcc/site/bufferStartSoc`: battery buffer start SoC (writable)
- `evcc/site/residualPower`: grid residual power (writable)
- `evcc/site/smartCostLimit`: smart charging cost limit (previously known as "cheap" tariff) (writable)

- `evcc/loadpoints`: number of available loadpoints
- `evcc/loadpoints/<id>`: loadpoint dynamic state
- `evcc/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `evcc/loadpoints/<id>/minSoc`: loadpoint minimum SoC (writable)
- `evcc/loadpoints/<id>/targetSoc`: loadpoint target SoC in % (writable)
- `evcc/loadpoints/<id>/targetEnergy`: loadpoint target energy in kWh (writable)
- `evcc/loadpoints/<id>/targetTime`: loadpoint target time in RFC3339 / ISO format (writable) \*\*
- `evcc/loadpoints/<id>/phases`: loadpoint enabled phases (writable)
- `evcc/loadpoints/<id>/minCurrent`: loadpoint current minCurrent value (writable)
- `evcc/loadpoints/<id>/maxCurrent`: loadpoint current maxCurrent value (writable)
- `evcc/loadpoints/<id>/enableThreshold`: loadpoint threshold value (writable)
- `evcc/loadpoints/<id>/disableThreshold`: loadpoint threshold value (writable)

:::note
To perform writable settings, add `/set` at the end of the topic to which the new value will be sent.
Example: `mosquitto_pub -t "evcc/loadpoints/1/phases/set" -m "3"` to set the number of grid-side phases of the 1st Loadpoint to `3`.
:::

:::info
\*\* Time is in UTC in the format `yyyy-mm-ddThh:mm:ssZ`

Examples:

`2023-03-05T07:00:00Z` = 5th March 2023 at 7:00 AM UTC

`2023-08-17T19:30:00Z` = 17th August 2023 at 7:30 PM UTC
:::
```