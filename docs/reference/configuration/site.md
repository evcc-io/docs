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
      pv: # (pvs = veraltet)
        - mypv1 # first pv meter reference
        - mypv9 # second pv meter reference
      battery: # (batteries = veraltet)
        - mybat5 # battery meter reference
      aux:
        - myaux1
    residualPower: 100
    bufferSoc: 80
    prioritySoc: 66
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
Es ist mindestens die Konfiguration eines `grid` oder mindestens eines `pv` Elementes notwendig!
Ohne mindestens einen der beiden Einträge kann evcc nicht verwendet werden!
:::

**Beispiel**:

```yaml
site:
  meters:
    grid: mygridmeter # grid meter reference
    pv: mypv1 # pv meter reference
    battery: mybat2 # battery meter reference
    aux: myaux1
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

### `meters.pv`

Definiert die [`meter`](meters) (Strommessgeräte), welches die PV-Erzeugungswerte liefern.
Es können mehrere Geräte angegeben werden. Die Leistungsdaten werden automatisch addiert.

**Mögliche Werte**: Ein Wert oder eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration. Wobei die Listenversion auch bei Einzelwerten genutzt werden kann.

**Beispiel**:

```yaml
pv: myonlypv # singele pv meter reference
```

oder

```yaml
pv: # (pvs = veraltet)
  - myoldpv # first pv meter reference
  - mynewestpv # second pv meter reference
```

---

### `meters.battery`

Definiert die [`meter`](meters) (Strommessgeräte), welche die Messdaten des/der Batteriespeicher(s) liefern.
Es können mehrere Geräte angegeben werden. Die Leistungsdaten werden automatisch addiert und aus den Speicherfüllständen wird ein Mittelwert gebildet.

**Mögliche Werte**: Ein Wert oder eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration. Wobei die Listenversion auch bei Einzelwerten genutzt werden kann.

**Beispiel**:

```yaml
battery: myonlybat # single battery meter reference
```

oder

```yaml
battery: # (batteries = veraltet)
  - mysmallbat # first battery meter reference
  - myhugebat # second battery meter reference
```

### `meters.aux

Definiert die meter (Strommessgeräte), welche die Messdaten externer Geräte liefern, die nicht durch evcc gesteuert werden können. Es können mehrere Geräte angegeben werden. Die Leistungsdaten werden automatisch addiert.

In evcc fließt diese Leistung in die Berechnung der zur Verfügung stehenden Fahrzeugladeleistung ein.

Positiver Wert: steht dem Fahrzeug zur Verfügung

Negativer Wert: steht dem Fahrzeug nicht zur Verfügung

Beispiele:

- Ein Heizstab, der autark auf Basis des PV-Überschuss geregelt wird. Wenn die Leistungsmessung dieses Heizstabes als `aux` eingerichtet wird, steht die Leistung der Fahrzeugladung zur Verfügung. Greift das Fahrzeug darauf zu, sorgt die autarke Regelung des Heizstabes dafür, dass dessen Leistung entsprechend reduziert wird.

**Mögliche Werte**: Ein Wert oder eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration. Wobei die Listenversion auch bei Einzelwerten genutzt werden kann.

**Beispiel**:

```yaml
aux: myaux # single aux meter reference
```

oder

```yaml
aux:
  - myaux1 # first aux meter reference
  - myaux2 # second aux meter reference
```

### `bufferSoc`

Ignoriere das Entladen einer Hausbatterie oberhalb dem angegebenen Soc (%) Wert.
Die Ladung wird im PV-Modus bei zu wenig Überschuss (unterhalb der Mindestladeleistung) nicht unterbrochen, wenn sich die Hausbatterie(n) oberhalb dieses Ladezustandes befindet. Somit werden Schwankungen in der Erzeugung oder beim Verbrauch primär von der Hausbatterie ausgeglichen, wenn diese entsprechend geladen ist. Reicht die Entladeleistung der Hausbatterie nicht aus um die Mindestladeleistung des Fahrzeugs zu liefern, wird der Rest aus dem Netz bezogen.

Es wird im Modus `PV` nicht (mehr) automatisch gestartet, wenn der Soc der Hausbatterie größer als der eingestellte `bufferSoc` ist.

Ist deaktiviert (entspricht >100%) wenn kein Wert angegeben wird.

