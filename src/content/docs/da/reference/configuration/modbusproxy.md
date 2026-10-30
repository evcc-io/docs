---
title: "modbusproxy"
description: "Sådan opsætter du Modbus-proxyen i evcc.yaml, så andre systemer kan dele en Modbus-forbindelse til en inverter eller måler med din evcc-installation."
sidebar:
  order: 18
translatedFrom: "7191bc3757f6"
---

Indstillingen `modbusproxy` er en liste over enheder, der stilles til rådighed for tredjepartssystemer via Modbus TCP på netværket.

Nogle enheder tillader kun et meget begrænset antal Modbus-TCP-klienter. I værste fald tillades kun en enkelt forbindelse, som det er tilfældet med komponenter fra SolarEdge. Desuden må der i serielle RS485-bussystemer med Modbus RTU kun være én master.
Med `modbusproxy` kan din evcc-installation fungere som Modbus-proxy, der kan dele eksisterende Modbus-forbindelser med andre systemer. Så er det kun evcc, der kommunikerer direkte med enheden, mens andre systemer kommunikerer med evcc, som samler forbindelserne og videresender dem til enheden.

Indstillingen `modbusproxy` kan indeholde flere proxyer.

**Eksempel**:

```yaml
modbusproxy:
  - port: 5021
    uri: 192.0.2.2:502
  - port: 5022
    device: /dev/ttyUSB0
    baudrate: 9600
    comset: "8N1"
  - port: 5023
    uri: 192.0.2.3:502
    rtu: true
```

:::note
For _indgående_ forbindelser (fra tredjepartssystemer som hjemmeautomatiseringssystemer og dataloggere) understøtter proxyfunktionen udelukkende Modbus TCP.

For _udgående_ forbindelser til den enhed, der skal aflæses (f.eks. inverter eller energimåler), kan protokollen oversættes i henhold til enhedens konfiguration.
:::

:::tip[Sponsortoken påkrævet]

Mere om sponsoratet finder du på [siden om sponsorat](/da/sponsorship).

:::

---

## Påkrævede parametre

### `port`

Den lokale TCP/IP-port, som proxyserveren lytter på, og hvor indgående Modbus-TCP-forbindelser fra tredjepartssystemer accepteres.

**Eksempel**:

```yaml
port: 5021
```

## Valgfrie parametre

### `uri`

Enhedens IP-adresse og port i almindeligt URI-format.

Hver angivet port skal være unik og må ikke allerede bruges af et andet program på evcc-værten, men den behøver ikke at være forskellig fra enhedens port. Det er derfor gyldigt at definere en konfiguration for port 502, der henviser til port 502 på enheden.

**Eksempel**:

```yaml
- port: 502
  uri: 192.0.2.2:502
```

### `rtu`

Modbus TCP bruges typisk til kommunikation med enheder på netværket. Om nødvendigt kan du skifte til Modbus RTU over TCP ved at angive `rtu: true`. Det bruges typisk til simple, transparente RS485-TCP-konvertere (uden protokoloversættelse). Indstillingen skal svare til enhedens konfiguration og ignoreres for serielle enheder.

**Eksempel**:

```yaml
rtu: true
```

### `readonly`

Med denne parameter kan du forhindre, at tredjepartssystemer skriver via Modbus.

**Mulige værdier**:

- `true`: Skriveadgang blokeres uden svar
- `deny`: Skriveadgang blokeres med en Modbus-fejl som svar
- `false`: Skriveadgang videresendes

Funktionskoder, som proxyen ikke selv håndterer, f.eks. Huaweis producentspecifikke funktionskode 0x41, kan indeholde skriveoperationer.
Begge skrivebeskyttede tilstande blokerer dem derfor med en Modbus-fejl.
Med `readonly: false` videresender proxyen dem uændret, men kun til enheder, der er tilsluttet via Modbus TCP.
Home Assistant-integrationen til Huawei-invertere kræver f.eks. `readonly: false`.

:::caution
Proxyen kontrollerer ikke, hvem der opretter forbindelse.
Med `readonly: false` (standard) kan alle enheder på dit netværk, der kan nå porten, skrive til enheden.
Kør kun proxyen på et netværk, du har tillid til.
:::

**Eksempel**:

```yaml
readonly: true
```
