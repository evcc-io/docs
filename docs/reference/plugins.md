---
sidebar_position: 3
---

import Tag from '@site/src/components/Tag';

# Plugins

Plugins können verwendet werden, um verschiedene Geräte und externe Datenquellen in evcc zu integrieren, für die es keine direkte Unterstützung gibt.
Sie können für die Gerätekategorien [`meter`](/docs/reference/configuration/meters#custom) (Strommessgeräte), [`charger`](/docs/reference/configuration/chargers#type) (Wallboxen) oder [`vehicle`](/docs/devices/vehicles#manuell) (Fahrzeuge) verwendet werden.
Plugins können auch für die in [Messaging](/docs/reference/configuration/messaging) beschriebenen Endpunkte zum Versenden von Lifecycle-Events genutzt werden.

Je nach Verwendung werden Plugins **lesend** oder **schreibend** eingesetzt.

## Übersicht

Folgende Plugins können verwendet werden, um externe Datenquellen einzubinden:

- [Modbus Plugin](#modbus) - Plugin zum Auslesen von einem Modbus-fähigen Gerät.
- [MQTT Plugin](#mqtt) - Plugin um indirekt über MQTT mit den MQTT-fähigen Geräten zu kommunizieren.
- [HTTP Plugin](#http) - Plugin, das über HTTP-API mit Endgeräten spricht.
- [Websocket Plugin](#websocket) - Plugin zum Empfangen von Gerätedaten über einen eigenen Webserver. Kann nur zum Lesen von Daten genutzt werden.
- [SMA/Speedwire Plugin](#speedwire) - Plugin speziell für SMA Geräte, die mit dem Speedwire Protokoll kommunizieren können.
- [JavaScript Plugin](#javascript) - Plugin, das Werte in über ein JavaScript Skript bereitstellt oder entgegennimmt.
- [Shell Plugin](#shell) - Plugin, das ein Shell Skript ausführen kann, um Daten zu extrahieren oder schreibend entgegennimmt.

Neben diesen Plugins, die externe Daten integrieren, gibt es folgende Helfer-Plugins, die Daten direkt bereitstellen können. Diese können nur in einem lesenden Kontext genutzt werden:

- [Const Plugin](#const) - Spezielles Plugin das einfach einen konstanten Wert zurückliefert.
- [Calc Plugin](#calc) - Meta-Plugin um Ausgaben von anderen Plugins arithmetisch zu verknüpfen.
- [Combined Plugin](#combined) - Meta-Plugin speziell für `charger` um die booleschen Status-Werte für den angeschlossenen (_plugged_) und ladenden (_charging_) Zustand zu einem einzigen Ladestatus zu kombinieren.

### Syntax

Jedes Plugin besitzt ein individuelles Konfigurationsschema.
Dabei ist es wichtig zu wissen, ob das Plugin in einem **lesenden** oder **schreibenden** Kontext verwendet wird.
Einige Konfigurationsparameter machen nur in einem lesenden Kontext Sinn, andere nur, wenn sie im Schreibmodus genutzt werden.
Die meisten Konfigurationsparameter sind Plugin spezifisch, jedoch gibt es eine handvoll Parameter, die beim Lesen von einem Plugin bzw. beim Schreiben via eines Plugins generell genutzt werden können.

Beispielsweise kann über die folgende Konfiguration ein MQTT Plugin als `meter` eingebunden werden, bei dem der aktuelle Stromverbrauch über das spezifizierte MQTT Topic eingelesen wird:

```yaml title="Beispiel: MQTT Plugin für die Leistungswerte eines Strommessgeräts"
meters:
  - name: imsys
    type: custom
    power:
      source: mqtt
      topic: "home/current/imsys/chn2/raw"
```

Das Schema hat dabei immer folgende Struktur:

```yaml
- name: <name>
  type: custom
  <attr1>:
    source: <plugin>
    <p-attr1>: ...
    <p-attr2>: ...
    ....
  <attr2>:
    ....
```

Dabei stehen `<name>` für den Namen des Geräts, `<attr1>` und `<attr2>` für eine der unten beschriebenen Geräteattribute, `<plugin>` für den Plugin-Typ und `<p-attr1>`, `<p-attr2>` für Plugin-spezifische Konfigurationen.

#### Lesen

Beim Lesen von Daten mithilfe eines Plugins können sogenannte _Pipelines_ verwendet werden.
Damit können Daten aus der Ausgabe des Plugins fein granular extrahiert werden. Dies ermöglicht es, komplexe Datenstrukturen wie JSON oder XML zu verarbeiten und die benötigten Informationen herauszufiltern.
Mögliche Parameter für die Datenextraktion sind:

- `regex`: Ein regulärer Ausdruck, um Werte aus dem empfangenen Text zu extrahieren.
- `jq`: Ein [jq](https://jqlang.github.io/jq/)-Ausdruck, um Werte aus JSON-Strukturen zu extrahieren. Die volle Syntax und Möglichkeiten finden sich in der jq-Dokumentation.
- `unpack`: Konvertiert Werte aus anderen Zahlenrepräsentationen, z.B. `hex`.
- `decode`: Dekodiert Binärformate wie `uint32`, `float32` etc.

#### Schreiben

Beim Schreiben können Parameter in der Konfiguration durch Platzhalter ersetzt werden. Die Daten werden in Form von `${var[:format]}` zur Verfügung gestellt.
Wenn Format nicht angegeben wird, werden die Daten im Standard %v Go-Format bereitgestellt.
Die Variablen werden mit dem entsprechenden Wert ersetzt, bevor das Plugin ausgeführt wird.
Zusätzlich können sämtliche Funktionen der Go Template Library verwendet werden, um komplexere Datentransformationen durchzuführen.

Je nach Gerät ([`meter`](#meter), [`charger`](#charger) oder [`vehicle`](#vehicle)) können andere Attribute mit Plugins gelesen oder gesetzt werden.

### Meter

Folgende Attribute können für die Konfiguration von Strommessgeräten genutzt werden.
Dabei werden alle Werte lesend von konfigurierten Plugins übernommen.

| Attribut    | Typ           | Beschreibung      |
| ----------- | ------------- | ----------------- |
| power       | float         | Leistung          |
| energy      | float         | Energie           |
| soc         | int           | Ladestand         |
| limitsoc    | int           | Ladeziel in %     |
| currents    | float / array | Strom (pro Phase) |
| batterymode |               |                   |
| voltages    |               |                   |
| powers      |               |                   |
| maxpower    |               |                   |
| capacity    |               |                   |

**Beispiel**

In diesem Beispiel wird die Konfiguration eines `meter`s um die aktuelle elektrische Leistung über einen HTTP Aufruf abgefragt:

```yaml
meters:
  - name: volkszaehler
    type: custom
    power:
      source: http
      uri: http://zaehler.network.local:8080/api/data.json?from=now
      jq: .data.tuples[0][1]
```

### Charger

Wallboxen und Ladegeräte haben folgende Attribute die ausgelesen werden können:

| Attribut        | Typ   | Beschreibung   |
| --------------- | ----- | -------------- |
| power           | float | Leistung       |
| energy          | float | Energie        |
| enabled         | bool  | Eingeschaltet? |
| status          | bool  | Status         |
| maxcurrentmilis |       |                |
| soc             |       |                |
| phases1p3p      |       |                |
| power           |       |                |
| currents        |       |                |
| voltages        |       |                |

**Beispiel**

Dieses Beispiel zeigt, wie man über das Modbus Plugin den Ladestatus (ladend/nicht ladend) eines `charger`s abfragen kann:

```yaml
chargers:
  - name: icharge
    type: custom
    enabled:
      source: modbus
      id: 4711
      uri: modbus.local:502
      rtu: false
      register:
        address: 100
        type: holding
        decode: uint16
```

Neben den read-only Werten können über Plugins auch Aktionen getriggert oder Konfigurationswerte gesetzt werden:

| Attribut   | Typ   | Beschreibung   |
| ---------- | ----- | -------------- |
| enable     | float | Schalte an/aus |
| maxcurrent | float | Max. Ladestrom |

**Beispiel**

Dieses Beispiel schaltet eine Tasmota Steckdose über eine MQTT Nachricht gesendet an:

```yaml
chargers:
  - name: unu-charger
    type: custom
    enable:
      source: mqtt
      broker: mosquitto.local:883
      topic: cmd/unu-switch/Power
      payload: ON
```

### Vehicle

Fahrzeugparameter können ebenfalls über Plugins ausgelesen werden.

| Attribut   | Typ           | Beschreibung        |
| ---------- | ------------- | ------------------- |
| soc        | int           | Ladestand           |
| status     | bool / A .. F | Status              |
| range      | int           | Reichweite          |
| odometer   | int           | Zählerstand         |
| climater   | bool          | Klimaanlage (?)     |
| wakeup     | ?             | Aufweck-Ping        |
| limitsoc   | int           | Ladeziel in %       |
| maxcurrent | int           | Maximaler Ladestrom |
| finishtime |               |                     |

**Beispiel**

Im folgenden Beispiel wie die aktuelle Reichweite des Fahrzeugs aus MQTT Nachrichten gelesen:

``` yaml
vehicles:
  - name: Mazda
    type: custom
    range:
      source: mqtt
      topic: mazda2mqtt/c53/chargeInfo/drivingRangeKm
```

Zusätzlich können spezielle Kommandos über Plugins an das Fahrzeug geschickt werden:

| Attribut | Typ | Beschreibung |
| -------- | --- | ------------ |
| wakeup   | ?   | Aufweck-Ping |
| chargeEnable | ? | Start/Stop des Ladevorgangs über das Vehicle |
| maxCurrent | ? | Begrenze maximalen Ladestrom |

**Beispiel**

Um ein Auto über einen HTTP Ping aufzuwecken um weiter Abfragen zu senden, kann wie im folgenden Beispiel das HTTP Plugin genutzt werden:

``` yaml
vehicles:
  - name: model-y
    type: custom
    wakeup:
      source: http
      uri: http://teslalogger.local:5000/command/08154711/wake_up
```

## Plugins

Folgende Plugins stehen zur Verfügung und können für die oben beschriebenen Attribute konfiguriert werden, um eine flexible Anbindung an die verschiedenen Systeme zu ermöglichen.

### Modbus <Tag label="lesen" category="read" /> <Tag label="schreiben" category="write" /> {#modbus}

Das `modbus` Plugin kann Daten von jedem Modbus-fähigen Gerät oder SunSpec-kompatiblen Wechselrichter lesen.
Viele Strommessgeräte sind bereits vorkonfiguriert (siehe [MBMD Supported Devices](https://github.com/volkszaehler/mbmd#supported-devices)).
Es ist ebenfalls möglich Modbus Register zu Schreiben um weitere Wallboxen zu integrieren.

Schaue in die [Modbus Dokumentation](modbus) für weitere Details.

### MQTT <Tag label="lesen" category="read" /> <Tag label="schreiben" category="write" /> {#mqtt}

Das `mqtt` Plugin ermöglicht das Lesen von Werten über MQTT Topics.
Das ist insbesondere für Strommessgeräte nützlich, z.B. wenn diese ihre Daten bereits über MQTT bereitstellen.
Schaue in die [MBMD Dokumentation](https://github.com/volkszaehler/mbmd) für ein Beispiel, wie man Modbus Messdaten in MQTT bekommt.
Das Plugin bietet auch die Fähigkeit JSON Datenstrukturen über jq-ähnliche Abfragen zu lesen oder zu parsen (Siehe [HTTP plugin](#http)).

**Beispiel Lesen**:

```yaml
source: mqtt
topic: mbmd/sdm1-1/Power
timeout: 30s # don't accept values older than timeout
scale: 0.001 # floating point factor applied to result, e.g. for Wh to kWh conversion
```

Für den Schreibzugriff werden die Daten mit dem Attribut `payload` bereitgestellt. Falls dieser Parameter in der Konfiguration fehlt, wird der Wert im Standardformat geschrieben.

**Beispiel Schreiben**:

```yaml
source: mqtt
topic: mbmd/charger/maxcurrent
payload: ${var:%d}
```

### HTTP <Tag label="lesen" category="read" /> <Tag label="schreiben" category="write" /> {#http}

Das `http` Plugin führt HTTP Aufrufe durch, um Daten zu lesen oder zu aktualisieren. Es beinhaltet auch die Fähigkeit JSON-Datenstrukturen über jq-Abfragen (z. B. für REST-APIs) zu lesen oder einfache Transformationen durchzuführen. Der volle Funktionsumfang ist in der [offiziellen jq Dokumentation](https://jqlang.github.io/jq/manual/) zu finden.

Methoden der Authentifizierung sind `basic`, `bearer` und `digest`. Die Namen der jeweiligen Parameter finden sich [hier](https://github.com/evcc-io/evcc/blob/master/provider/http.go#L140).

:::important Wichtig
XML-Dokumente werden intern automatisch in JSON-Form überführt, welche dann mit jq wie eine native JSON-Antwort weiter gefiltert werden können.
Attribute bekommen das prefix `attr`.
:::

:::tip
Für den Test von jq-Abfragen bietet sich z. B. das Online-Tool https://jqplay.org/ und für Regex-Tests z. B. das Online-Tool https://regex101.com/ an.
:::

**Beispiel Lesen**:

```yaml
source: http
uri: https://volkszaehler/api/data/<uuid>.json?from=now
method: GET # default HTTP method
headers:
  - content-type: application/json
auth: # basic authentication
  type: basic
  user: foo
  password: bar
insecure: false # set to true to trust self-signed certificates
jq: .data.tuples[0][1] # parse response json
scale: 0.001 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 10s # timeout in golang duration format, see https://golang.org/pkg/time/#ParseDuration
```

```yaml
source: http
uri: http://charger/status
jq: .total_power > 10 # Converts a json integer to a boolean value
```

**Beispiel Schreiben**:

```yaml
body: %v # only applicable for PUT or POST requests
```

```yaml
enable:
  source: http
  uri: "http://charger/relay/0?turn={{if .enable}}on{{else}}off{{end}}"
```

### Websocket <Tag label="lesen" category="read" /> {#websocket}

Das `websocket` Plugin bietet einen Websocket Listener. Es beinhaltet auch die Fähigkeit JSON-Datenstrukturen über jq-ähnliche Abfragen zu lesen oder zu parsen. Dies kann z.B. verwendet werden, um Daten von Volkszählers Push Server zu empfangen.

**Beispiel Lesen**:

```yaml
source: http
uri: ws://<volkszaehler host:port>/socket
jq: .data | select(.uuid=="<uuid>") .tuples[0][1] # parse message json
scale: 0.001 # floating point factor applied to result, e.g. for Wh to kWh conversion
timeout: 30s # error if no update received in 30 seconds
```

### SMA/Speedwire <Tag label="lesen" category="read" /> {#speedwire}

Das `sma` Plugin bietet eine Schnittstelle zu SMA Geräten, welche das Speedwire Protokoll beherrschen.

**Beispiel Lesen**:

```yaml
source: sma
uri: 192.168.4.51 # alternative to serial
serial: 123456 # alternative to uri
value: ActivePowerPlus # ID of value to read
password: "0000" # optional (default: 0000)
interface: eth0 # optional
scale: 1 # optional scale factor for value
```

Unterstützte Werte für `value` können in der Diagnoseausgabe über das Kommando `evcc meter` (mit konfigurierten SMA `meter` Geräten) gefunden werden.

Alle möglichen Werte können als Konstanten [hier](https://gitlab.com/bboehmke/sunny/-/blob/master/values.go#L24) gefunden werden (verwende den Namen der Konstante für `value`).

### JavaScript <Tag label="lesen" category="read" /> <Tag label="schreiben" category="write" /> {#javascript}

evcc integriert einen JavaScript Interpreter mit der [Underscore.js](https://underscorejs.org) Bibliothek, welche direkt über `_.` zugreifbar ist, z.B. `_.random(0,5)`. Das `js` Plugin kann JavaScript code über den `script` Parameter ausführen. Sehr hilfreich für das schnelle Erstellen von Prototypen:

**Beispiel Lesen**:

```yaml
source: js
script: |
  var res = 500;
  2 * res; // returns 1000
```

Wenn das `js` Plugin zum Schreiben verwendet wird, wird der zu schreibende Wert dem Script als Variable übergeben:

**Beispiel Schreiben**:

```yaml
charger:
  - type: custom
    maxcurrent:
      source: js
      script: |
        console.log(maxcurrent);
```

### Shell Script <Tag label="lesen" category="read" /> <Tag label="schreiben" category="write" /> {#shell}

Das `script` Plugin führt externe Skripte zum Lesen oder Aktualisieren von Daten aus. Das Plugin ist hilfreich um jede Art von externer Funktionalität einzubinden.

**Beispiel Lesen**:

```yaml
source: script
cmd: /bin/bash -c "cat /dev/urandom"
timeout: 5s
```

**Beispiel Schreiben**:

```yaml
source: script
cmd: /home/user/my-script.sh ${enable:%b} # format boolean enable as 0/1
timeout: 5s
```

### Const <Tag label="lesen" category="read" /> {#const}

Das `const` Plugin gibt einen konstanten Wert zurück.
Es eignet sich z.B. um in Verbindung mit dem `calc` Plugin feste Korrekturwerte (Offset) auf einen variablen Wert anzuwenden oder auch zur Simulation von Mess- und Statuswerten zu Testzwecken.

**Beispiel Lesen**:

```yaml
source: const
value: -16247
```

### Calc <Tag label="lesen" category="read" /> {#calc}

Das `calc` Plugin erlaubt es mehrere Einzelwerte mathematisch weiterzuverarbeiten:

**Beispiel Lesen**:

```yaml
source: calc
add:
- source: ...
  ...
- source: ...
  ...
```

```yaml
source: calc
mul:
- source: calc
  sign:
    source: ... (power)
  ...
- source: ... (current)
  ...
```

Als Operanden werden dabei die Grundrechenarten Addition (`add`) und Multiplikation (`mul`) unterstützt.

Mit `scale: -1` bei einem der Werte kann eine einfache Subtraktion durchgeführt werden, mit `scale: 0.001` eine Division z.B. zur Konvertierung von kWh in Wh.

Mit `sign:` (jede positive Zahl wird zu +1, jede negative Zahl wird zu -1, 0 bleibt 0) können (in Verbindung mit `mul`) Vorzeichen auf andere Werte übertragen werden. Z.B. um bei Zählern die „Richtung“ der Leistung (Einspeisung oder Bezug) auf die gemessenen Ströme zu übertragen.

Das `calc` Plugin ist hilfreich um z.B.

- Leistungswerte von einzelnen PV-Strings zu summieren (addieren)
- Die Scheinleistung aus Spannung und Strom zu berechnen (multiplizieren)
- Getrennte Leistungswerte für Import und Export zu einem vorzeichenbehafteten Einzelwert zu kombinieren (subtrahieren).
- Prozentuale Füllstände zu berechnen (dividieren)
- Die richtige Richtung des Stromflusses festlegen (sign)
- Bekannte Offsets zu eliminieren (addieren mit `const` Plugin)

:::tip
Konstante Hilfswerte (z. B. für Offsets) lassen sich mithilfe des `const` Plugins als Operand erzeugen.
:::

### Combined <Tag label="lesen" category="read" /> {#combined}

Das `combined` Status Plugin wird verwendet um gemischte Boolean Status Werte von `Plugged` (angeschlossen) / `Charging` (Laden) in einen evcc-kompatiblen Ladestatus von A..F zu konvertieren.
Es wird z.b. zusammen mit einer OpenWB MQTT Integration verwendet.

**Beispiel Lesen**:

```yaml
source: combined
plugged:
  source: mqtt
  topic: openWB/lp/1/boolPlugStat
charging:
  source: mqtt
  topic: openWB/lp/1/boolChargeStat
```
