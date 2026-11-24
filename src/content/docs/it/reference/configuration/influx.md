---
title: "influx"
description: "Configura in evcc.yaml la scrittura dei dati di ricarica in InfluxDB 1.8, 2 o 3 o in VictoriaMetrics, anche tramite HTTPS con un certificato autofirmato."
sidebar:
  order: 16
translatedFrom: "a1fba8b101fa"
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

## InfluxDB 3

InfluxDB 3 Core ed Enterprise accettano l’API di scrittura di InfluxDB 2, quindi le impostazioni per InfluxDB v2.x valgono anche qui.
Il `database` viene creato alla prima scrittura, se non esiste ancora.
Il `token` deve avere accesso in scrittura a questo database.
InfluxDB 3 ignora `org`, quindi lo si può omettere.
Nome utente e password non sono accettati.

**Esempio per InfluxDB 3**:

```yaml
influx:
  url: http://localhost:8181
  database: evcc
  token: apiv3_1234567890abcdef
```

Nell’interfaccia usa il normale modulo InfluxDB e inserisci il nome del database come **Bucket**.
Il campo **Società** può restare vuoto.

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
