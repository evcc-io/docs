---
sidebar_position: 2
---

# `site`

Beschreibt den Standort mit den vorhandenen und benötigten Geräten der Hausinstallation und ist für das Regeln der verfügbaren Leistung zuständig.

Um das Laden mit PV-Überschuss zu regeln, ist ein auslesbarer Zähler direkt hinter dem Netzanschlusspunkt notwendig. Zusätzlich können auch Geräte für die PV-Leistung und Hausbatterie(n) angegeben werden. Mehrere Geräte werden dabei in der Leistung intern automatisch addiert bzw. wird bei Batteriespeichern der Mittelwert des Ladezustands gebildet.

**Beispiel**:

```yaml
site:
- title: Zuhause # display name for UI
  meters:
    grid: mygridmeter # grid meter reference
    pvs: 
    - mypv1 # first pv meter reference
    - mypv9 # second pv meter reference
    batteries:
    - mybat5 # battery meter reference
  residualPower: 100
  bufferSoC: 80
  prioritySoC: 66    
```

---

## Erforderliche Parameter

### `title`

Die angezeigte Beschreibung des Ladepunktes, wird in der UI angezeigt.

**Beispiel**:

```yaml
  title: Zuhause
```

---

### `meters`

Definiert welche konfigurierten [`meter`](meters) (Strommessgeräte) als welche Art Messpunkt verwendet werden soll.
Hier erfolgt somit die logische Verknüpfung der Gerätedefiniton mit dem Verwendungsweck.
Ein zunächst universeller Zähler bekommt somit entsprechend seines Einbauortes in der Hausinstallation einen Zweck zugewiesen.

:::note
Es ist mindestens die Konfiguration eines `grid` oder mindestens eines `pvs` Elementes notwendig!
Ohne mindestens einen der beiden Einträge kann evcc nicht verwendet werden!
:::

**Beispiel**:

```yaml
site:
  meters:
    grid: mygridmeter # grid meter reference
    pvs: 
    - mypv1 # pv meter reference
    batteries: 
    - mybat2 # battery meter reference
```

---

## Optionale Parameter

### `meters.grid`

Definiert das [`meter`](meters) (Strommessgeräte), welches die Messwerte des Netzanschlusspunktes liefert.

**Mögliche Werte**: Wert eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    grid: mygridmeter # grid meter reference
```

---

### `meters.pvs`

Definiert die [`meter`](meters) (Strommessgeräte), welches die PV-Erzeugungswerte liefert.
Es können mehrere Geräte angegeben werden. Die Leistungsdaten werden automatisch addiert.

**Mögliche Werte**: Eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    pvs: 
    - myoldpv # first pv meter reference
    - mynewestpv # second pv meter reference
```

---

### `meters.batteries`

Definiert die [`meter`](meters) (Strommessgeräte), welches die Messdaten des/der Batteriespeicher(s) liefert.
Es können mehrere Geräte angegeben werden. Die Leistungsdaten werden automatisch addiert und aus den Speicherfüllständen ein Mittelwert gebildet.

**Mögliche Werte**: Eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    batteries: 
    - mysmallbat # first battery meter reference
    - myhugebat # seconds battery meter reference
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

Soll im PV-Modus ein Netzbezugsanteil verbleiben bzw. zugelassen werden muss hier eine negative Leistung entsprechend des Maximalanteils des Netzbezugs konfiguriert werden.

#### `grid` `meter` vorhanden

- Positiver Wert: Verbleibende Netzeinspeiseleistung
- Negativer Wert: Verbleibende Netzbezugsleistung

#### Nur `pv` `meter` vorhanden

- Positiver Wert: Typischer Hausverbrauch, um damit den PV-Überschuss abschätzen zu können.
- Negativer Wert: (ungültig)

:::info
Bei Existenz eines Batteriespeichers wird dringend empfohlen hier einen kleinen Wert von 100 bis 300 W einzutragen um damit eine Speicherladung gemäß der konfigurierten Prioritäten (siehe `prioritySoC`) zu ermöglichen. Andernfalls "sieht" die unabhängige Regelung des Speichers keinen nutzbaren Überschuss.
Ebenso lässt sich damit bei schnellen Erzeugungs- und Lastwechseln auch ohne Speicher ein kurzzeitiger Netzbezug besser vermeiden.
:::

**Beispiel "Batteriespeicher"**:

```yaml
  residualPower: 100
```

**Beispiel "Netzbezugsanteil"**:

Die Ladung soll im PV-Modus mit mindestens 6A (einphasig) auch bereits mit nur 50% PV-Anteil beginnen (Rest Netzbezug)
Mindestladeleistung: 1 Phase * 6A * 230V = 1380 W, davon 50%: 690 W

```yaml
  residualPower: -690
```
