---
title: "log, levels"
description: "Beschrijft hoe u in evcc.yaml het logniveau instelt, wat de niveaus fatal tot trace betekenen en hoe u het voor afzonderlijke componenten zoals een laadpunt verhoogt."
sidebar:
  order: 11
translatedFrom: "5f61ea01c519"
---

## `log`

Definieert het detailniveau van de loginformatie op de console.

**Mogelijke waarden**:

- `fatal`: Alleen berichten van de categorie `fatal` worden weergegeven. Dit zijn fouten die verhinderen dat het systeem functioneert.
- `error`: Alleen berichten van de categorie `error` worden weergegeven. Er zijn maar weinig berichten van dit type.
- `warn`: Omvat `error` en toont daarnaast berichten van de categorie `warn`.
- `info`: Omvat `warn` en toont daarnaast berichten van de categorie `info`.
- `debug`: Omvat `info` en toont daarnaast berichten van de categorie `debug`. Dit is nodig voor foutanalyse.
- `trace`: Omvat `debug` en toont daarnaast berichten van de categorie `trace`. Dit is de meest gedetailleerde categorie en kan zeer grote hoeveelheden loggegevens opleveren. Meestal is dit niet nodig!

De instelling geldt voor de [langetermijnlogs](/nl/report-a-problem#system-logs) van uw installatie.
De pagina Logboeken in de webinterface registreert altijd alle niveaus, zie [Logboeken](/nl/report-a-problem#logs).

**Voorbeeld**:

```yaml
log: error
```

---

## `levels`

Maakt het mogelijk om verschillende logniveaus voor de diverse componenten van evcc te configureren.

Definieert het detailniveau van het loggen voor verschillende evcc-componenten.

**Mogelijke componenten**:

- `site`: De centrale evcc-component (regeling, berekeningen enz.)
- `lp-X`: Het betreffende laadpunt, waarbij `X` wordt genummerd volgens de volgorde in de configuratie [`loadpoints`](/nl/reference/configuration/loadpoints) (laadpunten), beginnend bij `1`
- `sma`: De SMA HEMS-component als de SMA Sunny Home Manager 2.0 via [`hems`](/nl/reference/configuration/hems) is geïntegreerd
- _`vehicle`_: Elk [`vehicle`](/nl/reference/configuration/vehicles) (voertuig), waarbij u de bijbehorende waarde van de parameter [`type`](/nl/reference/configuration/vehicles#type) (of template) moet opgeven.
- Daarnaast kunnen afhankelijk van de toepassing extra componenten worden opgegeven (bijv. `cache`, `db`, `influx` of `mqtt`)

**Mogelijke waarden per component**: Identiek aan de waarden van [`log`](#log)

**Voorbeeld**:

```yaml
levels:
  site: debug
  lp-1: debug
  lp-2: debug
  tesla: trace
```
