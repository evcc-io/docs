---
sidebar_position: 12
---

# `messaging`

evcc unterstützt die Übermittlung von Status-Informationen über [Telegram](https://telegram.org), [PushOver](https://pushover.net) und viele weitere Dienste über das System [shoutrrr](https://containrrr.dev/shoutrrr/). Die Konfiguration ermöglich es eigene Nachrichten für bestimmte Ereignisse und Systeme zu definieren.

`messging` definiert in Subelementen was und wie es verschickt wird. Unter `events` müssen die Ereignisse definiert werden, für welche Nachrichten verschickt werden sollen. Und unter `services` die Dienste über welche die Nachrichten verschickt werden sollen.

**Beispiel**:

```yaml
messaging:
  events:
    ...
  services:
    ...
```

## `events`

`events` definiert für verschiedene vordefinierte Ereignisse, den Nachrichteninhalt.

Die verfügbaren Ereignisse sind:

- `start`: Laden hat begonnen
- `stop`: Laden wurde beendet
- `connect`: Fahrzeug angeschlossen
- `disconnect`: Fahrzeug entfernt

**Beispiel**:

```yaml
    start: # charge start event
      title: Charge started
      msg: Started charging in "${mode}" mode
```

### `title`

`title` definiert den Text für den Nachrichtentitel

**Beispiel**:

```yaml
      title: Charge started
```

### `msg`

`msg` definiert den Text für den Nachrichteninhalt.

Im Text können verschiedene Variablen für evcc Informationen verwendet werden.

**Nützliche Auswahl zur Nutzung in evcc Benachrichtungen**:

| msg Variable | Beschreibung |
| --- | --- |
| `${chargedEnergy:%.1fk}` | Geladene Energiemenge in kWh |
| `${chargeDuration}` | Dauer der Ladezeit |
| `${connectedDuration}` | Dauer der Wallbox Verbindung |
| `${loadpoint}` | Nummer des [`loadpoints`](loadpoints) (Ladepunkt) 1,2... |
| `${mode}` | Aktiver Lademodus (vgl. [`mode`](loadpoints#mode) des [`loadpoints`](loadpoints)) |
| `${pvPower:%.1fk}` | Aktuell gemessene PV Leistung in kW |
| `${title}` | Ladepunkt: Text des [`loadpoints`](loadpoints) [`title`](loadpoints#title) Parameters |
| `${vehicleTitle}` | Fahrzeug: Text des  [`vehicles`](vehicles) [`title`](vehicles#title) Parameters |

**Beispiele**:

```yaml
  # Message examples using evcc variables
  # start
  msg: Wallbox ${title} started charging ${vehicleTitle} in ${mode} mode
  # stop
  msg: Wallbox ${title} finished charging ${vehicleTitle} with ${chargedEnergy:%.1fk}kWh in ${chargeDuration}
  # connect
  msg: ${vehicleTitle} connected on wallbox ${title} at ${pvPower:%.1fk}kW PV
  # disconnect
  msg: ${vehicleTitle} disconnected of wallbox ${title} after ${connectedDuration}

```
:::note
Bei Nutzung der Variablen ist auf die korrekte Schreibweise (groß/klein) zu achten!.
:::

**Vollständige Liste aller von evcc bereitgestellten Variablen**:

1. `${activePhases}`
1. `${auth}`
1. `${batteryConfigured}`
1. `${batteryPower}`
1. `${batterySoC}`
1. `${chargeCurrent}`
1. `${chargeCurrents}`
1. `${chargeDuration}`
1. `${chargePower}`
1. `${chargeRemainingDuration}`
1. `${chargeRemainingEnergy}`
1. `${chargedEnergy}`
1. `${charging}`
1. `${climater}`
1. `${connected}`
1. `${connectedDuration}`
1. `${currency}`
1. `${enabled}`
1. `${gridConfigured}`
1. `${gridPower}`
1. `${hasVehicle}`
1. `${homePower}`
1. `${loadpoint}`
1. `${maxCurrent}`
1. `${minCurrent}`
1. `${minSoC}`
1. `${mode}`
1. `${phases}`
1. `${prioritySoC}`
1. `${pvAction}`
1. `${pvConfigured}`
1. `${pvPower}`
1. `${pvRemaining}`
1. `${savingsAmount}`
1. `${savingsEffectivePrice}`
1. `${savingsGridCharged}`
1. `${savingsSelfConsumptionCharged}`
1. `${savingsSelfConsumptionPercent}`
1. `${savingsSince}`
1. `${savingsTotalCharged}`
1. `${siteTitle}`
1. `${sponsor}`
1. `${targetSoC}`
1. `${targetTime}`
1. `${tariffFeedIn}`
1. `${tariffGrid}`
1. `${title}`
1. `${vehicleCapacity}`
1. `${vehicleOdometer}`
1. `${vehiclePresent}`
1. `${vehicleRange}`
1. `${vehicleSoC}`
1. `${vehicleTitle}`

## `services`

`services` definiert eine Liste von zu verwendeten Nachrichtendienste.

**Beispiel**:

```yaml
  services:
  - type: pushover
    app: 12345
    recipients:
    - 234567
```

Im folgenden werden nun alle erforderlichen Parameter erklärt.

### `type`

`type` definiert den Nachrichtendienst der verwendet werden soll

**Mögliche Werte**:

- `pushover`: [Pushover](https://pushover.net/). Siehe [`pushover`](#pushover) Definition
- `telegram`: [Telegram Messenger](https://telegram.org/). Siehe [`telegram`](#telegram) Definition
- `email`: Email.  Siehe [`email`](#email) Definition
- `shout`: [shoutrrr](https://containrrr.dev/shoutrrr). Siehe [`shout`](#shout) Definition

**Beispiel**:

```yaml
  services:
  - type: pushover
```

---

## Unterstützte Dienste

### `pushover`

`pushover` verwendet den Dienst [Pushover](https://pushover.net/)

**Beispiel**:

```yaml
- type: pushover
  app: # app id
  recipients:
  - # list of recipient ids
```

### `telegram`

`telegram` verwendet den Dienst [Telegram Messenger](https://telegram.org/)

**Beispiel**:

```yaml
- type: telegram
  token: # bot id : jede laufende Instanz von evcc benötigt eine eigene bot id
  chats:
  - # Liste von Chat oder Group IDs. Jeder Eintrag benötigt ein - Zeichen am Anfang und muss in einer eigenen Zeile sein.
  - -GroupID #Achtung Group IDs in Telegram haben ein -Zeichen 
  - ChatID
```

### `email`

`email` verwendet den Dienst [shoutrrr](https://containrrr.dev/shoutrrr)

Hier wird der Parameter `uri` mit dem Wert `smtp://<user>:<password>@<host>:<port>/?fromAddress=<from>&toAddresses=<to>` erwartet. Die Platzhalter sind wie folgt zu ersetzen:

- `<host>`: Adresse (hostname oder IP Adresse) des Email Servers
- `<port>`: Port Adresse des Email Servers
- `<user>`: Benutzername für den Email Server
- `<password>`: Passwort des Benutzers
- `<from>`: Email Adresse des Absenders
- `<to>`: Email Adresse des Empfängers

**Beispiel**:

```yaml
- type: email
  uri: smtp://benutzername:passwort@emailserver.domäne:1234/?fromAddress=absender@mail.com&toAddresses=empfänger@mail.com
```

### `shout`

`shout` verwendet den Dienst [shoutrrr](https://containrrr.dev/shoutrrr) unter unterstütz alle seine Dienste.

Die Konfiguration wird im folgenden Beispiel anhand von [Gotify](https://gotify.net/) gezeigt und funktioniert bei den anderen Möglichkeiten über den gleichen Weg.

**Beispiel**:

```yaml
  - type: shout
    uri: gotify://gotify.example.com:443/AzyoeNS.D4iJLVa/?priority=1
```

Weitere Informationen sind in der [shoutrrr](https://containrrr.dev/shoutrrr) Dokumentation zu den [unterstützten Diensten](https://containrrr.dev/shoutrrr/v0.5/services/overview/) zu finden.
