---
title: "Zendure Speicher via HTTP-API"
description: "So bindet man Zendure-Speicher (AIO, ältere Solarflow-Modelle) in evcc ein – über die lokale HTTP-API mit dem custom meter Plugin."
sidebar:
  order: 15
---

## Zendure-Geräte ohne Cloud-Anbindung

Die nativen [Zendure-Templates](/de/meters/zendure-hyper-2000) funktionieren super für Hyper 2000, Solarflow 800 Pro und Solarflow AC – die reden alle über die Zendure Cloud (MQTT).

Aber: Ältere Geräte wie die AIO-Serie oder bestimmte Solarflow-Modelle haben keinen Cloud-Zugang. Stattdessen bieten sie eine **lokale HTTP-API** an, die man direkt im Netzwerk ansprechen kann.

Ich nutze das selbst in meiner Hybrid-Anlage (Kostal Plenticore + 2× Zendure + Hoymiles) und hier ist wie's funktioniert.

## Das Gerät finden

Die meisten Zendure-Geräte mit dieser API antworten auf:

```
http://<GERAET_IP>/properties/report
```

### IP-Adresse rausfinden

Am einfachsten schaust du im Router nach – such nach "ZENDURE" oder "Solarflow". Alternativ geht die Zendure App (unter *Einstellungen* → *Gerät*), wenn sie die IP anzeigt. Oder du scannst dein Netzwerk:

```bash
nmap -sn 192.168.178.0/24 | grep -i zendure
```

### API testen

Ruf den Endpunkt einfach im Browser auf oder mit curl:

```bash
curl http://<GERAET_IP>/properties/report
```

Wenn's klappt, bekommst du JSON zurück – etwa so:

```json
{
  "properties": {
    "outputHomePower": 1500,
    "gridInputPower": 200,
    "electricLevel": 75
  }
}
```

## Was bedeuten die Werte?

| Feld | Was es ist | Einheit |
|------|-----------|---------|
| `outputHomePower` | Leistung am Haus (PV + Batterie zusammen) | W |
| `gridInputPower` | Netzbezug | W |
| `electricLevel` | Batterieladestand | % |

Die **Batterieleistung** berechnest du so:

```
Batterie = outputHomePower - gridInputPower
```

- **Positiv** → Batterie liefert Strom (entlädt sich)
- **Negativ** → Batterie lädt (überschüssige PV)

## evcc einrichten

### Einfache Konfiguration

Folgendes in die `evcc.yaml`:

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
    capacity: 8.16
```

Kurze Erklärung:
- `source: http` → evcc holt die Werte per HTTP-Request
- `uri` → die URL vom Zendure-Gerät
- `jq` → damit extrahierst du den Wert aus dem JSON (oder rechnest drauflos)
- `capacity` → Akkukapazität in kWh, wichtig wenn du mehrere Batterien hast

### Mehrere Zendure-Speicher

So sieht's bei mir aus – drei Batterien im System:

```yaml
meters:
  # Hauptbatterie: BYD via Kostal Plenticore (Modbus)
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

### Komplettes Beispiel – meine Anlage

Hier die komplette `evcc.yaml` meiner Hybrid-Anlage:

```yaml
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

## Was wenn's nicht klappt?

### Gerät antwortet nicht
- Firewall checken: Port 80 vom evcc-Server zum Zendure-Gerät muss offen sein
- Gerät neu starten (Strom weg, wieder rein)
- IP im Router prüfen

### Vorzeichen sind falsch
Manche Geräte liefern die Werte invertiert. Dann einfach umdrehen:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: (.properties.gridInputPower - .properties.outputHomePower) * -1
```

### SOC-Feld fehlt
Manche Firmware-Versionen haben kein `electricLevel`. Dann die rohe JSON-Antwort checken:

```bash
curl http://<IP>/properties/report | python3 -m json.tool
```

Suche nach Feldern wie `soc`, `batteryLevel` oder `stateOfCharge`.

### Langsame Antwort
Ein Timeout hilft:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: .properties.outputHomePower - .properties.gridInputPower
  timeout: 5s
```

## Batteriemodus steuern (optional)

Falls dein Gerät den Modus per HTTP ändert, geht das so:

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

## API-Antworten cachen

Die API nicht zu oft belasten – ein Cache hilft:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: .properties.outputHomePower - .properties.gridInputPower
  cache: 10s
```

## Welche Geräte haben die HTTP-API?

| Gerät | API-Endpunkt | SOC-Feld |
|-------|-------------|----------|
| Zendure AIO Serie | `/properties/report` | `electricLevel` |
| Zendure Solarflow (älter) | `/properties/report` | `electricLevel` |
| Zendure Hyper 2000 | Cloud API (MQTT) | — |
| Zendure Solarflow 800 Pro | Cloud API (MQTT) | — |

## Quellen

- [evcc custom meter](/de/reference/configuration/meters#custom)
- [evcc http plugin](/de/reference/plugins#http-read-write)
- [jq manual](https://jqlang.github.io/jq/manual/)
