---
sidebar_position: 4
---

# ModBus

Einige Geräte, wie z.b. Messgeräte ([`meters`](/docs/reference/configuration/meters#modbus)) oder Wallboxen ([`chargers](/docs/reference/configuration/chargers)) werden über die sogenannte ModBus Schnittstelle angebunden und angesprochen.

Die `meter` Konfiguration besteht aus einer physikalischen Verbindung und dem Wert der gelesen werden soll.

## Physikalische Verbindung

Wenn das Gerät physikalisch über einen RS485 Adapter verbunden ist, muss `device` und die Serielle Konfiguration `baudrate`, `comset` angegeben werden:

**Beispiel**:

```yaml
source: modbus
device: /dev/ttyUSB0
baudrate: 9600
comset: "8N1"
```

Wenn das Gerät über eine Netzwerkverbindung (TCP/IP) angebunden ist, muss eine `uri` angegeben werden:

**Beispiel**:

```yaml
source: modbus
uri: 192.168.0.11:502
id: 1 # modbus slave id
```

Wenn es sich um ein Modbus RTU Gerät handelt, das über einen RS485/Ethernet Adapter angegeben ist, muss `rtu: true` gesetzt werden. Die Serielle Konfiguration wird dann direkt im Adapter eingestellt.

**Beispiel**:

```yaml
source: modbus
uri: 192.168.0.10:502
id: 3 # modbus slave id
rtu: true
```

## Logische Verbindung

Das Geräte-`model` und die Slave ID `id` sind immer erforderlich:

**Beispiel**:

```yaml
source: modbus
uri/device/id: ...
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

Unterstützt Messgeräte Modelle sind identisch zu [MBMD](https://github.com/volkszaehler/mbmd#supported-devices):

- RTU:
  - `ABB` ABB A/B-Series meters
  - `MPM` Bernecker Engineering MPM3PM meters
  - `DZG` DZG Metering GmbH DVH4013 meters
  - `INEPRO` Inepro Metering Pro 380
  - `JANITZA` Janitza B-Series meters
  - `SBC` Saia Burgess Controls ALD1 and ALE3 meters
  - `SDM` Eastron SDM630
  - `SDM220` Eastron SDM220
  - `SDM230` Eastron SDM230
  - `SDM72` Eastron SDM72
  - `ORNO1P` ORNO WE-514 & WE-515
  - `ORNO3P` ORNO WE-516 & WE-517
- TCP: Sunspec-kompatible Wechselrichter (SMA, SolarEdge, Kaco, KOSTAL, Fronius, Steca etc)

Verwende `value` um den Wert der vom Gerät gelesen werden soll zu definieren. Alle unterstützten Werte sind auf [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28) voreingestellt.

Im Falle eines SunSpec-kompatiblen Wechselrichters inverters, können die zu lesenden Werte in der Form `model:[block:]point` nach der SunSpec Definition angegeben werden. Zum Beispiel wird die 3-phasen DC Leistung auf dem zweiten String so konfiguriert `103:2:W`.

## Manuelle Konfiguration

Falls das Modbus Gerät nicht von MBMD direkt unterstützt wird, können die Modbus Register manuell konfiguriert werden:

**Beispiel**:

```yaml
source: modbus
uri/device/id: ...
register:
  address: 40070
  source: holding # holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

Bei den `int32s/uint32s` Dekodierungen wird die Wortreihenfolge vertauscht und sind z.B. bei E3/DC Geräten nützlich.

Um ein Regsiter zu schreiben wird `type: writesingle` verwendet, welches ein einzelnes 16bit Register (entweder `int` oder `bool`) schreibt. Die Kodierung ist hier immer `uint16`.
