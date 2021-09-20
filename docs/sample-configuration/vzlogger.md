---
sidebar_position: 2
---

# VZLogger

VZLogger is part of (volkszaehler.org)[https://volkszaehler.org]

Values can be read from vzlogger with http. Virtual channels are supported and can be used to sustract channels for import and export. The values are read from vzlogger, middleware is not needed. The values are uppdated with aggtime of vzlogger.

```yaml
meters:
- name: grid
  type: custom
  power:
    source: http
    uri: http://volkszaehler/api/data/<uuid>.json?from=now
    jq: .data.tuples[0][1] # parse response json
```
For 1s update rates vzloggers push server can be uses. This is only useable for `<uuid>` from vzlogger, not for virtual channels.

```yaml
meters:
- name: grid_websocket
  type: custom
  power:
    source: ws
    uri: ws://volkszaehler:8082/socket
    jq: .data | select(.uuid=="<uuid>") .tuples[0][1] # parse response json
    timeout: 30s
    scale: 1
```


or for separated import and export channels

```yaml
- name: grid
  type: custom
  power:
    type: calc
    add:
      - source: http
        uri: http://volkszaehler/api/data/<uuid>.json?from=now # import channel
        jq: .data.tuples[0][1] # parse response json
      - source: http
        uri: http://volkszaehler/api/data/<uuid>.json?from=now # export channel
        jq: .data.tuples[0][1] # parse response json
        scale: -1 # export must result in negative values
```

Replace `<uuid>` with your uuid. Settings can be tested with `curl -s http://volkszaehler/api/data/<uuid>.json?from=now | jq .data.tuples[0][1]`
