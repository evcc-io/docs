---
title: "Zendure Batteries via HTTP API"
description: "Guide for integrating Zendure batteries (AIO, Solarflow) into evcc using the local HTTP API with the custom meter plugin."
sidebar:
  order: 15
---

## Overview

The native [Zendure templates](/en/meters/zendure-hyper-2000) support the Hyper 2000, Solarflow 800 Pro and Solarflow AC models via the Zendure Cloud API (MQTT).

For older or alternative Zendure devices (AIO series, certain Solarflow models), this cloud API is not available. However, these devices offer a **local HTTP API** that allows reading power and state of charge.

This guide shows integration using the [`custom` meter](/en/reference/configuration/meters#custom) with the [`http` plugin](/en/reference/plugins#http-read-write).

## Prerequisites

- Zendure device reachable on local network
- Device has HTTP API on port 80 (or other port)
- evcc can reach the device

## Finding the API endpoint

Most Zendure devices with local HTTP API respond to:

```
http://<DEVICE_IP>/properties/report
```

### Finding the IP address

1. In the **Zendure App** under *Settings* → *Device*, read the IP address (if shown)
2. Or search for the device name "ZENDURE" or "Solarflow" in your router
3. Or use a network scanner like `nmap`:

```bash
nmap -sn 192.168.178.0/24 | grep -i zendure
```

### Testing the API

Access the endpoint in a browser or with curl:

```bash
curl http://<DEVICE_IP>/properties/report
```

A successful response looks like this:

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

## Understanding the JSON structure

| Field | Meaning | Unit |
|-------|---------|------|
| `outputHomePower` | Power at home connection (PV + battery) | W |
| `gridInputPower` | Grid power drawn | W |
| `electricLevel` | Battery state of charge (SOC) | % |

### Calculating battery power

Battery power is calculated as:

```
Battery = outputHomePower - gridInputPower
```

- **Positive**: Battery discharging (supplying the house)
- **Negative**: Battery charging (consuming excess PV)

## evcc Configuration

### Custom Meter for Zendure Battery

Add the following configuration to your `evcc.yaml`:

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
    capacity: 8.16  # Battery capacity in kWh (adjust!)
```

### Parameter Explanation

| Parameter | Description |
|-----------|-------------|
| `source: http` | Uses the HTTP plugin for reading values |
| `uri` | URL of the Zendure API endpoint |
| `jq` | jq expression to extract/calculate the value |
| `capacity` | Battery capacity in kWh (important for multiple batteries) |

### Multiple Zendure Batteries

For multiple Zendure devices, repeat the configuration with different IPs and names:

```yaml
meters:
  # Main battery (Kostal Plenticore BYD)
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

### Complete Example (Hybrid Installation)

Here is a complete configuration as discussed in the evcc forum:

```yaml
# ============================================
# HYBRID INSTALLATION: Kostal + Hoymiles + 2× Zendure
# ============================================

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

### API not responding

- Check firewall: port 80 from evcc server to Zendure device must be open
- Restart the device (power off, then on)
- Check IP address in router

### Wrong values / signs

The calculation `outputHomePower - gridInputPower` may be inverted for some devices. If signs are wrong:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: (.properties.gridInputPower - .properties.outputHomePower) * -1
```

### SOC value missing or wrong

Some Zendure firmware versions don't have the `electricLevel` field. Check the raw JSON response:

```bash
curl http://<IP>/properties/report | python3 -m json.tool
```

Look for fields like `soc`, `batteryLevel`, `stateOfCharge`.

### Timeout on slow responses

Add a timeout:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: .properties.outputHomePower - .properties.gridInputPower
  timeout: 5s
```

## Tips for Optimization

### Controlling battery mode

If your Zendure device supports mode changes via HTTP (e.g., `auto`, `hold`, `charge`):

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

### Caching API responses

To not overload the API, you can set a cache:

```yaml
power:
  source: http
  uri: http://<IP>/properties/report
  jq: .properties.outputHomePower - .properties.gridInputPower
  cache: 10s
```

## Known Devices with HTTP API

| Device | API Endpoint | SOC Field |
|--------|-------------|-----------|
| Zendure AIO Series | `/properties/report` | `electricLevel` |
| Zendure Solarflow (older) | `/properties/report` | `electricLevel` |
| Zendure Hyper 2000 | Cloud API (MQTT) | — |
| Zendure Solarflow 800 Pro | Cloud API (MQTT) | — |

## Sources

- [evcc custom meter docs](/en/reference/configuration/meters#custom)
- [evcc http plugin docs](/en/reference/plugins#http-read-write)
- [jq manual](https://jqlang.github.io/jq/manual/)
