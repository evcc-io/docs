---
title: "eebus"
description: "Popisuje, jak v evcc.yaml nastavit EEBUS s vlastním certifikátem, síťovými rozhraními a SHIP-ID a jak nastavení převést do webového rozhraní."
sidebar:
  order: 14
translatedFrom: "0d970a6e61a6"
---

:::tip[Doporučení]
EEBUS nastavte ve webovém rozhraní v části **Konfigurace → EEBus**.
Certifikát a identifikátory se při prvním spuštění vygenerují automaticky.
:::

**Příklad**:

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

:::note[Převod z YAML do webového rozhraní]
Odstraňte blok `eebus:` ze svého `evcc.yaml` a restartujte vaši instanci evcc.
Automaticky se vygeneruje nový certifikát a všechna zařízení EEBUS je nutné znovu spárovat.

Pokud chcete zachovat stávající certifikát, zadejte ho v dialogovém okně EEBUS pod **Zobrazit pokročilá nastavení**.
To se hodí, pokud je SKI (součást veřejného certifikátu) už zaregistrován u vašeho provozovatele sítě pro [externí řízení](/cs/external-limit).
:::

---

## Povinné parametry

### `certificate`

Určuje certifikát a jeho privátní klíč, které se použijí pro spojení HTTPS, které EEBUS vyžaduje.

Při konfiguraci ve webovém rozhraní se certifikát vygeneruje automaticky.

**Příklad**:

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

Veřejný certifikát.

**Příklad**:

```yaml
public: |
  -----BEGIN CERTIFICATE-----
  1234567890abcdef==
  -----END CERTIFICATE-----
```

---

### `certificate.private`

Privátní klíč certifikátu.

**Příklad**:

```yaml
private: |
  -----BEGIN EC PRIVATE KEY-----
  1234567890abcdef
  -----END EC PRIVATE KEY-----
```

---

## Volitelné parametry

### `interfaces`

Určuje seznam síťových rozhraní, přes která má EEBUS komunikovat. Ve výchozím stavu se používají všechna rozhraní, to ale může vést k problémům s komunikací.

**Příklad**:

```yaml
interfaces:
  - eth0
```

### `shipid`

Určuje SHIP-ID, které se má použít.
Zpravidla ho potřebujete nastavit jen při vývoji.

Za normálních okolností evcc generuje SHIP-ID automaticky z `machine-id` (na skutečném hardwaru) nebo z náhodně vygenerovaného ID instalace (v kontejnerových prostředích, jako je Docker), které se ukládá do databáze.
Explicitní ID instalace můžete nastavit pomocí `plant` v `evcc.yaml` nebo proměnnou prostředí `EVCC_PLANT`, což se doporučuje kvůli lepší přenositelnosti.
SHIP-ID je svázané s certifikátem. Pokud se změní jedno z nich, je nutné zařízení znovu spárovat.

:::caution[Upozornění]
Tuto hodnotu ručně neměňte, pokud přesně nevíte, co děláte.
:::

**Příklad**:

```yaml
shipid: EVCC-1234567890abcdef
```
