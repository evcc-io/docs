---
sidebar_position: 17
---

# `modbusproxy`

_modbusproxy_ ist eine Liste von Geräten welche für Drittsysteme via Modbus TCP im Netzwerk freigeben werden.

Einige Geräte lassen nur eine sehr beschränkte Anzahl an Modbus TCP Clients zu. Im ungünstigsten Fall nur genau eine einzige Verbindung wie z.B. bei SolarEdge-Komponenten. Aber auch bei seriellen Modbus RTU RS485-Bussystemen ist ohnehin immer nur ein Master erlaubt.
Mit Hilfe von `modbusproxy` ist es möglich, evcc zusätzlich als Modbus-Proxy einzurichten welcher die bestehenden Modbus-Verbindungen mit weiteren Systemen teilen kann.
Damit kommuniziert evcc direkt mit dem Gerät, weitere Systeme aber stattdessen mit evcc, welches die Kommunikationverbindungen bündelt und stellvertretend an das Zielgerät weiterreicht.

Die `modbusproxy` Konfiguration ist eine Liste von verschiedenen Proxy-Freigaben.

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

:::info
Die Proxy-Funktion unterstützt *eingehend* (d.h. von Drittsystemen wie z.B. Hausautomation, Logger) ausschließlich Modbus TCP.

*Ausgehend* in Richtung des abzufragenden Gerätes (z. B. Wechselrichter, Energiezähler) wird das Protokoll ggf. entsprechend der Zielgerätekonfiguration übersetzt.
:::

---

## Erforderliche Parameter

### `port`

Der lokale TCP/IP-Port unter dem eine Verbindung als Proxyserver bereitstellt wird und eingehende Modbus TCP Verbindungen von Drittsystemen angenommen werden.

**Beispiel**:

```yaml
port: 5021
```

## Optionale Parameter

### `rtu`

Zu Netzwerkzielen wird üblicherweise mit Modbus TCP kommuniziert.
Bei Bedarf kann mit der Angabe von `rtu: true` auf Modbus RTU over TCP statt Modbus TCP umgeschaltet werden.
Ein typischer Anwendungsfall dafür sind einfache, transparente RS485-TCP-Konverter (ohne Protokollübersetzung).
Muss mit der Gerätekonfiguration übereinstimmen. Wird bei seriellen Zielsystemen ignoriert.

**Beispiel**:

```yaml
rtu: true
```

### `readonly`

Durch `readonly: true` lassen sich Modbus-Schreibzugriffe durch Drittsysteme pauschal unterbinden.

**Beispiel**:

```yaml
readonly: true
```
