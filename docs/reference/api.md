---
sidebar_position: 5
---

# API

Mit evcc kann über REST und MQTT APIs interagiert werden.

Alle API IDs (z.B. die Loadpoint ID) beginnen bei `1`.

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
Beispiel: `curl -X POST http://evcc:7070/api/loadpoints/1/mode/pv` um den Lademodus des 1. Ladepunkts auf `pv` zu stellen.
:::

## MQTT API

Die MQTT API folgt der REST API Struktur:

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
Um schreibbare Einstellungen durchzuführen, muss ein `/set` am Ende des Topics hinzugefügt werden an welches der neue Wert gesendet wird.
Beispiel: `mosquitto_pub -t "evcc/loadpoints/1/phases/set" -m "3"` um die Anzahl der netzseitigen Phasen am 1. Ladepunkt auf `3` festzulegen.
:::

:::info
\*\* Zeitangabe efolgt in UTC im Format `yyyy-mm-ddThh:mm:ssZ`

Beispiele:

`2023-03-05T07:00:00Z` = 5. März 2023 um 8:00 Uhr MEZ

`2023-08-17T19:30:00Z` = 17. August 2023 um 21:30 Uhr MESZ
:::
