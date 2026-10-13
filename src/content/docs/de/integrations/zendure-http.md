---
title: "Zendure Speicher via HTTP-API"
description: "Anleitung zur Integration von Zendure-Speichern (AIO, Solarflow) in evcc über die lokale HTTP-API mit dem custom meter Plugin."
sidebar:
  order: 15
---

## Übersicht

Die nativen [Zendure-Templates](/de/meters/zendure-hyper-2000) unterstützen die Hyper 2000, Solarflow 800 Pro und Solarflow AC Modelle über die Zendure Cloud API (MQTT).

Für ältere oder alternative Zendure-Geräte (AIO Serie, bestimmte Solarflow-Modelle) steht diese API nicht zur Verfügung. Diese Geräte bieten jedoch eine **lokale HTTP-API**, über die sich Leistung und Ladestand auslesen lassen.

Diese Anleitung zeigt die Integration über das [`custom` meter](/de/reference/configuration/meters#custom) mit dem [`http` Plugin](/de/reference/plugins#http-read-write).

## Voraussetzungen

- Zendure-Gerät im lokalen Netzwerk erreichbar
- Gerät hat HTTP-API auf Port 80 (oder anderem Port)
- evcc läuft und kann das Gerät erreichen

## API-Endpunkt finden

Die meisten Zendure-Geräte mit lokaler HTTP-API antworten auf:

```
http://<GERAET_IP>/properties/report
```

### IP-Adresse herausfinden

1. In der **Zendure App** unter *Einstellungen* → *Gerät* die IP-Adresse ablesen (falls angezeigt)
2. Oder im Router nach dem Gerätenamen "ZENDURE" oder "Solarflow" suchen
3. Oder mit einem Netzwerk-Scanner wie `nmap` scannen:

```bash
nmap -sn 192.168.178.0/24 | grep -i zendure
```

### API testen

Rufe den Endpunkt im Browser oder mit curl auf:

```bash
curl http://<GERAET_IP>/properties/report
```

Eine erfolgreiche Antwort sieht etwa so aus:

```json
{
  "properties": {
    "outputHomePower": 1500,
    "gridInputPower": 200,
    "electricLevel": 75,
    ...
  }
}
```

## JSON-Struktur verstehen

| Feld | Bedeutung | Einheit |
|------|-----------|---------|
| `outputHomePower` | Leistung am Hausanschluss (PV + Batterie) | W |
| `gridInputPower` | Bezogene Netzleistung | W |
| `electricLevel` | Batterieladestand (SOC) | % |

### Berechnung der Batterieleistung

Die Batterieleistung ergibt sich aus:

```
Batterie = outputHomePower - gridInputPower
```

- **Positiv**: Batterie entlädt sich (versorgt das Haus)
- **Negativ**: Batterie lädt (überschüssige PV-Ladung)

## evcc-Konfiguration

### Custom Meter für Zendure-Batterie

Füge folgende Konfiguration in deine `evcc.yaml` ein:

```yaml
meters:
  - name: zendure_battery
    type: custom
    power:
      source: http
      uri: http://<GERAET_IP>/properties/report
      jq: .properties.outputHomePower - .properties.gridInputPower
    soc:
      source: http
      uri: http://<GERAET_IP>/properties/report
      jq: .properties.electricLevel
    capacity: 8.16  # Akkukapazität in kWh (anpassen!)
```

### Erklärung der Parameter

| Parameter | Beschreibung |
|-----------|-------------|
| `source: http` | Verwendet das HTTP-Plugin zum Auslesen |
| `uri` | URL des Zendure API-Endpunkts |
| `jq` | jq-Expression zur Extraktion/Berechnung des Werts |
| `capacity` | Kapazität des Speichers in kWh (wichtig für mehrere Batterien) |

### Mehrere Zendure-Speicher

Bei mehreren Zendure-Geräten wiederhole die Konfiguration mit unterschiedlichen IPs und Namen:

```yaml
meters:
  # Hauptbatterie (Kostal Plenticore BYD)
  - name: kostal_battery
    type: template
    template: kostal-plenticore-gen2
    id: 71
    host: 192.168.178.24
    port: 1502
    usage: battery
    capacity: 12.8

  # Zendure Speicher 1 (Garage)
  - name: zendure_garage
    type: custom
    power:
      source: http
      uri: http://192.168.178.34/properties/report
      jq: .properties.outputHomePower - .properties.gridInputPower
    soc:
      source: http
      uri: http://192.168.178.34/properties/report
      jq: .properties.electricLevel
    capacity: 8.16

  # Zendure Speicher 2 (Gäste)
  - name: zendure_gaeste
    type: custom
    power:
      source: http
      uri: http://192.168.178.133/properties/report
      jq: .properties.outputHomePower - .properties.gridInputPower
    soc:
      source: http
      uri: http://192.168.178.133/properties/report
      jq: .properties.electricLevel
    capacity: 11.04

site:
  batteries:
    - kostal_battery
    - zendure_garage
    - zendure_gaeste
```

### Komplettes Beispiel (Hybrid-Anlage)

Hier eine vollständige Konfiguration wie im evcc-Forum diskutiert:

```yaml
# ============================================
# HYBRID-ANLAGE: Kostal + Hoymiles + 2× Zendure
# ============================================

interval: 30s

meters:
  # PV-Dach: Kostal Plenticore Gen 2 (Modbus TCP)
  - name: pv_dach
    type: template
    template: kostal-plenticore-gen2
    id: 71
    host: 192.168.178.24
    port: 1502
    usage: pv

  # PV-Garten: Hoymiles (HTTP API)
  - name: pv_garten
    type: template
    template: hoymiles-ahoydtu
    host: 192.168.178.26
    id: 0

  # Netz: Kostal KSEM (Modbus TCP)
  - name: smartmeter
    type: template
    template: kostal-ksem
    id: 71
    host: 192.168.178.25
    port: 502
    usage: grid

  # Hauptbatterie: BYD via Kostal Plenticore
  - name: battery_main
    type: template
    template: kostal-plenticore-gen2
    id: 71
    host: 192.168.178.24
    port: 1502
    usage: battery
    capacity: 12.8

  # Zendure Speicher 1 (HTTP-API)
  - name: zendure_1
    type: custom
    power:
      source: http
      uri: http://<IP_1>/properties/report
      jq: .properties.outputHomePower - .properties.gridInputPower
    soc:
      source: http
      uri: http://<IP_1>/properties/report
      jq: .properties.electricLevel
    capacity: 8.16

  # Zendure Speicher 2 (HTTP-API)
  - name: zendure_2
    type: custom
    power:
      source: http
      uri: http://<IP_2>/properties/report
      jq: .properties.outputHomePower - .properties.gridInputPower
    soc:
      source: http
      uri: http://<IP_2>/properties/report
      jq: .properties.electricLevel
    capacity: 11.04

chargers:
  - type: template
    template: keba
    host: 192.168.178.21
    name: wallbox_garage

loadpoints:
  - title: Garage
    charger: wallbox_garage
    mode: pv

site:
  title: Mein Zuhause
  meters:
    grid: smartmeter
    pv:
      - pv_dach
      - pv_garten
    battery:
      - battery_main
      - zendure_1
      - zendure_2
```

## Troubleshooting

### API antwortet nicht

- Firewall prüfen: Port 80 vom evcc-Server zum Zendure-Gerät muss offen sein
- Gerät neu starten (Strom weg, wieder rein)
- IP-Adresse im Router prüfen

### Falsche Werte / Vorzeichen

Die Berechnung `outputHomePower - gridInputPower` kann bei manchen Geräten invertiert sein. Falls die Vorzeichen falsch sind:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: (.properties.gridInputPower - .properties.outputHomePower) * -1
```

### SOC-Wert fehlt oder falsch

Manche Zendure-Firmware-Versionen haben das Feld `electricLevel` nicht. Prüfe die rohe JSON-Antwort:

```bash
curl http://<IP>/properties/report | python3 -m json.tool
```

Suche nach Feldern wie `soc`, `batteryLevel`, `stateOfCharge`.

### Timeout bei langsamer Antwort

Füge einen Timeout hinzu:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: .properties.outputHomePower - .properties.gridInputPower
  timeout: 5s
```

## Tipps für die Optimierung

### Batteriemodus steuern

Falls dein Zendure-Gerät den Modus über HTTP ändert (z.B. `auto`, `hold`, `charge`):

```yaml
meters:
  - name: zendure_battery
    type: custom
    power:
      source: http
      uri: http://<IP>/properties/report
      jq: .properties.outputHomePower - .properties.gridInputPower
    soc:
      source: http
      uri: http://<IP>/properties/report
      jq: .properties.electricLevel
    batterymode:
      source: switch
      cases:
        - case: 1 # normal (auto)
          set:
            source: http
            uri: http://<IP>/api/mode
            method: POST
            body: '{"mode":"auto"}'
        - case: 2 # hold (nicht laden/entladen)
          set:
            source: http
            uri: http://<IP>/api/mode
            method: POST
            body: '{"mode":"hold"}'
        - case: 3 # charge (Netzladen)
          set:
            source: http
            uri: http://<IP>/api/mode
            method: POST
            body: '{"mode":"charge"}'
```

### Cache für API-Antworten

Um die API nicht zu oft zu belasten, kannst du einen Cache setzen:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: .properties.outputHomePower - .properties.gridInputPower
  cache: 10s
```

## Bekannte Geräte mit HTTP-API

| Gerät | API-Endpunkt | SOC-Feld |
|-------|-------------|----------|
| Zendure AIO Serie | `/properties/report` | `electricLevel` |
| Zendure Solarflow (ältere) | `/properties/report` | `electricLevel` |
| Zendure Hyper 2000 | Cloud API (MQTT) | — |
| Zendure Solarflow 800 Pro | Cloud API (MQTT) | — |

## Quellen

- [evcc custom meter docs](/de/reference/configuration/meters#custom)
- [evcc http plugin docs](/de/reference/plugins#http-read-write)
- [jq manual](https://jqlang.github.io/jq/manual/)
