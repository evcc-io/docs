---
title: "ioBroker"
---

[ioBroker](https://www.iobroker.net) is an open-source smart home platform that integrates devices and services via adapters.
The [ioBroker.evcc](https://github.com/Newan/ioBroker.evcc) adapter connects ioBroker to your evcc instance.
It is a community project and not part of evcc.

## evcc Adapter

The adapter communicates with your evcc instance via the [REST API](/integrations/rest-api).
It provides states for loadpoints, vehicles, and site data, and lets you control charge modes and limits from ioBroker scripts and visualisations.

### Setup

1. Install the **evcc** adapter from the ioBroker admin interface.
2. Enter the address and port of your evcc instance in the adapter configuration.

Details and support are available in the [GitHub repository](https://github.com/Newan/ioBroker.evcc) and the [ioBroker forum thread](https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc).

## MQTT

Alternatively, you can exchange data with ioBroker via MQTT.
Configure the broker connection in evcc under **Configuration → MQTT** and use ioBroker's MQTT adapter on the same broker.
The available topics are documented in the [MQTT API](/en/integrations/mqtt-api).
