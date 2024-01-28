---
sidebar_position: 3
---

# Plugins

Plugins können verwendet werden, um verschiedene Geräte und externe Datenquellen in evcc zu integrieren. Diese können über den Wert `custom` des Parameters `type` in [`meter`](/docs/reference/configuration/meters#custom) (Strommessgeräte), [`charger`](/docs/reference/configuration/chargers#type) (Wallboxen) oder [`vehicle`](/docs/devices/vehicles#manuell) (Fahrzeuge) verwendet werden.

Plugins erlauben sowohl _Schreibenzugriff_ also auch _Lesezugriff_. Wenn das Plugin zum _Schreiben_ verwendet wird, werden die Daten in Form von `${var[:format]}` zur Verfügung gestellt. Wenn `format` nicht angegeben wird, werden die Daten im Standard `%v` [Go Format](https://golang.org/pkg/fmt/) bereitgestellt. Die Variablen werden mit dem entsprechenden Wert ersetzt, bevor das Plugin ausgeführt wird.

## Modbus (lesen/schreiben)

Das `modbus` Plugin kann Daten von jedem ModBus fähigen Gerät oder SunSpec-kompatiblen Wechselrichter lesen. Viele Strommessgeräte sind bereits vorkonfiguriert (siehe [MBMD Supported Devices](https://github.com/volkszaehler/mbmd#supported-devices)). Es ist ebenfalls möglich Modbus Register zu Schreiben um weitere Wallboxen zu integrieren.

Für weitere Details siehe die [Modbus Dokumentation](modbus)

## MQTT (lesen/schreiben)

Das `mqtt` Plugin erlaubt das Lesen von Werten über MQTT Topics. Das ist insbesondere für Strommessgeräte nützlich, z.b. wenn diese ihre Daten bereits über MQTT bereitstellen.
Siehe [MBMD](https://github.com/volkszaehler/mbmd) für ein Beispiel wie man Modbus Messdaten in MQTT bekommt. Das Plugin bietet auch die Fähigkeit JSON Datenstrukturen über jq-ähnliche Abfragen zu lesen oder zu parsen (Siehe [HTTP plugin](#http-lesenschreiben)).

**Beispiel Lesen**:

```yaml
source: mqtt
topic: mbmd/sdm1-1/Power
timeout: 30s # don't accept values older than timeout
scale: 0.001 # floating point factor applied to result, e.g. for Wh to kWh conversion
```

Für den Schreibzugriff werden die Daten mit dem Attribut `payload` bereitgestellt. Falls dieser Paramter in der Konfiguration fehlt, wird der Wert im Standardformat geschrieben.

**Beispiel Schreiben**:

```yaml
source: mqtt
topic: mbmd/charger/maxcurrent
payload: ${var:%d}
```

## HTTP (lesen/schreiben)

Das `http` Plugin führt HTTP Aufrufe durch um Daten zu lesen oder zu aktualisieren. Es beinhaltet auch die Fähigkeit JSON-Datenstrukturen über jq-Abfragen (z. B. für REST-APIs) zu lesen oder zu parsen.

Methoden der Authentifizierung sind `basic`, `bearer` und `digest`. Die Namen der jeweiligen Parameter finden sich [hier](https://github.com/evcc-io/evcc/blob/master/provider/http.go#L140).

:::important
XML-Dokumente werden intern automatisch in JSON-Form überführt, welche dann mit jq wie eine native JSON-Antwort weiter gefiltert werden kann. Attribute bekommen das prefix `attr`.
:::

:::tip
Für den Test von jq-Abfragen bietet sich z. B. das Online-Tool https://www.jsonquerytool.com/ und für Regex-Tests z. B. das Online-Tool https://regex101.com/ an.
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

**Beispiel Schreiben**:

```yaml
body: %v # only applicable for PUT or POST requests
```

## Websocket (nur lesen)

Das `websocket` Plugin bietet einen Websocket Listener. Es beinhaltet auch die Fähigkeit JSON Datenstrukturen über jq-ähnliche Abfragen zu lesen oder zu parsen. Dies kann z.B. verwendet werden um Daten von Volkszählers Push Server zu empfangen.

**Beispiel Lesen**:

```yaml
source: http
uri: ws://<volkszaehler host:port>/socket
jq: .data | select(.uuid=="<uuid>") .tuples[0][1] # parse message json
scale: 0.001 # floating point factor applied to result, e.g. for Wh to kWh conversion
timeout: 30s # error if no update received in 30 seconds
```

## SMA/Speedwire (nur lesen)

Das `sma` Plugin bietet eine Schnittstelle zu SMA Geräten welche das Speedwire Protokoll beherrschen.

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

Unterstützte Wert für `value` können in der Diagnoseausgabe über das Kommando `evcc meter` (mit konfigurierten SMA `meter` Geräten) gefunden werden.

Alle möglichen Werte können als Konstanten [hier](https://gitlab.com/bboehmke/sunny/-/blob/master/values.go#L24) gefunden werden (verwende den Namen der Konstante für `value`).

## Javascript (lesen/schreiben)

evcc integriert einen Javascript Interpreter mit der [Underscore.js](https://underscorejs.org) Bibliothek, welche direkt über `_.` zugreifbar ist, z.B. `_.random(0,5)`. Das `js` Plugin kann Javascript code über den `script` Parameter ausführen. Sehr hilfreich für das schnelle Erstellen von Prototypen:

**Beispiel Lesen**:

```yaml
source: js
script: |
  var res = 500;
  2 * res; // returns 1000
```

Wenn das `js` Plugin zum schreiben verwendet wird, wird der zu schreibende Wert dem Script als Variable übergeben:

**Beispiel Schreiben**:

```yaml
charger:
  - type: custom
    maxcurrent:
      source: js
      script: |
        console.log(maxcurrent);
```

## Shell Script (lesen/schreiben)

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

## Const (nur lesen)

Das `const` Plugin gibt einen konstanten Wert zurück. Es eignet sich z. B. um in Verbindung mit dem `calc` Plugin feste Korrekturwerte (Offset) auf einen variablen Wert anzuwenden oder auch zur Simulation von Mess- und Statuswerten zu Testzwecken.

**Beispiel Lesen**:

```yaml
source: const
value: -16247
```

## Calc (nur lesen)

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

Als Operanden werden dabei die Grundrechenarten Addition (add) und Multiplikation (mul) unterstützt.

Mit `scale: -1` bei einem der Werte kann eine einfache Subtraktion durchgeführt werden, mit `scale: 0.001` eine Division z. B. zur Konvertierung von kWh in Wh.

Mit `sign:` (jede positive Zahl wird zu +1, jede negative Zahl wird zu -1, 0 bleibt 0) können (in Verbindung mit `mul`) Vorzeichen auf andere Werte übertragen werden. Z.B. um bei Zählern die „Richtung“ der Leistung (Einspeisung oder Bezug) auf die gemessenen Ströme zu übertragen.

Das `calc` Plugin ist hilfreich um z.B.

- Leistungswerte von einzelnen PV-Strings zu summieren (addieren)
- Die Scheinleistung aus Spannung und Strom zu berechnen (multiplizieren)
- Getrennte Leistungswerte für Import und Export zu einem vorzeichenbehafteten Einzelwert zu kombinieren (subtrahieren).
- Prozentuale Füllstände zu berechnen (dividieren)
- Die richtige Richtung des Stromflusses festlegen (sign)
- Bekannte Offsets zu eliminieren (addieren mit `const` Plugin)

:::tip
Konstante Hilfswerte (z. B. für Offsets) lassen sich mit Hilfe des `const` Plugins als Operand erzeugen.
:::

## Kombinierter Status (nur lesen)

Das `combined` Status Plugin wird verwendet um gemischte Boolean Status Werte von `Plugged` (angeschlossen) / `Charging` (Laden) in einen evcc-kompatiblen Ladestatus von A..F zu konvertieren. Es wird z.b. zusammen mit einer OpenWB MQTT Integration verwendet.

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
