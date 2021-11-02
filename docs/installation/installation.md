---
sidebar_position: 1
---

# Installation

EVCC benötigt eine Konfigurationsdatei, welche beim Start von EVCC bereits vorhanden sein muss. In dieser Konfigurationsdatei sind alle Informationen enthalten, damit EVCC auf die entsprechenden Geräte zugreifen kann und das Laden eines Fahrzeugs steuern kann.

Zur Durchführung dieser initialen Einrichtung empfehlen wir daher:

- Einen Computer mit Windows oder MacOS
- Einen Text Editor welche die Synthax von YAML versteht und auf Fehler hinweisen kann, z.B. [VS Code](https://code.visualstudio.com) mit der [YAML Erweiterung](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
- Auf diesem Computer wird die Konfiguration soweit wir möglich erstellt, bevor die Installation für den laufenden Betrieb (auf einem anderen Computer) fertiggestellt wird.

### EVCC herunterladen

1. Lade die aktuelle Version von EVCC passend für deinen Computer und Betriebssystem herunter: [EVCC Downloadseite](https://github.com/evcc-io/evcc/releases)
2. Kopiere die Datei `evcc.dist.yaml` nach `evcc.yaml`
3. Öffne `evcc.yaml` im gewählten Text Editor
4. Bearbeite den Bereich `meters:`:

    - Ersetze den Beispielinhalt mit konkreten Geräten und deren Einstellungen. Eine Auflistung der möglichen Geräte gibt es hier: [Geräte - Hausinstallation](/docs/devices/meters)
    - Gib einen Wert für `name` an, welche später für eine Referenzierung benötigt wird
    - Prüfe ob die Konfiguration funktioniert wie es auf der Seite der Geräteauflistung beschrieben ist

5. Bearbeite den Bereich `charger:` analog zu `meters:`. Eine Auflistung der möglichen Geräte gibt es hier: [Geräte - Wallboxen](/docs/devices/chargers)
6. Bearbeite den Bereich `vehicles:` ebenfalls auf die gleiche Weise. Eine Auflistung der möglichen Geräte gibt es hier: [Geräte - Fahrzeuge](/docs/devices/vehicles)
7. Bearbeite den Bereich `site:` und trage die entsprechenden Werte von `name` der einzelnen `meter` ein
8. Bearbeite den Bereich `loadpoints:` und trage den entsprechenden Wert von `name` der Wallbox ein
9. Falls notwendig, passe die weitere Konfiguration an, wie z.B. MQTT, Pushnachrichten, Datenbankverbindung und mehr
10. Starte EVCC und öffne auf dem Rechner dann die Webseite `http://localhost:7070`.
