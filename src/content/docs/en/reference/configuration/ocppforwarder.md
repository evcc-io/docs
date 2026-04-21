---
title: "ocppForwarder"
sidebar:
  order: 18
---

The `ocppForwarder` setting is a list of rules that mirror a charger's OCPP session to an upstream OCPP central system in parallel to evcc.

This is useful when you want evcc to manage charging while a third-party OCPP backend (fleet management, billing platform, CPO) also receives the charger's telemetry and can issue commands.

Each charger connects normally to evcc's built-in OCPP server. For each matching rule, evcc opens a second ("sidecar") WebSocket connection to the configured upstream server and mirrors the session:

- **Charger → upstream**: all OCPP Calls (status notifications, meter values, etc.) are forwarded in real time.
- **Upstream → charger**: OCPP Calls sent by the upstream server (e.g. `UnlockConnector`, `ChangeConfiguration`) are injected into the charger, and the charger's reply is forwarded back to upstream. The upstream server can also be configured as read-only (`readOnly: true`), in which case it receives telemetry but cannot issue commands to the charger.

evcc remains the primary controller — it responds to the charger independently of the upstream server.

**For example**:

```yaml
ocppForwarder:
  - stationId: "*"
    upstreamUrl: wss://ocpp.example.com/ocpp/
  - stationId: CP-001
    upstreamUrl: wss://fleet.example.com/ocpp/
    password: s3cr3t
    upstreamStationId: SITE-CP-001
    readOnly: true
```

:::tip Sponsortoken required

For more information about evcc sponsorship, please visit [the sponsorship page](/en/sponsorship).

:::

---

## Required Parameters

### `stationId`

The OCPP station identifier of the charger to forward. Use `*` as a wildcard to match all chargers that do not have a more specific rule.

**For example**:

```yaml
stationId: CP-001
```

### `upstreamUrl`

The WebSocket URL of the upstream OCPP central system. Must include the path prefix expected by the upstream server; the charger's station ID (or `upstreamStationId` if set) is appended automatically.

**For example**:

```yaml
upstreamUrl: wss://ocpp.example.com/ocpp/
```

---

## Optional Parameters

### `password`

HTTP Basic Auth password used when connecting to the upstream server. The username is the charger's station ID (or `upstreamStationId` if set).

**For example**:

```yaml
password: s3cr3t
```

### `upstreamStationId`

Override the station ID sent to the upstream server. Useful when the upstream system uses a different identifier than the one the charger presents to evcc.

**For example**:

```yaml
upstreamStationId: SITE-CP-001
```

### `readOnly`

When set to `true`, the upstream server can observe the session but cannot issue commands to the charger. Any `Call` received from upstream is rejected with an OCPP `SecurityError` and not forwarded.

**Possible values**:

- `true`: Upstream commands are blocked
- `false` (default): Upstream commands are forwarded to the charger

**For example**:

```yaml
readOnly: true
```

### `insecure`

Skip TLS certificate validation when connecting to the upstream server over `wss://`. Useful for self-signed certificates in test environments.

:::caution
Do not use `insecure: true` in production — it disables certificate validation and exposes the connection to man-in-the-middle attacks.
:::

**For example**:

```yaml
insecure: true
```

### `caCert`

PEM-encoded CA certificate used to validate the upstream server's TLS certificate. Use this when the upstream server uses a certificate signed by a private or internal CA that is not trusted by the system.

**For example**:

```yaml
caCert: |
  -----BEGIN CERTIFICATE-----
  MIIDXTCCAkWgAwIBAgIJA...
  -----END CERTIFICATE-----
```
