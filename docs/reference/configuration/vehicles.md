---
sidebar_position: 6
---

# Vehicles

Um die Ladung auf einen bestimmten Ladestand (SoC) zu begrenzen, und die meisten Wallboxen diesen nicht kennen, kann evcc direkt mit dem Fahrzeug über den Fahrzeughersteller kommunizieren.

In der Konfigurationsdatei gibt es hierzu den folgenden Bereich:

```yaml
vehicle:
  - name: ev
    type: ...
```

Die weiteren Parameter und Werte sind dann abhängig vom jeweiligen Modell. Die Seite [Geräte - Fahrzeuge](/docs/devices/vehicles) enthält weitere Informationen hierzu.
