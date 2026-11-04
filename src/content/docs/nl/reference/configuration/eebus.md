---
title: "eebus"
description: "Beschrijft hoe u EEBUS in evcc.yaml configureert met een eigen certificaat, netwerkinterfaces en SHIP-ID, en hoe u de instellingen naar de webinterface verplaatst."
sidebar:
  order: 14
translatedFrom: "0d970a6e61a6"
---

:::tip[Aanbeveling]
Configureer EEBUS in de webinterface onder **Configuratie → EEBUS**.
Het certificaat en de ID’s worden bij de eerste start automatisch gegenereerd.
:::

**Voorbeeld**:

```yaml
eebus:
  shipid: EVCC-1234567890abcdef
  interfaces:
    - eth0
  certificate:
    public: |
      -----BEGIN CERTIFICATE-----
      1234567890abcdef==
      -----END CERTIFICATE-----
    private: |
      -----BEGIN EC PRIVATE KEY-----
      1234567890abcdef
      -----END EC PRIVATE KEY-----
```

:::note[Migratie van YAML naar de webinterface]
Verwijder het blok `eebus:` uit uw `evcc.yaml` en start uw evcc-installatie opnieuw.
Er wordt automatisch een nieuw certificaat gegenereerd en alle EEBUS-apparaten moeten opnieuw worden gekoppeld.

Om uw bestaande certificaat te behouden, voert u het in het EEBUS-venster in onder **Toon geavanceerde instellingen**.
Dit is handig als de SKI (onderdeel van het openbare certificaat) al bij uw netbeheerder is geregistreerd voor [externe aansturing](/nl/external-limit).
:::

---

## Verplichte parameters

### `certificate`

Definieert het certificaat en de bijbehorende private sleutel voor de vereiste HTTPS-verbinding.

Bij configuratie via de webinterface wordt het certificaat automatisch gegenereerd.

**Voorbeeld**:

```yaml
certificate:
  public: |
    -----BEGIN CERTIFICATE-----
    1234567890abcdef==
    -----END CERTIFICATE-----
  private: |
    -----BEGIN EC PRIVATE KEY-----
    1234567890abcdef
    -----END EC PRIVATE KEY-----
```

---

### `certificate.public`

Het openbare certificaat.

**Voorbeeld**:

```yaml
public: |
  -----BEGIN CERTIFICATE-----
  1234567890abcdef==
  -----END CERTIFICATE-----
```

---

### `certificate.private`

De private sleutel van het certificaat.

**Voorbeeld**:

```yaml
private: |
  -----BEGIN EC PRIVATE KEY-----
  1234567890abcdef
  -----END EC PRIVATE KEY-----
```

---

## Optionele parameters

### `interfaces`

Definieert een lijst van netwerkinterfaces waarover EEBUS moet communiceren. Standaard worden alle interfaces gebruikt, maar dit kan tot communicatieproblemen leiden.

**Voorbeeld**:

```yaml
interfaces:
  - eth0
```

### `shipid`

Definieert de te gebruiken SHIP-ID.
Dit is normaal alleen nodig voor ontwikkeldoeleinden.

Normaal genereert evcc de SHIP-ID automatisch uit de `machine-id` (op echte hardware) of uit een willekeurig gegenereerde installatie-ID (in containeromgevingen zoals Docker), die in de database wordt opgeslagen.
U kunt een expliciete installatie-ID instellen via `plant` in `evcc.yaml` of de omgevingsvariabele `EVCC_PLANT`, wat wordt aanbevolen voor een betere overdraagbaarheid.
De SHIP-ID is gekoppeld aan het certificaat: als een van beide verandert, moeten apparaten opnieuw worden gekoppeld.

:::caution[Waarschuwing]
Wijzig deze waarde niet handmatig, tenzij u precies weet wat u doet.
:::

**Voorbeeld**:

```yaml
shipid: EVCC-1234567890abcdef
```
