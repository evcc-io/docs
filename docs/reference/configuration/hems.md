---
sidebar_position: 7
---

# HEMS

EVCC kann sich mit weiteren Home Energy Management Systemen (HEMS) verbinden. Momentan wird der SMA Home Manager 2.0 (SHM) unterstützt.

### SMA Home Manager 2.0

Die folgende Konfiguration schaltet dies ein:

```yaml
hems:
  type: sma
  allowcontrol: false # set true to allow SHM controlling charger in PV modes
```

Die Ladepunkte (loadpoints) können hiermit dem SHM hinzugefügt werden und somit z.B. für dessen Hausbatterieladung berücksichtigt werden.

Wenn `allowcontrol: true` verwendet wird, kann das Verhältnis von Netzstrom zu PV Leistung für den Modus **Min+PV** im Sunny Portal über den Slider "Optional energy demand" eingestellt werden. Falls die notwendige PV Leistung nicht verfügbar ist, wird das Laden wie im Modus **PV** unterbrochen. Den Slider also ganz nach links zu schieben, bewirkt dass der Modus **Min+PV** wie beschrieben funktioniert. Wenn der Slider ganz nach rechts geschoben wird, verhällt sich der Modus **Min+PV** wie der **PV** Modus.
