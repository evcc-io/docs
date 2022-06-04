---
sidebar_position: 8
---

# `network`

Definiert die IP Adresse bzw. den Host Namen und den Port, auf welchem die Web Oberfläche erreicht werden soll.

**Beispiel**:

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
```
