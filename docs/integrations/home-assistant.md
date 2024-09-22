---
sidebar_position: 3
---

# Home Assistant

## Betrieb in Home Assistant

Mit dem community-maintainten [evcc Home Assistant Add-on](https://github.com/evcc-io/hassio-addon) kannst du evcc in einer Home Assistant Umgebung betreiben.
Damit benötigst du keine separate Hardware oder Installationsumgebung.
evcc läuft direkt in Home Assistant.

Eine detaillierte Installationsanleitung inklusive Template _evcc.yaml_ findest du hier
[Home Assistant Add-on Installation](../installation/home-assistant).



## Integration mit ha-evcc

Mit der [ha-evcc](https://github.com/marq24/ha-evcc) von [marq24](https://github.com/marq24) kannst du evcc Daten und Funktionen einfach in Home Assistant integrieren.
Unabhängig davon, ob du evcc in Home Assistant betreibst oder nicht.

Die Integration unterstützt alle von evcc in MQTT oder dem API bereitgestellten Entitäten, auch diese zur Anpassung der 
evcc Einstellungen, Ladepunkte und der entsprechenden Fahrzeuge.

## Manuelle Integration (z.B. Sensordaten)

Über die bestehenden [MQTT](/docs/integrations/mqtt-api) und [REST](/docs/integrations/rest-api) Schnittstellen kannst du evcc auch manuell in Home Assistant integrieren.

Zum Beispiel ist es möglich evcc nur mir Home Assistant Sensor Daten zu betreiben.
Wie das über das REST Api geht steht detailliert in der folgenden Anleitung, (ebenso durch [marq24](https://github.com/marq24) bereitgestellt). Aber dieser Weg ist nur für fortgeschrittene Anwender.

[Anleitung, evcc mit Home Assistant Sensordaten](https://github.com/marq24/ha-evcc/blob/main/HA_AS_EVCC_SOURCE.md)

## Weitere Ressourcen

- [smart home & more: evcc Basisinstallation und Konfiguration](https://youtu.be/aPq8k2MronY)
- [smart home & more: Schritt für Schritt - MQTT-Sensor mit Hilfe des MQTT-Explorer einrichten](https://youtu.be/0QQ3y8fgRVA)
- [smart home & more: Effizientes Energiedashboard für Home Assistant](https://youtu.be/V3p5-16U_oU)
