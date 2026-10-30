---
title: "log, levels"
description: "So legst du das Loglevel in der evcc.yaml fest, was die Stufen von fatal bis trace bedeuten und wie du einzelne Komponenten wie einen Ladepunkt genauer protokollierst."
sidebar:
  order: 11
translatedFrom: "5f61ea01c519"
---

## `log`

Definiert den Detailgrad der Protokollierung von Informationen auf der Konsole.

**Mögliche Werte**:

- `fatal`: Nur Nachrichten der Kategorie `fatal` werden angezeigt. Das sind Fehler, die verhindern, dass das System funktioniert.
- `error`: Nur Nachrichten der Kategorie `error` werden angezeigt. Davon gibt es nur sehr wenige.
- `warn`: Beinhaltet `error`, zusätzlich werden Nachrichten der Kategorie `warn` angezeigt.
- `info`: Beinhaltet `warn`, zusätzlich werden Nachrichten der Kategorie `info` angezeigt.
- `debug`: Beinhaltet `info`, zusätzlich werden Nachrichten der Kategorie `debug` angezeigt. Dies ist für die Fehleranalyse erforderlich.
- `trace`: Beinhaltet `debug`, zusätzlich werden Nachrichten der Kategorie `trace` angezeigt. Dies ist die detaillierteste Kategorie und kann zu sehr großen Logdaten führen. In der Regel wird das nicht benötigt!

Die Einstellung wirkt auf die [Langzeit-Logs](/de/report-a-problem#system-logs) deiner Installation.
Die Logs-Seite in der Weboberfläche zeichnet immer alle Level auf, siehe [Logs](/de/report-a-problem#logs).

**Beispiel**:

```yaml
log: error
```

---

## `levels`

Ermöglicht unterschiedliche Loglevel für verschiedene Komponenten von evcc.

Definiert den Detailgrad der Protokollierung für verschiedene evcc-Komponenten.

**Mögliche Komponenten**:

- `site`: Die zentrale evcc-Komponente (Regelung, Berechnungen usw.)
- `lp-X`: Der jeweilige Ladepunkt, wobei `X` in der Reihenfolge der Konfiguration der [`loadpoints`](/de/reference/configuration/loadpoints) (Ladepunkte) durchnummeriert ist, beginnend bei `1`
- `sma`: Die SMA-HEMS-Komponente, falls der SMA Sunny Home Manager 2.0 per [`hems`](/de/reference/configuration/hems) eingebunden ist
- _`vehicle`_: Jedes [`vehicle`](/de/reference/configuration/vehicles) (Fahrzeug), wobei der jeweilige Wert des Parameters [`type`](/de/reference/configuration/vehicles#type) (bzw. des Templates) angegeben werden muss.
- Darüber hinaus können je nach Anwendungsfall noch weitere Komponenten spezifiziert werden (z. B. `cache`, `db`, `influx`, `mqtt`)

**Mögliche Werte für jede Komponente**: Identisch mit den Werten von [`log`](#log)

**Beispiel**:

```yaml
levels:
  site: debug
  lp-1: debug
  lp-2: debug
  tesla: trace
```
