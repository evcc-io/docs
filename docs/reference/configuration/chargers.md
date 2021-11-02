---
sidebar_position: 4
---

# Chargers

Zur Steuerung der Ladung muss evcc mit einer Wallbox kommunizieren können.

In der Konfigurationsdatei gibt es hierzu den folgenden Bereich:

```yaml
charger:
  - name: wallbox # reference name
    type: ...
```

Der Wert `wallbox` beim Schlüsselwort `name` im obigen Beispiel, wird beim `loadpoint` (Ladepunkt) angegebenen Parameter `charger` (Wallbox) zur Referenzierung verwendet.

Die weiteren Parameter und Werte sind dann abhängig vom jeweiligen Modell. Die Seite [Geräte - Wallboxen](/docs/devices/chargers) enthält weitere Informationen hierzu.
