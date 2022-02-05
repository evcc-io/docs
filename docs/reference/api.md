---
sidebar_position: 5
---

# API

Mit evcc kann über REST und MQTT APIs interagiert werden.

## REST API

- `/api/state`: evcc state (static configuration and dynamic state)
- `/api/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `/api/loadpoints/<id>/minsoc`: loadpoint minimum SoC (writable)
- `/api/loadpoints/<id>/targetsoc`: loadpoint target SoC (writable)
- `/api/loadpoints/<id>/phases`: loadpoint enabled phases (writable)
- `/api/loadpoints/<id>/mincurrent`: loadpoint current minCurrent value (writable)
- `/api/loadpoints/<id>/maxcurrent`: loadpoint current maxCurrent value (writable)

:::note
Um schreibbare Einstellungen durchzuführen, muss eine `POST` HTTP Anfrage mit dem zu ändernden Wert im Pfad Segement gesendet werden.
:::

## MQTT API

Die MQTT API folgt der REST API Struktur, mit den Ladepunkt (loadpoint) IDs bei `0` beginnend:

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
- `evcc/loadpoints/<id>/minCurrent`: loadpoint current minCurrent value (writable)
- `evcc/loadpoints/<id>/maxCurrent`: loadpoint current maxCurrent value (writable)

:::note
Um schreibbare Einstellungen durchzuführen, muss ein `/set` am Ende des Topics hinzugefügt werden.
:::
