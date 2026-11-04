---
title: "network"
description: "So legst du in der evcc.yaml Hostname, IP-Adresse und Port der Weboberfläche fest und setzt die externe URL hinter einem Reverse-Proxy oder für die App."
sidebar:
  order: 9
translatedFrom: "dbac4fd9896b"
---

Definiert die IP-Adresse oder den Hostnamen und den Port, unter dem die Weboberfläche erreichbar sein soll.

**Beispiel**:

```yaml
network:
  # schema ist das HTTP-Schema
  # `https` aktiviert kein HTTPS, sondern ändert nur, wie URLs erzeugt werden
  schema: http
  # host ist der Hostname oder die IP-Adresse
  # endet der Hostname auf `.local`, wird der Name per MDNS bekannt gegeben
  # Docker: MDNS-Ankündigungen funktionieren nicht. host muss auf den Namen des Docker-Hosts gesetzt werden.
  host: evcc.local
  # port ist der Port für UI und API
  # evcc lauscht auf allen verfügbaren Schnittstellen
  port: 7070
  # externalUrl ist die URL, über die du evcc im Browser aufrufst
  # wird für die automatische Erkennung durch die evcc-App und von Diensten/Geräten genutzt, die sich mit evcc verbinden
  # läuft evcc hinter einem Reverse-Proxy, nutze dessen URL, z. B. "https://evcc.example.com" (erfordert Authentifizierung am Proxy)
  externalUrl: https://evcc.local
```
