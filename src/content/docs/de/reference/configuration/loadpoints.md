---
title: "loadpoints"
description: "In der evcc.yaml verknüpfst du für jeden Ladepunkt Wallbox, Zähler und Fahrzeug, wählst den Standardmodus und passt Fahrzeugabfrage, Schwellwerte und Phasen an."
sidebar:
  order: 3
translatedFrom: "05c846a87f23"
---

`loadpoints` (Ladepunkte) ist eine Liste von Ladepunkten, die jeweils eine Wallbox, Fahrzeuge und, falls notwendig, einen Zähler mit weiteren optionalen Parametern kombinieren. Eine minimale Konfiguration erfordert eine Wallbox.

**Beispiel**:

```yaml
loadpoints:
  - title: Garage # Anzeigename in der UI
    charger: wallbox # Referenz auf die Wallbox
    vehicle: audi # Referenz auf das Standardfahrzeug
    mode: smart # Lademodus (off, smart, now)
```

Referenzen entsprechen immer den Werten des Parameters `name` (z. B. `wallbox`) in der jeweiligen Gerätekonfiguration.

Im Folgenden werden alle möglichen Parameter erklärt.

---

## Erforderliche Parameter

### `title`

Eine Beschreibung des Ladepunkts, die in der UI angezeigt wird.

**Beispiel**:

```yaml
title: Garage
```

---

### `charger`

Referenz auf eine `charger`-Konfiguration.

**Beispiel**:

```yaml
charger: wallbox
```

