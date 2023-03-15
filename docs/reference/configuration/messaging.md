---
sidebar_position: 12
---

# `messaging`

evcc unterstützt die Übermittlung von Status-Informationen über [Telegram](https://telegram.org), [PushOver](https://pushover.net), [ntfy](https://ntfy.sh) und viele weitere Dienste über das System [shoutrrr](https://containrrr.dev/shoutrrr/). Die Konfiguration ermöglich es eigene Nachrichten für bestimmte Ereignisse und Systeme zu definieren.

`messaging` definiert in Subelementen was und wie es verschickt wird. Unter `events` müssen die Ereignisse definiert werden, für welche Nachrichten verschickt werden sollen. Und unter `services` die Dienste über welche die Nachrichten verschickt werden sollen.

**Beispiel**:

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

`events` definiert den Nachrichteninhalt für verschiedene vordefinierte Ereignisse.

Die verfügbaren Ereignisse sind:

- `start`: Laden hat begonnen
- `stop`: Laden wurde beendet
- `connect`: Fahrzeug angeschlossen
- `disconnect`: Fahrzeug entfernt
- `soc`: Fahrzeug Akku-Ladestandsänderung
- `guest`: Unbekanntes Fahrzeug erkannt

**Beispiel**:

```yaml
start: # charge start event
  title: Charge started
  msg: Started charging in "${mode}" mode
```

### `title`

`title` definiert den Text für den Nachrichtentitel.

**Beispiel**:

```yaml
title: Charge started
```

### `msg`

`msg` definiert den Text für den Nachrichteninhalt.  
Im Text können verschiedene Variablen im Format `${<Variablenname>}` zur Anzeige von evcc Informationen verwendet werden.
:::note
Bei Nutzung der Variablen ist auf die korrekte Schreibweise (groß/klein) zu achten!
:::

**Nützliche Auswahl zur Nutzung in evcc Benachrichtungen**:

| msg Variable             | Beschreibung                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `${chargedEnergy:%.1fk}` | Geladene Energiemenge in kWh                                                           |
| `${chargeDuration}`      | Dauer der Ladezeit                                                                     |
| `${connectedDuration}`   | Dauer der Wallbox Verbindung                                                           |
| `${loadpoint}`           | Nummer des [`loadpoints`](loadpoints) (Ladepunkt) 1,2...                               |
| `${mode}`                | Aktiver Lademodus (vgl. [`mode`](loadpoints/#mode) des [`loadpoints`](loadpoints))     |
| `${pvPower:%.1fk}`       | Aktuell gemessene PV Leistung in kW                                                    |
| `${title}`               | Ladepunkt: Text des [`loadpoints`](loadpoints) [`title`](loadpoints/#title) Parameters |
| `${vehicleTitle}`        | Fahrzeug: Text des [`vehicles`](vehicles) [`title`](vehicles/#title) Parameters        |

**Beispiel**:

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
Zum Rendern der `msg`-Texte kann auch die [go-Text-Template](https://pkg.go.dev/text/template)-Syntax in Kombination mit [sprig-Funktionen](http://masterminds.github.io/sprig/) genutzt werden.

```yaml
# Message config using evcc go-text-template rendering, evcc variables and sprig-functions
messaging:
  events:
    start: # charge start event
      title: Charge of {{.vehicleTitle}} started
      msg: |
        Wallbox {{.title}} started charging {{.vehicleTitle}} in {{ toString .mode | upper }} mode.
        --------------------------
        evcc Status {{printf `(%d-%02d-%02d %02d:%02d:%02d)` now.Year now.Month now.Day now.Hour now.Minute now.Second}}
        Netz-Leistung: {{round (divf .gridPower 1000) 3 }} kW
        Solar-Leistung: {{round (divf .pvPower 1000) 3 }} kW
        Eigenverbrauch: {{round (divf .homePower 1000) 3 }} kW
        {{if .batteryConfigured}}Batteriespeicher-Status: {{round (divf .batteryPower 1000) 3 }} kW ({{.batterySoc }} %){{end}}
    stop: # charge stop event
      title: Charge of {{.vehicleTitle}} finished
      msg: |
        Wallbox {{.title}} finished charging {{.vehicleTitle}} 
        with {{round (divf .chargedEnergy 1000) 2 }} kWh in {{.chargeDuration}}.
        --------------------------
        evcc Status {{printf `(%d-%02d-%02d %02d:%02d:%02d)` now.Year now.Month now.Day now.Hour now.Minute now.Second}}
        Netz-Leistung: {{round (divf .gridPower 1000) 3 }} kW
        Solar-Leistung: {{round (divf .pvPower 1000) 3 }} kW
        Eigenverbrauch: {{round (divf .homePower 1000) 3 }} kW
        {{if .batteryConfigured}}Batteriespeicher-Status: {{round (divf .batteryPower 1000) 3 }} kW ({{.batterySoc }} %){{end}}
    connect: # vehicle connect event
      title: "{{.vehicleTitle}} connected on wallbox {{.title}}"
      msg: |
        {{.vehicleTitle}} connected on wallbox {{.title}} at {{round (divf .pvPower 1000) 2 }} kW PV.
        --------------------------
        evcc Status {{printf `(%d-%02d-%02d %02d:%02d:%02d)` now.Year now.Month now.Day now.Hour now.Minute now.Second}}
        Netz-Leistung: {{round (divf .gridPower 1000) 3 }} kW
        Solar-Leistung: {{round (divf .pvPower 1000) 3 }} kW
        Eigenverbrauch: {{round (divf .homePower 1000) 3 }} kW
        {{if .batteryConfigured}}Batteriespeicher-Status: {{round (divf .batteryPower 1000) 3 }} kW ({{.batterySoc }} %){{end}}
    disconnect: # vehicle connected event
      title: "{{.vehicleTitle}} disconnected of wallbox {{.title}}"
      msg: |
        {{.vehicleTitle}} disconnected of wallbox {{.title}} after {{.connectedDuration}}.
        --------------------------
        evcc Status {{printf `(%d-%02d-%02d %02d:%02d:%02d)` now.Year now.Month now.Day now.Hour now.Minute now.Second}}
        Netz-Leistung: {{round (divf .gridPower 1000) 3 }} kW
        Solar-Leistung: {{round (divf .pvPower 1000) 3 }} kW
        Eigenverbrauch: {{round (divf .homePower 1000) 3 }} kW
        {{if .batteryConfigured}}Batteriespeicher-Status: {{round (divf .batteryPower 1000) 3 }} kW ({{.batterySoc }} %){{end}}
```

:::

**Liste aller von evcc bereitgestellten Variablen**:

Die von evcc bereitgestellten Variablen (siehe auch /api/state) müssen als regex-Funktion `${<Variablenname>}` oder im go-Template-Format `{{<Variablenname>}}` im Text der Meldung definiert werden. Mehrere Variablen im Meldungstext sind möglich.

- Site
  - Konfiguration
    - [`siteTitle`](site) - Hauptüberschrift der evcc App (_string_)
    - [`prioritySoc`](site/#prioritysoc) - Mindest-Füllstand der Powerwall in Prozent, vor [PV mode](loadpoints/#mode) Freigabe (_integer_)
  - Information
    - `batteryConfigured` - Indikator, Hausbatterie/Powerwall-Meter konfiguriert (_bool_)
    - `gridConfigured` - Indikator, Smart/Grid-Meter konfiguriert (_bool_)
    - `pvConfigured` - Indikator, Solaranlagen/Photovoltaik-Meter konfiguriert (_bool_)
- Infos zum Stromtarif
  - [`currency`](tariffs) - Tarif-Währung (_string_)
  - [`tariffFeedIn`](tariffs/#feedin) - PV-Einspeisevergütung pro kWh in der Tarif-Währung (float)
  - [`tariffGrid`](tariffs/#grid) - Netz-Abnahmepreis pro kWh in der Tarif-Währung (float)
- Meter Infos
  - `batteryPower` - Aktuelle Hausbatterie/Powerwall-Leistung in Watt (_float_)
  - `batterySoc` - Aktueller Füllstand der Hausbatterie/Powerwall in Prozent (_integer_)
  - `gridPower` - Aktuelle Netz-Einspeisung(-) oder -Abnahme(+) in Watt (_float_)
  - `homePower` - Aktuelle Haus-Abnahmeleistung (ohne Wallboxverbrauch) in Watt (_float_)
  - `pvPower` - Aktuelle Solaranlagen-Leistung in Watt (_float_)
- Ladepunkte (loadpoint)
  - Konfiguration
    - [`loadpoint`](loadpoints) - Laufende Nummer des Ladepunktes (_integer_)
    - [`maxCurrent`](loadpoints#maxcurrent) - Maximale Lade-Stromstärke in Ampere (_float_)
    - [`minCurrent`](loadpoints#mincurrent) - Minimale Lade-Stromstärke in Ampere (_float_)
    - [`minSoc`](loadpoints#min) - Mindest-Füllstand der Fahrzeugbatterie in Prozent (_integer_)
    - [`mode`](loadpoints/#mode) - Initialer Modus des Ladepunktes nach evcc-Start `off`/`now`/`min`/`pv` (_string_)
    - [`phases`](loadpoints/#phases) - Initial aktive Anzahl Stromphasen des Ladepunktes nach evcc-Start (_integer_)
    - [`targetSoc`](loadpoints#target) - Ziel-Füllstand der Fahrzeugbatterie in Prozent (_integer_)
    - [`title`](loadpoints/#title) - Bezeichnung des Ladepunktes in der evcc App (_string_)
  - Information
    - `activePhases`- Aktuell aktive Anzahl Stromphasen des Ladepunktes (_integer_)
    - `chargeCurrent` - Aktuelle Gesamt-Lade-Stromstärke in Ampere (_float_)
    - `chargeCurrents` - Aktuelle Lade-Stromstärke pro aktiver Stromphase in Ampere (_float_)
    - `chargeDuration` - Ladedauer in Nanosekunden (_integer_)
    - `chargePower` - Aktuelle Lade-Leistung in Watt (_float_)
    - `chargeRemainingDuration` - Ladezeit in Nanosekunden bis zum Ziel-Füllstand (_integer_)
    - `chargeRemainingEnergy` - Notwendige Energie bis zum Ziel-Füllstand in Wh (_float_)
    - `chargedEnergy` - Bisher geladene Energie in Wh (_float_)
    - `charging` - Indikator, Ladevorgang aktiv (_bool_)
    - `enabled` - Indikator, Beladung freigegeben (_bool_)
    - `hasVehicle` - Indikator, Fahrzeug-Definitionen sind dem Ladepunkt zugewiesen (_bool_)
    - `targetTime` - Zielladezeit in Nanosekunden seit 1970 UTC (_integer_)
    - `pvAction` - Kontrollvariable zur PV-Timer Steuerung `enable`/`disable` (_string_)
    - `pvRemaining` - Notwendige PV-Restladezeit bei aktivierter Timer Steuerung in Nanosekunden (_integer_)
- Fahrzeuge (vehicles)
  - Konfiguration
    - [`vehicleCapacity`](vehicles/#capacity)- Kapazität der Fahrzeugbatterie in Wh (_float_)
    - [`vehicleTitle`](vehicles/#title) - Bezeichnung des Fahrzeugs in der evcc App (_string_)
  - Information
    - `climater` - Status der Fahrzeug-Klimatisierung `on`/`off`/`heating`/`cooling` (_string_)
    - `connected` - Indikator, Fahrzeug am Ladepunkt angeschlossen (_bool_)
    - `connectedDuration` - Anschlußdauer des Fahrzeugs in Nanosekunden (_integer_)
    - `vehicleOdometer` - Aktueller Kilometerstand des Fahrzeugs in km (_float_)
    - `vehiclePresent` - Indikator, evcc kann auf die Fahrzeugdaten zugreifen (_bool_)
    - `vehicleRange` - Aktuelle Reichweite des Fahrzeugs in km (_float_)
    - `vehicleSoc` - Aktueller Füllstand der Fahrzeugbatterie in Prozent (_integer_)
- Infos zur Einsparungseffizienz
  - `savingsAmount` - Summe der evcc-Einsparung (_float_)
  - `savingsEffectivePrice` - Kalkulierter Einsparungs-Preis (_float_)
  - `savingsGridCharged` - Geladene Netzenergie in Wh (_float_)
  - `savingsSelfConsumptionCharged` - Geladene Sonnenenergie in Wh (_float_)
  - `savingsSelfConsumptionPercent` - Anteil der geladenen Sonnenenergie in Wh (_float_)
  - `savingsSince` - Zeitperiode der Ersparnisberechnung in Nanosekunden (_integer_)
  - `savingsTotalCharged` - Geladene Gesamtenergie in Wh (_float_)
- Sponsor
  - Konfiguration
    - [`auth`](sponsortoken) - Authentication Token des evcc-Sponsors (_string_)
  - Information
    - `sponsor` - Name des evcc-Sponsors (_string_)

## `services`

`services` definiert eine Liste von zu verwendeten Nachrichtendiensten.

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

`type` definiert den Nachrichtendienst der verwendet werden soll.

**Mögliche Werte**:

- `pushover`: [Pushover](https://pushover.net/). Siehe [`pushover`](#pushover) Definition
- `telegram`: [Telegram Messenger](https://telegram.org/). Siehe [`telegram`](#telegram) Definition
- `email`: Email. Siehe [`email`](#email) Definition
- `shout`: [shoutrrr](https://containrrr.dev/shoutrrr). Siehe [`shout`](#shout) Definition
- `script`: Kann externe Skripte zum Versenden von Nachrichten starten. Es ist auch hilfreich, um jede Art von externer Funktionalität einzubinden. Siehe [`script`](#script) Definition

**Beispiel**:

```yaml
services:
  - type: pushover
```

---

## Unterstützte Dienste

### `pushover`

`pushover` verwendet den Dienst [Pushover](https://pushover.net/). Details siehe [Pushover API](https://https://pushover.net/api).

**Beispiel**:

```yaml
- type: pushover
  app: # API Token/Key der in Pushover angelegten Aplication
  recipients:
    -  # Liste der Empfänger: entweder User Key or Delivery Group. In Pushover angelegte Gruppen können auf bestimmte Geräte eingeschränkt werden.
  devices:
    - Johns phone
    - Mias ticker
```

### `telegram`

`telegram` verwendet den Dienst [Telegram Messenger](https://telegram.org/).

**Beispiel**:

```yaml
- type: telegram
  token: # bot id : jede laufende Instanz von evcc benötigt eine eigene bot id
  chats:
    -  # Liste von Chat oder Group IDs. Jeder Eintrag benötigt ein - Zeichen am Anfang und muss in einer eigenen Zeile sein.
    - -GroupID #Achtung Group IDs in Telegram haben ein -Zeichen
    - ChatID
```

### `email`

`email` verwendet den Dienst [shoutrrr](https://containrrr.dev/shoutrrr).

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

`shout` verwendet den Dienst [shoutrrr](https://containrrr.dev/shoutrrr) und unterstützt alle seine Dienste.

Die Konfiguration wird im folgenden Beispiel anhand von [Gotify](https://gotify.net/) gezeigt und funktioniert bei den anderen Möglichkeiten über den gleichen Weg.

**Beispiel**:

```yaml
- type: shout
  uri: gotify://gotify.example.com:443/AzyoeNS.D4iJLVa/?priority=1
```

Weitere Informationen sind in der [shoutrrr](https://containrrr.dev/shoutrrr) Dokumentation zu den [unterstützten Diensten](https://containrrr.dev/shoutrrr/v0.5/services/overview/) zu finden.

### `ntfy`

`ntfy` verwendet den Dienst [ntfy](https://ntfy.sh).

Hier wird der Parameter `uri` mit dem Wert `https://<host>/<topics>` erwartet. Die Platzhalter sind wie folgt zu ersetzen:

- `<host>`: Adresse (hostname oder IP Adresse) des ntfy Servers
- `<topics>`: Abonniertes Thema oder abonnierte Themen

Optionale Parameter sind `priority` und `tags`. Alle Parameter werden als Strings übergeben.

**Beispiel**:

```yaml
- type: ntfy
  uri: https://ntfy.sh/evcctestalerts
  priority: default
  tags: electric_plug,blue_car
```

Weitere Informationen sind in der [ntfy Dokumentation](https://docs.ntfy.sh) zu finden.

### `script`

`script` startet Shellscripte oder andere Kommandos um Nachrichten zu versenden oder beliebige Aktionen anhand der [Ereignisse](#events) zu starten.

Der Pfad zum Script muß in `cmdline` angegeben werden. Ebenso sollte ein `timeout` gesetzt werden. Der `timeout` gibt an, nach welcher Zeit das Script abgebrochen wird.

**Beispiel**:

```yaml
- type: script
  cmdline: /home/pi/sendSignalMessage.sh
  timeout: 50s
```
