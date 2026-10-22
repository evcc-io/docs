---
title: "OCPP-Weiterleitung"
description: "Zeigt, wie du die OCPP-Nachrichten einer Wallbox von evcc an ein externes Backend wie eine Abrechnungsplattform und an lesende Kopien fürs Reporting weiterleitest."
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

## Lesende Upstreams {#read-only-upstreams}

Manche Stellen müssen nur sehen, was eine Wallbox tut, z. B. eine Registrierstelle für erneuerbare Energien oder ein Monitoring-Dienst.
Für sie kannst du im selben Dialog unter dem Haupt-Upstream **lesende Upstreams** hinzufügen.

Ein lesender Upstream erhält eine Kopie jeder Nachricht der Wallbox.
Er antwortet der Wallbox nie und kann keine Befehle senden, er kann also weder autorisieren, abrechnen noch steuern.
Der Haupt-Upstream bleibt die Stelle, die über Autorisierung und Abrechnung entscheidet, auch wenn du seine Befehle blockierst.

1. Öffne den Dialog **OCPP-Weiterleitung** der Wallbox wie oben beschrieben. Der Haupt-Upstream muss dafür bereits eingerichtet sein.
2. Klicke auf **Lesenden Upstream hinzufügen**.
3. Trage die **Upstream-Server-URL** ein. Ergänze **Benutzername** und **Passwort** oder eine andere **Station-ID**, wenn der Server sie verlangt.
4. Klicke auf **Speichern**. Die Verbindung startet sofort, ein Neustart ist nicht nötig.

Jeder lesende Upstream zeigt seinen eigenen Status, **Verbunden** oder **Nicht verbunden**, und seine Verbindungsprobleme.
Mit **Entfernen** löschst du einen einzelnen.
In den erweiterten Einstellungen gibt es dieselben TLS-Optionen wie beim Haupt-Upstream.

Nach einer Wiederverbindung erhält ein lesender Upstream zuerst die Startmeldung und den letzten Status der Wallbox, danach die Nachrichten, die er in der Zwischenzeit verpasst hat.
Der Puffer fasst 1000 Nachrichten, bei einem langen Ausfall können ältere also verloren gehen.
Ein neuerer Status kann deshalb vor älteren Start- und Stopp-Nachrichten ankommen.
Für Reporting ist das unkritisch, eine Zustellgarantie ist ein lesender Upstream aber nicht.

Einmal pro Stunde schreibt evcc ins Log, wie viele Nachrichten und Messwerte an jeden lesenden Upstream gingen und wie viel Energie diese abdeckten.
Vergleiche diese Zahlen mit denen der Gegenseite.

:::caution
Zwei Verbindungen mit derselben Station-ID zum selben Server verdrängen sich gegenseitig.
Ein lesender Upstream, der dieselbe Station am selben Server wie der Haupt-Upstream oder ein anderer lesender Upstream erreichen würde, wird beim Speichern abgelehnt.
Leitet ein Backend das Empfangene unter derselben Station-ID an deinen Haupt-Upstream weiter, kann es die Hauptverbindung verdrängen.
Bitte den Betreiber, das abzuschalten.
:::