:::note
`bufferSoc` muss einen größeren Wert als `prioritySoc` haben.
:::

**Beispiel**:

```yaml
bufferSoc: 80 # Hausbatterie wird oberhalb Soc 80% als Puffer genutzt
```

### `prioritySoc`

Die Ladung der Hausbatterie hat unterhalb des angegebenen Soc (%) Wertes Priorität gegenüber der Fahrzeugladung.
Steht unterhalb dieses Wertes mehr Erzeugungsleistung zur Verfügung als der Batteriespeicher aufnimmt, kann dieser Überschuss trotzdem nachrangig zur Fahrzeugladung verwendet werden.
Wenn die Hausbatterie oberhalb des Wertes geladen wird, wird die Batterieladeleistung für das Laden des EVs als verfügbare Überschussleistung betrachtet. Somit hat dann die Fahrzeugladung Priorität bei der Verwendung der Überschussleistung.
Ist deaktiviert (entspricht 0%) wenn kein Wert angegeben wird.

:::note
`prioritySoc` muss einen kleineren Wert als `bufferSoc` haben.
:::

**Beispiel**:

```yaml
prioritySoc: 50 # Hausbatterie bekommt bis zum Soc 50% Priorität beim laden
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
Bei Existenz eines Batteriespeichers wird dringend empfohlen hier einen kleinen Wert von 100 bis 300 W einzutragen, um damit eine Speicherladung gemäß der konfigurierten Prioritäten (siehe `prioritySoc`) zu ermöglichen. Andernfalls "sieht" die unabhängige Regelung des Speichers keinen nutzbaren Überschuss.
Ebenso lässt sich damit bei schnellen Erzeugungs- und Lastwechseln auch ohne Speicher ein kurzzeitiger Netzbezug besser vermeiden.
:::

**Beispiel "Batteriespeicher"**:

```yaml
residualPower: 100
```

**Beispiel "Netzbezugsanteil"**:

Die Ladung soll im PV-Modus mit mindestens 6A (einphasig) auch bereits mit nur 50% PV-Anteil beginnen (Rest Netzbezug)
Mindestladeleistung: 1 Phase _ 6A _ 230V = 1380 W, davon 50%: 690 W

```yaml
residualPower: -690
```

### `maxGridSupplyWhileBatteryCharging`

Dieser Parameter ist (nur) hilfreich bei Hybrid-Wechselrichter-Systemen, bei denen die DC-Erzeugungsleistung in Verbindung mit einem direkt angebundenen Speichersystem größer sein kann als die AC-Ausgabeleistung des Wechselrichters. Hierbei kann es während der Fahrzeugladung zu Netzbezug kommen, obwohl gleichzeitig die Batterie geladen wird.

Beispielszenario:
10 kW maximale AC-Ausgabeleistung des Hybrid-WR. Aktuelle PV-Erzeugungsleistung 15 kW, dabei gehen 5 kW in die direkt angeschlossene Batterie, da der AC-Pfad des Hybrid-WR bereits mit 10 kW voll ausgelastet ist.

Normalerweise wird die momentane Ladeleistung der Hausbatterie als zusätzlich verfügbare Fahrzeugladeleistung betrachtet (falls `prioritySoc` schon erreicht wurde). In dem obigen Beispiel käme es dann jedoch zu Netzbezug in Höhe der momentanen Batterieladeleistung da diese vom Wechselrichter dem Netz (und somit dem Fahrzeug) technisch nicht zur Verfügung gestellt werden kann. Der ausgelastete AC-Pfad des Hybrid-WR bildet hierbei einen für die Standard-Regelung unerwarteten Engpass.

Mit diesem Parameter kann ein Schwellenwert für den Netzbezug gesetzt werden, der bewirkt, dass in diesem Fall die Batterieladeleistung nicht als verfügbare Fahrzeugladeleistung einberechnet wird. Somit bleibt dann die maximale Überschussladeleistung auf die maximale AC-Ausgangsleistung des/der Wechselrichter zuzügliches dieses Wertes begrenzt.

Empfohlen wird ein Wert von mindestens 50 (Watt). Je nach Trägheit der beteiligten Regelungssysteme kann er auch höher gewählt werden müssen.

```yaml
maxGridSupplyWhileBatteryCharging: 50
```
