---
title: "influx"
description: "Beschrijft hoe u vanuit evcc.yaml laadgegevens naar InfluxDB 1.8, 2 of 3 of naar VictoriaMetrics schrijft, inclusief HTTPS met een zelfondertekend certificaat."
sidebar:
  order: 16
translatedFrom: "a1fba8b101fa"
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

## InfluxDB 3

InfluxDB 3 Core en Enterprise accepteren de schrijf-API van InfluxDB 2, dus de instellingen voor InfluxDB v2.x gelden hier ook.
De `database` wordt bij de eerste schrijfactie aangemaakt als deze nog niet bestaat.
Het `token` heeft schrijfrechten op deze database nodig.
InfluxDB 3 negeert `org`, dus dit kan worden weggelaten.
Gebruikersnaam en wachtwoord worden niet geaccepteerd.

**Voorbeeld voor InfluxDB 3**:

```yaml
influx:
  url: http://localhost:8181
  database: evcc
  token: apiv3_1234567890abcdef
```

Gebruik in de gebruikersinterface het gewone InfluxDB-formulier en voer de databasenaam in als **Bucket**.
**Organisatie** kan leeg blijven.

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
