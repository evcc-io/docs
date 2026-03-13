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
- `asleep`: Fahrzeug lädt nicht trotz Ladefreigabe

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
Im Text können verschiedene Variablen zur Anzeige von evcc Informationen verwendet werden.

Es gibt zwei Schreibweisen:

- **Einfach**: `${<Variablenname>}` — z. B. `${vehicleTitle}`, mit optionaler Formatierung wie `${pvPower:%.1fk}`
- **Go-Template**: `{{.variablenname}}` — ermöglicht Berechnungen, Bedingungen und [sprig-Funktionen](http://masterminds.github.io/sprig/)

:::note
Bei Nutzung der Variablen ist auf die korrekte Schreibweise (groß/klein) zu achten!
:::

#### Verfügbare Variablen {#variables}

Die verfügbaren Variablen entsprechen den Daten der evcc REST API unter `http://evcc.local:7070/api/state`.
Beim Versand einer Nachricht werden die Daten des jeweiligen Ladepunkts und die globalen Daten in einer flachen Struktur zusammengeführt.
D. h. sowohl globale Werte (z. B. `pvPower`, `grid.Power`) als auch ladepunktspezifische Werte (z. B. `mode`, `chargedEnergy`, `vehicleTitle`) sind direkt verfügbar.

Eine [Auswahl nützlicher Variablen](#variable-reference) findest du am Ende dieser Seite.

**Beispiel** (einfache Syntax):

```yaml
messaging:
  events:
    start:
      title: Laden gestartet
      msg: >-
        ${title} lädt ${vehicleTitle} im Modus ${mode}
    stop:
      title: Laden beendet
      msg: >-
        ${title}: ${vehicleTitle} geladen mit ${chargedEnergy:%.1fk}kWh in ${chargeDuration}.
        Sonnenanteil: ${sessionSolarPercentage:%.0f}%
    connect:
      title: Fahrzeug verbunden
      msg: >-
        ${vehicleTitle} verbunden an ${title} bei ${pvPower:%.1fk}kW PV
    disconnect:
      title: Fahrzeug getrennt
      msg: >-
        ${vehicleTitle} getrennt von ${title} nach ${connectedDuration}
```

:::note
Zum Rendern der `msg`-Texte kann auch die [go-Text-Template](https://pkg.go.dev/text/template)-Syntax in Kombination mit [sprig-Funktionen](http://masterminds.github.io/sprig/) genutzt werden.
Damit sind Berechnungen (z. B. Umrechnung W → kW) und Bedingungen möglich.

```yaml
messaging:
  events:
    start:
      title: "{{.vehicleTitle}}: Laden gestartet"
      msg: |
        {{.title}} lädt {{.vehicleTitle}} im Modus {{ toString .mode | upper }}.
        PV: {{round (divf .pvPower 1000) 1 }} kW
        Netz: {{round (divf .grid.Power 1000) 1 }} kW
        {{if .battery}}Batterie: {{round (divf .battery.Power 1000) 1 }} kW ({{.battery.Soc }} %){{end}}
    stop:
      title: "{{.vehicleTitle}}: Laden beendet"
      msg: |
        {{.title}}: {{round (divf .chargedEnergy 1000) 1 }} kWh in {{.chargeDuration}}.
        Sonnenanteil: {{round .sessionSolarPercentage 0 }}%
        {{- if .sessionPrice}}
        Kosten: {{round .sessionPrice 2 }} {{.currency}} ({{round .sessionPricePerKWh 2 }} {{.currency}}/kWh)
        {{- end}}
    connect:
      title: "{{.vehicleTitle}} verbunden"
      msg: |
        {{.vehicleTitle}} verbunden an {{.title}}.
        Ladestand: {{.vehicleSoc }}% ({{.vehicleRange }} km)
        PV: {{round (divf .pvPower 1000) 1 }} kW
    disconnect:
      title: "{{.vehicleTitle}} getrennt"
      msg: |
        {{.vehicleTitle}} getrennt von {{.title}} nach {{.connectedDuration}}.
```

:::

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
- `ntfy`: [ntfy](https://ntfy.sh). Siehe [`ntfy`](#ntfy) Definition
- `custom`: Ermöglicht die Nutzung von allen [Plugins](/docs/devices/plugins), die einen Schreibzugriff erlauben. Siehe [`custom`](#custom) Definition.

---

## Unterstützte Dienste

### `pushover`

`pushover` verwendet den Dienst [Pushover](https://pushover.net/). Details siehe [Pushover API](https://pushover.net/api).

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

Optionale Parameter sind `priority`, `tags` und `authtoken`. Alle Parameter werden als Strings übergeben.

**Beispiel**:

```yaml
- type: ntfy
  uri: https://ntfy.sh/evcctestalerts
  priority: default
  tags: electric_plug,blue_car
  authtoken: 61RgoYLOsi8S318j6ycU2qEsleC2p9njoyw4890121412JloH7rMPaqQwi5KWTit
```

Weitere Informationen sind in der [ntfy Dokumentation](https://docs.ntfy.sh) zu finden.

### `custom`

Der Typ `custom` ermöglicht es, beliebige [Plugins](/docs/devices/plugins) für die Verarbeitung von Nachrichten zu verwenden. Das Plugin muss den Schreibmodus unterstützen. Die Nachricht selbst wird in der Plugin Konfiguration mit dem Parameter `${send}` (bzw. als Template Parameter `{{.send}}`) bereitgestellt.

**Mögliche Werte**:

- `send`: Definiert das zu verwendende Plugin mit dem Feld `source` und plugin-spezifische Parameter. Siehe das Beispiel weiter unten.
- `encoding`: Definiert das Format, in dem der Wert für `${send}` bereitgestellt wird. Die möglichen Werte sind:
  - `json`: Der Wert wird als JSON-Objekt im Format `{ "msg": msg, "title": title }` bereitgestellt. Das Feld `title` wird nur hinzugefügt, wenn es im Abschnitt `events` definiert ist.
  - `csv`: Die Felder `title` und `msg` werden als kommaseparierte Liste bereitgestellt (`title, msg`)
  - `tsv`: Ähnlich wie `csv`, jedoch mit Tabulator als Trennzeichen.
  - `title`: Nur der Titel (`title`) wird bereitgestellt.

  Wenn `encoding` nicht definiert ist, wird die Nachricht `msg` ohne Titel direkt verwendet. Dabei wird nur die in `msg` definierte Nachricht ohne Titel in `${send}` verwendet.

**Beispiel**:

```yaml
messaging:
  events:
    connect:
      title: "Evcc: ${vehicleName} hat sich verbunden"
      msg: "${vehiclTitle} wurde verbunden (Lademodus: ${mode})."
  services:
    - type: custom
      encoding: json
      send:
        # Plugin Typ
        source: script
        # Plugin-spezifische Konfiguration.
        # {{.send}} enthält die JSON Nachricht
        cmd: /usr/local/bin/evcc_message "{{.send}}"
```

In diesem Beispiel wird ein Shell-Script (`cmd`) mit dem Argument `{"title": "...", "msg": "...."}` aufgerufen.

## Variablen-Referenz {#variable-reference}

Die folgende Liste zeigt eine Auswahl häufig genutzter Variablen.
Die vollständige Liste aller verfügbaren Felder findest du in der API-Antwort unter `http://evcc.local:7070/api/state`.

### Ladepunkt (loadpoint)

Die Ladepunkt-Daten stammen aus dem `loadpoints`-Array der API-Antwort, werden aber in der Nachricht direkt (ohne Präfix) bereitgestellt.

- `title` - Name des Ladepunkts
- `loadpoint` - Nummer des Ladepunkts 1, 2, ...
- `mode` - Lademodus: `off`/`now`/`minpv`/`pv`
- `charging` - Ladevorgang aktiv
- `enabled` - Ladefreigabe erteilt
- `connected` - Fahrzeug angeschlossen
- `chargedEnergy` - Geladene Energie der Sitzung in Wh
- `chargeDuration` - Ladedauer
- `chargePower` - Aktuelle Ladeleistung in W
- `connectedDuration` - Anschlussdauer
- `chargeRemainingDuration` - Restladezeit bis Ziel
- `chargeRemainingEnergy` - Restenergie bis Ziel in Wh
- `phasesActive` - Aktuell aktive Phasen
- `vehicleTitle` - Name des Fahrzeugs
- `vehicleName` - Technischer Name des Fahrzeugs
- `vehicleSoc` - Fahrzeug-Ladestand in %
- `vehicleRange` - Fahrzeug-Reichweite in km
- `vehicleOdometer` - Kilometerstand in km
- `sessionSolarPercentage` - Sonnenanteil der Ladesitzung in %
- `sessionPrice` - Kosten der Ladesitzung
- `sessionPricePerKWh` - Durchschnittspreis pro kWh
- `sessionCo2PerKWh` - Durchschnittliche CO₂-Emissionen pro kWh
- `planActive` - Ladeplan aktiv
- `smartCostActive` - Günstiges Laden aktiv

### Global (site)

Die globalen Daten stammen aus der obersten Ebene der API-Antwort.

- `siteTitle` - Name der evcc-Instanz
- `pvPower` - Aktuelle PV-Leistung in W
- `homePower` - Aktueller Hausverbrauch in W
- `grid.Power` - Netzbezug (+) / Einspeisung (-) in W
- `battery.Power` - Batterieleistung in W
- `battery.Soc` - Batterie-Ladestand in %
- `currency` - Tarif-Währung
- `tariffGrid` - Aktueller Netzpreis pro kWh
- `tariffFeedIn` - Einspeisevergütung pro kWh
- `tariffCo2` - Aktuelle CO₂-Intensität
- `statistics` - Ladestatistiken, verfügbar für die Zeiträume `30d`, `365d`, `thisYear` und `total`
  - `statistics.<zeitraum>.avgCo2` - Durchschnittliche CO₂-Emissionen pro kWh
  - `statistics.<zeitraum>.avgPrice` - Durchschnittspreis pro kWh
  - `statistics.<zeitraum>.chargedKWh` - Geladene Energie in kWh
  - `statistics.<zeitraum>.solarPercentage` - Sonnenanteil in %
