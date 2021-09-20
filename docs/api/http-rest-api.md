# REST API

- `/api/state`: EVCC state (static configuration and dynamic state)
- `/api/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `/api/loadpoints/<id>/minsoc`: loadpoint minimum SoC (writable)
- `/api/loadpoints/<id>/targetsoc`: loadpoint target SoC (writable)
- `/api/loadpoints/<id>/phases`: loadpoint enabled phases (writable)

Note: to modify writable settings perform a `POST` request appending the value as path segment.