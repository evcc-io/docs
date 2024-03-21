---
sidebar_position: 3
---

# `loadpoints`

`loadpoints` (Ladepunkte) ist eine Liste von Ladepunkten und kombiniert für jeden Ladepunkt eine Wallbox, Fahrzeuge und, falls notwendig, einen Zähler mit weiteren optionalen Parametern. Eine minimale Konfiguration erfordert eine Wallbox.

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

Titel des Ladepunktes, wird in der UI angezeigt.

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

Ist beim Charger `integrateddevice: true` konfiguriert, werden die Daten fortlaufend abgerufen. Dann sind keine `poll` Einstellungen notwendig, bzw. diese werden ignoriert.

:::warning
Es wird **NICHT** empfohlen, die Standardeinstellungen zu ändern, denn dies könnte dazu führen, dass die Fahrzeugbatterie entleert wird
oder dass der Fahrzeughersteller aktiv verhindert, das Laden mittels evcc zu steuern. **AUF EIGENES RISIKO.**
:::

#### `poll.mode`

Definiert, unter welchen Bedingungen die Daten für das Fahrzeug abgerufen werden

**Mögliche Werte**:

- `charging`: aktualisiere die Daten **NUR** während eines Ladevorgangs (dies ist die empfohlene Standardeinstellung)
- `connected`: aktualisiere die Daten, wenn das Fahrzeug mit der Wallbox verbunden ist (nicht nur wenn es lädt); der Parameter `interval` definiert wie oft
- `always`: aktualisiere die Daten immer, auch wenn das Fahrzeug nicht mit der Wallbox verbunden ist; der Parameter [`interval`](#pollinterval) definiert, wie oft (wird nur für ein Fahrzeug eines Ladepunktes unterstützt)

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

Definiert den zeitlichen Mindestabstand in welchem der Strom gesperrt oder wieder freigegeben werden darf. Das beinhaltet sowohl das An-/Ausschalten des Ladevorgangs als auch die Umschaltung zwischen einphasigem und dreiphasigem Laden und soll vermeiden, dass die Schütze in der Wallbox und im Auto zu häufig innerhalb eines gewissen Zeitraums geschaltet werden.

**Standardwert:** `5m`

**Beispiel**:

Mindestens 15 Minuten Abstand zwischen dem An-/Aus-/Phasenumschalten des Ladevorgangs. Jeder der vorgenannten Vorgänge kann nur 1x im Zeitraum `guardduration` von evcc ausgelöst werden.

```yaml
guardduration: 15m
```

---

### `priority`

Dient während der Ladung der Priorisierung von Loadpoints untereinander.

Dem priorisierten Loadpoint wird die Ladeleistung der anderen nicht oder geringer priorisierten Loadpoints zur Verfügung gestellt. Greift dieser darauf zu, kann es kurzzeitig zu Netzbezug führen, bis die Regelung ausnivelliert ist.

Je höher der Wert, desto größer die Priorität.
Loadpoints ohne Eintrag haben `priority: 0`

Hat bei mehreren Loadpoints keinen Einfluss darauf in welchen Reihenfolge die Ladungen gestartet werden. Läuft aber die Ladung an einem niedrig priorisierten Loadpoint, wird ein höher priorisierter unter Umständen eingeschaltet, weil diesem die bereits genutzte Ladeleistung zur Verfügung gestellt wird.

Die Priorisierung wirkt in den Modi `pv` und `minpv`. Bei `minpv` wird die Ladung aber nicht unterbrochen, sondern lediglich auf Minimum reduziert.

:::info

Eine evtl. beim Fahrzeug konfigurierte Priorität ersetzt die Priorität des Loadpoints, mit dem das Fahrzeug verbunden ist.

:::

**Standardwert:** `0`

**Beispiel**:

```yaml
priority: 2
```

---
