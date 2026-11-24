---
title: "log, levels"
description: "Sådan indstiller du logniveauet i evcc.yaml, forstår niveauerne fra fatal til trace og hæver niveauet for enkelte komponenter som et ladepunkt."
sidebar:
  order: 11
translatedFrom: "5f61ea01c519"
---

## `log`

Angiver detaljeringsgraden for logoplysninger i konsollen.

**Mulige værdier**:

- `fatal`: Kun beskeder i kategorien `fatal` vises. Det er fejl, der forhindrer systemet i at fungere.
- `error`: Kun beskeder i kategorien `error` vises. Der er meget få beskeder af denne type.
- `warn`: Omfatter `error` og viser desuden beskeder i kategorien `warn`.
- `info`: Omfatter `warn` og viser desuden beskeder i kategorien `info`.
- `debug`: Omfatter `info` og viser desuden beskeder i kategorien `debug`. Det er nødvendigt til fejlanalyse.
- `trace`: Omfatter `debug` og viser desuden beskeder i kategorien `trace`. Det er den mest detaljerede kategori og kan give meget store mængder logdata. Generelt er den sjældent nødvendig!

Indstillingen gælder for din installations [langtidslogs](/da/report-a-problem#system-logs).
Log-siden i webgrænsefladen registrerer altid alle niveauer, se [Log](/da/report-a-problem#logs).

**Eksempel**:

```yaml
log: error
```

---

## `levels`

Gør det muligt at konfigurere forskellige logniveauer for forskellige komponenter i evcc.

Angiver detaljeringsgraden for logning for forskellige evcc-komponenter.

**Mulige komponenter**:

- `site`: Den centrale evcc-komponent (styring, beregninger osv.)
- `lp-X`: Det pågældende ladepunkt, hvor `X` er nummereret efter rækkefølgen i [`loadpoints`](/da/reference/configuration/loadpoints)-konfigurationen (ladepunkter), begyndende med `1`
- `sma`: SMA HEMS-komponenten, hvis SMA Sunny Home Manager 2.0 er integreret via [`hems`](/da/reference/configuration/hems)
- _`vehicle`_: Hvert [`vehicle`](/da/reference/configuration/vehicles) (køretøj), hvor du skal angive den tilsvarende værdi af parameteren [`type`](/da/reference/configuration/vehicles#type) (eller skabelonen).
- Derudover kan der afhængigt af anvendelsen angives yderligere komponenter (f.eks. `cache`, `db`, `influx`, `mqtt` osv.)

**Mulige værdier for hver komponent**: Identiske med værdierne for [`log`](#log)

**Eksempel**:

```yaml
levels:
  site: debug
  lp-1: debug
  lp-2: debug
  tesla: trace
```
