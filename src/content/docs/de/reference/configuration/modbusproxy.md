---
title: "modbusproxy"
description: "So richtest du in der evcc.yaml einen Modbus-Proxy ein, damit andere Systeme die Modbus-Verbindung deiner evcc-Instanz zu Wechselrichter oder Zähler mitnutzen können."
sidebar:
  order: 18
translatedFrom: "7191bc3757f6"
---

Die Einstellung `modbusproxy` ist eine Liste von Geräten, die für Drittsysteme per Modbus TCP im Netzwerk freigegeben werden.

Einige Geräte lassen nur eine sehr begrenzte Anzahl an Modbus-TCP-Clients zu. Im ungünstigsten Fall ist nur eine einzige Verbindung erlaubt, wie z. B. bei SolarEdge-Komponenten. Außerdem ist bei seriellen Modbus-RTU-RS485-Bussystemen ohnehin nur ein Master erlaubt.
Mit Hilfe von `modbusproxy` lässt sich evcc als Modbus-Proxy einrichten, der bestehende Modbus-Verbindungen mit weiteren Systemen teilen kann. Damit kommuniziert evcc direkt mit dem Gerät, weitere Systeme dagegen mit evcc, das die Kommunikationsverbindungen bündelt und an das Zielgerät weiterreicht.

Die `modbusproxy`-Konfiguration ist eine Liste von verschiedenen Proxy-Konfigurationen.

**Beispiel**:

```yaml
modbusproxy:
  - port: 5021
    uri: 192.0.2.2:502
  - port: 5022
    device: /dev/ttyUSB0
    baudrate: 9600
    comset: "8N1"
  - port: 5023
    uri: 192.0.2.3:502
    rtu: true
```

:::note
_Eingehend_ (von Drittsystemen wie Hausautomation oder Loggern) unterstützt die Proxy-Funktion ausschließlich Modbus TCP.

_Ausgehend_ in Richtung des abzufragenden Zielgeräts (z. B. Wechselrichter, Energiezähler) wird das Protokoll ggf. entsprechend der Konfiguration des Zielgeräts übersetzt.
:::

:::tip[Sponsortoken erforderlich]

Weitere Informationen zum evcc-Sponsoring findest du auf der [Sponsoring-Seite](/de/sponsorship).

:::

---

## Erforderliche Parameter

### `port`

Der lokale TCP/IP-Port, auf dem der Proxy eingehende Modbus-TCP-Verbindungen von Drittsystemen annimmt.

**Beispiel**:

```yaml
port: 5021
```

## Optionale Parameter

### `uri`

Die IP-Adresse und der Port des Zielgeräts im üblichen URI-Schema.

Jeder bereitgestellte Port muss eindeutig sein und darf nicht bereits von einer anderen Anwendung auf dem evcc-Host belegt sein, muss sich aber nicht vom Port des Zielgeräts unterscheiden. Es ist somit zulässig, eine Konfiguration für Port 502 zu definieren, die auf Port 502 des Zielgeräts verweist.

**Beispiel**:

```yaml
- port: 502
  uri: 192.0.2.2:502
```

### `rtu`

Mit Netzwerkzielen wird üblicherweise per Modbus TCP kommuniziert. Bei Bedarf kannst du mit `rtu: true` auf Modbus RTU over TCP umschalten. Ein typischer Anwendungsfall sind einfache, transparente RS485-TCP-Konverter (ohne Protokollübersetzung). Die Einstellung muss mit der Konfiguration des Geräts übereinstimmen. Bei seriellen Zielsystemen wird sie ignoriert.

**Beispiel**:

```yaml
rtu: true
```

### `readonly`

Mit diesem Parameter lassen sich Modbus-Schreibzugriffe durch Drittsysteme unterbinden.

**Mögliche Werte**:

- `true`: Schreibzugriffe werden ohne Antwort blockiert
- `deny`: Schreibzugriffe werden mit einem Modbus-Fehler als Antwort blockiert
- `false`: Schreibzugriffe werden weitergeleitet

Funktionscodes, die der Proxy nicht selbst verarbeitet, z. B. Huaweis herstellerspezifischer Funktionscode 0x41, können Schreibzugriffe enthalten.
Beide schreibgeschützten Modi blockieren sie deshalb mit einem Modbus-Fehler.
Mit `readonly: false` leitet der Proxy sie unverändert weiter, allerdings nur an Geräte, die per Modbus TCP angebunden sind.
Die Home-Assistant-Integration für Huawei-Wechselrichter braucht z. B. `readonly: false`.

:::caution
Der Proxy prüft nicht, wer sich verbindet.
Mit `readonly: false` (Standard) kann jedes Gerät in deinem Netzwerk, das den Port erreicht, auf das Zielgerät schreiben.
Betreibe den Proxy nur in einem vertrauenswürdigen Netzwerk.
:::

**Beispiel**:

```yaml
readonly: true
```
