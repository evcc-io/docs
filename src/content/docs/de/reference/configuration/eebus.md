---
title: "eebus"
description: "So richtest du EEBUS in der evcc.yaml mit eigenem Zertifikat, Netzwerkschnittstellen und SHIP-ID ein und übernimmst die Einstellungen in die Weboberfläche."
sidebar:
  order: 14
translatedFrom: "0d970a6e61a6"
---

:::tip[Empfehlung]
Konfiguriere EEBUS in der Weboberfläche unter **Konfiguration → EEBUS**.
Zertifikat und Kennungen werden beim ersten Start automatisch generiert.
:::

**Beispiel**:

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

:::note[Migration von YAML zur Weboberfläche]
Entferne den `eebus:`-Block aus deiner `evcc.yaml` und starte neu.
Ein neues Zertifikat wird automatisch generiert und alle EEBUS-Geräte müssen neu gekoppelt werden.

Wenn du dein bisheriges Zertifikat behalten möchtest, trage es im EEBUS-Dialog unter **Erweiterte Einstellungen anzeigen** ein.
Das ist sinnvoll, wenn die SKI (Bestandteil des öffentlichen Zertifikats) bereits für die [externe Begrenzung](/de/external-limit) beim Netzbetreiber hinterlegt ist.
:::

---

## Erforderliche Parameter

### `certificate`

Definiert das zu verwendende Zertifikat und dessen privaten Schlüssel für die vorgeschriebene HTTPS-Verbindung.

Bei der Konfiguration in der Weboberfläche wird das Zertifikat automatisch generiert.

**Beispiel**:

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

Das öffentliche Zertifikat.

**Beispiel**:

```yaml
public: |
  -----BEGIN CERTIFICATE-----
  1234567890abcdef==
  -----END CERTIFICATE-----
```

---

### `certificate.private`

Der private Schlüssel des Zertifikats.

**Beispiel**:

```yaml
private: |
  -----BEGIN EC PRIVATE KEY-----
  1234567890abcdef
  -----END EC PRIVATE KEY-----
```

---

## Optionale Parameter

### `interfaces`

Definiert eine Liste von Netzwerkschnittstellen, über die EEBUS kommunizieren soll. Standardmäßig werden alle Schnittstellen verwendet, was jedoch zu Kommunikationsproblemen führen kann.

**Beispiel**:

```yaml
interfaces:
  - eth0
```

### `shipid`

Definiert die zu verwendende SHIP-ID.
Dies sollte nur für Entwicklungszwecke notwendig sein.

Normalerweise generiert evcc die SHIP-ID automatisch aus der `machine-id` (auf realer Hardware) oder einer zufällig generierten Plant-ID (in Container-Umgebungen wie Docker), die in der Datenbank gespeichert wird.
Du kannst eine explizite Plant-ID über `plant` in der `evcc.yaml` oder die Umgebungsvariable `EVCC_PLANT` setzen, was für eine bessere Übertragbarkeit auf andere Hardware empfohlen wird.
Die SHIP-ID ist fest mit dem Zertifikat verknüpft: Ändert sich eines von beiden, muss die Kopplung mit den Geräten neu durchgeführt werden.

:::caution[Achtung]
Ändere diesen Wert nicht manuell, wenn du nicht genau weißt, was du tust.
:::

**Beispiel**:

```yaml
shipid: EVCC-1234567890abcdef
```
