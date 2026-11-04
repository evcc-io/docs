---
title: "influx"
description: "Configura in evcc.yaml la scrittura dei dati di ricarica in InfluxDB 1.8, InfluxDB 2 o VictoriaMetrics, anche tramite HTTPS con un certificato autofirmato."
sidebar:
  order: 16
translatedFrom: "63ea856c515d"
---

Definisce la configurazione necessaria per scrivere dati in Influx.

---

## InfluxDB v1.8.x

:::caution[Richiede almeno InfluxDB 1.8.3]
:::

**Esempio per Influx v1**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Esempio per Influx v2**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc # InfluxDB v2.x uses the term `bucket`, but for compatibility, it's still named `database` here
  token: 1234567890abcdef
  org: home
```

---

## HTTPS con certificato autofirmato

Con HTTPS (`https://`), il certificato TLS viene verificato per impostazione predefinita.
Se usi un certificato autofirmato, puoi disattivare la verifica del certificato:

**Esempio**:

```yaml
influx:
  url: https://influxdb.example.com:8086
  database: evcc
  token: 1234567890abcdef
  org: home
  insecure: true
```

## VictoriaMetrics

[VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) è un database per serie temporali con un’API REST compatibile con InfluxDB.

Le credenziali per l’autenticazione HTTP Basic si possono indicare direttamente nell’URL.

**Esempio per VictoriaMetrics**:

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
