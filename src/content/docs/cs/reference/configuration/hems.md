---
title: "hems"
description: "Popisuje, jak v evcc.yaml nastavit externí limity pro spotřebu a export do sítě, např. pro § 14a EnWG nebo § 9 EEG, přes relé, řídicí jednotku FNN nebo EEBUS."
sidebar:
  order: 8
translatedFrom: "426c429c285d"
---

Sekce `hems` konfiguruje externí řízení výkonu spotřeby a exportu do sítě.
Používá se např. ke splnění německých předpisů § 14a EnWG nebo § 9 EEG.
Souvislosti a podrobnosti o nastavení najdete na stránce [Externí limit](/cs/external-limit).

:::note[Poznámka]
Omezení výkonu působí přímo na omezitelné měřiče `pv` a [zařízení omezující výkon](/cs/reference/configuration/curtailers), snížení spotřeby působí přímo na řiditelné spotřebiče.
Ani pro jedno není potřeba konfigurace okruhů.
Aby se limit spotřeby uplatnil i na nabíjecí body, musí být v [řízení zátěže](/cs/features/loadmanagement) nastavené okruhy.
Aktivní limit pak omezí hlavní okruh.
:::

:::note[SMA Sunny Home Manager a protokol SEMP]
Integrace SMA Sunny Home Manager (SHM) je ve výchozím stavu aktivní a už není nutné ji konfigurovat pod `hems:`.
Podrobnosti a možnosti konfigurace najdete v části **Konfigurace → Sunny Home Manager**.
:::

---

## Povinné parametry

### `type`

Určuje typ externího řízení.

**Možné hodnoty**:

- `relay`: Připojení přes spínací kontakt
- `fnn`: Připojení přes řídicí jednotku FNN s několika spínacími kontakty
- `eebus`: Připojení přes protokol EEBUS

---

## `type: relay`

Připojení přes spínací kontakt (např. řídicí jednotku).
Kontakt signalizuje, zda je aktivní omezení výkonu.

```yaml
hems:
  type: relay
  maxPower: 8400 # Total power limit when signal is active (in watts)
  limit:
    source: gpio
    function: read
    pin: 17
```

### Parametry

#### `maxPower`

Celkový limit výkonu ve wattech, který platí, když je signál aktivní.

#### `limit`

Konfigurace [pluginu](/cs/reference/plugins) pro čtení spínacího kontaktu.
Očekávaná návratová hodnota: `true`/`1` = omezeno, `false`/`0` = normální stav.

#### `passthrough`

Volitelná konfigurace [pluginu](/cs/reference/plugins) pro předání signálu omezení do externího systému.

#### `interval`

Interval dotazování spínacího kontaktu.
Výchozí hodnota: `10s`.

Další příklady různých připojení (GPIO, MQTT, HTTP) najdete v části [Uživatelem definované integrace](/cs/user-defined-devices#external-limit).

---

## `type: fnn`

Připojení přes řídicí jednotku FNN s oddělenými spínacími kontakty.
Snížení spotřeby (W4) a omezení výkonu exportu do sítě (W3, S2, S1) se signalizují jednotlivými kontakty.

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

### Parametry

Musí být nakonfigurován alespoň jeden ze signálů `w4` nebo `w3`.

#### `maxDimPower`

Limit spotřeby ve wattech, který platí, dokud je aktivní signál snížení spotřeby (W4).
Povinné, pokud je nakonfigurován `w4`.

#### `maxCurtailPower`

Instalovaný výkon fotovoltaické elektrárny ve wattech.
Z této hodnoty se počítají stupně omezení výkonu (W3, S2, S1).

#### `w4`

Konfigurace [pluginu](/cs/reference/plugins) pro čtení signálu snížení spotřeby.
Když je aktivní, spotřeba se omezí na `maxDimPower`.

#### `w3`

Konfigurace [pluginu](/cs/reference/plugins) pro čtení signálu omezení výkonu „0 %“.
Když je aktivní, export do sítě se omezí na 0 % hodnoty `maxCurtailPower`.

#### `s2`

Konfigurace [pluginu](/cs/reference/plugins) pro čtení signálu omezení výkonu „30 %“.
Když je aktivní, export do sítě se omezí na 30 % hodnoty `maxCurtailPower`.

#### `s1`

Konfigurace [pluginu](/cs/reference/plugins) pro čtení signálu omezení výkonu „60 %“.
Když je aktivní, export do sítě se omezí na 60 % hodnoty `maxCurtailPower`.

#### `interval`

Interval dotazování spínacích kontaktů.
Výchozí hodnota: `10s`.

Podrobnosti o nastavení najdete na stránce [Externí limit](/cs/external-limit).

---

## `type: eebus`

Připojení přes protokol EEBUS.
Řídicí jednotka předává limit výkonu automaticky.

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF" # SKI of the control box
```

### Parametry

#### `ski`

SKI (Subject Key Identifier) řídicí jednotky.
Je nutný pro spárování.

#### Rozšířené limity

Pro komunikaci přes EEBUS lze nastavit tyto volitelné parametry:

- `contractualConsumptionNominalMax`: Smluvní maximální výkon spotřeby (ve wattech)
- `failsafeConsumptionActivePowerLimit`: Záložní limit výkonu spotřeby (ve wattech)
- `productionNominalMax`: Instalovaný výkon zdroje (Wp, ve wattech)
- `failsafeProductionActivePowerLimit`: Záložní limit výkonu exportu do sítě (ve wattech)
- `failsafeDurationMinimum`: Minimální doba trvání záložního režimu (např. `2h`)

#### `passthrough`

Volitelná konfigurace [pluginu](/cs/reference/plugins) pro předání signálu omezení do externího systému.

#### `interval`

Interval dotazování.
Výchozí hodnota: `10s`.

Podrobnosti o nastavení a párování najdete na stránce [Externí limit](/cs/external-limit#eebus-pairing).
