---
title: "openHAB"
description: "Sådan får du din evcc-installation ind i openHAB, enten med den officielle evcc-binding, der automatisk finder ladepunkter, køretøjer og anlægsdata, eller via MQTT."
translatedFrom: "a70270e36e27"
---

[openHAB](https://www.openhab.org) er en open source-platform til smart home, der forbinder enheder og tjenester fra mange producenter.
Den officielle [evcc-binding](https://www.openhab.org/addons/bindings/evcc/) bringer data og styring fra din evcc-installation ind i openHAB.

## evcc-binding

Bindingen forbinder sig til din evcc-installation via det lokale netværk og henter data fra dens API med et konfigurerbart interval.
Den kræver evcc-version 0.209.8 eller nyere.

Når forbindelsen er sat op, findes dine konfigurerede enheder automatisk.
Bindingen stiller Things til rådighed for:

- Ladepunkter med ladeeffekt, ladetilstand, strømgrænser og sessionsdata
- Køretøjer med opladningsniveau og ladeplaner
- Anlægsdata som elnettets effekt, solproduktion og hjemmebatteri
- Varmelegemer

Du kan følge opladningen i openHAB-dashboards og styre ladetilstande, grænser og ladeplaner fra regler og automatiseringer.

### Opsætning

1. Installer bindingen **evcc** fra openHABs add-on-butik.
2. Tilføj bridge-Thingen for evcc, og indtast adressen og porten på din evcc-installation.
3. Accepter de automatisk fundne Things fra indbakken.

Konfigurationsdetaljer og den fulde liste over kanaler finder du i [bindingens dokumentation](https://www.openhab.org/addons/bindings/evcc/).

## MQTT

Alternativt kan du udveksle data med openHAB via MQTT.
Konfigurer broker-forbindelsen i evcc under **Opsætning → MQTT**, og brug openHABs MQTT-binding på den samme broker.
De tilgængelige topics er dokumenteret i [MQTT API](/da/integrations/mqtt-api).
