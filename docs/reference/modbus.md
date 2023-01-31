---
sidebar_position: 4
---

# Modbus

Einige Geräte, wie z.b. Zähler ([`meters`](/docs/reference/configuration/meters#modbus)) oder Wallboxen ([`chargers`](/docs/reference/configuration/chargers)) werden über das Modbus-Protokoll angebunden und angesprochen.

Die `meter` Konfiguration besteht hierbei aus der Art der pysikalischen Verbindung (Schnittstelle), ggf. den technischen Schnittstellenparametern, dem verwendeten Modbus-Protokoll, der eindeutigen Modbus-ID des Gerätes auf dem Bus und der Nummer und Art des Registers welches letztendlich gelesen oder geschrieben werden soll.

Zu beachten ist, dass es drei verschiedene Modbus-Protokolle gibt: Modbus-RTU, Modbus ASCII und Modbus/TCP. Diese können technisch auch über unterschiedliche Schnittstellentypen übertragen werden können.
Die klassische Variante ist dabei Modbus-RTU über eine serielle RS485-Busschnittstelle wie sie typischerweise z. B. bei den meisten Zählern oder manchen Wallboxen genutzt wird. Geräte mit einer Netzwerkschnittstelle (Ethernet/WiFi) hingegen werden typischerweise darüber über das Modbus/TCP-Protokoll angesprochen.

Soll ein entferntes RS485-Gerät aber ebenfalls über externe Schnittstellenkonverter via Netzwerk (Ethernet/WiFi/PowerLAN) angebunden werden kommt dabei letztendlich aber regelmäßig ein Modbus-RTU-Protokoll über eine TCP/IP-Verbindung zustande. Das Modbus-RTU-Protokoll wird dabei 1:1 über das Netzwerk übertragen (sprich "getunnelt"). Hierbei handelt es sich NICHT um Modbus/TCP. "Modbus (RTU) over TCP" ist etwas anderes als Modbus/TCP!

:::info
Achtung: Es gibt allerdings auch komplexere Umsetzer die zusätzlich das Modbus-Protokoll selbst zwischen Modbus-RTU vs. Modbus/TCP umsetzen können! Bei diesen Geräten spricht dann evcc mit dem Konverter Modbus/TCP während der Konverter mit dem seriellen Gerät via Modbus RTU kommuniziert und die Protokolle bidirektional übersetzt.
Hier muss man ggf. genau auf die Gerätekonfiguration und Spezifikation achten sonst ist keine Kommunikation möglich.
:::

Im Falle einer Konfiguration mit einem Schnittstellenkonverter wird die serielle Buskonfiguration am Konverter festgelegt und evcc kommuniziert letztendlich via Netzwerk mit dem Konverter. Wie zuvor erwähnt ist dabei jedoch das verwendete Modbus-Protokoll korrekt zu konfigurieren.



## Physikalische Verbindung

Wenn das Gerät seriell über einen seriellen RS485-Adapter verbunden ist, muss `device` und die seriellen Kommunikationsparameter `baudrate`, `comset` entsprechend der Gerätekonfiguration angegeben werden. Alle Geräte am Bus müssen identische Kommunikationsparameter verwenden. Dazu bitte die jeweilige Betriebanleitung, Datenblätter oder Systemeinstellungen vergleichen.

**Beispiel**:

```yaml
source: modbus
device: /dev/ttyUSB0
baudrate: 9600
comset: "8N1"
```

Wenn das Gerät über eine Netzwerkverbindung (TCP/IP) angebunden ist, muss eine `uri` bestehend aus HOSTNAME:PORT oder IP:PORT angegeben werden:

**Beispiel**:

```yaml
source: modbus
uri: 192.168.0.11:502
id: 1 # modbus slave id
...
```

Seriellen Schnittstellen verwenden standardmäßig das Modbus-RTU-Protokoll, Netzwerkziele werden standardmäßig via Modbus/TCP angesprochen. Dieses Verhalten kann mittels `rtu: true/false` ggf. überschrieben werden.
Wenn es sich um ein Modbus-RTU-Gerät handelt welches, das über einen RS485/Ethernet-Konverter angebunden ist, muss zusätzlich also `rtu: true` gesetzt werden. Die serielle Konfiguration wird dann direkt im Adapter eingestellt (siehe oben).

**Beispiel**:

```yaml
source: modbus
uri: 192.168.0.10:502
id: 3 # modbus slave id
rtu: true
...
```


## Vordefinierte Geräte

Die integrierten vordefinierten Gerätemodelle `model` sind identisch zu [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

     ABB       ABB A/B-Series meters
     DDM       DDM18SD
     DZG       DZG Metering GmbH DVH4013 meters
     IEM3000   Schneider Electric iEM3000 series
     INEPRO    Inepro Metering Pro 380
     JANITZA   Janitza B-Series meters
     MPM       Bernecker Engineering MPM3PM meters
     ORNO1P    ORNO WE-514 & WE-515
     ORNO1P504 ORNO WE-504
     ORNO3P    ORNO WE-516 & WE-517
     SBC       Saia Burgess Controls ALE3 meters
     SDM       Eastron SDM630
     SDM220    Eastron SDM220
     SDM230    Eastron SDM230
     SDM72     Eastron SDM72
     SEMTR     SolarEdge SE-MTR-3Y

Alle davon abweichenden `model` werden als Gerät vom Typ *SunSpec* behandelt.

Verwende `value` um den Wert der vom Gerät gelesen werden soll zu definieren. Alle unterstützten Werte sind auf [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28) voreingestellt.

Im Falle eines *SunSpec*-kompatiblen Wechselrichters oder Zählers werden die zu lesenden Werte in der Form `model:[block:]point` nach der *SunSpec*-Definition angegeben. Zum Beispiel wird die DC-Leistung auf dem zweiten String eines dreiphasigen PV-Wechselrichters (enspricht SunSpec Model 103) wie folgt abgefragt: `value: 103:2:W`.

Das Geräte-`model` und die Slave ID `id` sind immer erforderlich:

**Beispiel**:

```yaml
source: modbus
...
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

## Manuelle Konfiguration

Falls das Modbus-Gerät nicht direkt unterstützt wird oder von den vordefinierten Modellen abweichende Werte gelesen oder geschrieben werden sollen, können die Modbus Register auch vollständig manuell konfiguriert werden:

**Beispiel**:

```yaml
source: modbus
...
register:
  address: 40070
  type: holding # holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
scale: -1.0 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 2s # timeout, without unit in ns
```

Bei den `int32s/uint32s` Dekodierungen wird die Wortreihenfolge vertauscht und sind z.B. bei E3/DC Geräten nützlich.

Um ein Regsiter zu schreiben wird `type: writesingle` verwendet, welches ein einzelnes 16bit Register (entweder `int` oder `bool`) schreibt. Die Kodierung ist hier immer `uint16`.

## Modbus für Geräte die nur 1 Verbindung erlauben

Einige Geräte lassen nur einen Modbus Client zu, z.B. SolarEdge. Mit Hilfe von `modbusproxy` ist es möglich, evcc als Modbus Proxy einzurichten. Damit spricht evcc mit dem Gerät, weitere Gerät mit evcc, welches die Anfragen dann durchreicht.

Wichtig: als Proxy erlaubt evcc nur Verbindungen mittels Modbus TCP, KEIN Modbus RTU. Clientseitig wird entsprechend Konfiguration übersetzt.

**Beispiel**:

```yaml
modbusproxy:
   - port: 5200
     uri: 192.0.2.2:502 # IP und Port des Gerätes, das abgefragt werden soll
     # rtu: true
     # readonly: true
```
