---
sidebar_position: 15
---

# `influx`

Definiert die Influx Konfiguration, um Daten in Influx zu schreiben.

---

## InfluxDB v1.x

**Beispiel Influx v1**:

```yaml
influx:
  url: http://localhost:8086
  database: evcc
  # user:
  # password:
```

---

## InfluxDB v2.x

**Beispiel Influx v2**:

```yaml
  url: http://localhost:8086
  database: evcc
  token: "1234567890abcdef"
  org: "Home"
```
