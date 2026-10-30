---
title: "loadpoints"
description: "Nastavte v evcc.yaml nabíjecí body, propojte nabíječku, měřič a vozidlo, zvolte výchozí režim a dolaďte dotazování vozidla, prahové hodnoty a fáze."
sidebar:
  order: 3
translatedFrom: "3b374858a668"
---

Seznam `loadpoints` obsahuje nabíjecí body. Každý z nich spojuje nabíječku, vozidla a v případě potřeby i měřič s dalšími volitelnými parametry. Minimální konfigurace vyžaduje nabíječku.

**Příklad**:

```yaml
loadpoints:
  - title: Garage # display name for UI
    charger: charger # charger reference
    vehicle: audi # reference to standard vehicle
    mode: smart # charge mode (off, smart, now)
```

Odkazy vždy odpovídají hodnotám parametru `name` (např. `charger`) v konfiguraci příslušného zařízení.

Nyní si vysvětlíme všechny možné parametry.

---

## Povinné parametry

### `title`

Popis nabíjecího bodu, který se zobrazuje v uživatelském rozhraní (UI).

**Příklad**:

```yaml
title: Garage
```

---

### `charger`

Odkaz na konfiguraci `charger`.

**Příklad**:

```yaml
charger: charger
```

Hodnota `charger` přitom odpovídá hodnotě parametru `name` v [definici nabíječky](/cs/reference/configuration/chargers#name).

---

## Volitelné parametry

### `meter`

Odkaz na konfiguraci `meter` (měřič).

Tato položka je potřeba jen tehdy, pokud použitá nabíječka sama neměří proud nebo pokud evcc nemůže naměřené hodnoty z nabíječky načíst. I v tomto případě je však tato položka volitelná, protože evcc předpokládá, že se k nabíjení skutečně použije nastavený maximální proud.

**Příklad**:

```yaml
meter: charge
```

Hodnota `charge` přitom odpovídá hodnotě parametru `name` v [definici měřiče](/cs/reference/configuration/meters#name).

---

### `vehicle`

`vehicle`: Odkaz na konfiguraci `vehicle`, která je nabíjecímu bodu přiřazena jako výchozí vozidlo.

Když se k nabíječce připojí vozidlo, předpokládá se, že jde o toto vozidlo. Automatická detekce vozidla se přeskočí. Pokud je připojeno jiné vozidlo (např. vozidlo hosta), lze ho později přiřadit ručně.

**Příklad**:

```yaml
vehicle: renault
```

Hodnota `renault` přitom odpovídá hodnotě parametru `name` v [definici vozidla](/cs/reference/configuration/vehicles#name).

---

### `mode`

evcc si pamatuje naposledy použitý režim nabíjení.
Parametrem `mode` můžete určit režim nabíjení, který se má použít po odpojení vozidla.

**Možné hodnoty**:

- `off`: Nabíjení je zastaveno, i když je k nabíječce připojeno vozidlo.
- `smart`: Nabíjení ze solárního přebytku, v levných hodinách dynamického tarifu a podle plánů nabíjení. Pokud není k dispozici levná energie, nabíjení se pozastaví.
- `now`: Nabíjení se okamžitě spustí s maximálním možným výkonem.

**Výchozí hodnota:** `smart`

Zastaralé hodnoty `pv` a `minpv` jsou při zápisu stále přijímány:
`pv` aktivuje `smart` a vypne [Vždy nabíjet](/cs/features/modes#always-charge), `minpv` aktivuje `smart` a Vždy nabíjet zapne.

:::caution[Nekompatibilní změna]
Čtení stavu a API (`/api/state`, websocket, MQTT) hlásí `smart` místo `pv`, hodnota `minpv` se při čtení už vůbec neobjevuje.
Externí automatizace, které při čtení porovnávají hodnotu s `pv` nebo `minpv`, je nutné upravit.
Integrace mohou nové schéma režimů rozpoznat podle přítomnosti `loadpoints[].alwaysCharge` v `/api/state`.
:::

:::note
Elektromobil obecně potřebuje k nabíjení výkon alespoň 1,4 kW na fázi. U nabíječek a vozidel, které komunikují podle normy ISO 15118, je potřeba celkový výkon alespoň 1,4 kW bez ohledu na počet fází použitých k nabíjení.
:::

**Příklad**:

```yaml
mode: smart
```

---

### `soc`

Určuje výchozí nastavení pro práci se stavem nabití připojeného vozidla.

**Příklad**:

```yaml
soc:
  poll:
    mode: charging
    interval: 60m
  estimate: true
```

#### `poll`

Určuje, jak se API vozidla používají k získávání aktuálních informací o vozidle.

:::caution
Měnit výchozí nastavení **NEDOPORUČUJEME**, protože to může vést k vybití baterie vozidla nebo k tomu, že výrobce vozidla aktivně zablokuje řízení nabíjení přes evcc. **Na vlastní riziko**.
:::

#### `poll.mode`

Určuje, za jakých podmínek se načítají data vozidla.

**Možné hodnoty**:

- `charging`: Data se aktualizují **POUZE** během nabíjecí relace (doporučené výchozí nastavení).
- `connected`: Data se aktualizují, když je vozidlo připojeno k nabíječce (nejen při nabíjení); frekvenci určuje parametr `interval`.
- `always`: Data se aktualizují vždy, i když vozidlo není připojeno k nabíječce; frekvenci určuje parametr [`interval`](#pollinterval) (podporováno jen pro jedno vozidlo na nabíjecí bod).

**Výchozí hodnota:** `charging`

**Příklad**:

```yaml
mode: charging
```

#### `poll.interval`

Určuje, jak často se data vozidla načítají, když vozidlo **NENABÍJÍ**.

**Výchozí hodnota:** `60m`

**Příklad**:

```yaml
interval: 60m
```

#### `estimate`

Výpočet (interpolace) aktuálního stavu nabití mezi dotazy na data vozidla.

**Možné hodnoty**:

- `true`: evcc interpoluje hodnoty stavu nabití mezi dotazy na data vozidla (doporučeno).
- `false`: evcc používá pouze hodnoty stavu nabití, které vrací vozidlo.

**Výchozí hodnota:** `true`

**Příklad**:

```yaml
estimate: false # No interpolation
```

---

### `enable`

Určuje chování při spouštění nabíjení ze solárního přebytku v režimu **Chytrý**. Kromě toho určuje chování při automatickém přepínání fází z jedné fáze na tři.

:::note
Pokud chcete povolit podíl energie ze sítě, použijte místo toho posuvník **Solární podíl** v nastavení nabíjecího bodu (viz [Nedostatečný přebytek?](/cs/features/solar-charging#not-enough-surplus)).
Posuvník je neaktivní, dokud je nastaven práh `enable` nebo `disable`.
:::

**Příklad**:

```yaml
enable:
  threshold: 0
  delay: 1m
```

#### `threshold`

Určuje prahovou hodnotu výkonu na předávacím místě k síti ve wattech (W).

**Možné hodnoty**: Kladná hodnota pro odběr ze sítě, záporná hodnota pro export do sítě. Při nastavení `0` musí export dosáhnout minimálního nabíjecího výkonu.

**Výchozí hodnota:** `0`

**Příklad**:

```yaml
threshold: 0
```

:::note
Pokud jste v lokalitě nastavili `residualPower`, posouvá se tím pracovní bod regulace přebytku a `threshold` je nutné nastavit s ohledem na tuto hodnotu.

Pokud je například `residualPower` nastaveno na 200 (regulace evcc nastaví požadovaný pracovní bod na 200 W exportu do sítě), pak nastavení hodnoty `enable` `threshold` na 100 neznamená, že nabíjení začne při odběru 100 W ze sítě. Místo toho se zbývající výkon exportu do sítě sníží o 100 W a nabíjení začne při exportu 100 W do sítě.

Aby v tomto případě nabíjení začalo při odběru 100 W ze sítě, je nutné nastavit hodnotu `threshold` na 300.
:::

#### `delay`

Určuje, jak dlouho musí být podmínka `threshold` splněna.

**Výchozí hodnota:** `1m`

**Příklad**:

```yaml
delay: 1m
```

---

### `disable`

Určuje chování při zastavování nabíjení ze solárního přebytku v režimu **Chytrý**. Kromě toho určuje chování při automatickém přepínání fází ze tří fází na jednu.

**Příklad**:

```yaml
disable:
  threshold: 200 # maximum import power (W)
  delay: 10m
```

#### `threshold`

Určuje prahovou hodnotu výkonu na předávacím místě k síti ve wattech (W).

**Možné hodnoty**: Kladná hodnota pro odběr ze sítě. Při nastavení `0` se nabíjení zastaví, jakmile přebytek přestane pokrývat minimální nabíjecí výkon.

**Výchozí hodnota:** `0`

**Příklad**:

```yaml
threshold: 200 # Maximum grid consumption of 200W is allowed
```

:::note
Pokud jste v lokalitě nastavili `residualPower`, posouvá se tím pracovní bod regulace přebytku a `threshold` je nutné nastavit s ohledem na tuto hodnotu. Viz příklad v poznámce k [`enable`](#enable) `threshold`.
:::

:::caution
Záporné hodnoty nemají žádný účinek: dokud je k dispozici přebytek, evcc pokračuje v nabíjení a práh vůbec nekontroluje.
:::

#### `delay`

Určuje, jak dlouho musí být podmínka `threshold` splněna.

**Výchozí hodnota:** `3m`

**Příklad**:

```yaml
delay: 10m
```

---

### `phases`

:::note[Zastaralé v YAML]
Tuto hodnotu lze nyní nastavit v dialogovém okně nastavení nabíjecího bodu.
:::

**Nabíječka bez automatického přepínání fází**:

Určuje počet fází, kterými je nabíječka připojena.

Tento parametr nemění fyzické připojení nabíječky, ale slouží k určení minimálního rozběhového výkonu pro nabíjení ze solárního přebytku (v kombinaci s `minCurrent`).

Nově se vyhodnocují vstupní napětí, pokud je měřič nabíječky poskytuje. Na základě napětí se hodnota `phases` automaticky mění přes API. V případech, kdy se nabíječka přepíná mezi jednou a třemi fázemi přepínačem, už ruční změny hodnoty `phases` nejsou nutné.

V případech, kdy se jednofázové nebo třífázové nabíjení realizuje odpovídajícím nabíjecím kabelem, a ne přepínačem, způsobuje toto „automatické“ chování problémy. V takovém případě je nutné odpovídajícím způsobem upravit hodnotu `phases` ve `vehicle`. Protože tuto hodnotu nelze měnit přes API, lze použít následující řešení:

Nakonfigurujte vozidlo dvakrát: jednou s `phases: 1` a jednou s `phases: 3`. Podle požadovaného režimu nabíjení pak v uživatelském rozhraní vyberte příslušné vozidlo.

Pokud je připojeno známé vozidlo, použije se pro výpočet nižší z hodnot `vehicle: phases` a `loadpoint: phases`. U neznámých vozidel se zohledňuje pouze `loadpoint: phases`.

Pokud během nabíjení vozidla nabíječka nebo měřič nabíjení poskytují proudy jednotlivých fází, zjistí se skutečný počet fází a (dokud vozidlo zůstává připojeno) použije se pro další výpočty. Funguje to jen u třífázových nabíjecích bodů.

**Výchozí hodnota:** `3`

**Možné hodnoty:** `1|3`

**Příklad**:

```yaml
phases: 1
```

**Nabíječka s automatickým přepínáním fází**:

Hodnota určuje, zda je automatické přepínání fází zapnuté, nebo vypnuté.

`phases: 0` = automatické přepínání zapnuto

`phases: 1 or 3` = automatické přepínání vypnuto, nastavená hodnota je pevná

**Výchozí hodnota:** `3`

**Možné hodnoty:** `0|1|3`

**Příklad**:

```yaml
phases: 0
```

:::note
Pokud nabíjecímu bodu není přiřazena nabíječka, ale jedna z podporovaných přepínatelných zásuvek (AVM FritzDECT, Shelly, Tasmota, TP-Link atd.), je nutné nastavit `phases` na **1**, aby řízení nabíjení fungovalo správně.
:::

---

### `priority`

Během nabíjení tento parametr určuje vzájemnou prioritu nabíjecích bodů.

Prioritní nabíjecí bod dostane nabíjecí výkon ostatních neprioritních nebo méně prioritních nabíjecích bodů. Když prioritní nabíjecí bod tento výkon převezme, může dojít ke krátkodobému odběru ze sítě, dokud se regulace neustálí.

Vyšší hodnoty znamenají vyšší prioritu. Nabíjecí body bez této položky mají `priority: 0`.

Pokud je k dispozici více nabíjecích bodů, tento parametr neovlivňuje pořadí, ve kterém se nabíjecí relace spouštějí. Pokud však nabíjí nabíjecí bod s nižší prioritou, může se zapnout nabíjecí bod s vyšší prioritou, jakmile získá přístup k nevyužitému nabíjecímu výkonu.

Tato prioritizace funguje v režimu **Chytrý** (`smart`). Když je aktivní [Vždy nabíjet](/cs/features/modes#always-charge), nabíjení se nepřeruší, pouze se sníží na minimum.

:::note
Pokud má vozidlo definovanou prioritu, přepíše prioritu nabíjecího bodu, ke kterému je připojeno.
:::

**Výchozí hodnota:** `0`

**Příklad**:

```yaml
priority: 2
```

---
