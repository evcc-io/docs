---
title: "hems"
description: "Sådan konfigurerer du eksterne grænser for forbrug og eksport til elnettet i evcc.yaml, f.eks. for § 14a EnWG eller § 9 EEG, via relæ, FNN-styreboks eller EEBUS."
sidebar:
  order: 8
translatedFrom: "426c429c285d"
---

Sektionen `hems` konfigurerer ekstern styring af effekten til forbrug og eksport til elnettet.
Den bruges f.eks. til at opfylde de tyske regler i § 14a EnWG eller § 9 EEG.
Baggrund og detaljer om opsætningen finder du under [Ekstern grænse](/da/external-limit).

:::note[Bemærk]
Effektbegrænsning virker direkte på de begrænsbare `pv`-målere og [enheder til effektbegrænsning](/da/reference/configuration/curtailers), dæmpning virker direkte på de styrbare forbrugsenheder.
Ingen af delene kræver en konfiguration af kredsløb.
For at anvende forbrugsgrænsen på ladepunkter skal der være oprettet kredsløb under [Belastningsstyring](/da/features/loadmanagement).
En aktiv grænse begrænser så hovedkredsløbet.
:::

:::note[SMA Sunny Home Manager og SEMP-protokol]
Integrationen af SMA Sunny Home Manager (SHM) er aktiv som standard og behøver ikke længere at blive konfigureret under `hems:`.
Detaljer og konfigurationsmuligheder finder du under **Opsætning → Sunny Home Manager**.
:::

---

## Påkrævede parametre

### `type`

Angiver typen af ekstern styring.

**Mulige værdier**:

- `relay`: Tilslutning via relæ
- `fnn`: Tilslutning via FNN-styreboks med flere relæer
- `eebus`: Tilslutning via EEBUS-protokollen

---

## `type: relay`

Tilslutning via et relæ (f.eks. styreboks).
Kontakten signalerer, om en effektbegrænsning er aktiv.

```yaml
hems:
  type: relay
  maxPower: 8400 # Total power limit when signal is active (in watts)
  limit:
    source: gpio
    function: read
    pin: 17
```

### Parametre

#### `maxPower`

Samlet effektgrænse i watt, der anvendes, når signalet er aktivt.

#### `limit`

[Plugin](/da/reference/plugins)-konfiguration til aflæsning af relæet.
Forventet returværdi: `true`/`1` = begrænset, `false`/`0` = normal.

#### `passthrough`

Valgfri [plugin](/da/reference/plugins)-konfiguration til at videregive begrænsningssignalet til et eksternt system.

#### `interval`

Aflæsningsinterval for relæet.
Standard: `10s`.

Flere eksempler på forskellige tilslutninger (GPIO, MQTT, HTTP) finder du under [brugerdefinerede integrationer](/da/user-defined-devices#external-limit).

---

## `type: fnn`

Tilslutning via en FNN-styreboks med separate relæer.
Dæmpning af forbruget (W4) og effektbegrænsning af eksport til elnettet (W3, S2, S1) signaleres via hver sit relæ.

```yaml
hems:
  type: fnn
  maxDimPower: 4200 # Consumption limit while dimmed (in watts)
  maxCurtailPower: 10000 # Installed PV power, base for curtailment steps (in watts)
  w4:
    source: gpio
    function: read
    pin: 17 # Read GPIO pin 17
    # Return value: false = normal, true = active
  w3:
    source: gpio
    function: read
    pin: 27
  s2:
    source: gpio
    function: read
    pin: 22
  s1:
    source: gpio
    function: read
    pin: 23
```

### Parametre

Mindst ét af signalerne `w4` eller `w3` skal være konfigureret.

#### `maxDimPower`

Forbrugsgrænse i watt, der anvendes, mens dæmpningssignalet (W4) er aktivt.
Påkrævet, når `w4` er konfigureret.

#### `maxCurtailPower`

Installeret soleffekt i watt.
Grundværdi for trinene i effektbegrænsningen (W3, S2, S1).

#### `w4`

[Plugin](/da/reference/plugins)-konfiguration til aflæsning af dæmpningssignalet.
Når det er aktivt, begrænses forbruget til `maxDimPower`.

#### `w3`

[Plugin](/da/reference/plugins)-konfiguration til aflæsning af effektbegrænsningssignalet ”0 %”.
Når det er aktivt, begrænses eksporten til elnettet til 0 % af `maxCurtailPower`.

#### `s2`

[Plugin](/da/reference/plugins)-konfiguration til aflæsning af effektbegrænsningssignalet ”30 %”.
Når det er aktivt, begrænses eksporten til elnettet til 30 % af `maxCurtailPower`.

#### `s1`

[Plugin](/da/reference/plugins)-konfiguration til aflæsning af effektbegrænsningssignalet ”60 %”.
Når det er aktivt, begrænses eksporten til elnettet til 60 % af `maxCurtailPower`.

#### `interval`

Aflæsningsinterval for relæerne.
Standard: `10s`.

Detaljer om opsætningen finder du under [Ekstern grænse](/da/external-limit).

---

## `type: eebus`

Tilslutning via EEBUS-protokollen.
Styreboksen overfører effektgrænsen automatisk.

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF" # SKI of the control box
```

### Parametre

#### `ski`

Styreboksens SKI (Subject Key Identifier).
Påkrævet til parring.

#### Avancerede grænser

Følgende valgfrie parametre kan indstilles til EEBUS-kommunikationen:

- `contractualConsumptionNominalMax`: Kontraktlig maksimal forbrugseffekt (i watt)
- `failsafeConsumptionActivePowerLimit`: Failsafe-grænse for forbrugseffekten (i watt)
- `productionNominalMax`: Installeret generatoreffekt (Wp, i watt)
- `failsafeProductionActivePowerLimit`: Failsafe-grænse for eksporteffekten til elnettet (i watt)
- `failsafeDurationMinimum`: Minimal failsafe-varighed (f.eks. `2h`)

#### `passthrough`

Valgfri [plugin](/da/reference/plugins)-konfiguration til at videregive begrænsningssignalet til et eksternt system.

#### `interval`

Aflæsningsinterval.
Standard: `10s`.

Detaljer om opsætning og parring finder du under [Ekstern grænse](/da/external-limit#eebus-pairing).
