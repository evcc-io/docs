---
title: "influx"
description: "How to write charging data to InfluxDB 1.8, 2 or 3 or to VictoriaMetrics from evcc.yaml, including HTTPS with a self-signed certificate."
sidebar:
  order: 16
---

Defines the configuration required to write data to Influx.

---

## InfluxDB v1.8.x

:::caution[Requires at least InfluxDB 1.8.3]
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

---

## InfluxDB 3

InfluxDB 3 Core and Enterprise accept the write API of InfluxDB 2, so the settings for InfluxDB v2.x apply here as well.
The `database` is created on the first write if it doesn't exist yet.
The `token` needs write access to this database.
InfluxDB 3 ignores `org`, so it can be left out.
Username and password aren't accepted.

**Example for InfluxDB 3**:

```yaml
influx:
  url: http://localhost:8181
  database: evcc
  token: apiv3_1234567890abcdef
```

In the UI, use the regular InfluxDB form and enter the database name as **Bucket**.
**Organization** is a required field there, but any value works.

---

## HTTPS with Self-Signed Certificate

When using HTTPS (`https://`), the TLS certificate is verified by default.
If you're using a self-signed certificate, certificate verification can be disabled:

**For example**:

```yaml
influx:
  url: https://influxdb.example.com:8086
  database: evcc
  token: 1234567890abcdef
  org: home
  insecure: true
```

## VictoriaMetrics

[VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) is a time series database with InfluxDB compatible REST API.

HTTP basic authentication can be done via the URL.

**Example for VictoriaMetrics**:

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
