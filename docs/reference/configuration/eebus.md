---
sidebar_position: 13
---

# `eebus`

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

---

## Erforderliche Parameter

### `certificate`

Definiert das zu verwendende Zertifikat und dessen privaten Schlüssel für die vorgeschriebene HTTPS Verbindung.

Dieses kann über `evcc eebus-cert` erstellt werden.

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

Das öffentliche Zertifikat

**Beispiel**:

```yaml
public: |
  -----BEGIN CERTIFICATE-----
  1234567890abcdef==
  -----END CERTIFICATE-----
```

---

### `certificate.private`

Der private Schlüssel des Zertifikats

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

Definiert eine Liste von Netzwerkschnittstellen, über welche EEBUS kommunizieren soll. Standardmäßig werden alle Schnittstellen verwendet, dies kann jedoch zu Kommunikationsproblemen führen.

**Beispiel**:

```yaml
interfaces:
  - eth0
```

### `shipid`

Hiermit kann die zu verwendende SHIP-ID definiert werden.
Dies sollte nur für Entwicklungszwecke notwendig sein.

Normalerweise generiert evcc die SHIP-ID automatisch aus der `machine-id` (auf realer Hardware) oder einer zufällig generierten Plant-ID (in Container-Umgebungen wie Docker), die in der Datenbank gespeichert wird.
Du kannst eine explizite Plant-ID über `plant` in der `evcc.yaml` oder die `EVCC_PLANT` Umgebungsvariable setzen – empfohlen für bessere Portierbarkeit.
Die SHIP-ID ist fest mit dem Zertifikat verknüpft – ändert sich eines von beiden, muss die Kopplung mit den Geräten neu durchgeführt werden.

:::warning Achtung
Ändere diesen Wert nicht manuell, wenn du nicht genau weißt, was du tust.
:::

**Beispiel**:

```yaml
shipid: EVCC-1234567890abcdef
```
