---
sidebar_position: 5
---

# API

Mit evcc kann über REST und MQTT APIs interagiert werden.

## REST API

- `/api/state`: evcc state (static configuration and dynamic state as JSON object)

- `/api/health`: evcc health check

- `/api/buffersoc`: battery buffer SoC (writable)
- `/api/prioritysoc`: battery priority SoC (writable)
- `/api/residualpower`: grid residual power (writable)

- `/api/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `/api/loadpoints/<id>/minsoc`: loadpoint minimum SoC (writable)
- `/api/loadpoints/<id>/targetsoc`: loadpoint target SoC (writable)
- `/api/loadpoints/<id>/phases`: loadpoint enabled phases (writable)
- `/api/loadpoints/<id>/mincurrent`: loadpoint current minCurrent value (writable)
- `/api/loadpoints/<id>/maxcurrent`: loadpoint current maxCurrent value (writable)
- `/api/loadpoints/<id>/enablethreshold`: loadpoint enable threshold value (writable)
- `/api/loadpoints/<id>/disablethreshold`: loadpoint disable threshold value (writable)

Die Loadpoint IDs beginnen bei `0`.

:::note
Um schreibbare Einstellungen durchzuführen, muss eine `POST` HTTP Anfrage gesendet und der zu ändernde Wert dabei als Segment an die URI angehängt werden.
Beispiel: `curl -X POST http://evcc:7070/api/loadpoints/0/mode/pv` um den Lademodus des 1. Ladepunkts auf `pv` zu stellen.
:::

## MQTT API

Die MQTT API folgt der REST API Struktur, jedoch mit den Ladepunkt (loadpoint) IDs bei `1` beginnend:

- `evcc`: root topic
- `evcc/status`: status (`online`/`offline`)
- `evcc/updated`: timestamp of last update

- `evcc/site`: site dynamic state
- `evcc/site/bufferSoC`: battery buffer SoC (writable)
- `evcc/site/prioritySoC`: battery priority SoC (writable)
- `evcc/site/residualPower`: grid residual power (writable)

- `evcc/loadpoints`: number of available loadpoints
- `evcc/loadpoints/<id>`: loadpoint dynamic state
- `evcc/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `evcc/loadpoints/<id>/minSoC`: loadpoint minimum SoC (writable)
- `evcc/loadpoints/<id>/targetSoC`: loadpoint target SoC (writable)
- `evcc/loadpoints/<id>/phases`: loadpoint enabled phases (writable)
- `evcc/loadpoints/<id>/minCurrent`: loadpoint current minCurrent value (writable)
- `evcc/loadpoints/<id>/maxCurrent`: loadpoint current maxCurrent value (writable)

:::note
Um schreibbare Einstellungen durchzuführen, muss ein `/set` am Ende des Topics hinzugefügt werden an welches der neue Wert gesendet wird.
Beispiel: `mosquitto_pub -t "evcc/loadpoints/1/phases/set" -m "3"` um die Anzahl der netzseitigen Phasen am 1. Ladepunkt auf `3` festzulegen.
:::
