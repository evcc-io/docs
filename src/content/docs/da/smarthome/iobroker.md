---
title: "ioBroker"
description: "Sådan forbinder du ioBroker med din evcc-installation, enten med fællesskabsadapteren ioBroker.evcc via REST API eller via en fælles MQTT-broker."
translatedFrom: "d7b49d124f14"
---

[ioBroker](https://www.iobroker.net) er en open source-platform til smart home, der integrerer enheder og tjenester via adaptere.
Adapteren [ioBroker.evcc](https://github.com/Newan/ioBroker.evcc) forbinder ioBroker med din evcc-installation.
Det er et fællesskabsprojekt og ikke en del af evcc.

## evcc-adapter

Adapteren kommunikerer med din evcc-installation via [REST API](/integrations/rest-api).
Den stiller tilstande til rådighed for ladepunkter, køretøjer og anlægsdata og lader dig styre ladetilstande og grænser fra ioBroker-scripts og -visualiseringer.

### Opsætning

1. Installer adapteren **evcc** fra ioBrokers administrationsgrænseflade.
2. Indtast adressen og porten på din evcc-installation i adapterens konfiguration.

Detaljer og support finder du i [GitHub-repositoriet](https://github.com/Newan/ioBroker.evcc) og i [tråden i ioBroker-forummet](https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc).

## MQTT

Alternativt kan du udveksle data med ioBroker via MQTT.
Konfigurer broker-forbindelsen i evcc under **Opsætning → MQTT**, og brug ioBrokers MQTT-adapter på den samme broker.
De tilgængelige topics er dokumenteret i [MQTT API](/da/integrations/mqtt-api).
