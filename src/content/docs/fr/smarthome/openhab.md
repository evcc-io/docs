---
title: "openHAB"
description: "Montre comment intégrer votre instance evcc à openHAB, soit avec le binding evcc officiel qui détecte points de charge, véhicules et données du site, soit via MQTT."
translatedFrom: "a70270e36e27"
---

[openHAB](https://www.openhab.org) est une plateforme domotique open source qui relie des appareils et des services de nombreux fabricants.
Le [binding evcc](https://www.openhab.org/addons/bindings/evcc/) officiel apporte les données et les commandes de votre instance evcc dans openHAB.

## Binding evcc

Le binding se connecte à votre instance evcc via le réseau local et interroge son API à un intervalle configurable.
Il nécessite evcc en version 0.209.8 ou plus récente.

Une fois la connexion établie, vos appareils configurés sont détectés automatiquement.
Le binding fournit des Things pour :

- les points de charge avec puissance de charge, mode de charge, limites de courant et données de session
- les véhicules avec niveau de charge et plans de charge
- les données du site comme la puissance du réseau, la production solaire et la batterie domestique
- les dispositifs de chauffage

Vous pouvez suivre la charge dans les tableaux de bord openHAB et piloter les modes de charge, les limites et les plans de charge depuis des règles et des automatisations.

### Mise en place

1. Installez le binding **evcc** depuis la boutique des add-ons d’openHAB.
2. Ajoutez un Thing de type bridge evcc et saisissez l’adresse et le port de votre instance evcc.
3. Dans la boîte de réception, acceptez les Things détectés automatiquement.

Les détails de configuration et la liste complète des canaux sont documentés dans la [documentation du binding](https://www.openhab.org/addons/bindings/evcc/).

## MQTT

Vous pouvez aussi échanger des données avec openHAB via MQTT.
Configurez la connexion au broker dans evcc sous **Configuration → MQTT** et connectez le binding MQTT d’openHAB au même broker.
Les topics disponibles sont documentés dans l’[API MQTT](/fr/integrations/mqtt-api).
