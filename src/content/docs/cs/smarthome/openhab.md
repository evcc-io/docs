---
title: "openHAB"
description: "Vaši instanci evcc připojíte k openHAB oficiálním bindingem evcc, který sám najde nabíjecí body, vozidla a data lokality, nebo alternativně přes MQTT."
translatedFrom: "a70270e36e27"
---

[openHAB](https://www.openhab.org) je open-source platforma pro chytrou domácnost, která propojuje zařízení a služby mnoha výrobců.
Oficiální [binding evcc](https://www.openhab.org/addons/bindings/evcc/) přenáší data a ovládací prvky z vaší instance evcc do openHAB.

## Binding evcc

Binding se připojuje k vaší instanci evcc přes lokální síť a v nastavitelném intervalu se dotazuje jejího API.
Vyžaduje evcc ve verzi 0.209.8 nebo novější.

Jakmile je připojení nastavené, vaše nakonfigurovaná zařízení se najdou automaticky.
Binding poskytuje Things pro:

- nabíjecí body s nabíjecím výkonem, režimem nabíjení, limity proudu a daty relace
- vozidla se stavem nabití a plány nabíjení
- data lokality, např. výkon sítě, výrobu ze soláru a domácí baterii
- zařízení pro vytápění

Nabíjení můžete sledovat v dashboardech openHAB a režimy nabíjení, limity a plány nabíjení ovládat z pravidel a automatizací.

### Nastavení

1. Nainstalujte binding **evcc** z obchodu s doplňky openHAB.
2. Přidejte bridge Thing evcc a zadejte adresu a port vaší instance evcc.
3. Potvrďte automaticky nalezené Things v inboxu.

Podrobnosti o konfiguraci a úplný seznam kanálů najdete v [dokumentaci bindingu](https://www.openhab.org/addons/bindings/evcc/).

## MQTT

Data si s openHAB můžete vyměňovat také přes MQTT.
Připojení k brokeru nastavte v evcc v části **Konfigurace → MQTT** a v openHAB použijte binding MQTT se stejným brokerem.
Dostupná témata jsou popsána v [MQTT API](/cs/integrations/mqtt-api).
