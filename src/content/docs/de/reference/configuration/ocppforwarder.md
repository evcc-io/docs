---
title: "OCPP-Weiterleitung"
sidebar:
  order: 18
---

Die OCPP-Weiterleitung spiegelt die OCPP-Sitzung einer Wallbox zusätzlich zu evcc an ein übergeordnetes OCPP-Zentralsystem.

Das ist nützlich, wenn evcc die Ladung steuern soll, während ein Drittanbieter-OCPP-Backend (Flottenmanagement, Abrechnungsplattform, CPO) ebenfalls die Telemetrie der Wallbox erhält und Befehle senden kann.

Jede Wallbox verbindet sich normal mit dem eingebauten OCPP-Server.
Für jede Wallbox mit aktivierter Weiterleitung öffnet evcc eine zweite („Sidecar“-)WebSocket-Verbindung zum konfigurierten Upstream-Server und spiegelt die Sitzung:

- **Wallbox zum Upstream**: alle OCPP-Nachrichten (Statusmeldungen, Zählerwerte usw.) werden in Echtzeit weitergeleitet.
- **Upstream zur Wallbox**: Befehle des Upstream-Servers (z. B. `UnlockConnector`, `ChangeConfiguration`) werden an die Wallbox durchgereicht, und die Antwort der Wallbox wird zurückgeleitet.

evcc bleibt die primäre Steuerung und antwortet der Wallbox unabhängig vom Upstream-Server.

## Konfiguration {#configuration}

Die Weiterleitung wird pro Wallbox in der Oberfläche eingerichtet.
Öffne **Konfiguration → OCPP Server**, um die mit dem OCPP-Server verbundenen Wallboxen zu sehen.
Nutze neben jeder Wallbox die Schaltfläche **OCPP-Weiterleitung**, um die Weiterleitung für diese Wallbox zu aktivieren und einzurichten.

### Upstream-Server-URL {#upstream-url}

Die WebSocket-URL des übergeordneten OCPP-Zentralsystems.
Gib den vom Upstream-Server erwarteten Pfad-Präfix mit an.
Die Station-ID der Wallbox (oder die **Station-ID**-Überschreibung unten) wird automatisch angehängt, z. B. `wss://ocpp.example.com/ocpp/`.

### Station-ID {#station-id}

Die Wallbox-Kennung, die an den Upstream-Server gesendet wird.
Lass das Feld leer, um die eigene Station-ID der Wallbox zu verwenden.
Setze es, wenn das Upstream-System eine andere Kennung erwartet.

### Benutzername {#username}

Benutzername für HTTP-Basic-Auth am Upstream-Server.
Lass das Feld leer, wenn der Upstream-Server keine Authentifizierung benötigt.

### Passwort {#password}

Passwort für HTTP-Basic-Auth am Upstream-Server, wird zusammen mit dem **Benutzernamen** gesendet.
Der Basic-Auth-Header wird nur gesetzt, wenn ein Benutzername oder ein Passwort hinterlegt ist, bleibt also aus, solange keines von beiden gefüllt ist.

### Upstream-Befehle {#upstream-commands}

Standardmäßig kann der Upstream-Server über evcc Befehle an die Wallbox senden.
Aktiviere **Befehle vom Upstream-Server blockieren**, um die Weiterleitung schreibgeschützt zu machen: Der Upstream-Server erhält weiterhin jede Nachricht der Wallbox, kann sie aber nicht steuern, und evcc behält die alleinige Kontrolle.
Ein blockierter Befehl wird mit einem OCPP-`SecurityError` abgelehnt.

### Zertifikatsprüfung {#certificate-validation}

Bei `wss://`-Verbindungen wird das TLS-Zertifikat des Upstream-Servers standardmäßig geprüft.
Aktiviere **Selbstsignierte Zertifikate erlauben**, um diese Prüfung zu überspringen.

:::caution
Erlaube selbstsignierte Zertifikate nur in Testumgebungen.
Das deaktiviert die Zertifikatsprüfung und macht die Verbindung anfällig für Man-in-the-Middle-Angriffe.
:::

### Serverzertifikat (CA) {#server-certificate}

Ein PEM-kodiertes CA-Zertifikat zur Prüfung des TLS-Zertifikats des Upstream-Servers.
Nutze es, wenn der Upstream-Server ein Zertifikat einer privaten oder internen CA verwendet, der das System standardmäßig nicht vertraut.
