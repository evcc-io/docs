---
sidebar_position: 8
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

- Öffne die evcc Oberfläche in deinem Browser: [http://localhost:7070](http://localhost:7070)
- Die evcc Oberfläche fordert dich auf ein Administrator-Passwort zu vergeben
- Anschließend kannst du deine Geräte direkt über die Weboberfläche einrichten

## Konfiguration

:::tip Empfohlen
Richte evcc direkt im Browser ein.
:::

Nach dem ersten Start kannst du evcc unter [http://localhost:7070](http://localhost:7070) konfigurieren.
Die Einstellungen werden automatisch in der Datenbank gespeichert.

Alternativ kannst du eine `evcc.yaml` Konfigurationsdatei unter `/etc/evcc.yaml` ablegen.
Details findest du unter [Einrichtung](./configuration).

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

Nach dem ersten Start öffne [http://localhost:7070](http://localhost:7070) im Browser und richte evcc über die Weboberfläche ein.

Alternativ kannst du eine `evcc.yaml` Konfigurationsdatei erstellen (siehe [Einrichtung](./configuration)) und evcc damit starten:

```sh
./evcc -c evcc.yaml
```

### Aktualisierung/Downgrade

Führe die obigen Schritte aus und ersetze die evcc Programmdatei mit der neuen bzw. vorherigen Version.
Die Konfiguration muss nicht erneut durchgeführt werden.
