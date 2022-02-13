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
Im Text können verschiedene Variablen im Format `${<Variablenname>}` zur Anzeige von evcc Informationen verwendet werden.
:::note
Bei Nutzung der Variablen ist auf die korrekte Schreibweise (groß/klein) zu achten!.
:::

**Nützliche Auswahl zur Nutzung in evcc Benachrichtungen**:

| msg Variable | Beschreibung |
| --- | --- |
| `${chargedEnergy:%.1fk}` | Geladene Energiemenge in kWh |
| `${chargeDuration}` | Dauer der Ladezeit |
| `${connectedDuration}` | Dauer der Wallbox Verbindung |
| `${loadpoint}` | Nummer des [`loadpoints`](loadpoints) (Ladepunkt) 1,2... |
| `${mode}` | Aktiver Lademodus (vgl. [`mode`](loadpoints/#mode) des [`loadpoints`](loadpoints)) |
| `${pvPower:%.1fk}` | Aktuell gemessene PV Leistung in kW |
| `${title}` | Ladepunkt: Text des [`loadpoints`](loadpoints) [`title`](loadpoints/#title) Parameters |
| `${vehicleTitle}` | Fahrzeug: Text des  [`vehicles`](vehicles) [`title`](vehicles/#title) Parameters |

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

**Vollständige Liste aller von evcc bereitgestellten Variablen**:

Die von evcc bereitgestellten Variablen müssen im Format `${<Variablenname>}` im Text der Meldung definiert werden. Mehrere Variablen im Meldungstext sind möglich.    

- Site
  - Konfiguration
    - [`siteTitle`](site) - Hauptüberschrift der evcc App (*string*)
    - [`prioritySoC`](site/#prioritysoc) - Mindest-Füllstand der Powerwall in Prozent, vor [PV mode](loadpoints/#mode) Freigabe (*integer*)
  - Information
    - `batteryConfigured` - Indikator, Hausbatterie/Powerwall-Meter konfiguriert (*bool*)
    - `gridConfigured` - Indikator, Smart/Grid-Meter konfiguriert (*bool*)
    - `pvConfigured` - Indikator, Solaranlagen/Photovoltaik-Meter konfiguriert (*bool*)
- Infos zum Stromtarif
  - [`currency`](tariffs) - Tarif-Währung (*string*)
  - [`tariffFeedIn`](tariffs/#feedin) - PV-Einspeisevergütung pro kWh in der Tarif-Währung (float)
  - [`tariffGrid`](tariffs/#grid) - Netz-Abnahmepreis pro kWh in der Tarif-Währung (float)
- Meter Infos
  - `batteryPower` - Aktuelle Hausbatterie/Powerwall-Leistung in Watt (*float*)
  - `batterySoC` - Aktueller Füllstand der Hausbatterie/Powerwall in Prozent (*integer*)
  - `gridPower` - Aktuelle Netz-Einspeisung(-) oder -Abnahme(+) in Watt (*float*)
  - `homePower` - Aktuelle Haus-Abnahmeleistung (ohne Wallboxverbrauch) in Watt (*float*)
  - `pvPower` - Aktuelle Solaranlagen-Leistung in Watt (*float*)
- Ladepunkte (loadpoint)
  - Konfiguration
    - [`loadpoint`](loadpoints) - Laufende Nummer des Ladepunktes (*integer*) 
    - [`maxCurrent`](loadpoints#maxcurrent) - Maximale Lade-Stromstärke in Ampere (*float*)
    - [`minCurrent`](loadpoints#mincurrent) - Minimale Lade-Stromstärke in Ampere (*float*)
    - [`minSoC`](loadpoints#min) - Mindest-Füllstand der Fahrzeugbatterie in Prozent (*integer*)
    - [`mode`](loadpoints/#mode) - Initialer Modus des Ladepunktes nach evcc-Start (*string*)
    - [`phases`](loadpoints/#phases) - Initial aktive Anzahl Stromphasen des Ladepunktes nach evcc-Start (*integer*)
    - [`targetSoC`](loadpoints#target) - Ziel-Füllstand der Fahrzeugbatterie in Prozent (*integer*)
    - [`title`](loadpoints/#title) - Bezeichnung des Ladepunktes in der evcc App (*string*) 
  - Information
    - `activePhases`- Aktuell aktive Anzahl Stromphasen des Ladepunktes (*integer*)
    - `chargeCurrent` - Aktuelle Gesamt-Lade-Stromstärke in Ampere (*float*)
    - `chargeCurrents` - Aktuelle Lade-Stromstärke pro aktiver Stromphase in Ampere (*float*)
    - `chargeDuration` - Ladedauer in Sekunden (*integer*)
    - `chargePower` - Aktuelle Lade-Leistung in Watt (*float*)
    - `chargeRemainingDuration` - Ladezeit in Sekunden bis zum Ziel-Füllstand (*integer*)
    - `chargeRemainingEnergy` - Notwendige Energie bis zum Ziel-Füllstand in Wh (*float*)
    - `chargedEnergy` - Bisher geladene Energie in Wh (*float*)
    - `charging` - Indikator, Ladevorgang aktiv (*bool*)
    - `enabled` - Indikator, Beladung freigegeben (*bool*)
    - `hasVehicle` - Indikator, Fahrzeug-Definitionen sind dem Ladepunkt zugewiesen (*bool*)
    - `targetTime` - Zielladezeit in Sekunden seit seit 1970 UTC (*integer*)
    - `pvAction` - 
    - `pvRemaining` -  
- Fahrzeuge (vehicles)
  - Konfiguration
    - [`vehicleCapacity`](vehicles/#capacity)- Kapazität der Fahrzeugbatterie in Wh (*float*)
    - [`vehicleTitle`](vehicles/#title) - Bezeichnung des Fahrzeugs in der evcc App (*string*)
  - Information
    - `climater` - Indikator, Klimatisierung am Fahrzeug aktiviert (*bool*)
    - `connected` - Indikator, Fahrzeug am Ladepunkt angeschlossen (*bool*)
    - `connectedDuration` - Anschlußdauer des Fahrzeugs in Sekunden (*integer*)
    - `vehicleOdometer` - Aktueller Kilometerstand des Fahrzeugs in km (*float*)
    - `vehiclePresent` - Indikator, evcc auf die Fahrzeugdaten zugreifen kann (*bool*)
    - `vehicleRange` - Aktuelle Reichweite des Fahrzeugs in km (*float*)
    - `vehicleSoC` - Aktueller Füllstand der Fahrzeugbatterie in Prozent (*integer*)
- Infos zur Einsparungseffizienz 
  - `savingsAmount` - Summe der evcc-Einsparung (*float*)
  - `savingsEffectivePrice` - Kalkulierter Einsparungs-Preis (*float*)
  - `savingsGridCharged` - Geladene Netzenergie in Wh (*float*)
  - `savingsSelfConsumptionCharged` - Geladene Sonnenenergie in Wh (*float*)
  - `savingsSelfConsumptionPercent` - Anteil der geladenen Sonnenenergie in Wh (*float*)
  - `savingsSince` - Zeitperiode der Ersparnisberechnung in Sekunden (*integer*)
  - `savingsTotalCharged` - Geladene Gesamtenergie in Wh (*float*)
- Sponsor
  - Konfiguration
    - [`auth`](sponsortoken) - Authentication Token des evcc-Sponsors (*string*)
  - Information
    - `sponsor` - Name des evcc-Sponsors (*string*)

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
