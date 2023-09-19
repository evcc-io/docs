---
sidebar_position: 4
---

# Modbus

Einige Geräte, wie z.b. Zähler ([`meters`](/docs/reference/configuration/meters#modbus)) oder Wallboxen ([`chargers`](/docs/reference/configuration/chargers)) werden über das Modbus-Protokoll angebunden und angesprochen.

Die `meter` Konfiguration besteht hierbei aus der Art der pysikalischen Verbindung (Schnittstelle), ggf. den technischen Schnittstellenparametern, dem verwendeten Modbus-Protokoll, der eindeutigen Modbus-ID des Gerätes auf dem Bus und der Nummer und Art des Registers welches letztendlich gelesen oder geschrieben werden soll.

Zu beachten ist, dass es drei verschiedene Modbus-Protokolle gibt: Modbus RTU, Modbus ASCII und Modbus TCP. Diese können technisch auch über unterschiedliche Schnittstellentypen übertragen werden können.
Die klassische Variante ist dabei Modbus RTU über eine serielle RS485-Busschnittstelle wie sie bei den meisten Zählern oder manchen Wallboxen genutzt wird. Geräte mit einer nativen Netzwerkschnittstelle (Ethernet/WiFi) hingegen werden typischerweise über das Modbus TCP-Protokoll angesprochen.

Soll ein serielles Modbus-Gerät über einen Schnittstellenkonverter via Netzwerk (Ethernet/WiFi/PowerLAN) angebunden werden kommt dabei letztendlich ein Modbus RTU Protokoll über eine TCP/IP-Verbindung zustande.
Das Modbus RTU Protokoll wird dabei 1:1 über das Netzwerk übertragen (sprich "getunnelt"). Auch wenn der Transportweg (TCP/IP) hierbei identisch ist handelt es sich vom Protokoll dennoch NICHT um Modbus TCP!
Hierbei muss sehr genau zwischen Protokoll und Transportweg unterschieden werden. "Modbus (RTU) over TCP" ist etwas anderes als Modbus TCP!

:::caution
Achtung: Es gibt auch komplexere Schnittstellenkonverter die optional das Modbus-Protokoll selbst zwischen Modbus RTU und Modbus TCP übersetzen können!
Ist diese Funktion aktiv muss evcc mit dem Konverter mittels Modbus TCP kommunizieren während der Konverter auf der anderen Seite mit dem seriellen Gerät via Modbus RTU kommuniziert und die beiden Protokolle bidirektional übersetzt.
Hier muss man ggf. genau auf die Gerätespezifikation und Konfiguration achten sonst ist keine Kommunikation möglich!
:::

Im Falle einer Konfiguration mit einem Schnittstellenkonverter wird die serielle Buskonfiguration nur am Konverter festgelegt.
Die evcc-Konfiguration betrifft dann nur den Abschnitt zum Konverter.

## Physikalische Verbindung

### Serielle Verbindung (RS485)

Wenn das Gerät direkt über einen RS485-Adapter verbunden ist (Modbus RTU), muss `device` und die seriellen Kommunikationsparameter `baudrate`, `comset` entsprechend der Gerätekonfiguration angegeben werden.
Dazu bitte die jeweilige Betriebanleitung, Datenblätter oder Systemeinstellungen vergleichen.

:::info
An einem seriellen RS485-Bus lassen sich mehrere Geräte mit identischen Kommunikationsparameter betreiben wenn jedes Gerät eine eigene Modbus ID zugewiesen bekommen hat.
Lassen sich nicht alle Geräte an einem Bus auf einheitliche Kommunikationseinstellungen (aber unterschiedliche IDs) konfigurieren ist eine Aufteilung auf mehrere voneinander unabhängige Bussysteme erforderlich.
:::

:::caution
Das Mischen von Geräten mit voneinander abweichenden seriellen Kommunikationsparametern an einem Bus ist nicht möglich und führt zu unvorhersehbaren Kommunikationsfehlern.
:::

**Beispiel**:

```yaml
source: modbus
id: 1
device: /dev/ttyUSB0
baudrate: 38400
comset: "8E1"
```

### Direkte Netzwerkverbindung

Wenn das Gerät direkt über eine native Netzwerkverbindung (Modbus TCP) angebunden ist, muss eine `uri` bestehend aus HOSTNAME:PORT oder IP:PORT angegeben werden:

**Beispiel**:

```yaml
source: modbus
id: 1
uri: 192.168.0.11:502
```

### Serielles Gerät über Netzwerkverbindung (mit Schnittstellenkonverter)

Wird ein serielles Gerät über einen zwischengeschalteten transparenten RS485-IP-Schnittstellenkonverter (ohne Protokollübersetzung) angeschlossen muss das Protokoll über die TCP/IP-Verbindung zusätzlich mittels `rtu: true` auf Modbus RTU umgestellt werden.

**Beispiel**:

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU over TCP
```

## Vordefinierte Geräte

Die integrierten vordefinierten Gerätemodelle `model` sind identisch zu [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

     ABB       ABB A/B-Series meters
     DDM       DDM18SD
     DZG       DZG Metering GmbH DVH4013 meters
     IEM3000   Schneider Electric iEM3000 series
     INEPRO    Inepro Metering Pro 380
     JANITZA   Janitza meters
     MPM       Bernecker Engineering MPM3PM meters
     ORNO1P    ORNO WE-514 & WE-515
     ORNO1P504 ORNO WE-504
     ORNO3P    ORNO WE-516 & WE-517
     SBC       Saia Burgess Controls ALE3 meters
     SDM       Eastron SDM630/120/72DMv2
     SDM220    Eastron SDM220
     SDM230    Eastron SDM230
     SDM72     Eastron SDM72
     SEMTR     SolarEdge SE-MTR-3Y

Alle davon abweichenden `model` werden als Gerät vom Typ _SunSpec_ behandelt.

Verwende `value` um den Wert der vom Gerät gelesen werden soll zu definieren. Alle unterstützten Werte sind auf [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28) voreingestellt.

Im Falle eines _SunSpec_-kompatiblen Wechselrichters oder Zählers werden die zu lesenden Werte in der Form `model:[block:]point` nach der _SunSpec_-Definition angegeben. Zum Beispiel wird die DC-Leistung auf dem zweiten String eines dreiphasigen PV-Wechselrichters (enspricht SunSpec Model 103) wie folgt abgefragt: `value: 103:2:W`.

Das Geräte-`model` und die Slave ID `id` sind immer erforderlich:

**Beispiel**:

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

## Manuelle Konfiguration

Falls das Modbus-Gerät nicht direkt unterstützt wird oder von den vordefinierten Modellen abweichende Werte gelesen oder geschrieben werden sollen, können die Modbus Register auch vollständig manuell konfiguriert werden.
Dazu bedarf es neben den allgemeinen 'modbus' Einstellungen (siehe oben) auch der Definition eines `registers` an Stelle eines `value`, wie bei vordefinierten Geräten. Es ist nicht zulässig, sowohl `value` als auch `register` anzugeben.
Die Definition eines Registers besteht benötigt folgende Patameter:
- `address`: die Registeradresse
- `type`: Der Registertyp, zulässig sind `coil`, `input`, `holding`
- `decode`: Die Art der Codierung der Daten. Zulässig sind: `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. Beim Typ `coil` wird die Codierung ignoriert, muss aber trotzdem angegeben werden.
Weitere zulässige Parameter einer manuellen Konfiguration sind:
- `scale`: Fließkommazahl, die zur Konvertierung von gelesenen Werten (z.B. W in kW oder umgekehrt) verwendet werden kann.
- `timeout`: modbus timeout.



**Beispiel**:

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # coil, holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
scale: -1.0 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 2s # timeout, without unit in ns
```

Bei den `int32s/uint32s` Dekodierungen wird die Wortreihenfolge vertauscht und sind z.B. bei E3/DC Geräten nützlich.

### Schreiben von Registern

Es können sowohl Holding-Register als auch Coils beschrieben werden. Dazu muss entweder `type: writeholding` für Holding-Register oder `type: writecoil` für Coils angegeben werden.
`type: writeholding` schreibt immer ein 16Bit Register (int oder bool16). Für `decode` muss hier daher immer `uint16` angegeben werden.
`type: writecoil` schreibt ein Coil. Angaben für `decode` werden ignoriert.

**Beispiel**:

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding oder writecoil
```

### Gesamtbeispiel

Ein vollständiges Beispiel für einen custom Charger mit modbus Interface (hier ein Phoenix EM-CP-PP-ETH mit der IP-Adresse 192.168.1.10) könnte z.B. so aussehen:

**Beispiel**:

```yaml
chargers:
- type: custom
  name: CustomCharger
  status:
    # Read the status of the charger
    # Either A,B,C or F
    source: modbus
    id: 180
    uri: 192.168.1.10:502
    timeout: 3s
    register:
      address: 100
      type: input # Read an input register
      decode: int16
  enabled:
    # Is the charger enabled (1) or not (0)
    source: modbus
    id: 180
    uri: 192.168.1.10:502
    register:
      address: 400
      type: coil # Read a coil
      decode: uint8 # Doesn't matter but required
  enable:
    # Enable the charger
    source: modbus
    id: 180
    uri: 192.168.1.10:502
    register:
      address: 400
      type: writecoil # Write a coil
      decode: uint8 # Doesn't matter but required
  maxcurrent:
    # Set the maximum current
    source: modbus
    id: 180
    uri: 192.168.1.10:502
    register:
      address: 300
      type: writeholding # Write a holding register
      decode: uint16


```
