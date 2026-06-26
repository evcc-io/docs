---
title: "evcc App"
sidebar:
  order: 4
---

The [companion app](/en/features/app) registers an `evcc://` URL scheme on your device.
Open such a link to prefill the server setup or jump to a page.

## Add a Server {#server}

Opens the server entry with prefilled values.
All parameters are optional.

Handy for onboarding: share a link or QR code that fills in the server URL and login, so nobody has to type a long address by hand.

```
evcc://server?url=...&title=...&username=...&password=...
```

| Parameter  | Description    |
| ---------- | -------------- |
| `url`      | Server URL     |
| `title`    | Display name   |
| `username` | Login user     |
| `password` | Login password |

Make sure the values are URL-encoded.

```
evcc://server?url=https://demo.evcc.io&title=Demo%20Server&username=admin&password=secret
```

![QR code for the example link](https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=evcc%3A%2F%2Fserver%3Furl%3Dhttps%3A%2F%2Fdemo.evcc.io%26title%3DDemo%2520Server%26username%3Dadmin%26password%3Dsecret&qzone=1&margin=0&size=150x150&ecc=L)

## Open the Forecast {#forecast}

Navigates to the forecast page.

```
evcc://forecast?server=<index>
```

`server` is the zero-based index of a saved server.
If omitted, the active server is used.

## Open a Loadpoint {#loadpoint}

Navigates to the loadpoints page.

```
evcc://loadpoint?lp=<number>&server=<index>
```

`lp` focuses the loadpoint with that one-based number.
If omitted, the current loadpoint is used.
`server` works the same as above.
