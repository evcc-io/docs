---
title: "eebus"
description: "Sådan konfigurerer du EEBUS i evcc.yaml med dit eget certifikat, netværksgrænseflader og SHIP-ID, og sådan flytter du opsætningen til webgrænsefladen."
sidebar:
  order: 14
translatedFrom: "0d970a6e61a6"
---

:::tip[Anbefaling]
Konfigurer EEBUS i webgrænsefladen under **Opsætning → EEBUS**.
Certifikat og identifikatorer genereres automatisk ved første start.
:::

**Eksempel**:

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

:::note[Migrering fra YAML til webgrænsefladen]
Fjern blokken `eebus:` fra din `evcc.yaml`, og genstart.
Der genereres automatisk et nyt certifikat, og alle EEBUS-enheder skal parres igen.

Hvis du vil beholde dit eksisterende certifikat, skal du indtaste det i EEBUS-dialogboksen under **Vis avancerede indstillinger**.
Det er nyttigt, hvis SKI'en (en del af det offentlige certifikat) allerede er registreret hos dit netselskab til [ekstern styring](/da/external-limit).
:::

---

## Påkrævede parametre

### `certificate`

Angiver certifikatet og dets private nøgle, der skal bruges til den nødvendige HTTPS-forbindelse.

Ved konfiguration i webgrænsefladen genereres certifikatet automatisk.

**Eksempel**:

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

Det offentlige certifikat.

**Eksempel**:

```yaml
public: |
  -----BEGIN CERTIFICATE-----
  1234567890abcdef==
  -----END CERTIFICATE-----
```

---

### `certificate.private`

Certifikatets private nøgle.

**Eksempel**:

```yaml
private: |
  -----BEGIN EC PRIVATE KEY-----
  1234567890abcdef
  -----END EC PRIVATE KEY-----
```

---

## Valgfrie parametre

### `interfaces`

Angiver en liste over netværksgrænseflader, som EEBUS skal kommunikere via. Som standard bruges alle grænseflader, men det kan føre til kommunikationsproblemer.

**Eksempel**:

```yaml
interfaces:
  - eth0
```

### `shipid`

Angiver det SHIP-ID, der skal bruges.
Det bør kun være nødvendigt til udviklingsformål.

Normalt genererer evcc SHIP-ID'et automatisk ud fra `machine-id` (på rigtig hardware) eller et tilfældigt genereret anlægs-ID (i containermiljøer som Docker), som gemmes i databasen.
Du kan angive et eksplicit anlægs-ID via `plant` i `evcc.yaml` eller miljøvariablen `EVCC_PLANT`, hvilket anbefales af hensyn til bedre portabilitet.
SHIP-ID'et er knyttet til certifikatet. Hvis et af dem ændres, skal parringen med enhederne gentages.

:::caution[Advarsel]
Ændr ikke denne værdi manuelt, medmindre du ved præcis, hvad du gør.
:::

**Eksempel**:

```yaml
shipid: EVCC-1234567890abcdef
```
