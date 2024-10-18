---
sidebar_position: 1
---

# REST API

Alle API IDs (z.B. die Loadpoint ID) beginnen bei `1`.

## State

- `GET /api/state`: returns the state of the system<br/>
  Use the optional `jq` parameter for select a subset or specific value. e.g.: `/api/state?jq=.statistics["30d"].avgPrice`

## Site

- `GET /api/health`: evcc health check
- `POST /api/prioritysoc/<soc>`: battery priority soc in %
- `POST /api/buffersoc/<soc>`: battery buffer soc in %
- `POST /api/bufferstartsoc/<soc>`: battery buffer start soc in %
- `POST /api/residualpower/<power>`: grid residual power in W
- `POST /api/batterydischargecontrol/<status>`: enable/disable battery discharge control (true/false)
- `POST /api/smartcostlimit/<cost>`: smart charging cost limit (previously known as "cheap" tariff)
- `GET /api/tariff/<type>`: list of prices (grid/feedin/co2/planner)
- `GET /api/sessions[?format=csv&lang=<lang>]`: charging sessions
- `GET /api/settings/telemetry`: telemetry enabled status
- `POST /api/settings/telemetry/<status>`: enable/disable telemetry (true/false)

## Vehicles

**Note**: for vehicle names see `vehicles` array in `/api/state` response.

- `POST /api/vehicles/<name>/minsoc/<soc>`: minimum soc in %
- `POST /api/vehicles/<name>/limitsoc/<soc>`: limit soc in %
- `POST /api/vehicles/<name>/plan/soc/<soc>/<time>`: soc in % / time in RFC3339 format \*\*
- `DELETE /api/vehicles/<name>/plan/soc`: disable plan charging

## Loadpoints

- `POST /api/loadpoints/<id>/mode/<mode>`: charge mode (off/pv/minpv/now)
- `POST /api/loadpoints/<id>/limitsoc/<soc>`: limit soc in % - only applicable for online vehicles
- `POST /api/loadpoints/<id>/limitenergy/<energy>`: limit energy in kWh - only applicable for offline vehicles
- `POST /api/loadpoints/<id>/plan/energy/<energy>/<time>`: energy in kWh / target time in RFC3339 format \*\*
- `DELETE /api/loadpoints/<id>/plan/energy`: disable plan charging
- `GET /api/loadpoints/<id>/plan`: charging plan details
- `POST /api/loadpoints/<id>/phases/<phases>`: allowed phases (0=auto/1=1p/3=3p)
- `POST /api/loadpoints/<id>/mincurrent/<current>`: current minCurrent value in A
- `POST /api/loadpoints/<id>/maxcurrent/<current>`: current maxCurrent value in A
- `POST /api/loadpoints/<id>/enable/threshold/<threshold>`: threshold value in W
- `POST /api/loadpoints/<id>/disable/threshold/<threshold>`: threshold value in W
- `POST /api/loadpoints/<id>/vehicle/<name>`: set currently selected vehicle
- `DELETE /api/loadpoints/<id>/vehicle`: remove vehicle
- `PATCH /api/loadpoints/<id>/vehicle`: start vehicle detection
- `POST /api/loadpoints/<id>/batteryboost/<status>`: enable/disable battery boost (1/0)     

:::note
Beispiel: `curl -X POST http://evcc:7070/api/loadpoints/1/mode/pv` um den Lademodus des 1. Ladepunkts auf `pv` zu stellen.
:::
