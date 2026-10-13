---
title: "Zendure Batteries via HTTP API"
description: "How to integrate Zendure batteries (AIO, older Solarflow models) into evcc using the local HTTP API with the custom meter plugin."
sidebar:
  order: 15
---

## Zendure devices without cloud connection

The native [Zendure templates](/en/meters/zendure-hyper-2000) work great for Hyper 2000, Solarflow 800 Pro and Solarflow AC – they all talk to the Zendure Cloud (MQTT).

But: Older devices like the AIO series or certain Solarflow models don't have cloud access. Instead, they offer a **local HTTP API** that you can call directly on your network.

I use this myself in my hybrid setup (Kostal Plenticore + 2× Zendure + Hoymiles) and here's how it works.

## Finding the device

Most Zendure devices with this API respond to:

```
http://<DEVICE_IP>/properties/report
```

### Getting the IP address

Easiest way is checking your router – look for "ZENDURE" or "Solarflow". Alternatively, the Zendure app (under *Settings* → *Device*) might show it. Or scan your network:

```bash
nmap -sn 192.168.178.0/24 | grep -i zendure
```

### Testing the API

Just open the endpoint in a browser or with curl:

```bash
curl http://<DEVICE_IP>/properties/report
```

If it works, you'll get JSON back – something like this:

```json
{
  "properties": {
    "outputHomePower": 1500,
    "gridInputPower": 200,
    "electricLevel": 75
  }
}
```

## Understanding the values

| Field | What it is | Unit |
|-------|-----------|------|
| `outputHomePower` | Power at home connection (PV + battery combined) | W |
| `gridInputPower` | Grid power drawn | W |
| `electricLevel` | Battery state of charge | % |

**Battery power** is calculated as:

```
Battery = outputHomePower - gridInputPower
```

- **Positive** → battery is discharging (supplying the house)
- **Negative** → battery is charging (consuming excess PV)

## Setting up evcc

### Simple configuration

Add this to your `evcc.yaml`:

```yaml
meters:
  - name: zendure_battery
    type: custom
    power:
      source: http
      uri: http://<DEVICE_IP>/properties/report
      jq: .properties.outputHomePower - .properties.gridInputPower
    soc:
      source: http
      uri: http://<DEVICE_IP>/properties/report
      jq: .properties.electricLevel
    capacity: 8.16
```

Quick explanation:
- `source: http` → evcc fetches values via HTTP request
- `uri` → the URL of your Zendure device
- `jq` → extracts the value from JSON (or does math)
- `capacity` → battery capacity in kWh, important when you have multiple batteries

### Multiple Zendure batteries

Here's my setup – three batteries in the system:

```yaml
meters:
  # Main battery: BYD via Kostal Plenticore (Modbus)
  - name: kostal_battery
    type: template
    template: kostal-plenticore-gen2
    id: 71
    host: 192.168.178.24
    port: 1502
    usage: battery
    capacity: 12.8

  # Zendure Battery 1 (Garage)
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

  # Zendure Battery 2 (Guests)
  - name: zendure_guests
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
    - zendure_guests
```

### Complete example – my setup

Here's the full `evcc.yaml` of my hybrid installation:

```yaml
interval: 30s

meters:
  # PV Roof: Kostal Plenticore Gen 2 (Modbus TCP)
  - name: pv_roof
    type: template
    template: kostal-plenticore-gen2
    id: 71
    host: 192.168.178.24
    port: 1502
    usage: pv

  # PV Garden: Hoymiles (HTTP API)
  - name: pv_garden
    type: template
    template: hoymiles-ahoydtu
    host: 192.168.178.26
    id: 0

  # Grid: Kostal KSEM (Modbus TCP)
  - name: smartmeter
    type: template
    template: kostal-ksem
    id: 71
    host: 192.168.178.25
    port: 502
    usage: grid

  # Main battery: BYD via Kostal Plenticore
  - name: battery_main
    type: template
    template: kostal-plenticore-gen2
    id: 71
    host: 192.168.178.24
    port: 1502
    usage: battery
    capacity: 12.8

  # Zendure Battery 1 (HTTP API)
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

  # Zendure Battery 2 (HTTP API)
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
  title: My Home
  meters:
    grid: smartmeter
    pv:
      - pv_roof
      - pv_garden
    battery:
      - battery_main
      - zendure_1
      - zendure_2
```

## Troubleshooting

### Device not responding
- Check firewall: port 80 from evcc server to Zendure device must be open
- Restart the device (power off, then on)
- Verify IP in router

### Wrong signs
Some devices return values inverted. Just flip it:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: (.properties.gridInputPower - .properties.outputHomePower) * -1
```

### SOC field missing
Some firmware versions don't have `electricLevel`. Check the raw JSON response:

```bash
curl http://<IP>/properties/report | python3 -m json.tool
```

Look for fields like `soc`, `batteryLevel` or `stateOfCharge`.

### Slow responses
Add a timeout:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: .properties.outputHomePower - .properties.gridInputPower
  timeout: 5s
```

## Controlling battery mode (optional)

If your device supports mode changes via HTTP:

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
        - case: 2 # hold (no charge/discharge)
          set:
            source: http
            uri: http://<IP>/api/mode
            method: POST
            body: '{"mode":"hold"}'
        - case: 3 # charge (grid charging)
          set:
            source: http
            uri: http://<IP>/api/mode
            method: POST
            body: '{"mode":"charge"}'
```

## Caching API responses

Don't overload the API – add a cache:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: .properties.outputHomePower - .properties.gridInputPower
  cache: 10s
```

## Which devices have the HTTP API?

| Device | API Endpoint | SOC Field |
|--------|-------------|-----------|
| Zendure AIO Series | `/properties/report` | `electricLevel` |
| Zendure Solarflow (older) | `/properties/report` | `electricLevel` |
| Zendure Hyper 2000 | Cloud API (MQTT) | — |
| Zendure Solarflow 800 Pro | Cloud API (MQTT) | — |

## Sources

- [evcc custom meter](/en/reference/configuration/meters#custom)
- [evcc http plugin](/en/reference/plugins#http-read-write)
- [jq manual](https://jqlang.github.io/jq/manual/)
