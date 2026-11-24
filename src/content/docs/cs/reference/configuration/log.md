---
title: "log, levels"
description: "Popisuje, jak v evcc.yaml nastavit úroveň logování, co znamenají úrovně od fatal po trace a jak zvýšit úroveň pro jednotlivé komponenty, např. nabíjecí bod."
sidebar:
  order: 11
translatedFrom: "5f61ea01c519"
---

## `log`

Určuje míru podrobnosti informací, které se logují do konzole.

**Možné hodnoty**:

- `fatal`: Zobrazí se pouze zprávy kategorie `fatal`. Jde o chyby, které brání fungování systému.
- `error`: Zobrazí se pouze zprávy kategorie `error`. Zpráv tohoto typu je velmi málo.
- `warn`: Zahrnuje `error` a navíc zobrazuje zprávy kategorie `warn`.
- `info`: Zahrnuje `warn` a navíc zobrazuje zprávy kategorie `info`.
- `debug`: Zahrnuje `info` a navíc zobrazuje zprávy kategorie `debug`. To je nutné pro analýzu chyb.
- `trace`: Zahrnuje `debug` a navíc zobrazuje zprávy kategorie `trace`. Jde o nejpodrobnější kategorii, která může vést k velmi velkému objemu logů. Obvykle není potřeba!

Nastavení platí pro [dlouhodobé logy](/cs/report-a-problem#system-logs) vaší instance evcc.
Stránka Logy ve webovém rozhraní vždy zobrazuje všechny úrovně, viz [Logy](/cs/report-a-problem#logs).

**Příklad**:

```yaml
log: error
```

---

## `levels`

Umožňuje nastavit různé úrovně logování pro různé komponenty evcc.

Určuje míru podrobnosti logování pro různé komponenty evcc.

**Možné komponenty**:

- `site`: Centrální komponenta evcc (řízení, výpočty atd.)
- `lp-X`: Příslušný nabíjecí bod, kde `X` je číslo podle pořadí v konfiguraci [`loadpoints`](/cs/reference/configuration/loadpoints) (nabíjecí body), počínaje `1`
- `sma`: Komponenta SMA HEMS, pokud je SMA Sunny Home Manager 2.0 integrován pomocí [`hems`](/cs/reference/configuration/hems)
- _`vehicle`_: Každé [`vehicle`](/cs/reference/configuration/vehicles) (vozidlo); jako název komponenty se uvádí hodnota parametru [`type`](/cs/reference/configuration/vehicles#type) (nebo název šablony).
- Podle případu použití lze navíc uvést další komponenty (např. `cache`, `db`, `influx`, `mqtt` atd.)

**Možné hodnoty pro každou komponentu**: Stejné jako hodnoty pro [`log`](#log)

**Příklad**:

```yaml
levels:
  site: debug
  lp-1: debug
  lp-2: debug
  tesla: trace
```
