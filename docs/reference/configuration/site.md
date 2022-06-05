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

Definiert welche konfigurierten [`meter`](meters) (Strommessgeräte) als welche Art Messpunkt verwendet werden sollen.
Hier erfolgt somit die logische Verknüpfung der Gerätedefiniton mit dem Verwendungsweck.
Ein zunächst universeller Zähler bekommt somit entsprechend seines Einbauortes in der Hausinstallation einen Zweck zugewiesen.

:::note
Es ist mindestens die Konfiguration eines `grid` oder mindestens eines `pv(s)` Elementes notwendig!
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

Definiert das [`meter`](meters) (Strommessgerät), welches die Messwerte des Netzanschlusspunktes liefert.

**Mögliche Werte**: Wert eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    grid: mygridmeter # grid meter reference
```

---

### `meters.pv(s)`

Definiert die [`meter`](meters) (Strommessgeräte), welches die PV-Erzeugungswerte liefern.
Es können mehrere Geräte angegeben werden. Die Leistungsdaten werden automatisch addiert.

**Mögliche Werte**: Ein Wert oder eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration. Wobei die Listenversion auch bei Einzelwerten genutzt werden kann.

**Beispiel**:

```yaml
    pv: myonlypv # singele pv meter reference
```
oder 

```yaml
    pvs: 
    - myoldpv # first pv meter reference
    - mynewestpv # second pv meter reference
```

---

### `meters.battery(ies)`

Definiert die [`meter`](meters) (Strommessgeräte), welche die Messdaten des/der Batteriespeicher(s) liefern.
Es können mehrere Geräte angegeben werden. Die Leistungsdaten werden automatisch addiert und aus den Speicherfüllständen wird ein Mittelwert gebildet.

**Mögliche Werte**: Ein Wert oder eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration. Wobei die Listenversion auch bei Einzelwerten genutzt werden kann.

**Beispiel**:

```yaml
    battery: myonlybat # singel battery meter reference
```
oder

```yaml
    batteries: 
    - mysmallbat # first battery meter reference
    - myhugebat # seconds battery meter reference
```

### `bufferSoC`

Ignoriere das Entladen einer Hausbatterie oberhalb dem angegebenen SoC (%) Wert.
Die Ladung wird im PV-Modus bei zu wenig Überschuss (unterhalb der Mindestladeleistung) nicht unterbrochen, wenn sich die Hausbatterie(n) oberhalb dieses Ladezustandes befindet. Somit werden Schwankungen in der Erzeugung oder beim Verbrauch primär von der Hausbatterie ausgeglichen, wenn diese entsprechend geladen ist.
Ist deaktiviert (entspricht >100%) wenn kein Wert angegeben wird.

:::note
`bufferSoC` muss einen größeren Wert als `prioritySoC` haben.
:::

**Beispiel**:

```yaml
    bufferSoC: 80 # Hausbatterie wird oberhalb SoC 80% als Puffer genutzt
```

### `prioritySoC`

Die Ladung der Hausbatterie hat unterhalb des angegebenen SoC (%) Wertes Priorität gegenüber der Fahrzeugladung.
Steht unterhalb dieses Wertes mehr Erzeugungsleistung zur Verfügung als der Batteriespeicher aufnimmt, kann dieser Überschuss trotzdem nachrangig zur Fahrzeugladung verwendet werden.
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


### `maxGridSupplyWhileBatteryCharging`

Dieser Parameter ist nur notwendig bei Hybrid-Wechselrichter Systemen, bei denen die DC-Erzeugungsleistung größer ist als die AC-Ausgabeleistung des Wechselrichters. Hier kann es unter gewissen Umständen während der Fahrzeugladung zu Netzbezug kommen, obwohl gleichzeitig die Batterie geladen wird.

Beispiel:
15kW PV-Erzeugungsleistung, aber nur 10kW AC-Ausgabeleistung des WR = 5kW Batterieladeleistung auf DC-Ebene.

Wenn `prioritySoC` erreicht ist, wird die gesamte Batterieladeleistung als zusätzlich verfügbare Fahrzeugladeleistung betrachtet. In dem obigen Beispiel käme es dann zu Netzbezug, weil EVCC die 5kW Batterieladung zur verfügbaren Fahrzeugladeleistung addieren würde, obwohl diese vom Wechselrichter dem Netz (und somit den Fahrzeug) gar nicht zur Verfügung gestellt werden kann.

Mit diesem Parameter kann ein Schwellenwert für den Netzbezug gesetzt werden, der bewirkt, dass diese Batterieladeleistung nicht als zusätzlich verfügbare Fahrzeugladeleistung angesehen wird.

Empfohlen wird ein Wert von mindestens 50. Je nach Trägheit der betroffenen Regelungssysteme kann er auch höher sein.

```yaml
  maxGirdSupplyWhileBatteryCharging: 50
```

