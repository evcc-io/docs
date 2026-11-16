---
title: "influx"
description: "Popisuje, jak v evcc.yaml nastavit zápis dat o nabíjení do InfluxDB 1.8, 2 nebo 3 či do VictoriaMetrics, včetně HTTPS se self-signed certifikátem."
sidebar:
  order: 16
translatedFrom: "a1fba8b101fa"
---

Určuje konfiguraci potřebnou pro zápis dat do InfluxDB.

---

## InfluxDB v1.8.x

:::caution[Vyžaduje alespoň InfluxDB 1.8.3]
:::

**Příklad pro Influx v1**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Příklad pro Influx v2**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc # InfluxDB v2.x uses the term `bucket`, but for compatibility, it's still named `database` here
  token: 1234567890abcdef
  org: home
```

---

## InfluxDB 3

InfluxDB 3 Core a Enterprise přijímají zápisové API InfluxDB 2, takže zde platí i nastavení pro InfluxDB v2.x.
Databáze `database` se při prvním zápisu vytvoří, pokud ještě neexistuje.
`token` potřebuje oprávnění k zápisu do této databáze.
InfluxDB 3 ignoruje `org`, takže ho lze vynechat.
Uživatelské jméno a heslo se nepřijímají.

**Příklad pro InfluxDB 3**:

```yaml
influx:
  url: http://localhost:8181
  database: evcc
  token: apiv3_1234567890abcdef
```

V uživatelském rozhraní použijte běžný formulář InfluxDB a název databáze zadejte jako **Úložiště (bucket)**.
**Organizace** může zůstat prázdná.

---

## HTTPS se self-signed certifikátem

Při použití HTTPS (`https://`) se certifikát TLS ve výchozím stavu ověřuje.
Pokud používáte self-signed certifikát, lze ověřování certifikátu vypnout:

**Příklad**:

```yaml
influx:
  url: https://influxdb.example.com:8086
  database: evcc
  token: 1234567890abcdef
  org: home
  insecure: true
```

## VictoriaMetrics

[VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) je databáze časových řad s REST API kompatibilním s InfluxDB.

Přihlašovací údaje pro HTTP Basic Auth můžete zadat přímo v URL.

**Příklad pro VictoriaMetrics**:

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
