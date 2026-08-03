---
title: "openHAB"
---

[openHAB](https://www.openhab.org) is an open-source smart home platform that connects devices and services from many manufacturers.
The official [evcc binding](https://www.openhab.org/addons/bindings/evcc/) brings data and controls from your evcc instance into openHAB.

## evcc Binding

The binding connects to your evcc instance over the local network and polls its API at a configurable interval.
It requires evcc version 0.209.8 or newer.

Once the connection is set up, your configured devices are discovered automatically.
The binding provides Things for:

- Loadpoints with charging power, charge mode, current limits, and session data
- Vehicles with state of charge and charging plans
- Site data such as grid power, solar production, and home battery
- Heating devices

You can monitor charging in openHAB dashboards and control charge modes, limits, and charging plans from rules and automations.

### Setup

1. Install the **evcc** binding from the openHAB add-on store.
2. Add the evcc bridge Thing and enter the address and port of your evcc instance.
3. Accept the automatically discovered Things from the inbox.

Configuration details and the full list of channels are documented in the [binding documentation](https://www.openhab.org/addons/bindings/evcc/).

## MQTT

Alternatively, you can exchange data with openHAB via MQTT.
Configure the broker connection in evcc under **Configuration → MQTT** and use openHAB's MQTT binding on the same broker.
The available topics are documented in the [MQTT API](/en/integrations/mqtt-api).
