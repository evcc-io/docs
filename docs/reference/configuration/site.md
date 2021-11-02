---
sidebar_position: 2
---

# Site

Eine _Site_ beschreibt den Standort mit den vorhandenen und benötigten Geräten der Hausinstallation und ist für das Regeln der verfügbaren Leistung zuständig.

Um das Laden mit PV Überschuss zu regeln, ist ein auslesbarer Zähler direkt hinter dem Netzanschlusspunkt notwendig. Zusätzlich können auch Geräte für die PV Leistung und Hausbatterie angegeben werden.

Beispiel:

```yaml
site:
- title: Zuhause # display name for UI
  meters:
    grid: sdm630 # grid meter reference
    pv: sma # pv meter reference
```
