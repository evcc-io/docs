---
sidebar_position: 4
---

# Modbus

Einige Geräte, wie z.b. Zähler ([`meters`](/docs/reference/configuration/meters#modbus)) oder Wallboxen ([`chargers`](/docs/reference/configuration/chargers)) werden über das Modbus-Protokoll angebunden und angesprochen.

Die `meter` Konfiguration besteht hierbei aus der Art der pysikalischen Verbindung (Schnittstelle), ggf. den technischen Schnittstellenparametern, dem verwendeten Modbus-Protokoll, der eindeutigen Modbus-ID des Gerätes auf dem Bus und der Nummer und Art des Registers welches letztendlich gelesen oder geschrieben werden soll.

Zu beachten ist, dass es drei verschiedene Modbus-Protokolle gibt: Modbus-RTU, Modbus ASCII und Modbus/TCP. Diese können technisch auch über unterschiedliche Schnittstellentypen übertragen werden können.
Die klassische Variante ist dabei Modbus-RTU über eine serielle RS485-Busschnittstelle wie sie typischerweise z. B. bei den meisten Zählern oder manchen Wallboxen genutzt wird. Geräte mit einer Netzwerkschnittstelle (Ethernet/WiFi) hingegen werden typischerweise darüber über das Modbus/TCP-Protokoll angesprochen.

Soll ein entferntes RS485-Gerät aber ebenfalls über externe Schnittstellenkonverter via Netzwerk (Ethernet/WiFi/PowerLAN) angebunden werden kommt dabei letztendlich aber regelmäßig ein Modbus-RTU-Protokoll über eine TCP/IP-Verbindung zustande. Das Modbus-RTU-Protokoll wird dabei 1:1 über das Netzwerk übertragen (sprich "getunnelt"). Hierbei handelt es sich NICHT um Modbus/TCP. "Modbus (RTU) over TCP" ist etwas anderes als Modbus/TCP!
Achtung: Es gibt allerdings auch komplexere Umsetzer die zusätzlich das Modbus-Protokoll selbst zwischen Modbus-RTU vs. Modbus/TCP umsetzen können!

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

Die integrierten vordefinierten Gerätemodelle sind identisch zu [MBMD](https://github.com/volkszaehler/mbmd#supported-devices):

Verwende `value` um den Wert der vom Gerät gelesen werden soll zu definieren. Alle unterstützten Werte sind auf [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28) voreingestellt.

Im Falle eines SunSpec-kompatiblen Wechselrichters oder Zählers (`model: sunspec`), werden die zu lesenden Werte in der Form `model:[block:]point` nach der SunSpec-Definition angegeben. Zum Beispiel wird die DC-Leistung auf dem zweiten String eines dreiphasigen PV-Wechselrichters (SunSpec Model 103) so konfiguriert `value: 103:2:W`.

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
  source: holding # holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
scale: -1.0 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 2000 # ms
```

Bei den `int32s/uint32s` Dekodierungen wird die Wortreihenfolge vertauscht und sind z.B. bei E3/DC Geräten nützlich.

Um ein Regsiter zu schreiben wird `type: writesingle` verwendet, welches ein einzelnes 16bit Register (entweder `int` oder `bool`) schreibt. Die Kodierung ist hier immer `uint16`.
