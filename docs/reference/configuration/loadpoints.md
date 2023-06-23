---
sidebar_position: 3
---

# `loadpoints`

`loadpoints` (Ladepunkte) ist eine Liste von Ladepunkten und kombiniert für jeden Ladepunkt eine Wallbox, Fahrzeuge und falls notwendig einen Zähler mit weiteren optionalen Parametern. Eine minimale Konfiguration erfordert eine Wallbox.

**Beispiel**:

```yaml
loadpoints:
  - title: Garage # display name for UI
    charger: wallbox # Wallbox Referenz
    vehicle: audi # Referenz auf Standardfahrzeug
    mode: pv # charge mode (off, now, minpv, pv)
```

Referenzen sind hierbei immer die Werte des Parameters `name` (z.B. `wallbox`) in der jeweiligen Gerätekonfiguration.

Im folgenden werden nun alle möglichen Parameter erklärt.

---

## Erforderliche Parameter

### `title`

Eine Beschreibung des Ladepunktes, wird in der UI angezeigt.

**Beispiel**:

```yaml
title: Garage
```

---

### `charger`

Referenz auf eine `charger` (Wallbox) Konfiguration.
**Beispiel**:

```yaml
charger: wallbox
```

Wobei hier der Wert `wallbox` dem Wert eines `name` Parameters in der [Wallbox Definition](chargers#name) entspricht.

---

## Optionale Parameter

### `meter`

Referenz auf eine `meter` (Strommessgerät) Konfiguration.

Dieser Eintrag wird nur benötigt, wenn die verwendete Wallbox keine eigene Strommessung durchführt bzw. die Werte der Messung von evcc nicht ausgelesen werden können. Aber selbst dann ist dieser Eintrag optional, denn evcc nimmt an, dass mit der eingestellten maximalen Stromstärke auch geladen wird.

**Beispiel**:

```yaml
meter: charge
```

Wobei hier der Wert `charge` dem Wert eines `name` Parameters in der [Strommessgeräte Definition](meters#name) entspricht.

---

### `vehicle`

`vehicle`: Referenz auf eine `vehicle` Konfiguration die dem Ladepunkt als Standardfahrzeug zugewiesen wird.

Beim Anschluss eines Fahrzeugs an den Ladepunkt wird damit immer davon ausgegangen dass dieses Fahrzeug angeschlossen wurde.
Die automatische Fahrzeugerkennung wird umgangen.
Falls doch ausnahmsweise ein anderes Fahrzeug angeschlossen wurde (z.B. Gastfahrzeug) lässt sich dies im Anschluss manuell zuweisen.

**Beispiel**:

```yaml
vehicle: renault
```

Wobei hier der Wert `renault` dem Wert eines `name` Parameters in der [Fahrzeug Definition](vehicles#name) entspricht.

---

### `resetOnDisconnect`

Definiert, ob beim Abstecken des Ladekabels vom Fahrzeug die Standardeinstellungen für folgende Werte wiederhergestellt werden sollen:

- [`mode`](loadpoints#mode)
- [`SoC.min`](loadpoints#min) (veraltet)
- [`SoC.target`](loadpoints#target) (veraltet)
- [`minCurrent`](loadpoints#mincurrent)
- [`maxCurrent`](loadpoints#maxcurrent)

**Mögliche Werte**:

- `true`: Standardeinstellungen werden eingestellt.
- `false`: Aktuelle Einstellungen bleiben erhalten.

**Standardwert:** `true`

**Beispiel**:

```yaml
resetOnDisconnect: true
```

---

### `mode`

Der Standard-Lademodus wenn evcc startet bzw. nach dem Abstecken des Fahrzeugs wenn `resetOnDisconnect: true` gesetzt wurde.

**Mögliche Werte**:

- `off`: Das Laden ist gestoppt, auch wenn ein Fahrzeug an der Wallbox angeschlossen ist.
- `now`: Lade sofort mit der maximal möglichen Leistung.
- `minpv`: Lade sofort mit der minimal möglichen Leistung. Falls genug PV-Überschuss vorhanden ist, lade schneller.
- `pv`: Lade nur mit PV-Überschuss und pausiere wenn nicht genug Leistung verfügbar ist.

**Standardwert:** `pv`

:::info
Im allgemeinen benötigt ein EV zum Laden mindestens 1,4kW Leistung pro Phase. Bei Wallboxen und Fahrzeugen welche über den ISO15118 Standard kommunizieren, wird insgesamt mindestens 1,4kW Leistung benötigt, egal mit wievielen Phasen geladen wird.
:::

**Beispiel**:

```yaml
mode: pv
```

---

### `soc`

Definiere die Standardeinstellungen für den Umgang mit dem SoC eines angeschlossenen Fahrzeugs

**Beispiel**:

```yaml
soc:
  poll:
    mode: charging
    interval: 60m
  estimate: true
```

#### `poll`

Definiert, wie die Fahrzeug APIs benutzt werden um aktuelle Informationen des Fahrzeugs abzurufen.

:::warning
Es wird **NICHT** empfohlen, die Standardeinstellungen zu ändern, denn dies könnte dazu führen, dass die Fahrzeugbatterie entleert wird
oder dass der Fahrzeughersteller aktiv verhindert, das Laden mittels evcc zu steuern. **AUF EIGENES RISIKO.**
:::

#### `poll.mode`

Definiert, unter welchen Bedingungen die Daten für das Fahrzeug abgerufen werden

**Mögliche Werte**:

- `charging`: aktualisiere die Daten **NUR** während eines Ladevorgangs (dies ist die empfohlene Standardeinstellung)
- `connected`: aktualisiere die Daten, wenn das Fahrzeug mit der Wallbox verbunden ist (nicht nur wenn es lädt); der Parameter `interval` definiert wie oft
- `always`: aktualisiere die Daten immer, auch wenn das Fahrzeug nicht mit der Wallbox verbunden ist; der Parameter [`interval`](#interval) definiert, wie oft (wird nur für ein Fahrzeug eines Ladepunktes unterstützt)

**Standardwert:** `charging`

**Beispiel**:

```yaml
mode: charging
```

#### `poll.interval`

Definiert, wie oft das Fahrzeug nach neuen Daten abgefragt wird, wenn es **NICHT** lädt.

**Standardwert:** `60m`

**Beispiel**:

```yaml
interval: 60m
```

#### `estimate`

Berechne (interpoliere) den aktuellen SoC zwischen den Abfragen an das Fahrzeug.

**Mögliche Werte**:

- `true`: evcc interpoliert die SoC Werte zwischen den Fahrzeugabfragen (empfohlen)
- `false`: evcc nutzt nur die SoC Werte, welche das Fahrzeug zurückliefert

**Standardwert:** `true`

**Beispiel**:

```yaml
estimate: false # Keine Interpolation
```

---

### `enable`

Definiert das Verhalten, wann im PV Modus das Laden begonnen wird. Darüberhinaus definiert es auch das Verhalten bei automatischer Phasenumschaltung von 1p auf 3p.

**Beispiel**:

```yaml
enable:
  threshold: 0
  delay: 1m
```

#### `threshold`

Definiert den Schwellenwert der Leistung am Netzanschlusspunkt in Watt (W).

**Mögliche Werte**: Ein positiver Wert für Netzbezug, ein negativer Wert für Export. Bei `0` muss der Export die minimale Ladeleistung erreicht haben.

**Standardwert:** `0`

**Beispiel**:

```yaml
threshold: 0
```

:::info
Ist für die evcc Site über den Parameter `residualPower` ein Versatz des Soll-Arbeitspunktes der Überschussregelung definiert, muss dieser Wert beim Setzen des `threshold` Wertes berücksichtigt werden.

Ist bspw. `residualPower` auf 200 gesetzt (die evcc Regelung setzt den Soll-Arbeitspunkt auf 200W Einspeisung), dann führt ein `enable` `threshold` Wert von 100 nicht dazu, dass ab 100W Netzbezug der Ladepunkt das Laden startet, sondern dass sich die verbleibende Einspeisung um 100W reduziert und somit ab 100W Einspeisung die Ladung startet.

Soll die Ladung bei 100W Netzbezug starten, müsste in dem Fall der `threshold` Wert auf 300 gesetzt werden.
:::

#### `delay`

Definiert, wie lange der `threshold` (Schwellenwert) erfüllt sein muss.

**Standardwert:** `1m`

**Beispiel**:

```yaml
delay: 1m
```

---

### `disable`

Definiert das Verhalten, wann im PV Modus das Laden unterbrochen wird. Darüberhinaus definiert es auch das Verhalten bei automatischer Phasenumschaltung von 3p auf 1p.

**Beispiel**:

```yaml
disable:
  threshold: 200 # maximum import power (W)
  delay: 10m
```

#### `threshold`

Definiert den Schwellenwert der Leistung am Netzanschlusspunkt in Watt (W).

**Mögliche Werte**: Ein positiver Wert für Netzbezug, ein negativer Wert für Export.

**Standardwert:** `0`

**Beispiel**:

```yaml
threshold: 200 # Ein maximaler Netzbezug von 200W ist erlaubt
```

:::info
Ist für die evcc Site über den Parameter `residualPower` ein Versatz des Soll-Arbeitspunktes der Überschussregelung definiert, muss dieser Wert beim Setzen des `threshold` Wertes berücksichtigt werden.

Vergleiche dazu auch das Beispiel in der Info zu [`enable`](#enable) `threshold`.
:::

#### `delay`

Definiert wie lange der `threshold` (Schwellenwert) erfüllt sein muss.

**Standardwert:** `3m`

**Beispiel**:

```yaml
delay: 10m
```

---

### `guardduration`

Definiert den zeitlichen Mindestabstand in welchem der Strom gesperrt oder wieder freigegeben werden darf.

**Standardwert:** `5m`

**Beispiel**:

Mindestens 15 Minuten Abstand zwischen dem An-/Ausschalten des Ladevorgangs.

```yaml
guardduration: 15m
```

---

### `phases`

**Wallbox ohne automatische Phasenumschaltung**:

Definiert die Anzahl der Phasen mit welcher die Wallbox angeschlossen ist.

Dieser Parameter ändert nichts am physikalischen Anschluss der Wallbox, sondern dient lediglich dazu, im PV-Modus (in Verbindung mit `minCurrent`) die minimale Startleistung für die Ladung zu ermitteln.

Seit kurzem werden die anliegenden Spannungen ausgewertet, wenn der Zähler der Wallbox diese liefert. Anhand der Spannungen wird der `phases` Wert „automatisch“ per API geändert. In den Fällen in denen die Wallbox per „Lasttrennschalter“ auf 1p oder 3p eingestellt wird, ist somit keine manuelle Änderung des `phases` Wertes mehr notwendig.

In den Fällen, in denen das 1p/3p Laden nicht per Lasttrennschalter, sondern mittels entsprechendem Ladekabel realisiert wird, führt diese "Automatik" zu Problemen. Hier muss der `phases` Wert beim `vehicle`entsprechend angepasst werden. Da dieser nicht per API änderbar ist, gibt es folgende Workaround:

Man konfiguriert das Fahrzeug zweimal. Zum einen mit `phases: 1` und ein weiters mal mit `phases: 3`. Je nach gewünschter Ladeart, wählt man dann im UI das entsprechende Fahrzeug aus.

Wenn ein bekanntes Fahrzeug angeschlossen ist, wird der kleinere Wert aus `vehicle: phases` und `loadpoint: phases` zur Berechnung herangezogen. Bei unbekannten Fahrzeugen wirkt immer `loadpoint: phases` alleine.

Wenn die Ladung läuft und die Wallbox bzw. der Ladezähler die Phasenströme liefert, wird daran die tatsächliche Anzahl der Phasen erkannt und (solange das Fahrzeug angesteckt bleibt) für die weitere Berechnung der tatsächlichen Schaltschwellen genutzt. Das funktioniert allerdings prinzipbedingt nur bei dreiphasigen Ladepunkten.

**Standardwert:** `3`

**Mögliche Werte:** `1|3`

**Beispiel**:

```yaml
phases: 1
```

**Wallbox mit automatischer Phasenumschaltung**:

Über den Wert kann die Automatik ein- bzw. ausgeschaltet werden.

`phases: 0` = Automatik eingeschaltet

`phases: 1 oder 3` = Automatik aus und der gesetzte Wert ist fix

**Standardwert:** `3`

**Mögliche Werte:** `0|1|3`

**Beispiel**:

```yaml
phases: 0
```

:::info
Ist dem Ladepunkt keine Wallbox, sondern eine der unterstützten schaltbaren Steckdosen (AVM FritzDECT, Shelly, Tasmota, TP-Link etc.) zugewiesen, **muss** `phases` zwingend auf **1** gesetzt werden, um eine ordnungsgemäße Lade-Steuerung zu gewährleisten.  
:::

---

### `minCurrent`

Definiert die minimal genutzte Stromstärke in Ampere (A) pro angeschlossener Phase von der Zuleitung zur Wallbox.

Wie bereits bei `phases` beschrieben, wird über diesen Wert die Mindestladeleistung festgelegt.

Bei Wallboxen mit automatischer Phasenumschaltung wird in 3p solange geladen, bis dieser Wert (von oben) erreicht ist. Erst dann wird auf 1p umgeschaltet.

:::info
Im Allgemeinen benötigt ein Elektrofahrzeug mindestens eine Stromstärke von 6A pro Phase um zu Laden. Bei manchen Fahrzeugen wird jedoch auch eine höhere Mindeststromstärke benötigt!

Bei Wallboxen und Fahrzeugen welche über den ISO15118 Standard kommunizieren kann unter Umständen auch mit einer geringeren Stromstärke pro Phase geladen werden, wenn die Gesamtleistung trotzdem mindestens etwa 1,4kW beträgt.
:::

**Standardwert:** `6`

**Beispiel**:

```yaml
mincurrent: 6
```

---

### `maxCurrent`

Definiert die maximal zulässige Stromstärke in Ampere (A) pro angeschlossener Phase von der Zuleitung zur Wallbox.

Bei Wallboxen mit automatischer Phasenumschaltung wird in 1p solange geladen, bis dieser Wert (von unten) erreicht ist. Erst dann wird auf 3p umgeschaltet.

**Standardwert:** `16`

**Beispiel**:

```yaml
maxcurrent: 16
```

---

### `priority`

Dient während der Ladung der Priorisierung von Loadpoints untereinander.

Dem priorisierten Loadpoint wird die Ladeleistung der anderen nicht oder geringer priorisierten Loadpoints zur Verfügung gestellt. Greift dieser darauf zu, kann es kurzzeitig zu Netzbezug führen, bis die Regelung ausnivelliert ist.

Je höher der Wert, desto größer die Priorität.
Loadpoints ohne Eintrag haben `priority: 0`

Hat bei mehreren Loadpoints keinen Einfluss darauf in welchen Reihenfolge die Ladungen gestartet werden. Läuft aber die Ladung an einem niedrig priorisierten Loadpoint, wird ein höher priorisierter eingeschaltet, weil diesem die bereits genutzte Ladeleistung zur Verfügung gestellt wird. 

Die Priorisierung wirkt in den Modi `pv` und `minpv`. Bei `minpv` wird die Ladung aber nicht unterbrochen, sondern lediglich auf Minimum reduziert.

:::info

Eine evtl. beim Fahrzeug konfigurierte Priorität ersetzt die Priorität des Loadpoints, mit dem das Fahrzeug verbunden ist.

:::

**Standartwert:** `0`

**Beispiel**:

```yaml
priority: 2
```

---
