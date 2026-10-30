---
title: "Modbus"
description: "Vysvětluje, jak evcc komunikuje s měřiči a nabíječkami přes Modbus, ať už sériově přes RS485, přes TCP nebo přes převodník RTU na TCP, a jak vše nastavit."
sidebar:
  order: 4
translatedFrom: "8cbbf87533c1"
---

Některá zařízení, např. měřiče ([`meters`](/cs/reference/configuration/meters#modbus)) nebo nabíječky ([`chargers`](/cs/reference/configuration/chargers)), se připojují a adresují pomocí protokolu Modbus.

Konfigurace `meter` obsahuje typ fyzického připojení (rozhraní), volitelné technické parametry rozhraní, použitý protokol Modbus, jedinečné Modbus ID zařízení na sběrnici a číslo a typ registru, který se má číst nebo zapisovat.

Je důležité vědět, že existují tři různé protokoly Modbus: Modbus RTU, Modbus ASCII a Modbus TCP. Technicky je lze přenášet přes různé typy rozhraní. Klasickou variantou je Modbus RTU přes sériové rozhraní sběrnice RS485, které používá většina měřičů a některé nabíječky. Zařízení s nativním síťovým rozhraním (Ethernet/Wi-Fi) se naproti tomu obvykle adresují protokolem Modbus TCP.

Pokud je potřeba sériové zařízení Modbus připojit přes převodník rozhraní po síti (Ethernet/Wi-Fi/PowerLAN), vytvoří se spojení s protokolem Modbus RTU přes TCP/IP. Protokol Modbus RTU se přitom přenáší po síti přímo (tj. je „tunelován“). I když je způsob přenosu (TCP/IP) stejný, protokol _není_ totožný s Modbus TCP. Je zásadní rozlišovat mezi protokolem a způsobem přenosu. „Modbus (RTU) over TCP“ je něco jiného než Modbus TCP!

:::caution
Pozor: Existují složitější převodníky rozhraní, které umějí volitelně překládat samotný protokol Modbus mezi Modbus RTU a Modbus TCP!

Pokud je tato funkce aktivní, musí evcc s převodníkem komunikovat přes Modbus TCP, zatímco převodník komunikuje se sériovým zařízením přes Modbus RTU a oba protokoly obousměrně překládá.
V takovém případě je třeba pečlivě dbát na specifikaci a konfiguraci zařízení, jinak komunikace nemusí fungovat!
:::

V případě konfigurace s převodníkem rozhraní se konfigurace sériové sběrnice určuje pouze na převodníku. Konfigurace v evcc se pak týká jen spojení mezi evcc a převodníkem.

## Fyzické připojení

### Sériové připojení (RS485)

Pokud je zařízení připojeno přímo přes adaptér RS485 (Modbus RTU), musí být `device` a sériové komunikační parametry `baudrate` a `comset` zadány podle konfigurace zařízení. Najdete je v příslušném návodu k obsluze, v datových listech nebo v nastavení systému.

:::note
Na jedné sériové sběrnici RS485 může pracovat více zařízení se stejnými komunikačními parametry, pokud má každé zařízení přiřazeno jedinečné Modbus ID. Pokud nelze všem zařízením na sběrnici nastavit stejné komunikační parametry (každému s jiným ID), je nutné je rozdělit do několika nezávislých sběrnicových systémů.
:::

:::caution
Kombinovat na jedné sběrnici zařízení s různými sériovými komunikačními parametry není možné a vede to k nepředvídatelným chybám komunikace.
:::

**Například**:

```yaml
source: modbus
id: 1
device: /dev/ttyUSB0
baudrate: 38400
comset: "8E1"
```

### Přímé síťové připojení

Pokud je zařízení připojeno přímo přes nativní síťové připojení (Modbus TCP), musí být zadáno `uri` ve tvaru HOSTNAME:PORT nebo IP:PORT:

**Například**:

```yaml
source: modbus
id: 1
uri: 192.168.0.11:502
```

### Sériové zařízení přes síťové připojení (s převodníkem rozhraní)

Pokud je sériové zařízení připojeno přes vložený transparentní převodník rozhraní RS485-IP (bez překladu protokolu), musí se pomocí `rtu: true` přepnout i protokol na Modbus RTU přes spojení TCP/IP.

**Například**:

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU over TCP
```

## Předdefinovaná zařízení

Integrované předdefinované modely zařízení `model` jsou totožné s [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

     ABB       ABB A/B-Series meters
     DDM       DDM18SD
     DZG       DZG Metering GmbH DVH4013 meters
     IEM3000   Schneider Electric iEM3000 series
     INEPRO    Inepro Metering Pro 380
     JANITZA   Janitza meters
     MPM       Bernecker Engineering MPM3PM meters
     ORNO1P    ORNO WE-514 & WE-515
     ORNO1P504 ORNO WE-504
     ORNO3P    ORNO WE-516 & WE-517
     SBC       Saia Burgess Controls ALE3 meters
     SDM       Eastron SDM630/120/72DMv2
     SDM220    Eastron SDM220
     SDM230    Eastron SDM230
     SDM72     Eastron SDM72
     SEMTR     SolarEdge SE-MTR-3Y

Každý `model`, který se od těchto liší, se

považuje za typ zařízení _SunSpec_.

Pomocí `value` určíte hodnotu, která se má ze zařízení číst. Všechny podporované hodnoty jsou předdefinované v [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28).

U střídače nebo měřiče kompatibilního se _SunSpec_ se čtené hodnoty zadávají ve formátu `model:[block:]point` podle definice _SunSpec_. Například DC výkon na druhém stringu třífázového solárního střídače (odpovídá SunSpec Model 103) se čte takto: `value: 103:2:W`.

Model zařízení `model` a slave ID `id` jsou vždy povinné:

**Například**:

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

## Negace hodnot

U měřičů MBMD lze naměřené hodnoty invertovat tak, že před název aliasu přidáte `-` (znaménko minus).
To se hodí, když se měřiče používají v různých konfiguracích nebo orientacích montáže a je potřeba upravit znaménko naměřených hodnot.

### Podporovaná měření

Negace funguje u následujících měření MBMD:

- `power` – celkový výkon
- `currents` – proudy jednotlivých fází (pole)
- `powers` – výkony jednotlivých fází (pole)

### Syntaxe

```yaml
meters:
  - name: my-meter
    type: modbus
    model: sdm
    power: -Power # inverts the power value
```

### Příklady

#### Invertovaný celkový výkon

```yaml
meters:
  - name: pv-meter
    type: modbus
    model: sdm
    power: -Power # Power will be inverted (e.g. +1000 W becomes -1000 W)
```

#### Invertované výkony fází

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    powers:
      - -PowerL1 # Phase 1 inverted
      - -PowerL2 # Phase 2 inverted
      - -PowerL3 # Phase 3 inverted
```

#### Invertované proudy (jednotlivé fáze)

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    currents:
      - -CurrentL1 # Current Phase 1 inverted
      - CurrentL2 # Current Phase 2 normal
      - -CurrentL3 # Current Phase 3 inverted
```

### Případy použití

**Chybně namontované měřiče**:
Pokud je proudový senzor nebo měřič fyzicky namontován v opačném směru, můžete hodnoty opravit softwarově.

**Export do sítě vs. spotřeba**:
U solárních měřičů, u kterých je potřeba obrátit znaménkovou konvenci.

**Různá orientace proudových transformátorů**:
U vícefázových instalací s různě orientovanými proudovými transformátory.

## Ruční konfigurace

Pokud zařízení Modbus není přímo podporováno nebo pokud se mají číst či zapisovat hodnoty odlišné od předdefinovaných modelů, lze registry Modbus nastavit i ručně.
Kromě obecných nastavení Modbus (viz výše), která jsou stejná jako u předdefinovaných zařízení, je k tomu místo `value` potřeba definovat registr `register`. Zadat současně `value` i `register` není povoleno.

Definice registru vyžaduje následující parametry:

- `address`: adresa registru
- `type`: typ registru, povolené typy pro čtení jsou `coil`, `input`, `holding`, typy pro zápis jsou `writeholding`, `writeholdings`, `writecoil`
- `decode`: typ kódování dat. Povoleno je: `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. U typu `coil` se kódování ignoruje, ale přesto musí být zadáno. U typu `writecoil` musí být zadáno `bool8`.
- `bitmask`: volitelný údaj. Zadaná hodnota se s přečtenou hodnotou spojí operací AND, aby se získaly jednotlivé bity.

Další povolené parametry ruční konfigurace jsou:

- `scale`: desetinné číslo, kterým lze převádět přečtené hodnoty (např. W na kW nebo naopak). Touto hodnotou se násobí přečtená a dekódovaná surová hodnota.
- `timeout`: časový limit Modbus. Bez jednotky je hodnota v ns, jinak uveďte jednotku, např. 10s pro 10 sekund.

**Například**:

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # coil, holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
  bitmask: 2 # Optional: a bitmask that is applied to the read value. Here the mask is 0000000000000010b, ignored if value is 0
scale: -1.0 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 2s # timeout, without unit in ns
```

U dekódování `int32s/uint32s` se prohodí pořadí bajtů, což se hodí u zařízení E3/DC.

### Zápis registrů

Zapisovat lze holding registry i coily. K tomu je nutné zadat buď `type: writeholding` pro holding registry, nebo `type: writecoil` pro coily. Pro zápis více registrů (funkční kód 16) je k dispozici typ `writeholdings`.

`type: writeholding` vždy zapisuje 16bitový registr (int nebo bool16). Pro `decode` proto musí být vždy zadáno `uint16`.
`type: writecoil` zapisuje coil. Pro `decode` musí být zadáno `bool8`.

**Například**:

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding, writeholdings or writecoil
```

### Kompletní příklad

Kompletní příklad nabíječky definované uživatelem s rozhraním Modbus (zde Phoenix EM-CP-PP-ETH s IP adresou 192.168.1.10) může vypadat takto:

**Například**:

```yaml
chargers:
  - type: custom
    name: CustomCharger
    status:
      # Read the status of the charger
      # Either A,B,C or F
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      timeout: 3s
      register:
        address: 100
        type: input # Read an input register
        decode: int16
    enabled:
      # Is the charger enabled (1) or not (0)
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: coil # Read a coil
        decode: bool16 # Doesn't matter but required
    enable:
      # Enable the charger
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: writecoil # Write a coil
        decode: bool8
    maxcurrent:
      # Set the maximum current
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 300
        type: writeholding # Write a holding register
        decode: uint16
```
