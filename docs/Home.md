---
sidebar_position: 1
---

# Einführung

evcc ermöglicht das Laden von Elektrofahrzeugen (EV) bedarfsgerecht zu steuern und den dazu benötigten Energiebezug zu optimieren. Es kann eine Photovoltaikanlage (PV) angebunden werden, um so viel selbsterzeugte Energie wie möglich ins EV zu laden, oder es können auch Anbieter mit dynamischen Strompreisen angebunden werden.

Normalerweise muss die Wallbox dazu mit der bestehenden PV-Installation kompatibel, oft sogar vom selben Hersteller sein. evcc ermöglicht dies jedoch herstellerübergreifend und mit einer Vielzahl von Wallboxen, Strommessgeräten und PV-Wechselrichtern ohne dass diese speziell dazu vorgesehen sein müssen.

Dazu wird evcc auf einem System im lokalen Netzwerk installiert, so dass es mit allen notwendigen Geräten kommunizieren kann. evcc selbst arbeitet dabei vollständig lokal und benötigt selbst keine Cloud-Anbindung wenn keine der angebundenen Komponenten dies erfordert. Die Software ist sehr genügsam, so dass ein einfaches NAS (Netzwerkspeichergerät) oder ein Kleinstcomputersystem wie z. B. ein Raspberry Pi (oder ähnliches) völlig ausreichen.

![Screenshot](screenshot.png)

## Funktionalitäten

- Einfache und klare Benutzeroberfläche
- Unterstützung von
  - [Wallboxen und schaltbaren Steckdosen](/docs/devices/chargers)
  - [Erzeugungsanlagen, Batteriespeichern und Energiemessgeräten (Zähler)](/docs/devices/meters)
  - [Fahrzeugen](/docs/devices/vehicles)
- [Plugins](/docs/reference/plugins) um nahezu beliebige Wallboxen / Zähler / Fahrzeuge hinzuzufügen: Modbus, HTTP, MQTT, Javascript, WebSockets und Shell Scripte
- Status [Benachrichtigungen](/docs/reference/configuration/messaging) über [Telegram](https://telegram.org), [PushOver](https://pushover.net) und [viele mehr](https://containrrr.dev/shoutrrr/)
- Datenanalyse mit [InfluxDB](https://www.influxdata.com) und [Grafana](https://grafana.com/grafana/)
- Stufenlose Regelung der Ladeströme mit unterstützten Wallboxen (z.b. bei smartWB als [OLC](https://board.evse-wifi.de/viewtopic.php?f=16&t=187) bezeichnet)
- REST- und MQTT-[APIs](/docs/reference/api) zur Integration in andere Heimautomationssysteme (z.B. [HomeAssistant](https://github.com/evcc-io/evcc-hassio-addon))

## Anforderungen

Um evcc zu verwenden wird mindestens folgendes benötigt:

- eine unterstützte [Wallbox oder schaltbare Steckdose](/docs/devices/chargers)
- ein unterstütztes [Messgerät](/docs/devices/meters) am Hausanschluss, oder alternativ ein unterstützter PV-Wechselrichter bzw. anderes Messgerät welches die aktuelle Erzeugungsleistung misst
- ein unterstütztes System auf welchem evcc läuft

Optional:

- ein oder mehrere unterstützte [Fahrzeuge](/docs/devices/vehicles) deren Ladezustand abgerufen wird
- weitere unterstützte Wallboxen, schaltbare Steckdosen, PV-Erzeugungs- und Batteriespeichersysteme
- ein unterstütztes [Energiemanagementsystem](/docs/reference/configuration/hems) (wie z. B. SMA Sunny Home Manager) oder ein dynamischer Stromtarif

Über diese Wege sind wir zu erreichen:

- Support, Konfiguration, Fragen zu Geräten: [Community Support Forum](https://github.com/evcc-io/evcc/discussions)
- Chat zu Entwicklungsthemen: [Slack](https://evcc.io/slack).

:::note
evcc kommt ohne jede Art von Garantie. Du verwendest die Software auf eigenes Risiko. Es liegt in deiner Verantwortung dass evcc so läuft wie es beabsichtigt ist.
:::
