---
title: "network"
description: "Imposta in evcc.yaml hostname o IP e porta dell’interfaccia web, oltre all’URL esterno usato dietro un reverse proxy o dall’app."
sidebar:
  order: 9
translatedFrom: "dbac4fd9896b"
---

Definisce l’indirizzo IP o l’hostname e la porta con cui si accede all’interfaccia web.

**Esempio**:

```yaml
network:
  # schema is the HTTP schema
  # setting to `https` does not enable https, it only changes the way URLs are generated
  schema: http
  # host is the hostname or IP address
  # if the host name contains a `.local` suffix, the name will be announced on MDNS
  # docker: MDNS announcements don't work. host must be set to the docker host's name.
  host: evcc.local
  # port is the listening port for UI and api
  # evcc will listen on all available interfaces
  port: 7070
  # externalUrl is the URL you use to access evcc in your browser
  # used for autodiscovery by the evcc app and by services/devices connecting to evcc
  # if you're running evcc behind a reverse proxy, use that URL, e.g. "https://evcc.example.com" (requires authentication at the proxy)
  externalUrl: https://evcc.local
```
