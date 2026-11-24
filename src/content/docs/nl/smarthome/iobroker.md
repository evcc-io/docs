---
title: "ioBroker"
description: "Verbind ioBroker met uw evcc-installatie via de community-adapter ioBroker.evcc en de REST API, of via een gedeelde MQTT-broker."
translatedFrom: "d7b49d124f14"
---

[ioBroker](https://www.iobroker.net) is een opensource-smarthomeplatform dat apparaten en diensten via adapters integreert.
De adapter [ioBroker.evcc](https://github.com/Newan/ioBroker.evcc) verbindt ioBroker met uw evcc-installatie.
Het is een communityproject en geen onderdeel van evcc.

## evcc-adapter

De adapter communiceert met uw evcc-installatie via de [REST API](/integrations/rest-api).
Hij levert datapunten voor laadpunten, voertuigen en locatiegegevens, en u kunt er laadmodi en limieten mee instellen vanuit ioBroker-scripts en -visualisaties.

### Instellen

1. Installeer de adapter **evcc** via de beheerinterface van ioBroker.
2. Voer het adres en de poort van uw evcc-installatie in de adapterconfiguratie in.

Details en ondersteuning vindt u in de [GitHub-repository](https://github.com/Newan/ioBroker.evcc) en de [forumthread van ioBroker](https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc).

## MQTT

U kunt ook via MQTT gegevens met ioBroker uitwisselen.
Stel de brokerverbinding in evcc in onder **Configuratie → MQTT** en koppel de MQTT-adapter van ioBroker aan dezelfde broker.
De beschikbare topics zijn gedocumenteerd in de [MQTT API](/nl/integrations/mqtt-api).
