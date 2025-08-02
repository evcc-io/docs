---
sidebar_position: 15
---

# `influx`

Definiert die Influx Konfiguration, um Daten in Influx zu schreiben.

---

## InfluxDB v1.8.x

:::important Wichtig
Erfordert mindestens InfluxDB 1.8.3
:::

**Beispiel Influx v1**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Beispiel Influx v2**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc # InfluxDB v2.x uses term `bucket` but for compatibility still named `database` here
  token: 1234567890abcdef
  org: home
```

## VictoriaMetrics

[VictoriaMetrix](https://github.com/VictoriaMetrics/VictoriaMetrics) ist eine Time Series Datenbank mit InfluxDB kompatibler REST API.

HTTP basic authentication ist mit der URL möglich.

**Beispiel für VictoriaMetrics**:

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
