---
title: "influx"
description: "So schreibt deine evcc-Instanz Ladedaten per evcc.yaml an InfluxDB 1.8, InfluxDB 2 oder VictoriaMetrics, auch über HTTPS mit selbstsigniertem Zertifikat."
sidebar:
  order: 16
translatedFrom: "63ea856c515d"
---

Definiert die Konfiguration, die zum Schreiben von Daten in InfluxDB nötig ist.

---

## InfluxDB v1.8.x

:::caution[Erfordert mindestens InfluxDB 1.8.3]
:::

**Beispiel für InfluxDB v1**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Beispiel für InfluxDB v2**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc # InfluxDB v2.x verwendet den Begriff `bucket`, aus Kompatibilitätsgründen heißt es hier aber weiterhin `database`
  token: 1234567890abcdef
  org: home
```

---

## HTTPS mit selbstsigniertem Zertifikat

Bei Verwendung von HTTPS (`https://`) wird standardmäßig das TLS-Zertifikat überprüft.
Falls du ein selbstsigniertes Zertifikat verwendest, kannst du die Zertifikatsüberprüfung deaktivieren:

**Beispiel**:

```yaml
influx:
  url: https://influxdb.example.com:8086
  database: evcc
  token: 1234567890abcdef
  org: home
  insecure: true
```

## VictoriaMetrics

[VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) ist eine Zeitreihendatenbank mit InfluxDB-kompatibler REST-API.

HTTP-Basic-Authentifizierung ist über die URL möglich.

**Beispiel für VictoriaMetrics**:

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
