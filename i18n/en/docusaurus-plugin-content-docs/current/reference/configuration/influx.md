---
sidebar_position: 15
---

# `influx`

Defines the configuration required to write data to Influx.

---

## InfluxDB v1.8.x

:::important
Requires at least InfluxDB 1.8.3
:::

**Example for Influx v1**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Example for Influx v2**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc # InfluxDB v2.x uses the term `bucket`, but for compatibility, it's still named `database` here
  token: 1234567890abcdef
  org: home
```

## VictoriaMetrics

[VictoriaMetrix](https://github.com/VictoriaMetrics/VictoriaMetrics) is a time series database with InfluxDB compatible REST API.

HTTP basic authentication can be done via the URL.

**Example for VictoriaMetrics**:

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
