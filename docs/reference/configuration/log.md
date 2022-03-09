---
sidebar_position: 10
---

# `log, levels`

## `log`

Definiert das Niveau der Protokollierung von Informationen auf der Konsole.

**Mögliche Werte**:

- `error`: Nur Nachrichten der Kategorie `error` werden angezeigt. Das sind am wenigesten Nachrichten.
- `warn`: Beinhaltet `error`, zusätzlich Nachrichten der Kategorie `warn` angezeigt.
- `info`: Beinhaltet `warn`, zusätzlich Nachrichten der Kategorie `info` angezeigt.
- `debug`: Beinhaltet `info`, zusätzlich Nachrichten der Kategorie `debug` angezeigt. Dies ist für die Fehleranalyse erforderlich.
- `trace`: Beinhaltet `debug`, zusätzlich Nachrichten der Kategorie `trace` angezeigt. Dies ist die detaillierteste Kategorie und kann zu sehr großen Logdaten führen. In der Regel wird dies nicht benötigt!

Wenn evcc auf der Konsole ausgeführt wird, werden die `log` Nachrichten einfach in die normale Ausgabe geleitet.  
Falls evcc als Linux Systemdienst ausgeführt wird, können die Nachrichten über `sudo journalctl -fau evcc` verfolgt werden, siehe [Logfile zur Fehleranalyse](/docs/guides/faq#wie-kann-ich-ein-logfile-zur-fehleranalyse-erstellen).  
Im Falle einer Docker Installation kann man über `docker logs` die Nachrichten anzeigen lassen, siehe [Docker Dokumentation](https://docs.docker.com/config/containers/logging/).

**Beispiel**:

```yaml
log: error
```

---

## `levels`

Ermöglicht es für verschiedene Komponenten von evcc das Protokollierung unterschiedlich einzustellen.

Definiert Niveaus der Protokollierung für verschiedene evcc Komponenten

**Mögliche Komponenten**:

- `core`: Die zentrale evcc Komponente (Regelung, Berechnungen, ...)
- `lp-X`: Der jeweilige Ladepunkt, wobei `X` in der Reihenfolge der Konfiguration der [`loadpoints`](loadpoints) (Ladepunkte) durchnummeriert ist, beginnend bei `1`
- `sma`: Die SMA HEMS Komponente, falls der SMA Sunnay Home Manager 2.0 per [`hems`](hems) eingebunden ist
- _`fahrzeugname`_: Jedes definierte [`vehicle`](vehicles) (Fahrzeug), hier ist der jeweilige Wert des Parameters [`name`](vehicles#name) anzugeben

**Mögliche Werte jede Komponente**: Identisch zu den Werten von [`log`](#log)

**Beispiel**:

```yaml
levels:
  core: debug
  lp-1: debug
  lp-2: debug
```
