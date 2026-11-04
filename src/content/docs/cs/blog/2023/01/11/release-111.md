---
date: 2023-01-11
title: "Verze 0.111"
description: "Poznámky k vydání evcc 0.111 z ledna 2023 s chytřejším plánovačem nabíjení, který využívá dynamické ceny od awattar a Tibber, ručně zadané tarify a data o CO₂."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "ff6ba87e7923"
---

![evcc v0.111](../../../../../en/blog/2023/01/11/banner-evcc-release-111.webp)

Příhodně právě 11. ledna přináší vydání 0.111 několik nových funkcí, které vám zde chceme krátce představit.

<!-- excerpt -->

## 🧞‍♂️ Nový plánovač nabíjení: využití obnovitelné elektřiny ze sítě

Funkce cílového nabíjení je v evcc už nějakou dobu.
Můžete s ní nastavit cílový čas, kdy má připojené vozidlo dosáhnout určitého stavu nabití.
Funkce se hodí např. k tomu, abyste vozidlo před delší cestou nabili přesně na čas odjezdu.

![Cílové nabíjení](../../../../../en/blog/2023/01/11/zielladen.webp)

Dosavadní strategie nabíjení byla poměrně jednoduchá: nabíjení se spustí co nejpozději, aby baterie dosáhla požadovaného stavu přesně na čas odjezdu.
Šetří to baterii, protože nezůstává dlouho na vysokém stavu nabití.

S tímto vydáním je plánovač nabíjení chytřejší a zohledňuje dynamické ceny energie a data o CO₂.
Nabíjení se plánuje do časových oken, kdy je v síti obzvlášť vysoký podíl obnovitelné elektřiny.
Šetří to peníze, ulevuje to síti a snižuje potřebu fosilních paliv.

### 📈 Burzovní ceny od awattar a Tibber

Hodinové tarify od awattar a Tibber podporujeme už delší dobu.
Dosud jsme ale měli jen jednoduché řízení, které povolilo nabíjení pod předem nakonfigurovanou cenou elektřiny (`cheap`).

Nyní se hodinové ceny používají i při plánování nabíjení a vozidlo nabíjí tehdy, když je elektřina ze sítě obzvlášť levná.

Konfigurace pro awattar

```yaml
tariffs:
  grid:
    type: template
    template: awattar
    region: de # nebo at
```

Konfigurace pro Tibber

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "476...963a4" # přístupový token
```

### 📊 Ručně zadané časové tarify

Nyní můžete zadat i časové tarify.
Zde je příklad konfigurace s levnou energií v noci a ještě levnější energií o víkendu:

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

I tyto ceny se promítají do nového plánovacího algoritmu.

### 🌱 Data o CO₂ z GrünStromIndex a Electricity Maps

I bez dynamického tarifu můžete nabíjet šetrně ke klimatu.
Proto nově zapojujeme data o CO₂.
Aktuálně podporujeme dva zdroje, jsme ale otevřeni dalším návrhům.

[GrünStromIndex](https://gruenstromindex.de) poskytuje regionální předpovědi toho, jak čistá je elektřina ze sítě v Německu.
Stačí zadat své poštovní směrovací číslo.

```yaml
planner:
  type: template
  template: grünstromindex
  zip: 12349
```

[Electricity Maps](https://app.electricitymaps.com/map) poskytuje předpovědi pro celý svět.
Pro použití s evcc potřebujete token a prefix URL.
Obojí získáte s [bezplatným účtem v API portálu](https://api-portal.electricitymaps.com/).

```yaml
planner:
  type: template
  template: electricitymaps
  uri: https://api-access.electricitymaps.com/2w...1g/
  token: Rp...D2
  zone: DE
```

## Výhled

Pro jedno z příštích vydání pracujeme na vizuálním zobrazení plánu nabíjení.
Pak uvidíte i časová okna vypočtená algoritmem a skutečnou úsporu nákladů nebo CO₂.

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
