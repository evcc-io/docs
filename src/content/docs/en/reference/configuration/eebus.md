---
title: "eebus"
sidebar:
  order: 13
---

:::tip[Recommendation]
Configure EEBus in the UI under **Configuration → EEBus**.
Certificate and identifiers are generated automatically on first start.
:::

**For example**:

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

:::note[Migration from YAML to UI]
Remove the `eebus:` block from your `evcc.yaml` and restart.
A new certificate is generated automatically and all EEBus devices must be paired again.

To keep your existing certificate, enter it in the EEBus dialog under **Show advanced settings**.
This is useful if the SKI (part of the public certificate) is already registered with your grid operator for [external control](/en/external-limit).
:::

---

## Required Parameters

### `certificate`

Defines the certificate and its private key to be used for the required HTTPS connection.

When configuring in the UI, the certificate is generated automatically.

**For example**:

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

The public certificate.

**For example**:

```yaml
public: |
  -----BEGIN CERTIFICATE-----
  1234567890abcdef==
  -----END CERTIFICATE-----
```

---

### `certificate.private`

The private key of the certificate.

**For example**:

```yaml
private: |
  -----BEGIN EC PRIVATE KEY-----
  1234567890abcdef
  -----END EC PRIVATE KEY-----
```

---

## Optional Parameters

### `interfaces`

Defines a list of network interfaces through which EEBus should communicate. By default, all interfaces are used, but this might lead to communication issues.

**For example**:

```yaml
interfaces:
  - eth0
```

### `shipid`

Defines the SHIP-ID to be used.
This should only be necessary for development purposes.

Normally evcc generates the SHIP-ID automatically from the `machine-id` (on real hardware) or a randomly generated plant ID (in container environments like Docker), which is stored in the database.
You can set an explicit plant ID via `plant` in `evcc.yaml` or the `EVCC_PLANT` environment variable – recommended for better portability.
The SHIP-ID is tied to the certificate – if either changes, pairing with devices must be redone.

:::caution[Warning]
Don't change this value manually unless you know exactly what you're doing.
:::

**For example**:

```yaml
shipid: EVCC-1234567890abcdef
```
