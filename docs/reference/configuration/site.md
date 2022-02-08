---
sidebar_position: 2
---

# `site`

Beschreibt den Standort mit den vorhandenen und benötigten Geräten der Hausinstallation und ist für das Regeln der verfügbaren Leistung zuständig.

Um das Laden mit PV Überschuss zu regeln, ist ein auslesbarer Zähler direkt hinter dem Netzanschlusspunkt notwendig. Zusätzlich können auch Geräte für die PV Leistung und Hausbatterie angegeben werden.

**Beispiel**:

```yaml
site:
- title: Zuhause # display name for UI
  meters:
    grid: sdm630 # grid meter reference
    pvs: 
    - sma # pv meter reference
    batteries:
    - byd # battery meter reference
```

---

## Erforderliche Parameter

### `title`

Eine Beschreibung des Ladepunktes, wird in der UI angezeigt.

**Beispiel**:

```yaml
  title: Zuhause
```

---

### `meters`

Definiert welche [`meter`](meters) (Strommessgeräte) welche Art von Daten zur Verfügung stellen.

:::note
Es ist mindestens die Konfiguration eines `grid` oder mindestens eines `pvs` Elementes notwendig!
:::

**Beispiel**:

```yaml
site:
  meters:
    grid: sdm630 # grid meter reference
    pvs: 
    - sma # pv meter reference
    batteries: 
    - byd # battery meter reference
  residualPower: 100
```

---

## Optionale Parameter

### `meters.grid`

Definiert das [`meter`](meters) (Strommessgeräte), welches die Werte des Netzanschlusspunktes liefert.

**Mögliche Werte**: Wert eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    grid: sdm630 # grid meter reference
```

---

### `meters.pvs`

Definiert die [`meter`](meters) (Strommessgeräte), welches die PV Stromerzeugungswerte liefert.

**Mögliche Werte**: Eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    pvs: 
    - sma # pv meter reference
```

---

### `meters.batteries`

Definiert die [`meter`](meters) (Strommessgeräte), welches die Werte Hausbatterien liefert.

**Mögliche Werte**: Eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    batteries: 
    - byd # battery meter reference
```

### `bufferSoC`

Ignoriere das Entladen einer Hausbatterie oberhalb dem angegebenen SoC (%) Wert.
Die Ladung wird im PV-Modus bei zu wenig Überschuss (unterhalb der Mindestladeleistung) nicht unterbrochen wenn sich die Hausbatterie(n) oberhalb dieses Ladezustandes befindet. Somit werden Schwankungen in der Erzeugung oder beim Verbrauch primär von der Hausbatterie ausgeglichen wenn diese entsprechend geladen ist.
Ist deaktiviert (entspricht >100%) wenn kein Wert angegeben wird.

:::note
`bufferSoC` muss einen größeren Wert als `prioritySoC` haben.
:::

**Beispiel**:

```yaml
    bufferSoC: 80 # Hausbatterie wird oberhalb SoC 80% als Puffer genutzt
```

### `prioritySoC`

Die Ladung der Hausbatterie hat Priorität vor der Fahrzeugladung unterhalb des angegebenen SoC (%) Werts.
Steht unterhalb dieses Wertes mehr Erzeugungsleistung zur Verfügung wie der Batteriespeicher aufnimmt kann dieser Überschuss trotzdem nachrangig zur Fahrzeugladung verwendet werden.
Wenn die Hausbatterie oberhalb des Wertes geladen wird, wird die Batterieladeleistung für das Laden des EVs als verfügbare Überschussleistung betrachtet. Somit hat dann die Fahrzeugladung Priorität bei der Verwendung der Überschussleistung.
Ist deaktiviert (entspricht 0%) wenn kein Wert angegeben wird.

:::note
`prioritySoC` muss einen kleineren Wert als `bufferSoC` haben.
:::

**Beispiel**:

```yaml
    prioritySoC: 50 # Hausbatterie bekommt bis zum SoC 50% Priorität beim laden
```

### `residualPower`

Legt den Soll-Arbeitspunkt der Überschussregelung am Netzübergang (Gridmeter) fest. Der Standardwert ist 0 W.
Negative Werte verschieben den Sollwert in Richtung Netzeinspeisung, positive Werte in Richtung Netzbezug.
Letztendlich wird mit diesem Wert der durch die Steuerung einzustellende "Ruhezustand" des Regelkreises eingestellt.

Insbesondere im Zusammenspiel mit weiteren unabhängigen Überschussausregelungen wie z. B. der eines Batteriespeichers ist es obligatorisch diesen Wert anzupassen um ein definiertes Systemverhalten mit klaren Prioritäten zu erzielen.

#### `grid` `meter` vorhanden

- Positiver Wert: Verbleibende Netzbezugsleistung
- Negativer Wert: Verbleibende Netzeinspeiseleistung

#### Nur `pv` `meter` vorhanden

- Positiver Wert: Typischer Hausverbrauch, um damit den PV-Überschuss abschätzen zu können.
- Negativer Wert: -

**Beispiel**:

Bei Existenz eines Batteriespeichers wird dringend empfohlen hier einen kleinen Wert von 100 bis 300 W einzutragen um damit eine Speicherladung gemäß der konfigurierten Prioritäten (siehe `prioritySoC`) zu ermöglichen. Andernfalls "sieht" die Regelung des Speichers keinen nutzbaren Überschuss.
Ebenso lässt sich damit bei schnellen Erzeugungs- und Lastwechseln auch ohne Speicher ein kurzzeitiger Netzbezug besser vermeiden.

```yaml
  residualPower: 100
```

Soll im PV-Modus ein Netzbezugsanteil verbleiben bzw. zugelassen werden muss hier eine positive Leistung entsprechend des Maximalanteils des Netzbezugs konfiguriert werden.

**Beispiel**:

Die Ladung soll im PV-Modus mit mindestens 6A (einphasig) auch bereits mit nur 50% PV-Anteil beginnen (Rest Netzbezug)
Mindestladeleistung: 1 Phase * 6A * 230V = 1380 W, davon 50%: 690 W

```yaml
  residualPower: -690
```
