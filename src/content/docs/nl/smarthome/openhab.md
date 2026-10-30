---
title: "openHAB"
description: "Neem uw evcc-installatie in openHAB op met de officiële evcc-binding, die laadpunten, voertuigen en locatiegegevens automatisch vindt, of koppel via MQTT."
translatedFrom: "a70270e36e27"
---

[openHAB](https://www.openhab.org) is een opensource-smarthomeplatform dat apparaten en diensten van veel fabrikanten verbindt.
De officiële [evcc-binding](https://www.openhab.org/addons/bindings/evcc/) brengt gegevens en bedieningselementen van uw evcc-installatie naar openHAB.

## evcc-binding

De binding maakt via het lokale netwerk verbinding met uw evcc-installatie en bevraagt de API met een instelbaar interval.
Hij vereist evcc-versie 0.209.8 of nieuwer.

Zodra de verbinding is ingesteld, worden uw geconfigureerde apparaten automatisch gevonden.
De binding levert Things voor:

- Laadpunten met laadvermogen, laadmodus, stroomlimieten en sessiegegevens
- Voertuigen met laadniveau en laadplannen
- Locatiegegevens zoals netvermogen, productie van zonne-energie en thuisbatterij
- Verwarmingstoestellen

U kunt het laden volgen in openHAB-dashboards en laadmodi, limieten en laadplannen instellen vanuit regels en automatiseringen.

### Instellen

1. Installeer de binding **evcc** vanuit de add-on store van openHAB.
2. Voeg het bridge-Thing van evcc toe en voer het adres en de poort van uw evcc-installatie in.
3. Accepteer de automatisch gevonden Things uit de inbox.

Configuratiedetails en de volledige lijst met channels zijn gedocumenteerd in de [bindingdocumentatie](https://www.openhab.org/addons/bindings/evcc/).

## MQTT

U kunt ook via MQTT gegevens met openHAB uitwisselen.
Stel de brokerverbinding in evcc in onder **Configuratie → MQTT** en koppel de MQTT-binding van openHAB aan dezelfde broker.
De beschikbare topics zijn gedocumenteerd in de [MQTT API](/nl/integrations/mqtt-api).
