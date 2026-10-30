---
title: "influx"
description: "Beschrijft hoe u vanuit evcc.yaml laadgegevens naar InfluxDB 1.8, InfluxDB 2 of VictoriaMetrics schrijft, inclusief HTTPS met een zelfondertekend certificaat."
sidebar:
  order: 16
translatedFrom: "63ea856c515d"
---

Definieert de configuratie die nodig is om gegevens naar Influx te schrijven.

---

## InfluxDB v1.8.x

:::caution[Vereist minimaal InfluxDB 1.8.3]
:::

**Voorbeeld voor Influx v1**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Voorbeeld voor Influx v2**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc # InfluxDB v2.x uses the term `bucket`, but for compatibility, it's still named `database` here
  token: 1234567890abcdef
  org: home
```

---

## HTTPS met zelfondertekend certificaat

Bij gebruik van HTTPS (`https://`) wordt het TLS-certificaat standaard gecontroleerd.
Als u een zelfondertekend certificaat gebruikt, kan de certificaatcontrole worden uitgeschakeld:

**Voorbeeld**:

```yaml
influx:
  url: https://influxdb.example.com:8086
  database: evcc
  token: 1234567890abcdef
  org: home
  insecure: true
```

## VictoriaMetrics

[VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) is een tijdreeksdatabase met een InfluxDB-compatibele REST-API.

HTTP-basisauthenticatie kan via de URL worden ingesteld.

**Voorbeeld voor VictoriaMetrics**:

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
