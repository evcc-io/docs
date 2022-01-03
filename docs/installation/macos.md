---
sidebar_position: 3
---

# macOS

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

- Prüfe die Installation und öffne einen Browser und gibt die folgende URL ein: `http://localhost:7070`. Die evcc Oberfläche sollte im Demo Modus zu sehen sein.
- Starte die Konfiguration und folge den Anweisungen im Terminal Fenster:

  ```sh
  evcc configure
  ```

  Sofern alle Geräte korrekt konfiguriert sind, kannst du mit den nächsten Schritten fortfahren.

  :::note
  Fortgeschrittene Anwender (z.B. mit EVCC Erfahrung oder technischem Know-How) können auch alternativ folgenden Aufruf verwenden:
  
  ```sh
  evcc configure --advanced
  ```

  Dieser Modus bietet weitere (technisch fortgeschrittene) Einstellmöglichkeiten.
  :::
- Verschiebe die erstellte Konfigurationsdatei in den Zielordner:

  ```sh
  sudo mv evcc.yaml /etc
  ```

- Start evcc neu:

  ```sh
  brew services restart evcc
  ```

- Gehe zurück zum Browser und lade die evcc Seite neu. Die Oberfläche sollte nun mit deinen konfigurierten Geräten zu sehen sein.

## Aktualisierung

Um auf eine neue Version von evcc zu aktualisieren, führe folgende Schritte durch:

- Öffne ein Terminal Fenster
- Aktualisiere den Paketbestand:

  ```sh
  brew update
  ```

- Installiere evcc:

  ```sh
  brew install evcc
  ```
