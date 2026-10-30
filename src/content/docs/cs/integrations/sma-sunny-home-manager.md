---
title: "Sunny Home Manager"
description: "Vysvětluje, jak evcc zviditelní své nabíjecí body pro SMA Sunny Home Manager 2.0 v Sunny Portalu a volitelně mu umožní ovlivňovat nabíjecí výkon."
sidebar:
  order: 5
translatedFrom: "3e7eabc9fd7e"
---

evcc podporuje integraci se [SMA Sunny Home Managerem 2.0 (SHM)](https://www.sma.de/produkte/energiemanagement/sunny-home-manager).
Díky této integraci jsou nabíjecí body vidět v Sunny Portalu a volitelně je může řídit SHM.

## Jak to funguje

Integrace je trvale aktivní.
Jakmile evcc běží, automaticky poskytuje SEMP endpoint (Smart Energy Management Protocol) a ohlašuje ho přes mDNS v místní síti.
Díky tomu SHM nabíjecí body automaticky rozpozná a začlení.

Prostřednictvím integrace se všechny nabíjecí body evcc zobrazují v Sunny Portalu jako spotřebiče s podrobnými údaji o spotřebě.
Pokud je to výslovně povoleno, může SHM navíc ovlivňovat nabíjecí výkon.

SEMP endpoint je dostupný na adrese `http://[evcc-IP]:7070/semp/` a zobrazuje XML přehled registrovaných zařízení.

## Nastavení v Sunny Home Manageru

Po nakonfigurování evcc se nabíjecí body v Sunny Portalu automaticky nabídnou jako nová zařízení v části **Konfigurace > Přehled zařízení**.
Tam je můžete aktivovat a projít průvodcem konfigurací.
Podrobnosti k nastavení najdete v [příručce SMA](https://manuals.sma.de/HM-20/en-US/10426801547.html).

## ID zařízení

Na straně evcc není potřeba nic konfigurovat.
evcc potřebná ID zařízení vygeneruje automaticky.

Každý nabíjecí bod dostane jedinečné ID ve formátu:

```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Jednotlivé části znamenají:

- **AAAAAAAA**: ID výrobce (8 znaků, hexadecimálně)
- **BBBBBBBBBBBB**: ID zařízení (12 znaků, hexadecimálně)

Pokud nechcete automaticky přidělená ID použít (např. při přechodu na jiný hardware pro evcc), můžete zkopírovat stávající ID z endpointu `/semp/` starého systému a zadat je v části **Nastavení > Sunny Home Manager**.
Tím zajistíte, že SHM zařízení dál rozpozná.