Dabei entspricht der Wert `wallbox` dem Wert des Parameters `name` in der [Wallbox-Definition](/de/reference/configuration/chargers#name).

---

## Optionale Parameter

### `meter`

Referenz auf eine `meter`-Konfiguration (Zähler).

Dieser Eintrag wird nur benötigt, wenn die verwendete Wallbox keine eigene Strommessung durchführt oder evcc die Messwerte nicht aus der Wallbox auslesen kann. Aber selbst dann ist dieser Eintrag optional, denn evcc nimmt an, dass mit dem eingestellten maximalen Strom auch geladen wird.

**Beispiel**:

```yaml
meter: charge
```

Dabei entspricht der Wert `charge` dem Wert des Parameters `name` in der [Zähler-Definition](/de/reference/configuration/meters#name).

---

### `vehicle`

`vehicle`: Referenz auf eine `vehicle`-Konfiguration, die dem Ladepunkt als Standardfahrzeug zugewiesen wird.

Wird ein Fahrzeug an die Wallbox angeschlossen, geht evcc davon aus, dass es sich um dieses Fahrzeug handelt. Die automatische Fahrzeugerkennung wird umgangen. Ist ein anderes Fahrzeug angeschlossen (z. B. ein Gastfahrzeug), lässt es sich nachträglich manuell zuweisen.

**Beispiel**:

```yaml
vehicle: renault
```

Dabei entspricht der Wert `renault` dem Wert des Parameters `name` in der [Fahrzeug-Definition](/de/reference/configuration/vehicles#name).

---

### `mode`

evcc merkt sich den zuletzt genutzten Lademodus.
Mit dem Parameter `mode` kannst du den Lademodus festlegen, der nach dem Abstecken des Fahrzeugs gelten soll.

**Mögliche Werte**:

- `off`: Das Laden ist gestoppt, auch wenn ein Fahrzeug an der Wallbox angeschlossen ist.
- `smart`: Lädt mit PV-Überschuss, in günstigen Stunden eines dynamischen Tarifs und nach Ladeplänen. Pausiert, wenn keine günstige Energie verfügbar ist.
- `now`: Lädt sofort mit der maximal möglichen Leistung.

**Standardwert:** `smart`

Die veralteten Werte `pv` und `minpv` werden beim Schreiben weiterhin akzeptiert:
`pv` aktiviert `smart` und schaltet [**Dauerhaft laden**](/de/features/modes#always-charge) aus, `minpv` aktiviert `smart` und schaltet **Dauerhaft laden** ein.

:::caution[Inkompatible Änderung]
Status- und API-Lesezugriffe (`/api/state`, WebSocket, MQTT) melden `smart` statt `pv`. `minpv` taucht beim Lesen nicht mehr auf.
Externe Automatisierungen, die beim Lesen mit `pv` oder `minpv` vergleichen, müssen angepasst werden.
Integrationen erkennen das neue Modusschema am Vorhandensein von `loadpoints[].alwaysCharge` in `/api/state`.
:::

:::note
Im Allgemeinen benötigt ein Elektroauto zum Laden mindestens 1,4 kW Leistung pro Phase. Bei Wallboxen und Fahrzeugen, die über den Standard ISO 15118 kommunizieren, werden insgesamt mindestens 1,4 kW Leistung benötigt, unabhängig davon, mit wie vielen Phasen geladen wird.
:::

**Beispiel**:

```yaml
mode: smart
```

---

### `soc`

Definiert die Standardeinstellungen für den Umgang mit dem Ladestand eines angeschlossenen Fahrzeugs.

**Beispiel**:

```yaml
soc:
  poll:
    mode: charging
    interval: 60m
  estimate: true
```

#### `poll`

Definiert, wie die Fahrzeug-APIs genutzt werden, um aktuelle Informationen über das Fahrzeug abzurufen.

Ist bei der Wallbox das `features`-Flag `integrateddevice` konfiguriert, werden die Daten fortlaufend abgerufen.
In diesem Fall sind keine `poll`-Einstellungen notwendig, gesetzte Einstellungen werden ignoriert.

:::caution
Es wird **nicht** empfohlen, die Standardeinstellungen zu ändern, denn dies könnte dazu führen, dass die Fahrzeugbatterie entleert wird oder der Fahrzeughersteller das Steuern des Ladens über evcc aktiv unterbindet. **Nutzung auf eigenes Risiko**.
:::

#### `poll.mode`

Definiert, unter welchen Bedingungen die Fahrzeugdaten abgerufen werden.

**Mögliche Werte**:

- `charging`: Daten **nur** während eines Ladevorgangs aktualisieren (empfohlene Standardeinstellung).
- `connected`: Daten aktualisieren, wenn das Fahrzeug mit der Wallbox verbunden ist (nicht nur beim Laden); der Parameter `interval` legt die Häufigkeit fest.
- `always`: Daten immer aktualisieren, auch wenn das Fahrzeug nicht mit der Wallbox verbunden ist; der Parameter [`interval`](#pollinterval) legt die Häufigkeit fest (wird nur für ein Fahrzeug pro Ladepunkt unterstützt).

**Standardwert:** `charging`

**Beispiel**:

```yaml
mode: charging
```

#### `poll.interval`

Definiert, wie oft das Fahrzeug nach Daten abgefragt wird, wenn es **nicht** lädt.

**Standardwert:** `60m`

**Beispiel**:

```yaml
interval: 60m
```

#### `estimate`

Schätzt den aktuellen Ladestand anhand der gemessenen Ladeenergie (Extrapolation) zwischen den per `interval` eingestellten Fahrzeugabfragen.

**Mögliche Werte**:

- `true`: evcc extrapoliert die Ladestandswerte zwischen den Fahrzeugabfragen (empfohlen).
- `false`: evcc nutzt nur die Ladestandswerte, die das Fahrzeug zurückliefert.

**Standardwert:** `true`

**Beispiel**:

```yaml
estimate: false # Keine Extrapolation
```

---

### `enable`

Definiert das Verhalten beim Starten des Ladens mit PV-Überschuss im Smart-Modus. Außerdem legt der Parameter das Verhalten bei der automatischen Phasenumschaltung von 1p auf 3p fest.

:::note
Um einen Anteil Netzbezug zu erlauben, nutze stattdessen den Regler **PV-Anteil** in den Einstellungen des Ladepunkts (siehe [Nicht genügend Überschuss?](/de/features/solar-charging#not-enough-surplus)).
Der Regler ist deaktiviert, solange ein `enable`- oder `disable`-Schwellwert gesetzt ist.
:::

**Beispiel**:

```yaml
enable:
  threshold: 0
  delay: 1m
```

#### `threshold`

Definiert den Leistungsschwellwert am Netzanschlusspunkt in Watt (W).

**Mögliche Werte**: Ein positiver Wert für Netzbezug, ein negativer Wert für Einspeisung. Bei `0` muss die Einspeisung die Mindestladeleistung erreichen.

**Standardwert:** `0`

**Beispiel**:

```yaml
threshold: 0
```

:::note
Ist für den evcc-Standort über den Parameter `residualPower` ein Versatz des Soll-Arbeitspunkts der Überschussregelung definiert, muss dieser Wert beim Setzen des `threshold`-Werts berücksichtigt werden.

Ist z. B. `residualPower` auf 200 gesetzt (die evcc-Regelung setzt den Soll-Arbeitspunkt auf 200 W Einspeisung), dann bedeutet ein `threshold` von 100 unter `enable` nicht, dass das Laden bei 100 W Netzbezug startet. Stattdessen reduziert sich die verbleibende Einspeiseleistung um 100 W, und das Laden startet bei 100 W Einspeisung.

Soll das Laden in diesem Fall bei 100 W Netzbezug starten, sollte der `threshold`-Wert auf 300 gesetzt werden.
:::

#### `delay`

Definiert, wie lange der `threshold` erfüllt sein muss.

**Standardwert:** `1m`

**Beispiel**:

```yaml
delay: 1m
```

---

### `disable`

Definiert das Verhalten beim Beenden des Ladens mit PV-Überschuss im Smart-Modus. Außerdem legt der Parameter das Verhalten bei der automatischen Phasenumschaltung von 3p auf 1p fest.

**Beispiel**:

```yaml
disable:
  threshold: 200 # maximale Netzbezugsleistung (W)
  delay: 10m
```

#### `threshold`

Definiert den Leistungsschwellwert am Netzanschlusspunkt in Watt (W).

**Mögliche Werte**: Ein positiver Wert für Netzbezug. Bei `0` stoppt das Laden, sobald der Überschuss die Mindestladeleistung nicht mehr deckt.

**Standardwert:** `0`

**Beispiel**:

```yaml
threshold: 200 # Ein maximaler Netzbezug von 200 W ist erlaubt
```

:::note
Ist für den evcc-Standort über den Parameter `residualPower` ein Versatz des Soll-Arbeitspunkts der Überschussregelung definiert, muss dieser Wert beim Setzen des `threshold`-Werts berücksichtigt werden. Siehe dazu das Beispiel im Hinweis zu `threshold` unter [`enable`](#enable).
:::

:::caution
Negative Werte sind wirkungslos: Solange Überschuss vorhanden ist, lädt evcc weiter und prüft den Schwellwert gar nicht.
:::

#### `delay`

Definiert, wie lange der `threshold` erfüllt sein muss.

**Standardwert:** `3m`

**Beispiel**:

```yaml
delay: 10m
```

---

### `phases`

:::note[In YAML veraltet]
Dieser Wert kann jetzt im Einstellungsdialog des Ladepunkts gesetzt werden.
:::

**Wallbox ohne automatische Phasenumschaltung**:

Definiert die Anzahl der Phasen, mit denen die Wallbox angeschlossen ist.

Dieser Parameter ändert nichts am elektrischen Anschluss der Wallbox, sondern dient dazu, beim Laden mit PV-Überschuss (in Verbindung mit `minCurrent`) die minimale Startleistung zu ermitteln.

Seit Kurzem werden die anliegenden Spannungen ausgewertet, wenn der Zähler der Wallbox diese liefert. Anhand der Spannungen wird der `phases`-Wert automatisch per API geändert. In Fällen, in denen die Wallbox per Schalter auf 1p oder 3p eingestellt wird, ist damit keine manuelle Änderung des `phases`-Werts mehr notwendig.

In Fällen, in denen das 1p/3p-Laden nicht per Schalter, sondern über ein entsprechendes Ladekabel umgesetzt wird, führt diese „Automatik“ zu Problemen. Dann muss der `phases`-Wert beim `vehicle` entsprechend angepasst werden. Da sich dieser Wert nicht per API ändern lässt, hilft folgender Umweg:

Konfiguriere das Fahrzeug zweimal: einmal mit `phases: 1` und einmal mit `phases: 3`. Je nach gewünschter Ladeart wählst du dann in der UI das passende Fahrzeug aus.

Ist ein bekanntes Fahrzeug angeschlossen, wird der kleinere Wert aus `vehicle: phases` und `loadpoint: phases` zur Berechnung herangezogen. Bei unbekannten Fahrzeugen wird nur `loadpoint: phases` berücksichtigt.

Während das Fahrzeug lädt und die Wallbox bzw. der Ladezähler die Phasenströme liefert, wird die tatsächliche Anzahl der Phasen erkannt und (solange das Fahrzeug angeschlossen bleibt) für die weitere Berechnung der Schaltschwellen genutzt. Das funktioniert nur bei dreiphasigen Ladepunkten.

**Standardwert:** `3`

**Mögliche Werte:** `1|3`

**Beispiel**:

```yaml
phases: 1
```

**Wallbox mit automatischer Phasenumschaltung**:

Über den Wert wird die automatische Phasenumschaltung ein- bzw. ausgeschaltet.

`phases: 0` = Automatische Umschaltung eingeschaltet

`phases: 1 oder 3` = Automatische Umschaltung ausgeschaltet, der gesetzte Wert ist fest

**Standardwert:** `3`

**Mögliche Werte:** `0|1|3`

**Beispiel**:

```yaml
phases: 0
```

:::note
Ist dem Ladepunkt keine Wallbox, sondern eine der unterstützten schaltbaren Steckdosen (AVM FritzDECT, Shelly, Tasmota, TP-Link usw.) zugewiesen, muss `phases` auf **1** gesetzt werden, um eine ordnungsgemäße Steuerung des Ladens zu gewährleisten.
:::

---

### `priority`

Dieser Parameter priorisiert Ladepunkte untereinander während des Ladens.

Dem priorisierten Ladepunkt wird die Ladeleistung anderer nicht oder niedriger priorisierter Ladepunkte zur Verfügung gestellt. Greift ein priorisierter Ladepunkt auf diese Leistung zu, kann es kurzzeitig zu Netzbezug kommen, bis sich die Regelung eingependelt hat.

Höhere Werte bedeuten eine höhere Priorität. Ladepunkte ohne Eintrag haben `priority: 0`.

Bei mehreren Ladepunkten hat dieser Parameter keinen Einfluss darauf, in welcher Reihenfolge die Ladevorgänge gestartet werden. Lädt jedoch ein niedriger priorisierter Ladepunkt, wird ein höher priorisierter unter Umständen eingeschaltet, wenn ihm die ungenutzte Ladeleistung zur Verfügung gestellt wird.

Diese Priorisierung wirkt im Modus `smart`. Ist [**Dauerhaft laden**](/de/features/modes#always-charge) aktiv, wird das Laden nicht unterbrochen, sondern nur auf das Minimum reduziert.

:::note
Ist für ein Fahrzeug eine Priorität definiert, ersetzt sie die Priorität des Ladepunkts, mit dem das Fahrzeug verbunden ist.
:::

**Standardwert:** `0`

**Beispiel**:

```yaml
priority: 2
```

---
