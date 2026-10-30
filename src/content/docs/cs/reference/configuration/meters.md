---
title: "meters"
description: "V evcc.yaml definujete měřiče pro síť, solár, domácí baterii a spotřebiče podle jednotné znaménkové konvence a zvolíte vhodný typ měřiče."
sidebar:
  order: 5
translatedFrom: "731e5e09d04f"
---

_Měřiče_ (elektroměry) jsou zařízení v domě, která dokážou měřit výkon a spotřebu energie, výrobu ze soláru nebo využití domácí baterie. `meter` definuje bod měření energie a může jít o fyzické zařízení (např. měřič v předávacím místě sítě), solární střídač (AC, nebo u hybridních střídačů DC) nebo bateriový střídač.

Nabíječky mohou mít integrovaný měřič, nebo může být měřič připojen externě. Pokud má nabíječka vlastní měřič, není pro ni potřeba vytvářet záznam v `meters`. Pokud nabíječka takový měřič nemá, použije evcc měřič nakonfigurovaný zde a přiřazený nabíječce v konfiguraci nabíjecího bodu pod [`meter`](/cs/reference/configuration/loadpoints#meter), nebo předpokládá, že se nastavený nabíjecí výkon skutečně odebírá.

evcc používá pro hodnoty výkonu a proudu (`power`, `powers`, `currents`) jednotnou znaménkovou konvenci:

- **Kladné (+)** pro energii, která přichází: odběr ze sítě, výroba ze soláru, vybíjení domácí baterie
- **Záporné (-)** pro energii, která odchází: export do sítě, pohotovostní spotřeba solárního střídače, nabíjení domácí baterie
- **Spotřebiče** (nabíječka, pomocné měřiče) jsou vždy **kladné (+)**

Pokud zařízení vrací hodnoty s opačným znaménkem, lze to opravit v [konfiguraci pluginu](/cs/reference/plugins) pomocí `scale: -1`.

Konfigurace `meters` je seznam různých dostupných zařízení.

**Příklad**:

```yaml
meters:
  - name: grid
    type: ...
  - name: pv
    type: ...
  - name: battery
    type: ...
  - name: charge
    type: ...
  - name: aux
    type: ...
```

Konfigurace známých zařízení najdete v části [Zařízení – domácí instalace](/cs/meters).

Níže jsou vysvětleny jednotlivé parametry.

---

## Povinné parametry

### `name`

Krátké označení měřiče. Hodnota se používá při odkazování na zařízení v konfiguraci [lokality](/cs/reference/configuration/site) nebo [nabíjecího bodu](/cs/reference/configuration/loadpoints#meter).

**Příklad**:

```yaml
name: charger1
```

---

### `type`

Typ, přes který evcc s měřičem komunikuje. Vhodný typ pro známá zařízení najdete v části [Zařízení – domácí instalace](/cs/meters).

**Příklad**:

```yaml
type: modbus
```

Jednotlivé možné typy a jejich další parametry jsou popsány níže:

---

:::note[Poznámka]
Další pole měřiče `title` a `icon` nejsou v souboru `evcc.yaml` z technických důvodů podporována.
Názvy a ikony (podle způsobu použití) lze definovat pouze pro měřiče vytvořené v konfiguračním rozhraní.
:::

## Podporované typy

### `movingaverage`

Tento typ měřiče dokáže vyhladit kolísající naměřené hodnoty. Lze ho použít pro všechna využití měřiče (`usage`). Parametr `decay` udává, kolik procent nové hodnoty se započítá do výpočtu.

**Příklad**

```yaml
meters:
- name: grid
  type: movingaverage
  decay: 0.1
  meter:
    type: template
    template: solarlog
    usage: grid
    host: 192.0.2.2
    ...
```

V tomto příkladu se započítá 10 % nové hodnoty. Po 10 cyklech se nejstarší hodnota z výpočtu odstraní. Jak dlouho to trvá, závisí na `interval`.

---

### `modbus`

Zařízení připojená přes rozhraní Modbus a podporovaná projektem [MBMD (ModBus Measurement Daemon)](https://github.com/volkszaehler/mbmd#supported-devices).

**Příklad**:

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Povinné parametry

Kromě zde definovaných parametrů jsou nutné další parametry. Jsou uvedeny v dokumentaci [Modbus](/cs/reference/modbus).

##### `power`

Definuje naměřenou hodnotu MBMD pro výkon, obvykle `Power`.

**Příklad**:

```yaml
power: Power
```

---

##### `energy`

Definuje naměřenou hodnotu MBMD pro energii, obvykle `Sum`.

**Příklad**:

```yaml
energy: Sum
```

---

#### Volitelné parametry

##### `soc`

Definuje naměřenou hodnotu MBMD pro stav nabití baterie, obvykle `ChargeState`.

**Příklad**:

```yaml
soc: ChargeState
```

---

### `lgess`

Zařízení LG ESS Home 8/10.

**Příklad**:

```yaml
type: lgess
usage: grid
uri: https://192.0.2.2/
password: "DE200..."
```

:::note
Parametry `uri` a `password` jsou u zařízení `meter` nutné pouze tehdy, je-li nakonfigurováno více zařízení.
:::

#### Povinné parametry

##### `usage`

Definuje, která měření jsou zde potřeba.

**Možné hodnoty**:

- **`grid`**: pro měření v předávacím místě sítě
- **`pv`**: pro měření výroby ze soláru
- **`battery`**: pro měření domácí baterie

---

##### `uri`

Definuje URL zařízení LG ESS v domácí síti.

**Příklad**:

```yaml
uri: https://192.0.2.2/
```

---

##### `password`

Sem je potřeba zadat registrační číslo střídače LG ESS HOME.

**Příklad**:

```yaml
password: "DE200..."
```

---

### `openwb`

Použití měření z nabíječky OpenWB

**Příklad**:

```yaml
type: openwb
usage: grid
broker: 192.0.2.2
```

#### Povinné parametry

##### `usage`

Definuje, která měření jsou zde potřeba.

**Možné hodnoty**:

- **`grid`**: pro měření v předávacím místě sítě
- **`pv`**: pro měření výroby ze soláru
- **`battery`**: pro měření domácí baterie

---

##### `broker`

Definuje název hostitele nebo IP adresu a port zařízení OpenWB v domácí síti.

**Příklad**:

```yaml
broker: 192.0.2.2:1883
```

---

### `sma`

Pro použití SMA Home Manageru 2.0, SMA Energy Meteru nebo střídače SMA. Zařízení musí podporovat protokol Speedwire.

**Příklad**:

```yaml
type: sma
uri: 192.0.2.2
serial: 12345678
interface: eth0
```

---

#### Povinné parametry

:::note
Stačí definovat buď `uri`, nebo `serial`.
:::

##### `uri`

Definuje název hostitele nebo IP adresu zařízení v domácí síti.

**Příklad**:

```yaml
uri: 192.0.2.2
```

##### `serial`

Definuje sériové číslo zařízení, ze kterého se mají přijímat měření.

**Příklad**:

```yaml
serial: 12345678
```

#### Volitelné parametry

##### `interface`

Multicastové zprávy lze přijímat pouze na jednom konkrétním síťovém rozhraní. Obvykle je to první rozhraní v systému. Pokud to není rozhraní připojené k měřiči, je potřeba rozhraní zadat explicitně.

**Příklad**:

```yaml
interface: eth0
```

---

### `tesla`

_`tesla`_: Pro měření ze zařízení Tesla Powerwall.

**Příklad**:

```yaml
type: tesla
usage: grid
uri: https://192.0.2.2/
password: "***"
```

---

#### Povinné parametry

##### `usage`

Definuje, která měření jsou zde potřeba.

**Možné hodnoty**:

- **`grid`**: pro měření v předávacím místě sítě
- **`pv`**: pro měření výroby ze soláru
- **`battery`**: pro měření domácí baterie

---

##### `uri`

Definuje název hostitele nebo IP adresu zařízení v domácí síti.

**Příklad**:

```yaml
uri: 192.0.2.2
```

---

##### `password`

Sem je potřeba zadat heslo uživatele _customer_.

**Příklad**:

```yaml
password: "ThePassword"
```

---

### `custom`

Standardní implementace, u které se jednotlivé hodnoty definují pomocí [pluginů](/cs/user-defined-devices#meter).

**Příklad**:

```yaml
  type: custom
  power: # Výkon (W)
    source: # Typ pluginu
    ...
  energy: # Energie (kWh)
    source: # Typ pluginu
    ...
  returnenergy: # Energie v opačném směru (kWh)
    source: # Typ pluginu
    ...
  soc: # Stav nabití baterie (%)
    source: # Typ pluginu
    ...
  capacity: # Volitelná kapacita baterie (kWh)
  currents: # Proud (A) na fázi
    - source: # Typ pluginu pro fázi 1
      ...
    - source: # Typ pluginu pro fázi 2
      ...
    - source: # Typ pluginu pro fázi 3
      ...
  powers: # Výkon (W) na fázi
    - source: # Typ pluginu pro fázi 1
      ...
    - source: # Typ pluginu pro fázi 2
      ...
    - source: # Typ pluginu pro fázi 3
      ...
  voltages: # Napětí (V) na fázi
    - source: # Typ pluginu pro fázi 1
      ...
    - source: # Typ pluginu pro fázi 2
      ...
    - source: # Typ pluginu pro fázi 3
      ...
  ...
```

---

#### Povinné parametry

##### `power`

Definice pluginu, který vrací výkon ve wattech (W).

**Příklad**:

```yaml
  power: ... # Výkon (W)
    source: # Typ pluginu
    ...
```

---

#### Volitelné parametry

##### `energy`

Definice pluginu, který vrací spotřebovanou energii v kilowatthodinách (kWh).

**Příklad**:

```yaml
  energy: ... # Energie (kWh)
    source: # Typ pluginu
    ...
```

---

##### `returnenergy`

Definice pluginu, který vrací energii v opačném směru v kilowatthodinách (kWh), např. export do sítě.

**Příklad**:

```yaml
  returnenergy: ... # Energie v opačném směru (kWh)
    source: # Typ pluginu
    ...
```

---

#### `soc`

Definice pluginu, který vrací stav nabití baterie v procentech (%).

**Příklad**:

```yaml
  soc: ... # Stav nabití baterie (%)
    source: # Typ pluginu
    ...
```

---

#### `capacity`

Údaj o kapacitě baterie. Má smysl pouze při více bateriích. Slouží k určení celkového stavu nabití.

---

#### `currents`

Seznam definic pluginů, které vracejí proud v ampérech (A) pro každou fázi.

**Příklad**:

```yaml
  currents: # Proud (A) na fázi
    - source: # Typ pluginu pro fázi 1
      ...
    - source: # Typ pluginu pro fázi 2
      ...
    - source: # Typ pluginu pro fázi 3
      ...
  ...
```

---

#### `powers`

Seznam definic pluginů, které vracejí výkon ve wattech (W) pro každou fázi.

**Příklad**:

```yaml
  powers: # Výkon (W) na fázi
    - source: # Typ pluginu pro fázi 1
      ...
    - source: # Typ pluginu pro fázi 2
      ...
    - source: # Typ pluginu pro fázi 3
      ...
  ...
```

---

#### `voltages`

Seznam definic pluginů, které vracejí napětí ve voltech (V) pro každou fázi.

**Příklad**:

```yaml
  voltages: # Napětí (V) na fázi
    - source: # Typ pluginu pro fázi 1
      ...
    - source: # Typ pluginu pro fázi 2
      ...
    - source: # Typ pluginu pro fázi 3
      ...
  ...
```
