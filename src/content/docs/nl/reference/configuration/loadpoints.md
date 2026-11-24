---
title: "loadpoints"
description: "Richt laadpunten in via evcc.yaml: koppel een lader, meter en voertuig, kies de standaardmodus en stem het opvragen van voertuiggegevens, de drempels en de fasen af."
sidebar:
  order: 3
translatedFrom: "05c846a87f23"
---

`loadpoints` (laadpunten) is een lijst met laadpunten. Elk laadpunt combineert een lader, voertuigen en zo nodig een meter met optionele parameters. Een minimale configuratie vereist een lader.

**Voorbeeld**:

```yaml
loadpoints:
  - title: Garage # weergavenaam in de UI
    charger: charger # verwijzing naar de lader
    vehicle: audi # verwijzing naar het standaardvoertuig
    mode: smart # laadmodus (off, smart, now)
```

Verwijzingen komen altijd overeen met de waarden van de parameter `name` (bijv. `charger`) in de betreffende apparaatconfiguratie.

Hieronder worden alle mogelijke parameters toegelicht.

---

## Verplichte parameters

### `title`

Een omschrijving van het laadpunt, weergegeven in de gebruikersinterface (UI).

**Voorbeeld**:

```yaml
title: Garage
```

---

### `charger`

Verwijzing naar een `charger`-configuratie.

**Voorbeeld**:

```yaml
charger: charger
```

