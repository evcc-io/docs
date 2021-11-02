---
sidebar_position: 5
---

# Meters

Damit evcc den PV-Überschuss regeln kann, ist in der Konfiguration ein `grid`-Zähler erforderlich.
Zusätzlich können noch die Messstellen für Wechselrichter (`pv`) und Hausspeicher (`battery`) hinterlegt werden.

In der Konfigurationsdatei gibt es hierzu den folgenden Bereich:

```yaml
meters:
  - name: grid
    type: ...
  - name: pv
    type: ...
  - name: battery
    type: ...
```

Die weiteren Parameter und Werte sind dann abhängig vom jeweiligen Modell. Die Seite [Geräte - Hausinstallation](devices/meters) enthält weitere Informationen hierzu.
