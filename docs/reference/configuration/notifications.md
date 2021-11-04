---
sidebar_position: 9
---

# Notifications

evcc unterstützt die Übermittlung von Status-Informationen über [Telegram](https://telegram.org), [PushOver](https://pushover.net) und viele weitere Dienste über das System [shoutrrr](https://containrrr.dev/shoutrrr/). Die Konfiguration ermöglich es eigene Nachrichten für bestimmte Ereignisse und Systeme zu definieren:

```yaml
messaging:
  events:
    [...]
  services:
    [...]
```

### Ereignisse

Die verfügbaren Ereignisse sind:

- **`start`**: Laden hat begonnen
- **`stop`**: Laden wurde beendet
- **`connect`**: Fahrzeug angeschlossen
- **`disconnect`**: Fahrzeug entfernt

Die Konfiguration erfolgt nach dem folgenden Schema am Beispiel des Ereignisses `start`:

```yaml
    start: # charge start event
      title: Charge started
      msg: Started charging in "${mode}" mode
```

### Dienste

Die folgenden Benachrichtigungsdienste können eingestellt werden:

- **`pushover`**: [Pushover](https://pushover.net/)
- **`telegram`**: [Telegram Messenger](https://telegram.org/)
- **`email`**: Email (über die [shoutrrr](https://containrrr.dev/shoutrrr) Service URL: `smtp://username:password@host:port/?fromAddress=fromAddress&toAddresses=recipient1[,recipient2,...]`)
- **`shout`**: Jeder weitere Dienst der von [shoutrrr](https://containrrr.dev/shoutrrr) unterstützt wird (Beispiel siehe unten)

Konfigurationsbeispiele sind in der Datei `evcc.dist.yaml` aufgeführt.

Jeder [shoutrrr](https://containrrr.dev/shoutrrr) Dienst ist nach dem folgenden [Gotify](https://gotify.net/) Serverbeispiel zu konfigurieren:

```yaml
  - type: shout
    uri: gotify://gotify.example.com:443/AzyoeNS.D4iJLVa/?priority=1
```

Weitere Informationen sind in der [shoutrrr](https://containrrr.dev/shoutrrr) Dokumentation zu den [unterstützten Diensten](https://containrrr.dev/shoutrrr/v0.5/services/overview/) zu finden.
