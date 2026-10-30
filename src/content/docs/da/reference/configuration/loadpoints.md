---
title: "loadpoints"
description: "Sæt ladepunkter op i evcc.yaml ved at koble oplader, måler og køretøj sammen, vælge standardtilstanden og finjustere køretøjsforespørgsler, tærskler og faser."
sidebar:
  order: 3
translatedFrom: "3b374858a668"
---

`loadpoints` er listen over dine ladepunkter. Hvert ladepunkt samler en oplader, køretøjer og om nødvendigt en måler med yderligere valgfrie parametre. En minimal konfiguration kræver en oplader.

**Eksempel**:

```yaml
loadpoints:
  - title: Garage # display name for UI
    charger: charger # charger reference
    vehicle: audi # reference to standard vehicle
    mode: smart # charge mode (off, smart, now)
```

Referencer svarer altid til værdierne af `name`-parameteren (f.eks. `charger`) i den pågældende enhedskonfiguration.

Herunder forklares alle mulige parametre.

---

## Påkrævede parametre

### `title`

En beskrivelse af ladepunktet, som vises i brugerfladen.

**Eksempel**:

```yaml
title: Garage
```

---

### `charger`

Reference til en `charger`-konfiguration.

**Eksempel**:

```yaml
charger: charger
```

Her svarer værdien `charger` til værdien af `name`-parameteren i [definitionen af opladeren](/da/reference/configuration/chargers#name).

---

## Valgfrie parametre

### `meter`

Reference til en `meter`-konfiguration (måler).

Denne angivelse er kun nødvendig, hvis den anvendte oplader ikke selv måler strømmen, eller hvis evcc ikke kan aflæse måleværdierne fra opladeren. Selv i det tilfælde er angivelsen dog valgfri, fordi evcc antager, at den indstillede maksimale strøm også bruges til opladning.

**Eksempel**:

```yaml
meter: charge
```

Her svarer værdien `charge` til værdien af `name`-parameteren i [definitionen af måleren](/da/reference/configuration/meters#name).

---

### `vehicle`

`vehicle`: Reference til en `vehicle`-konfiguration, der tildeles ladepunktet som standardkøretøj.

Når et køretøj tilsluttes opladeren, antages det, at det er dette køretøj, der er tilsluttet. Den automatiske genkendelse af køretøjer springes over. Hvis et andet køretøj tilsluttes (f.eks. et gæstekøretøj), kan det tildeles manuelt bagefter.

**Eksempel**:

```yaml
vehicle: renault
```

Her svarer værdien `renault` til værdien af `name`-parameteren i [definitionen af køretøjet](/da/reference/configuration/vehicles#name).

---

### `mode`

evcc husker den senest brugte ladetilstand.
Med parameteren `mode` kan du angive den ladetilstand, der skal bruges, når køretøjet er frakoblet.

**Mulige værdier**:

- `off`: Opladningen stoppes, selv om et køretøj er tilsluttet opladeren.
- `smart`: Opladningen bruger soloverskud, billige timer fra en dynamisk tarif og ladeplaner og sættes på pause, når der ikke er billig energi til rådighed.
- `now`: Opladningen starter med det samme med den størst mulige effekt.

**Standardværdi:** `smart`

De udfasede værdier `pv` og `minpv` accepteres stadig ved skrivning:
`pv` aktiverer `smart` og slår [Oplad altid](/da/features/modes#always-charge) fra, `minpv` aktiverer `smart` og slår Oplad altid til.

:::caution[Inkompatibel ændring]
Ved læsning rapporterer status og API (`/api/state`, websocket, MQTT) `smart` i stedet for `pv`, og `minpv` optræder ikke længere ved læsning.
Eksterne automatiseringer, der sammenligner med `pv` eller `minpv` ved læsning, skal opdateres.
Integrationer kan genkende det nye tilstandsskema på, at `loadpoints[].alwaysCharge` findes i `/api/state`.
:::

:::note
Generelt kræver en elbil mindst 1,4 kW effekt pr. fase for at oplade. Med opladere og køretøjer, der kommunikerer via ISO 15118-standarden, kræves der i alt mindst 1,4 kW effekt uanset antallet af faser, der bruges til opladningen.
:::

**Eksempel**:

```yaml
mode: smart
```

---

### `soc`

Definerer standardindstillingerne for håndteringen af et tilsluttet køretøjs opladningsniveau.

**Eksempel**:

```yaml
soc:
  poll:
    mode: charging
    interval: 60m
  estimate: true
```

#### `poll`

Definerer, hvordan køretøjs-API'er bruges til at hente aktuelle oplysninger om køretøjet.

:::caution
Det anbefales **IKKE** at ændre standardindstillingerne, da det kan føre til, at køretøjets batteri aflades, eller at køretøjsproducenten aktivt forhindrer styring af opladningen via evcc. **Brug på eget ansvar**.
:::

#### `poll.mode`

Definerer, under hvilke betingelser køretøjsdataene hentes.

**Mulige værdier**:

- `charging`: Data opdateres **KUN** under en opladningssession (anbefalet standard).
- `connected`: Data opdateres, når køretøjet er tilsluttet opladeren (ikke kun under opladning). Parameteren `interval` fastlægger hyppigheden.
- `always`: Data opdateres altid, også når køretøjet ikke er tilsluttet opladeren. Parameteren [`interval`](#pollinterval) fastlægger hyppigheden (understøttes kun for ét køretøj pr. ladepunkt).

**Standardværdi:** `charging`

**Eksempel**:

```yaml
mode: charging
```

#### `poll.interval`

Definerer, hvor ofte køretøjet spørges om data, når det **IKKE** oplader.

**Standardværdi:** `60m`

**Eksempel**:

```yaml
interval: 60m
```

#### `estimate`

Det aktuelle opladningsniveau beregnes (interpoleres) mellem forespørgslerne til køretøjet.

**Mulige værdier**:

- `true`: evcc interpolerer opladningsniveauet mellem forespørgslerne til køretøjet (anbefalet).
- `false`: evcc bruger kun de værdier for opladningsniveauet, som køretøjet returnerer.

**Standardværdi:** `true`

**Eksempel**:

```yaml
estimate: false # No interpolation
```

---

### `enable`

Definerer, hvordan opladning med soloverskud starter i tilstanden Smart. Derudover definerer den adfærden ved automatisk faseskift fra 1p til 3p.

:::note
Hvis du vil tillade en andel strøm fra elnettet, skal du i stedet bruge skyderen **Solandel** i ladepunktets indstillinger (se [Ikke nok overskud?](/da/features/solar-charging#not-enough-surplus)).
Skyderen er deaktiveret, så længe der er angivet en `enable`- eller `disable`-tærskel.
:::

**Eksempel**:

```yaml
enable:
  threshold: 0
  delay: 1m
```

#### `threshold`

Definerer effekttærsklen ved tilslutningspunktet til elnettet i watt (W).

**Mulige værdier**: En positiv værdi for import fra elnettet, en negativ værdi for eksport til elnettet. Ved `0` skal eksporten nå op på den minimale ladeeffekt.

**Standardværdi:** `0`

**Eksempel**:

```yaml
threshold: 0
```

:::note
Hvis du har forskudt overskudsreguleringens målværdi med parameteren `residualPower`, skal du tage højde for denne værdi, når du angiver `threshold`-værdien.

Hvis `residualPower` f.eks. er sat til 200 (evcc-reguleringen lægger målværdien på 200 W eksport til elnettet), betyder en `enable`-`threshold`-værdi på 100 ikke, at opladningen starter ved 100 W import fra elnettet. I stedet reduceres den tilbageværende effekt til eksport til elnettet med 100 W, så opladningen starter ved 100 W eksport til elnettet.

For at starte opladningen ved 100 W import fra elnettet skal `threshold`-værdien i dette tilfælde sættes til 300.
:::

#### `delay`

Definerer, hvor længe `threshold` skal være opfyldt.

**Standardværdi:** `1m`

**Eksempel**:

```yaml
delay: 1m
```

---

### `disable`

Definerer, hvordan opladning med soloverskud stopper i tilstanden Smart. Derudover definerer den adfærden ved automatisk faseskift fra 3p til 1p.

**Eksempel**:

```yaml
disable:
  threshold: 200 # maximum import power (W)
  delay: 10m
```

#### `threshold`

Definerer effekttærsklen ved tilslutningspunktet til elnettet i watt (W).

**Mulige værdier**: En positiv værdi for import fra elnettet. Ved `0` stopper opladningen, så snart overskuddet ikke længere dækker den minimale ladeeffekt.

**Standardværdi:** `0`

**Eksempel**:

```yaml
threshold: 200 # Maximum grid consumption of 200W is allowed
```

:::note
Hvis du har forskudt overskudsreguleringens målværdi med parameteren `residualPower`, skal du tage højde for denne værdi, når du angiver `threshold`-værdien. Se eksemplet i oplysningerne om [`enable`](#enable) `threshold`.
:::

:::caution
Negative værdier har ingen virkning: Så længe der er overskud til rådighed, fortsætter evcc med at oplade og tjekker aldrig tærsklen.
:::

#### `delay`

Definerer, hvor længe `threshold` skal være opfyldt.

**Standardværdi:** `3m`

**Eksempel**:

```yaml
delay: 10m
```

---

### `phases`

:::note[Udfaset i YAML]
Værdien kan nu angives i dialogboksen med ladepunktets indstillinger.
:::

**Oplader uden automatisk faseskift**:

Definerer antallet af faser, som opladeren er tilsluttet med.

Parameteren ændrer ikke opladerens fysiske tilslutning, men bruges til at bestemme den minimale starteffekt for opladning med soloverskud (i kombination med `minCurrent`).

Hvis opladerens måler leverer de indgående spændinger, bliver de evalueret. Ud fra spændingerne ændres `phases`-værdien automatisk via API. Hvis opladeren skiftes mellem 1p og 3p med en kontakt, er det ikke længere nødvendigt at ændre `phases`-værdien manuelt.

Hvis der i stedet skiftes mellem 1p og 3p med ladekablet frem for en kontakt, giver denne ”automatiske” adfærd problemer. I så fald skal `phases`-værdien tilpasses i `vehicle`. Da denne værdi ikke kan ændres via API, kan følgende løsning bruges:

Konfigurer køretøjet to gange: én gang med `phases: 1` og én gang med `phases: 3`. Vælg det passende køretøj i brugerfladen afhængigt af den ønskede ladetilstand.

Hvis et kendt køretøj er tilsluttet, bruges den laveste værdi af `vehicle: phases` og `loadpoint: phases` til beregningen. For ukendte køretøjer tages der kun hensyn til `loadpoint: phases`.

Mens køretøjet oplader, og opladeren eller lademåleren leverer fasestrømme, registreres det faktiske antal faser, og (så længe køretøjet forbliver tilsluttet) bruges det til de videre beregninger. Det virker kun for trefasede ladepunkter.

**Standardværdi:** `3`

**Mulige værdier:** `1|3`

**Eksempel**:

```yaml
phases: 1
```

**Oplader med automatisk faseskift**:

Værdien styrer, om det automatiske faseskift er aktiveret eller deaktiveret.

`phases: 0` = automatisk skift aktiveret

`phases: 1 or 3` = automatisk skift deaktiveret, og den angivne værdi ligger fast

**Standardværdi:** `3`

**Mulige værdier:** `0|1|3`

**Eksempel**:

```yaml
phases: 0
```

:::note
Hvis ladepunktet ikke er tildelt en oplader, men en af de understøttede styrbare stikkontakter (AVM FritzDECT, Shelly, Tasmota, TP-Link osv.), skal `phases` sættes til **1** for at sikre korrekt styring af opladningen.
:::

---

### `priority`

Under opladning prioriterer denne parameter ladepunkterne indbyrdes.

Det prioriterede ladepunkt får ladeeffekten fra andre ikke-prioriterede ladepunkter eller ladepunkter med lavere prioritet. Når et prioriteret ladepunkt gør brug af denne effekt, kan det føre til kortvarig import fra elnettet, indtil reguleringen har stabiliseret sig.

Højere værdier betyder højere prioritet. Ladepunkter uden angivelse har `priority: 0`.

Når der er flere ladepunkter, har denne parameter ingen indflydelse på, i hvilken rækkefølge opladningssessionerne startes. Hvis et ladepunkt med lavere prioritet oplader, kan et med højere prioritet dog blive slået til, hvis det får adgang til den ubrugte ladeeffekt.

Denne prioritering virker i tilstanden `smart`. Når [Oplad altid](/da/features/modes#always-charge) er aktiv, afbrydes opladningen ikke, men reduceres kun til minimum.

:::note
Hvis der er defineret en prioritet for et køretøj, tilsidesætter den prioriteten for det ladepunkt, køretøjet er tilsluttet.
:::

**Standardværdi:** `0`

**Eksempel**:

```yaml
priority: 2
```

---
