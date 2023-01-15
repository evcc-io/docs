---
sidebar_position: 5
---

# API

Mit evcc kann über REST und MQTT APIs interagiert werden.

Alle API IDs (z.B. die Loadpoint ID) beginnen bei `1`.

## REST API

- `/api/state`: evcc state (static configuration and dynamic state as JSON object)

- `/api/health`: evcc health check

- `/api/buffersoc`: battery buffer Soc (writable)
- `/api/prioritysoc`: battery priority Soc (writable)
- `/api/residualpower`: grid residual power (writable)

- `/api/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `/api/loadpoints/<id>/minsoc`: loadpoint minimum Soc (writable)
- `/api/loadpoints/<id>/targetsoc`: loadpoint target Soc (writable)
- `/api/loadpoints/<id>/phases`: loadpoint enabled phases (writable)
- `/api/loadpoints/<id>/mincurrent`: loadpoint current minCurrent value (writable)
- `/api/loadpoints/<id>/maxcurrent`: loadpoint current maxCurrent value (writable)
- `/api/loadpoints/<id>/enablethreshold`: loadpoint enable threshold value (writable)
- `/api/loadpoints/<id>/disablethreshold`: loadpoint disable threshold value (writable)

:::note
Um schreibbare Einstellungen durchzuführen, muss eine `POST` HTTP Anfrage gesendet und der zu ändernde Wert dabei als Segment an die URI angehängt werden.
Beispiel: `curl -X POST http://evcc:7070/api/loadpoints/1/mode/pv` um den Lademodus des 1. Ladepunkts auf `pv` zu stellen.
:::

## MQTT API

Die MQTT API folgt der REST API Struktur:

- `evcc`: root topic
- `evcc/status`: status (`online`/`offline`)
- `evcc/updated`: timestamp of last update

- `evcc/site`: site dynamic state
- `evcc/site/bufferSoc`: battery buffer Soc (writable)
- `evcc/site/prioritySoc`: battery priority Soc (writable)
- `evcc/site/residualPower`: grid residual power (writable)

- `evcc/loadpoints`: number of available loadpoints
- `evcc/loadpoints/<id>`: loadpoint dynamic state
- `evcc/loadpoints/<id>/mode`: loadpoint charge mode (writable)
- `evcc/loadpoints/<id>/minSoc`: loadpoint minimum Soc (writable)
- `evcc/loadpoints/<id>/targetSoc`: loadpoint target Soc (writable)
- `evcc/loadpoints/<id>/phases`: loadpoint enabled phases (writable)
- `evcc/loadpoints/<id>/minCurrent`: loadpoint current minCurrent value (writable)
- `evcc/loadpoints/<id>/maxCurrent`: loadpoint current maxCurrent value (writable)

:::note
Um schreibbare Einstellungen durchzuführen, muss ein `/set` am Ende des Topics hinzugefügt werden an welches der neue Wert gesendet wird.
Beispiel: `mosquitto_pub -t "evcc/loadpoints/1/phases/set" -m "3"` um die Anzahl der netzseitigen Phasen am 1. Ladepunkt auf `3` festzulegen.
:::
