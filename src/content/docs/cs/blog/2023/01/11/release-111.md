---
date: 2023-01-11
title: "Verze 0.111"
description: "Poznámky k vydání evcc 0.111 z ledna 2023 s chytřejším plánovačem nabíjení, který využívá dynamické ceny od awattar a Tibber, ruční tarify a data o CO₂."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "2770b38763f5"
---

![evcc v0.111](../../../../../en/blog/2023/01/11/banner-evcc-release-111.webp)

Přesně 11. ledna jsme s vydáním 0.111 opět připravili několik nových funkcí, které vám zde chceme krátce představit.

<!-- excerpt -->

## 🧞‍♂️ Nový plánovač nabíjení: využití obnovitelné elektřiny ze sítě

Funkce cílového nabíjení je v evcc už nějakou dobu. Můžete s ní nastavit cílový čas, kdy má připojené vozidlo dosáhnout určitého stavu nabití. Funkce se hodí např. k tomu, abyste auto před delší cestou nabili přesně na čas odjezdu.

![Cílové nabíjení](../../../../../en/blog/2023/01/11/zielladen.webp)

Dosavadní strategie nabíjení byla poměrně jednoduchá: nabíjení se spustí co nejpozději, aby baterie dosáhla požadovaného stavu přesně na čas odjezdu. Šetří to baterii, protože dlouho nestojí na vysokém stavu nabití.

S tímto vydáním je plánovač nabíjení chytřejší a zohledňuje dynamické ceny energie a data o CO₂. Nabíjení se tak plánuje do časových oken, kdy je v síti obzvlášť hodně obnovitelné elektřiny. Šetří to peníze, ulevuje to elektrické síti a snižuje potřebu fosilních zdrojů energie.

### 📈 Burzovní ceny od awattar a Tibber

Hodinové tarify od awattar a Tibber máme napojené už delší dobu. Dosud jsme ale měli jen jednoduché řízení, které povolí nabíjení pod předem nakonfigurovanou cenou elektřiny (`cheap`).

Nyní se hodinové ceny používají i při plánování nabíjení a auto nabíjí tehdy, když je elektřina ze sítě obzvlášť levná.

Konfigurace pro awattar

```yaml
tariffs:
  grid:
    type: template
    template: awattar
    region: de # or at
```

Konfigurace pro Tibber

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "476...963a4" # access token
```

### 📊 Ruční časové tarify

Nyní je také možné zadat časové tarify. Zde je příklad konfigurace pro levnou energii v noci a ještě levnější energii o víkendu:

```yaml
tariffs:
  grid:
    type: fixed
    price: 0.294 # EUR/kWh
    zones:
      - days: Mo-Fr
        hours: 2-5
        price: 0.2 # EUR/kWh
      - days: Sa,So
        price: 0.15 # EUR/kWh
```

I tato cenová data se promítají do nového plánovacího algoritmu.

### 🌱 Data o CO₂ z GrünStromIndex a ElectricityMap

Kdo nemá dynamický tarif, může přesto nabíjet šetrně ke klimatu. Proto nově zapojujeme data o CO₂. Aktuálně máme implementované dva zdroje. Jsme ale otevřeni dalším návrhům.

[GrünStromIndex](https://gruenstromindex.de) poskytuje regionální předpovědi čistoty elektřiny ze sítě pro Německo. Stačí zadat své poštovní směrovací číslo.

```yaml
planner:
  type: template
  template: grünstromindex
  zip: 12349
```

[Electricity Map](https://app.electricitymaps.com/map) poskytuje celosvětové předpovědi. Pro použití v evcc potřebujete token a prefix URL. Tyto údaje získáte s [bezplatným účtem v API portálu](https://api-portal.electricitymaps.com/).

```yaml
planner:
  type: template
  template: electricitymaps
  uri: https://api-access.electricitymaps.com/2w...1g/
  token: Rp...D2
  zone: DE
```

## Výhled

Pro jedno z příštích vydání pracujeme na vizuálním zobrazení plánu nabíjení. Pak uvidíte i časová okna vypočtená algoritmem a konkrétní úsporu nákladů nebo CO₂.

## Další nové funkce

Kromě obvyklých drobných vylepšení a oprav chyb obsahuje toto vydání i několik dalších nových funkcí:

- 🔋🪫 Lepší podpora více domácích baterií [#5598](https://github.com/evcc-io/evcc/pull/5598)
- 🌞 Podpora FoxESS [#5721](https://github.com/evcc-io/evcc/pull/5721)
- 🔌 Podpora Tesla Wall Connectoru 3 [#5341](https://github.com/evcc-io/evcc/pull/5341)
- 🚙 Podpora vozidel Volvo [#5681](https://github.com/evcc-io/evcc/pull/5681)
- 🏳️‍🌈 Tři nové jazyky UI

**Děkujeme za vaši podporu!**<br />
core tým evcc<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) a [@naltatis](https://github.com/naltatis)
