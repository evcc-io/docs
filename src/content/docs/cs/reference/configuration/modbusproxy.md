---
title: "modbusproxy"
description: "Popisuje, jak v evcc.yaml nastavit Modbus proxy, aby jiné systémy mohly s vaší instancí evcc sdílet jedno spojení Modbus se střídačem nebo měřičem."
sidebar:
  order: 18
translatedFrom: "cd5b4859740b"
---

Nastavení `modbusproxy` je seznam zařízení, která jsou pro systémy třetích stran zpřístupněna v síti přes Modbus TCP.

Některá zařízení povolují jen velmi omezený počet klientů Modbus TCP. V nejhorším případě je povoleno jen jediné spojení, jako je tomu u komponent SolarEdge. Na sériových sběrnicích Modbus RTU RS485 je navíc povolen jen jeden master.
Pomocí `modbusproxy` lze evcc nastavit jako Modbus proxy, která sdílí stávající spojení Modbus s dalšími systémy. evcc tak komunikuje přímo se zařízením, zatímco ostatní systémy komunikují s evcc, které jejich požadavky sdružuje a předává cílovému zařízení.

Konfigurace `modbusproxy` je seznam různých konfigurací proxy.

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

Pro _odchozí_ spojení k dotazovanému cílovému zařízení (např. střídači nebo měřiči) se protokol může překládat podle konfigurace cílového zařízení.
:::

:::tip[Vyžaduje sponzorský token]

Další informace o sponzorství evcc najdete na [stránce o sponzorství](/cs/sponsorship).

:::

---

## Povinné parametry

### `port`

Místní port TCP/IP, na kterém proxy naslouchá a přijímá příchozí spojení Modbus TCP ze systémů třetích stran.

**Příklad**:

```yaml
port: 5021
```

## Volitelné parametry

### `uri`

IP adresa a port cílového zařízení v běžném formátu URI.

Každý zadaný port musí být jedinečný a nesmí ho na stejném hostiteli používat jiná aplikace, nemusí se ale lišit od portu cílového zařízení. Proxy tedy může naslouchat na portu 502 a odkazovat na port 502 cílového zařízení.

**Příklad**:

```yaml
- port: 502
  uri: 192.0.2.2:502
```

### `rtu`

Modbus TCP se obvykle používá pro komunikaci se síťovými cíli. V případě potřeby můžete přepnout na Modbus RTU over TCP zadáním `rtu: true`. Typickým případem použití jsou jednoduché transparentní převodníky RS485-TCP (bez překladu protokolu). Nastavení musí odpovídat konfiguraci zařízení. U sériových cílových systémů se ignoruje.

**Příklad**:

```yaml
rtu: true
```

### `readonly`

Tímto parametrem můžete systémům třetích stran zabránit v zápisu přes Modbus.

**Možné hodnoty**:

- `true`: Zápis je zablokován bez odpovědi
- `deny`: Zápis je zablokován a jako odpověď se vrátí chyba Modbus
- `false`: Zápis je předán dál

Kódy funkcí, které proxy sama nezpracovává, např. kód funkce 0x41 specifický pro výrobce Huawei, mohou obsahovat operace zápisu.
Oba režimy jen pro čtení je proto blokují s chybou Modbus.
S `readonly: false` je proxy předává beze změny, ale pouze zařízením připojeným přes Modbus TCP.
Integrace Home Assistant pro střídače Huawei například potřebuje `readonly: false`.

:::caution
Proxy nekontroluje, kdo se připojuje.
S `readonly: false` (výchozí hodnota) může do cílového zařízení zapisovat každé zařízení ve vaší síti, které se dostane k portu.
Proxy provozujte pouze v důvěryhodné síti.
:::

**Příklad**:

```yaml
readonly: true
```
