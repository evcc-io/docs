---
title: "influx"
description: "Configurez dans evcc.yaml l’enregistrement des données de charge dans InfluxDB 1.8, InfluxDB 2 ou VictoriaMetrics, y compris en HTTPS avec un certificat auto-signé."
sidebar:
  order: 16
translatedFrom: "63ea856c515d"
---

Définit la configuration nécessaire pour écrire des données dans Influx.

---

## InfluxDB v1.8.x

:::caution[Nécessite au moins InfluxDB 1.8.3]
:::

**Exemple pour Influx v1** :

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Exemple pour Influx v2** :

```yaml
influx:
  url: http://localhost:8086
  database: evcc # InfluxDB v2.x uses the term `bucket`, but for compatibility, it's still named `database` here
  token: 1234567890abcdef
  org: home
```

---

## HTTPS avec certificat auto-signé

Avec HTTPS (`https://`), le certificat TLS est vérifié par défaut.
Si vous utilisez un certificat auto-signé, vous pouvez désactiver la vérification du certificat :

**Par exemple** :

```yaml
influx:
  url: https://influxdb.example.com:8086
  database: evcc
  token: 1234567890abcdef
  org: home
  insecure: true
```

## VictoriaMetrics

[VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) est une base de données de séries temporelles dotée d’une API REST compatible avec InfluxDB.

L’authentification HTTP basique peut se faire via l’URL.

**Exemple pour VictoriaMetrics** :

```yaml
influx:
  url: http://[username:password@]victoria-metrics:8428
```
