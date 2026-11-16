---
title: "influx"
description: "Configurez dans evcc.yaml l’enregistrement des données de charge dans InfluxDB 1.8, 2 ou 3 ou dans VictoriaMetrics, y compris en HTTPS avec un certificat auto-signé."
sidebar:
  order: 16
translatedFrom: "fd6f2baee906"
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

## InfluxDB 3

InfluxDB 3 Core et Enterprise acceptent l’API d’écriture d’InfluxDB 2, les paramètres d’InfluxDB v2.x s’appliquent donc ici aussi.
La `database` est créée lors de la première écriture si elle n’existe pas encore.
Le `token` doit disposer d’un accès en écriture à cette base de données.
InfluxDB 3 ignore `org`, qui peut donc être omis.
Le nom d’utilisateur et le mot de passe ne sont pas acceptés.

**Exemple pour InfluxDB 3** :

```yaml
influx:
  url: http://localhost:8181
  database: evcc
  token: apiv3_1234567890abcdef
```

Dans l’interface, utilisez le formulaire InfluxDB habituel et saisissez le nom de la base de données dans **Seau**.
**Organisation** y est un champ obligatoire, mais n’importe quelle valeur convient.

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
