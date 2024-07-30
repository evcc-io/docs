---
sidebar_position: 13
---

# `eebus`

:::warning
EEBUS Unterstützung ist noch im experimentellen Stadium. Es wird hier sicher zu dem einen oder anderen Problem kommen!

Wenn EEBUS über Home Assistant genutzt wird, muss unbedingt das Interface "end0" angegeben und die IP-Adresse von Home Assistant im URI (192.168.1.216:4712) eingetragen werden.
Sehe [Issue](https://github.com/evcc-io/hassio-addon/issues/99)
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

Hiermit kann die zu verwendende Geräte-ID (SKI) definiert werden.

**Beispiel**:

```yaml
shipid: EVCC-1234567890abcdef
```