Hierbij komt de waarde `charger` overeen met de waarde van de parameter `name` in de [laderdefinitie](/nl/reference/configuration/chargers#name).

---

## Optionele parameters

### `meter`

Verwijzing naar een `meter`-configuratie.

Deze vermelding is alleen nodig als de gebruikte lader zelf geen stroom meet of als evcc de meetwaarden niet uit de lader kan uitlezen. Ook in dat geval is deze vermelding optioneel, omdat evcc ervan uitgaat dat de ingestelde maximale stroom ook voor het laden wordt gebruikt.

**Voorbeeld**:

```yaml
meter: charge
```

Hierbij komt de waarde `charge` overeen met de waarde van de parameter `name` in de [meterdefinitie](/nl/reference/configuration/meters#name).

---

### `vehicle`

`vehicle`: Verwijzing naar een `vehicle`-configuratie die als standaardvoertuig aan het laadpunt wordt toegewezen.

Wordt er een voertuig op de lader aangesloten, dan gaat evcc ervan uit dat het om dit standaardvoertuig gaat. De automatische voertuigherkenning wordt overgeslagen. Is er een ander voertuig aangesloten (bijv. een gastvoertuig), dan kan dit later handmatig worden toegewezen.

**Voorbeeld**:

```yaml
vehicle: renault
```

Hierbij komt de waarde `renault` overeen met de waarde van de parameter `name` in de [voertuigdefinitie](/nl/reference/configuration/vehicles#name).

---

### `mode`

evcc onthoudt de laatst gebruikte laadmodus.
Met de parameter `mode` legt u vast welke laadmodus moet worden gebruikt nadat het voertuig is losgekoppeld.

**Mogelijke waarden**:

- `off`: Het laden wordt gestopt, ook als er een voertuig op de lader is aangesloten.
- `smart`: Laden met zonneoverschot, in de goedkope uren van een dynamisch tarief en volgens laadplannen. Pauzeren als er geen goedkope energie beschikbaar is.
- `now`: Direct laden met het maximaal mogelijke vermogen.

**Standaardwaarde:** `smart`

De verouderde waarden `pv` en `minpv` worden bij het instellen nog geaccepteerd:
`pv` activeert `smart` en schakelt [Altijd laden](/nl/features/modes#always-charge) uit, `minpv` activeert `smart` en schakelt Altijd laden in.

:::caution[Ingrijpende wijziging]
Bij het uitlezen van de status en de API (`/api/state`, websocket, MQTT) wordt `smart` gemeld in plaats van `pv`; `minpv` komt bij het uitlezen niet meer voor.
Externe automatiseringen die bij het uitlezen met `pv` of `minpv` vergelijken, moeten worden aangepast.
Integraties kunnen het nieuwe modusschema herkennen aan de aanwezigheid van `loadpoints[].alwaysCharge` in `/api/state`.
:::

:::note
Over het algemeen heeft een elektrische auto minimaal 1,4 kW vermogen per fase nodig om te laden. Bij laders en voertuigen die via de norm ISO 15118 communiceren, is in totaal minstens 1,4 kW vermogen nodig, ongeacht het aantal fasen waarmee wordt geladen.
:::

**Voorbeeld**:

```yaml
mode: smart
```

---

### `soc`

Legt de standaardinstellingen vast voor de omgang met het laadniveau van een aangesloten voertuig.

**Voorbeeld**:

```yaml
soc:
  poll:
    mode: charging
    interval: 60m
  estimate: true
```

#### `poll`

Legt vast hoe de voertuig-API’s worden gebruikt om actuele informatie over het voertuig op te halen.

Als bij de lader de `features`-vlag `integrateddevice` is geconfigureerd, worden de gegevens continu opgehaald.
In dat geval zijn geen `poll`-instellingen nodig en worden ingestelde waarden genegeerd.

:::caution
Het wijzigen van de standaardinstellingen wordt **niet** aanbevolen, omdat dit de voertuigbatterij kan leegtrekken of de voertuigfabrikant het aansturen van het laden via evcc actief kan blokkeren. **Gebruik op eigen risico**.
:::

#### `poll.mode`

Legt vast onder welke voorwaarden de voertuiggegevens worden opgehaald.

**Mogelijke waarden**:

- `charging`: Gegevens **alleen** tijdens een laadsessie bijwerken (aanbevolen standaard).
- `connected`: Gegevens bijwerken als het voertuig op de lader is aangesloten (niet alleen tijdens het laden); de parameter `interval` bepaalt de frequentie.
- `always`: Gegevens altijd bijwerken, ook als het voertuig niet op de lader is aangesloten; de parameter [`interval`](#pollinterval) bepaalt de frequentie (alleen ondersteund voor één voertuig per laadpunt).

**Standaardwaarde:** `charging`

**Voorbeeld**:

```yaml
mode: charging
```

#### `poll.interval`

Legt vast hoe vaak het voertuig om gegevens wordt gevraagd als het **niet** laadt.

**Standaardwaarde:** `60m`

**Voorbeeld**:

```yaml
interval: 60m
```

#### `estimate`

Schat het actuele laadniveau op basis van de gemeten laadenergie (extrapolatie) tussen de opvragingen van voertuiggegevens die met `interval` zijn ingesteld.

**Mogelijke waarden**:

- `true`: evcc extrapoleert het laadniveau tussen de opvragingen van voertuiggegevens (aanbevolen).
- `false`: evcc gebruikt alleen het laadniveau dat het voertuig doorgeeft.

**Standaardwaarde:** `true`

**Voorbeeld**:

```yaml
estimate: false # geen extrapolatie
```

---

### `enable`

Legt het gedrag vast bij het starten van het laden met zonneoverschot in de modus **Slim**. Daarnaast bepaalt deze parameter het gedrag bij automatische faseomschakeling van 1P naar 3P.

:::note
Wilt u een deel netstroom toestaan, gebruik dan in plaats daarvan de schuifregelaar **Aandeel zonne-energie** in de instellingen van het laadpunt (zie [Te weinig overschot?](/nl/features/solar-charging#not-enough-surplus)).
De schuifregelaar is uitgeschakeld zolang er een drempel voor `enable` of `disable` is ingesteld.
:::

**Voorbeeld**:

```yaml
enable:
  threshold: 0
  delay: 1m
```

#### `threshold`

Legt de vermogensdrempel op het netaansluitpunt vast in watt (W).

**Mogelijke waarden**: Een positieve waarde voor netafname, een negatieve waarde voor teruglevering. Bij `0` moet de teruglevering het minimale laadvermogen bereiken.

**Standaardwaarde:** `0`

**Voorbeeld**:

```yaml
threshold: 0
```

:::note
Als voor de evcc-locatie met de parameter `residualPower` een restvermogen is vastgelegd voor het gewenste werkpunt van de overschotregeling, moet met deze waarde rekening worden gehouden bij het instellen van `threshold`.

Is `residualPower` bijvoorbeeld ingesteld op 200 (de regeling van evcc stelt het gewenste werkpunt in op 200 W teruglevering), dan betekent een `threshold` van 100 voor `enable` niet dat het laden bij 100 W netafname start. In plaats daarvan wordt het resterende terugleververmogen met 100 W verlaagd, zodat het laden bij 100 W teruglevering start.

Om het laden in dit geval bij 100 W netafname te laten starten, zet u `threshold` op 300.
:::

#### `delay`

Legt vast hoe lang aan de `threshold` moet worden voldaan.

**Standaardwaarde:** `1m`

**Voorbeeld**:

```yaml
delay: 1m
```

---

### `disable`

Legt het gedrag vast bij het stoppen van het laden met zonneoverschot in de modus **Slim**. Daarnaast bepaalt deze parameter het gedrag bij automatische faseomschakeling van 3P naar 1P.

**Voorbeeld**:

```yaml
disable:
  threshold: 200 # maximaal netafnamevermogen (W)
  delay: 10m
```

#### `threshold`

Legt de vermogensdrempel op het netaansluitpunt vast in watt (W).

**Mogelijke waarden**: Een positieve waarde voor netafname. Bij `0` stopt het laden zodra het overschot het minimale laadvermogen niet meer dekt.

**Standaardwaarde:** `0`

**Voorbeeld**:

```yaml
threshold: 200 # maximaal 200 W netafname toegestaan
```

:::note
Als voor de evcc-locatie met de parameter `residualPower` een restvermogen is vastgelegd voor het gewenste werkpunt van de overschotregeling, moet met deze waarde rekening worden gehouden bij het instellen van `threshold`. Zie het voorbeeld bij de informatie over `threshold` onder [`enable`](#enable).
:::

:::caution
Negatieve waarden hebben geen effect: zolang er overschot beschikbaar is, blijft evcc laden en controleert het de drempel nooit.
:::

#### `delay`

Legt vast hoe lang aan de `threshold` moet worden voldaan.

**Standaardwaarde:** `3m`

**Voorbeeld**:

```yaml
delay: 10m
```

---

### `phases`

:::note[Verouderd in YAML]
Deze waarde kan nu in het instellingenvenster van het laadpunt worden ingesteld.
:::

**Lader zonder automatische faseomschakeling**:

Legt het aantal fasen vast waarmee de lader is aangesloten.

Deze parameter verandert niets aan de fysieke aansluiting van de lader, maar wordt gebruikt om het minimale startvermogen voor laden met zonneoverschot te bepalen (in combinatie met `minCurrent`).

Sinds kort worden de binnenkomende spanningen gebruikt als de meter van de lader ze levert. Op basis van de spanningen wordt de waarde `phases` automatisch via de API aangepast. Als de lader met een schakelaar op 1P of 3P wordt gezet, is handmatig aanpassen van de waarde `phases` niet meer nodig.

Als laden met 1P/3P niet via een schakelaar maar via de bijbehorende laadkabel gebeurt, veroorzaakt dit “automatische” gedrag problemen. In dat geval moet de waarde `phases` in `vehicle` overeenkomstig worden aangepast. Omdat deze waarde niet via de API kan worden gewijzigd, kunt u het als volgt oplossen:

Configureer het voertuig twee keer: één keer met `phases: 1` en één keer met `phases: 3`. Kies afhankelijk van de gewenste laadmodus het passende voertuig in de UI.

Is een bekend voertuig aangesloten, dan wordt voor de berekening de laagste waarde van `vehicle: phases` en `loadpoint: phases` gebruikt. Bij onbekende voertuigen wordt alleen `loadpoint: phases` meegenomen.

Terwijl het voertuig laadt en de lader of de laadmeter fasestromen levert, wordt het werkelijke aantal fasen herkend en (zolang het voertuig aangesloten blijft) gebruikt voor verdere berekeningen van de werkelijke schakeldrempels. Dit werkt alleen bij driefasige laadpunten.

**Standaardwaarde:** `3`

**Mogelijke waarden:** `1|3`

**Voorbeeld**:

```yaml
phases: 1
```

**Lader met automatische faseomschakeling**:

De waarde bepaalt of de automatische faseomschakeling in- of uitgeschakeld is.

`phases: 0` = automatische omschakeling ingeschakeld

`phases: 1 or 3` = automatische omschakeling uitgeschakeld en de ingestelde waarde staat vast

**Standaardwaarde:** `3`

**Mogelijke waarden:** `0|1|3`

**Voorbeeld**:

```yaml
phases: 0
```

:::note
Als aan het laadpunt geen lader maar een van de ondersteunde schakelbare stopcontacten (AVM FritzDECT, Shelly, Tasmota, TP-Link enz.) is toegewezen, moet `phases` op **1** worden gezet om het laden goed te kunnen aansturen.
:::

---

### `priority`

Tijdens het laden bepaalt deze parameter de prioriteit van laadpunten ten opzichte van elkaar.

Het laadpunt met prioriteit krijgt het laadvermogen van andere laadpunten zonder of met lagere prioriteit. Als een laadpunt met prioriteit dit vermogen opeist, kan dat kortstondig tot netafname leiden totdat de regeling zich heeft gestabiliseerd.

Hogere waarden betekenen een hogere prioriteit. Laadpunten zonder vermelding hebben `priority: 0`.

Bij meerdere laadpunten heeft deze parameter geen invloed op de volgorde waarin de laadsessies worden gestart. Laadt er echter een laadpunt met lagere prioriteit, dan kan een laadpunt met hogere prioriteit worden ingeschakeld als het toegang krijgt tot het ongebruikte laadvermogen.

Deze prioritering werkt in de modus `smart`. Als [Altijd laden](/nl/features/modes#always-charge) actief is, wordt het laden niet onderbroken, maar alleen tot het minimum teruggebracht.

:::note
Als voor een voertuig een prioriteit is vastgelegd, overschrijft die de prioriteit van het laadpunt waarop het is aangesloten.
:::

**Standaardwaarde:** `0`

**Voorbeeld**:

```yaml
priority: 2
```

---
