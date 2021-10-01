---
sidebar_position: 5
---

# API

## REST API

- `/api/state`: EVCC state (static configuration and dynamic state)
- `/api/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `/api/loadpoints/<id>/minsoc`: loadpoint minimum SoC (writable)
- `/api/loadpoints/<id>/targetsoc`: loadpoint target SoC (writable)
- `/api/loadpoints/<id>/phases`: loadpoint enabled phases (writable)

Note: to modify writable settings perform a `POST` request appending the value as path segment.

## MQTT API

The MQTT API follows the REST API's structure, with loadpoint ids starting at `0`:

- `evcc`: root topic
- `evcc/status`: status (`online`/`offline`)
- `evcc/updated`: timestamp of last update
- `evcc/site`: site dynamic state
- `evcc/site/prioritySoC`: battery priority SoC (writable)
- `evcc/loadpoints`: number of available loadpoints
- `evcc/loadpoints/<id>`: loadpoint dynamic state
- `evcc/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `evcc/loadpoints/<id>/minSoC`: loadpoint minimum SoC (writable)
- `evcc/loadpoints/<id>/targetSoC`: loadpoint target SoC (writable)
- `evcc/loadpoints/<id>/phases`: loadpoint enabled phases (writable)

Note: to modify writable settings append `/set` to the topic for writing.
