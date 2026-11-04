---
title: "Modbus"
description: "Erklärt, wie evcc mit Zählern und Wallboxen über Modbus spricht, seriell per RS485, über TCP oder über einen RTU-zu-TCP-Konverter, und wie du jede Variante konfigurierst."
sidebar:
  order: 4
translatedFrom: "01c339d6465c"
---

Einige Geräte, wie Zähler ([`meters`](/de/reference/configuration/meters#modbus)) oder Wallboxen ([`chargers`](/de/reference/configuration/chargers)), werden über das Modbus-Protokoll angebunden und angesprochen.

Die `meter`-Konfiguration besteht aus der Art der physikalischen Verbindung (Schnittstelle), ggf. den technischen Schnittstellenparametern, dem verwendeten Modbus-Protokoll, der eindeutigen Modbus-ID des Geräts auf dem Bus sowie der Nummer und Art des Registers, das gelesen oder geschrieben werden soll.

Zu beachten ist, dass es drei verschiedene Modbus-Protokolle gibt: Modbus RTU, Modbus ASCII und Modbus TCP. Diese können technisch über unterschiedliche Schnittstellentypen übertragen werden. Die klassische Variante ist Modbus RTU über eine serielle RS485-Busschnittstelle, wie sie bei den meisten Zählern oder manchen Wallboxen genutzt wird. Geräte mit einer nativen Netzwerkschnittstelle (Ethernet/WLAN) werden hingegen typischerweise über das Protokoll Modbus TCP angesprochen.

Soll ein serielles Modbus-Gerät über einen Schnittstellenkonverter via Netzwerk (Ethernet/WLAN/PowerLAN) angebunden werden, kommt Modbus RTU über eine TCP/IP-Verbindung zum Einsatz. Das Modbus-RTU-Protokoll wird dabei direkt über das Netzwerk übertragen (sprich „getunnelt“). Auch wenn der Transportweg (TCP/IP) identisch ist, handelt es sich beim Protokoll NICHT um Modbus TCP. Es ist wichtig, zwischen Protokoll und Transportweg zu unterscheiden. „Modbus (RTU) over TCP“ ist etwas anderes als Modbus TCP!

:::caution
Achtung: Es gibt komplexere Schnittstellenkonverter, die optional das Modbus-Protokoll selbst zwischen Modbus RTU und Modbus TCP übersetzen können!

Ist diese Funktion aktiv, muss evcc mit dem Konverter über Modbus TCP kommunizieren, während der Konverter mit dem seriellen Gerät über Modbus RTU kommuniziert und die beiden Protokolle bidirektional übersetzt.
In diesem Fall muss genau auf die Gerätespezifikation und Konfiguration geachtet werden, sonst funktioniert die Kommunikation möglicherweise nicht!
:::

Bei einer Konfiguration mit Schnittstellenkonverter wird die serielle Buskonfiguration nur am Konverter festgelegt. Die evcc-Konfiguration betrifft dann nur den Abschnitt bis zum Konverter.

## Physikalische Verbindung

### Serielle Verbindung (RS485)

Wenn das Gerät direkt über einen RS485-Adapter verbunden ist (Modbus RTU), müssen `device` und die seriellen Kommunikationsparameter `baudrate` und `comset` entsprechend der Gerätekonfiguration angegeben werden. Diese finden sich in der jeweiligen Bedienungsanleitung, in den Datenblättern oder in den Systemeinstellungen.

:::note
An einem seriellen RS485-Bus lassen sich mehrere Geräte mit identischen Kommunikationsparametern betreiben, wenn jedem Gerät eine eigene Modbus-ID zugewiesen ist. Lassen sich nicht alle Geräte an einem Bus auf einheitliche Kommunikationseinstellungen (aber unterschiedliche IDs) konfigurieren, ist eine Aufteilung auf mehrere voneinander unabhängige Bussysteme erforderlich.
:::

:::caution
Das Mischen von Geräten mit unterschiedlichen seriellen Kommunikationsparametern an einem Bus ist nicht möglich und führt zu unvorhersehbaren Kommunikationsfehlern.
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

Wenn das Gerät direkt über eine native Netzwerkverbindung (Modbus TCP) angebunden ist, muss eine `uri`, bestehend aus HOSTNAME:PORT oder IP:PORT, angegeben werden:

**Beispiel**:

```yaml
source: modbus
id: 1
uri: 192.168.0.11:502
```

### Serielles Gerät über Netzwerkverbindung (mit Schnittstellenkonverter)

Wird ein serielles Gerät über einen zwischengeschalteten transparenten RS485-IP-Schnittstellenkonverter (ohne Protokollübersetzung) angeschlossen, muss das Protokoll über die TCP/IP-Verbindung zusätzlich mit `rtu: true` auf Modbus RTU umgestellt werden.

**Beispiel**:

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU über TCP
```

## Vordefinierte Geräte

Die integrierten vordefinierten Gerätemodelle für `model` entsprechen denen von [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

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

Jedes davon abweichende `model` wird als Gerät vom Typ _SunSpec_ behandelt.

Mit `value` legst du den Wert fest, der vom Gerät gelesen werden soll. Alle unterstützten Werte sind in [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28) vordefiniert.

Bei einem _SunSpec_-kompatiblen Wechselrichter oder Zähler werden die zu lesenden Werte im Format `model:[block:]point` gemäß der _SunSpec_-Definition angegeben. So wird z. B. die DC-Leistung auf dem zweiten String eines dreiphasigen PV-Wechselrichters (entspricht SunSpec Model 103) folgendermaßen abgefragt: `value: 103:2:W`.

Das Gerätemodell `model` und die Modbus-ID `id` sind immer erforderlich:

**Beispiel**:

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # Gleitkommafaktor für das Ergebnis, z. B. zur Umrechnung von kW in W
```

## Negation von Werten

Bei MBMD-Zählern können Messwerte invertiert werden, indem dem Aliasnamen ein `-` (Minuszeichen) vorangestellt wird.
Das ist nützlich, wenn Zähler in unterschiedlichen Konfigurationen oder Einbaurichtungen verwendet werden und das Vorzeichen der Messwerte angepasst werden muss.

### Unterstützte Messwerte

Die Negation funktioniert für folgende MBMD-Messwerte:

- `power`: Gesamtleistung
- `currents`: Ströme pro Phase (Array)
- `powers`: Leistungen pro Phase (Array)

### Syntax

```yaml
meters:
  - name: my-meter
    type: modbus
    model: sdm
    power: -Power # invertiert den Leistungswert
```

### Beispiele

#### Invertierte Gesamtleistung

```yaml
meters:
  - name: pv-meter
    type: modbus
    model: sdm
    power: -Power # Leistung wird invertiert (z. B. wird aus +1000 W -1000 W)
```

#### Invertierte Phasenleistungen

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    powers:
      - -PowerL1 # Phase 1 invertiert
      - -PowerL2 # Phase 2 invertiert
      - -PowerL3 # Phase 3 invertiert
```

#### Invertierte Ströme (einzelne Phasen)

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    currents:
      - -CurrentL1 # Strom Phase 1 invertiert
      - CurrentL2 # Strom Phase 2 normal
      - -CurrentL3 # Strom Phase 3 invertiert
```

### Anwendungsfälle

**Falsch montierte Zähler**:
Wenn ein Stromsensor oder Zähler physisch in der falschen Richtung eingebaut ist, kannst du die Werte in der Software korrigieren.

**Einspeisung oder Verbrauch**:
Für PV-Zähler, bei denen die Vorzeichenkonvention umgekehrt werden muss.

**Unterschiedlich ausgerichtete Stromwandler**:
Für mehrphasige Installationen mit unterschiedlich ausgerichteten Stromwandlern.

## Manuelle Konfiguration

Wird das Modbus-Gerät nicht direkt unterstützt oder sollen von den vordefinierten Modellen abweichende Werte gelesen oder geschrieben werden, lassen sich die Modbus-Register auch manuell konfigurieren.
Dazu muss zusätzlich zu den allgemeinen _modbus_-Einstellungen (siehe oben) ein `register` statt eines `value` wie bei vordefinierten Geräten definiert werden. Es ist nicht zulässig, sowohl `value` als auch `register` anzugeben.

Die Definition eines Registers benötigt folgende Parameter:

- `address`: die Registeradresse
- `type`: Der Registertyp, zulässig sind lesend `coil`, `input`, `holding` sowie schreibend `writeholding`, `writeholdings`, `writecoil`
- `decode`: Die Art der Codierung der Daten. Zulässig sind: `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. Beim Typ `coil` wird die Codierung ignoriert, muss aber trotzdem angegeben werden. Beim Typ `writecoil` muss `bool8` angegeben werden.
- `bitmask`: Eine optionale Angabe. Der angegebene Wert wird mit dem gelesenen Wert UND-verknüpft, um einzelne Bits zu extrahieren.

Weitere zulässige Parameter einer manuellen Konfiguration sind:

- `scale`: Gleitkommazahl, mit der gelesene Werte umgerechnet werden können (z. B. W in kW oder umgekehrt). Dieser Wert wird mit dem gelesenen und decodierten Rohwert multipliziert.
- `timeout`: Modbus-Timeout. Ohne Einheit wird der Wert in ns interpretiert, ansonsten lässt sich die Einheit mit angeben, z. B. 10s für 10 Sekunden.

**Beispiel**:

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # coil, holding oder input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 und u|int32s + float32s
  bitmask: 2 # Optional: Bitmaske, die auf den gelesenen Wert angewendet wird. Hier ist die Maske 0000000000000010b, wird bei Wert 0 ignoriert
scale: -1.0 # Gleitkommafaktor für das Ergebnis, z. B. zur Umrechnung von kW in W
timeout: 2s # Timeout, ohne Einheit in ns
```

Bei den Decodierungen `int32s/uint32s` wird die Wortreihenfolge vertauscht (niederwertigstes Wort zuerst), was bei E3/DC-Geräten nützlich ist.

### Schreiben von Registern

Es können sowohl Holding-Register als auch Coils beschrieben werden. Dazu muss entweder `type: writeholding` für Holding-Register oder `type: writecoil` für Coils angegeben werden. Für das Schreiben mehrerer Register (Funktionscode 16) gibt es den Typ `writeholdings`.

`type: writeholding` schreibt immer ein 16-Bit-Register (int oder bool16). Für `decode` muss daher immer `uint16` angegeben werden.
`type: writecoil` schreibt ein Coil. Für `decode` muss `bool8` angegeben werden.

**Beispiel**:

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding, writeholdings oder writecoil
```

### Vollständiges Beispiel

Ein vollständiges Beispiel für eine benutzerdefinierte Wallbox mit Modbus-Schnittstelle (hier ein Phoenix EM-CP-PP-ETH mit der IP-Adresse 192.168.1.10) könnte so aussehen:

**Beispiel**:

```yaml
chargers:
  - type: custom
    name: CustomCharger
    status:
      # Status der Wallbox lesen
      # Entweder A, B, C oder F
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      timeout: 3s
      register:
        address: 100
        type: input # Input-Register lesen
        decode: int16
    enabled:
      # Ist die Wallbox freigegeben (1) oder nicht (0)
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: coil # Coil lesen
        decode: bool16 # Egal, aber erforderlich
    enable:
      # Wallbox freigeben
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: writecoil # Coil schreiben
        decode: bool8
    maxcurrent:
      # Maximalen Strom setzen
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 300
        type: writeholding # Holding-Register schreiben
        decode: uint16
```
