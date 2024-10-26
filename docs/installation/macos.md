---
sidebar_position: 3
---

# macOS

:::note
Es wird mindestens macOS Version 10.12 (Sierra) benötigt, ältere Versionen von macOS werden nicht unterstützt.
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

- Prüfe die Installation und öffne einen Browser und gib die folgende URL ein: `http://localhost:7070`. Die evcc Oberfläche sollte im Demo Modus zu sehen sein.
- Stoppe den evcc-Server:

  ```sh
  brew services stop evcc
  ```

## Konfiguration

Es wird eine funktionierende evcc Konfiguration benötigt.

Folge nun der [Anleitung](./configuration#konfiguration-mit-assistenten) zur Erstellung einer Konfiguration mit dem Konfigurationsassistenten.


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
