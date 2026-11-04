---
title: "influx"
description: "Sådan skriver du opladningsdata til InfluxDB 1.8, InfluxDB 2 eller VictoriaMetrics fra evcc.yaml, inkl. HTTPS med et selvsigneret certifikat."
sidebar:
  order: 16
translatedFrom: "63ea856c515d"
---

Angiver den konfiguration, der er nødvendig for at skrive data til Influx.

---

## InfluxDB v1.8.x

:::caution[Kræver mindst InfluxDB 1.8.3]
:::

**Eksempel med Influx v1**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Eksempel med Influx v2**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc # InfluxDB v2.x uses the term `bucket`, but for compatibility, it's still named `database` here
  token: 1234567890abcdef
  org: home
```

---

## HTTPS med selvsigneret certifikat

Ved brug af HTTPS (`https://`) verificeres TLS-certifikatet som standard.
Hvis du bruger et selvsigneret certifikat, kan verificeringen af certifikatet deaktiveres:

**Eksempel**:

```yaml
influx:
  url: https://influxdb.example.com:8086
  database: evcc
  token: 1234567890abcdef
  org: home
  insecure: true
```

## VictoriaMetrics

[VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) er en tidsseriedatabase med et InfluxDB-kompatibelt REST API.

HTTP Basic-autentificering kan ske via URL'en.

**Eksempel med VictoriaMetrics**:

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
