---
sidebar_position: 13
---

# EEBUS

:::warning
EEBUS Unterstützung ist noch im experimentellen Stadium. Es wird hier sicher zu dem einen oder anderen Problem kommen!
:::

**Beispiel**:

```yaml
eebus:
  shipid: EVCC-......
  interfaces:
  - eth0
  # local signed certificate, required for eebus chargers and generated via `evcc eebus-cert`
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
