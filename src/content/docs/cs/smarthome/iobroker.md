---
title: "ioBroker"
description: "ioBroker propojíte s vaší instancí evcc buď komunitním adaptérem ioBroker.evcc přes REST API, nebo pomocí sdíleného MQTT brokeru."
translatedFrom: "d7b49d124f14"
---

[ioBroker](https://www.iobroker.net) je open-source platforma pro chytrou domácnost, která pomocí adaptérů integruje zařízení a služby.
Adaptér [ioBroker.evcc](https://github.com/Newan/ioBroker.evcc) propojuje ioBroker s vaší instancí evcc.
Jde o komunitní projekt, který není součástí evcc.

## Adaptér evcc

Adaptér komunikuje s vaší instancí evcc přes [REST API](/integrations/rest-api).
Poskytuje stavy pro nabíjecí body, vozidla a data lokality a umožňuje ovládat režimy nabíjení a limity ze skriptů a vizualizací v ioBrokeru.

### Nastavení

1. Nainstalujte adaptér **evcc** z administračního rozhraní ioBrokeru.
2. V konfiguraci adaptéru zadejte adresu a port vaší instance evcc.

Podrobnosti a podporu najdete v [repozitáři na GitHubu](https://github.com/Newan/ioBroker.evcc) a ve [vlákně na fóru ioBrokeru](https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc).

## MQTT

Data si s ioBrokerem můžete vyměňovat také přes MQTT.
Připojení k brokeru nastavte v evcc v části **Konfigurace → MQTT** a v ioBrokeru použijte adaptér MQTT se stejným brokerem.
Dostupná témata jsou popsána v [MQTT API](/cs/integrations/mqtt-api).
