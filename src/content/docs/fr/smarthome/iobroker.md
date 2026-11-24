---
title: "ioBroker"
description: "Montre comment relier ioBroker à votre instance evcc, soit avec l’adaptateur communautaire ioBroker.evcc via l’API REST, soit en partageant un broker MQTT."
translatedFrom: "d7b49d124f14"
---

[ioBroker](https://www.iobroker.net) est une plateforme domotique open source qui intègre des appareils et des services à l’aide d’adaptateurs.
L’adaptateur [ioBroker.evcc](https://github.com/Newan/ioBroker.evcc) relie ioBroker à votre instance evcc.
Il s’agit d’un projet communautaire qui ne fait pas partie d’evcc.

## Adaptateur evcc

L’adaptateur communique avec votre instance evcc via l’[API REST](/integrations/rest-api).
Il fournit des états pour les points de charge, les véhicules et les données du site, et vous permet de piloter les modes et limites de charge depuis les scripts et visualisations ioBroker.

### Mise en place

1. Installez l’adaptateur **evcc** depuis l’interface d’administration d’ioBroker.
2. Saisissez l’adresse et le port de votre instance evcc dans la configuration de l’adaptateur.

Les détails et l’assistance sont disponibles dans le [dépôt GitHub](https://github.com/Newan/ioBroker.evcc) et dans le [fil du forum ioBroker](https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc).

## MQTT

Vous pouvez aussi échanger des données avec ioBroker via MQTT.
Configurez la connexion au broker dans evcc sous **Configuration → MQTT** et connectez l’adaptateur MQTT d’ioBroker au même broker.
Les topics disponibles sont documentés dans l’[API MQTT](/fr/integrations/mqtt-api).
