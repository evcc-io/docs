---
title: "OCPP-Weiterleitung"
---

Manchmal sollen Ladevorgänge zusätzlich in einem externen OCPP-Backend landen, z. B. bei einer Abrechnungsplattform für die Erstattung durch den Arbeitgeber oder einem Charge Point Operator.
Eine Wallbox kann normalerweise nur mit einem OCPP-Server sprechen.
Mit der Weiterleitung bleibt die Wallbox mit deiner evcc-Instanz verbunden, die ihre Nachrichten zusätzlich an den externen Server weitergibt.
evcc steuert das Laden weiterhin.
Der externe Server erhält Ladevorgänge und Zählerwerte live und kann die Wallbox, wenn erlaubt, auch steuern.

## Einrichtung {#setup}

Die Weiterleitung gibt es für Wallboxen, die per OCPP eingebunden sind, also evcc als OCPP-Server nutzen.
Richte die Wallbox zuerst ein, danach kannst du die Weiterleitung für sie konfigurieren.

1. Öffne **Konfiguration → OCPP Server**.
2. Die Liste **Station-IDs** zeigt deine verbundenen OCPP-Wallboxen. Klicke auf die Wolken-Schaltfläche neben der Wallbox, um den Dialog **OCPP-Weiterleitung** zu öffnen.
3. Trage die **Upstream-Server-URL** ein, die Adresse des Servers, an den weitergeleitet wird, z. B. `wss://billing.example.com/ocpp`.
4. Wenn der externe Server eine Anmeldung verlangt, trage **Benutzername** und **Passwort** ein (HTTP Basic Auth). Erwartet er eine andere Wallbox-Kennung, setze die **Station-ID**.
5. Klicke auf **Speichern**. Die Weiterleitung startet sofort, ein Neustart ist nicht nötig.

Das Wolken-Symbol neben der Wallbox zeigt, ob die Weiterleitung funktioniert.
Verbindungsprobleme werden im Dialog angezeigt.

Um die Weiterleitung zu beenden, öffne den Dialog erneut und klicke auf **Entfernen**.

## Upstream-Befehle {#upstream-commands}

Standardmäßig kann der externe Server Befehle an die Wallbox senden.
Um Konflikte mit der Ladesteuerung zu vermeiden, aktiviere **Befehle vom Upstream-Server blockieren** in den erweiterten Einstellungen.
Der Server erhält weiterhin jede Nachricht der Wallbox, evcc behält aber die alleinige Kontrolle.

## Zertifikate {#certificates}

In den erweiterten Einstellungen finden sich auch die TLS-Optionen.
Aktiviere **Selbstsignierte Zertifikate erlauben** für Testumgebungen ohne gültiges Zertifikat.
Hinterlege ein **Serverzertifikat (CA)**, wenn der externe Server ein Zertifikat einer privaten Zertifizierungsstelle verwendet.
