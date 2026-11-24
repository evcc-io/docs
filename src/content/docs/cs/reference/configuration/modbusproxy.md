---
title: "modbusproxy"
description: "V evcc.yaml nastavíte Modbus proxy, díky které mohou jiné systémy sdílet s vaší instancí evcc jedno spojení Modbus se střídačem nebo měřičem."
sidebar:
  order: 18
translatedFrom: "7191bc3757f6"
---

Nastavení `modbusproxy` je seznam zařízení, která jsou pro systémy třetích stran zpřístupněna v síti přes Modbus TCP.

Některá zařízení povolují jen velmi omezený počet klientů Modbus TCP. V nejhorším případě je povoleno jen jediné spojení, jako je tomu u komponent SolarEdge. Na sériových sběrnicích Modbus RTU RS485 je navíc povolen jen jeden master.
Pomocí `modbusproxy` lze evcc nastavit jako Modbus proxy, která sdílí stávající spojení Modbus s dalšími systémy. evcc tak komunikuje přímo se zařízením, zatímco ostatní systémy komunikují s vaší instancí evcc, která komunikační spojení sdružuje a předává je cílovému zařízení.

Nastavení `modbusproxy` obsahuje seznam jednotlivých proxy.

**Příklad**:

```yaml
modbusproxy:
  - port: 5021
    uri: 192.0.2.2:502
  - port: 5022
    device: /dev/ttyUSB0
    baudrate: 9600
    comset: "8N1"
  - port: 5023
    uri: 192.0.2.3:502
    rtu: true
```

:::note
Pro _příchozí_ spojení (ze systémů třetích stran, jako je domácí automatizace nebo loggery) podporuje funkce proxy výhradně Modbus TCP.

Pro _odchozí_ spojení k dotazovanému cílovému zařízení (např. střídači nebo měřiči) se protokol může překládat podle konfigurace cílového zařízení.
:::

:::tip[Vyžaduje sponzorský token]

Další informace o sponzorství evcc najdete na [stránce o sponzorství](/cs/sponsorship).

:::

---

## Povinné parametry

### `port`

Místní port TCP/IP, na kterém proxy naslouchá a přijímá příchozí spojení Modbus TCP ze systémů třetích stran.

**Příklad**:

```yaml
port: 5021
```

## Volitelné parametry

### `uri`

IP adresa a port cílového zařízení v běžném formátu URI.

Každý zadaný port musí být jedinečný a nesmí ho na hostiteli s evcc používat jiná aplikace, nemusí se ale lišit od portu cílového zařízení. Proxy tedy může naslouchat na portu 502 a přeposílat požadavky na port 502 cílového zařízení.

**Příklad**:

```yaml
- port: 502
  uri: 192.0.2.2:502
```

### `rtu`

Se zařízeními v síti se obvykle komunikuje přes Modbus TCP. V případě potřeby můžete přepnout na Modbus RTU over TCP zadáním `rtu: true`. Typickým případem použití jsou jednoduché transparentní převodníky RS485-TCP (bez překladu protokolu). Nastavení musí odpovídat konfiguraci zařízení. U cílových zařízení připojených sériově se ignoruje.

**Příklad**:

```yaml
rtu: true
```

### `readonly`

Tímto parametrem můžete systémům třetích stran zabránit v zápisu přes Modbus.

**Možné hodnoty**:

- `true`: zápis se zablokuje bez odpovědi
- `deny`: zápis se zablokuje a vrátí se chyba Modbus
- `false`: zápis se předá dál

Kódy funkcí, které proxy sama nezpracovává, např. kód funkce 0x41 specifický pro výrobce Huawei, mohou obsahovat operace zápisu.
Oba režimy jen pro čtení je proto blokují s chybou Modbus.
S `readonly: false` je proxy předává beze změny, ale pouze zařízením připojeným přes Modbus TCP.
Například integrace pro Home Assistant ke střídačům Huawei potřebuje `readonly: false`.

:::caution
Proxy nekontroluje, kdo se připojuje.
S `readonly: false` (výchozí hodnota) může do cílového zařízení zapisovat každé zařízení ve vaší síti, které má k tomuto portu přístup.
Proxy provozujte pouze v důvěryhodné síti.
:::

**Příklad**:

```yaml
readonly: true
```
