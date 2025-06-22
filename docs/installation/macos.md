---
sidebar_position: 3
---

# macOS

Diese Anleitung beschreibt die Installation für macOS (10.12 und höher) mit dem [Homebrew](https://brew.sh) Paketmanager.

:::note
Wenn du evcc ohne Paketmanager installieren willst oder eine nightly Version testen möchtest schau dir den Abschnitt [Manuelle Installation](#manual) an.
:::

## Erstinstallation

- Öffne ein Terminal Fenster
- Installiere [Homebrew](https://brew.sh), falls es noch nicht installiert ist
- Füge das evcc tap hinzu:

  ```sh
  brew tap evcc-io/tap
  ```

- Aktualisiere den Paketbestand:

  ```sh
  brew update
  ```

- Installiere evcc:

  ```sh
  brew install evcc
  ```

- Starte den evcc-Server:

  ```sh
  brew services start evcc
  ```

- Prüfe die Installation und öffne einen Browser und gib die folgende URL ein: [http://localhost:7070](http://localhost:7070). Die evcc Oberfläche fordert dich auf ein Password zu vergeben und die Einrichtung zu starten..
- Stoppe den evcc-Server:

  ```sh
  brew services stop evcc
  ```

## Konfiguration

Für den Betrieb musst du eine funktionierende `evcc.yaml` Konfigurationsdatei erstellen.
Neben allgemeinen Einstellungen beinhaltet die Konfiguration die Definition der einzelnen Komponenten (Zähler, Wallbox, Fahrzeug, ...).

### Erstellen

Wir empfehlen die Verwendung des Konfigurationsassistenten:

- Starte den Konfigurationsassistenten und beantworte die Fragen:

  ```sh
  sudo evcc configure
  ```

- Kopiere die erstellte Konfigurationsdatei nach `/etc/evcc.yaml`:

  ```sh
  sudo mv evcc.yaml /etc
  ```

- Starte den evcc-Server:

  ```sh
  brew services start evcc
  ```

- Rufe die evcc Oberfläche auf [http://localhost:7070](http://localhost:7070)

### Anpassen

Benötigt deine Konfiguration noch Anpassungen kannst du entweder den Konfigurationsassistenten erneut ausführen (siehe oben) oder die Konfigurationsdatei manuell anpassen.

- Konfigurationsdatei bearbeiten:

  ```sh
  sudo nano /etc/evcc.yaml
  ```

- Starte den evcc-Server neu:

  ```sh
  brew services restart evcc
  ```

Unter [Konfiguration](./configuration) findest du weitere Informationen und Beispiele zur Konfiguration von evcc.

## Konfiguration

Es wird eine funktionierende evcc Konfiguration benötigt.

Folge nun der [Anleitung](./configuration) zur Erstellung einer Konfiguration mit dem Konfigurationsassistenten.

## Aktualisierung

Um auf eine neue Version von evcc zu aktualisieren, führe folgende Schritte durch:

- Öffne ein Terminal Fenster
- Aktualisiere den Paketbestand:

  ```sh
  brew update
  ```

- Installiere evcc:

  ```sh
  brew upgrade evcc
  ```

## Weitere Befehle

- Prüfe den Status des evcc-Servers:

  ```sh
  brew services info evcc
  ```

- Logs anzeigen:

  ```sh
  tail -f /opt/homebrew/var/log/evcc.log
  ```

## Manuelle Installation {#manual}

Hier findest du die Anleitung für die manuelle Installation von evcc auf macOS.

### Installation

- Lade die entsprechende Datei auf dein System herunter:
  - 64-Bit ARM oder Intel CPU: [evcc_X.XX_macOS_all.tar.gz](https://github.com/evcc-io/evcc/releases/latest)
- Entpacke die heruntergeladene Datei (z. B. per Doppelklick auf die Datei)
- Es gibt nun einen neuen Ordner mit dem Programm `evcc`.
- Öffne ein Terminal und gehe in den Ordner mit dem Programm `evcc`
- Starte evcc mit folgendem Befehl:
  ```sh
  ./evcc -v
  ```
- Du solltest die aktuelle Version von evcc sehen (bspw. `evcc version 0.xxx.y`).

### Konfiguration

Erstelle dir nach der Anleitung unter [Konfiguration](./configuration) eine funktionierende `evcc.yaml` Konfigurationsdatei.
Diese kannst du mit folgendem Befehl starten:

```sh
./evcc -c evcc.yaml
```

### Aktualisierung/Downgrade

Führe die obigen Schritte aus und ersetze die evcc Programmdatei mit der neuen bzw. vorherigen Version.
Die Konfiguration muss nicht erneut durchgeführt werden.
