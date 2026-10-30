---
title: "modbusproxy"
description: "Beschrijft hoe u in evcc.yaml de Modbus-proxy instelt, zodat andere systemen samen met uw evcc-installatie één Modbus-verbinding met een omvormer of meter gebruiken."
sidebar:
  order: 18
translatedFrom: "cd5b4859740b"
---

De instelling `modbusproxy` is een lijst van apparaten die via Modbus TCP in het netwerk beschikbaar worden gesteld voor systemen van derden.

Sommige apparaten staan slechts een zeer beperkt aantal Modbus-TCP-clients toe. In het slechtste geval is maar één verbinding toegestaan, zoals bij componenten van SolarEdge. Daarnaast is in seriële RS485-bussystemen met Modbus RTU maar één master toegestaan.
Met `modbusproxy` kan evcc worden ingericht als Modbus-proxy die bestaande Modbus-verbindingen met andere systemen deelt. Zo communiceert evcc direct met het apparaat, terwijl andere systemen met evcc communiceren en evcc de verbindingen bundelt en naar het doelapparaat doorstuurt.

De configuratie `modbusproxy` is een lijst van verschillende proxyconfiguraties.

**Voorbeeld**:

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
Voor _inkomende_ verbindingen (van systemen van derden zoals domotica of loggers) ondersteunt de proxyfunctie uitsluitend Modbus TCP.

Voor _uitgaande_ verbindingen naar het op te vragen doelapparaat (bijv. omvormer, energiemeter) kan het protocol worden vertaald volgens de configuratie van het doelapparaat.
:::

:::tip[Sponsortoken vereist]

Meer informatie over sponsoring van evcc vindt u op [de sponsoringpagina](/nl/sponsorship).

:::

---

## Verplichte parameters

### `port`

De lokale TCP/IP-poort waarop de proxyserver luistert en inkomende Modbus-TCP-verbindingen van systemen van derden accepteert.

**Voorbeeld**:

```yaml
port: 5021
```

## Optionele parameters

### `uri`

Het IP-adres en de poort van het doelapparaat in de gangbare URI-notatie.

Elke opgegeven poort moet uniek zijn en mag niet al door een andere toepassing op dezelfde host worden gebruikt, maar hoeft niet te verschillen van de poort van het doelapparaat. U kunt dus ook een configuratie voor poort 502 definiëren die naar poort 502 op het doelapparaat verwijst.

**Voorbeeld**:

```yaml
- port: 502
  uri: 192.0.2.2:502
```

### `rtu`

Modbus TCP wordt doorgaans gebruikt voor communicatie met doelapparaten in het netwerk. Indien nodig kunt u met `rtu: true` overschakelen op Modbus RTU over TCP. Een typische toepassing zijn eenvoudige transparante RS485-TCP-converters (zonder protocolvertaling). Dit moet overeenkomen met de configuratie van het apparaat. Voor seriële doelsystemen wordt het genegeerd.

**Voorbeeld**:

```yaml
rtu: true
```

### `readonly`

Met deze parameter kunt u schrijftoegang via Modbus door systemen van derden verhinderen.

**Mogelijke waarden**:

- `true`: Schrijftoegang wordt zonder antwoord geblokkeerd
- `deny`: Schrijftoegang wordt geblokkeerd met een Modbus-foutmelding als antwoord
- `false`: Schrijftoegang wordt doorgestuurd

Functiecodes die de proxy niet zelf afhandelt, zoals de fabrikantspecifieke functiecode 0x41 van Huawei, kunnen schrijfbewerkingen bevatten.
Beide alleen-lezenmodi blokkeren ze daarom met een Modbus-foutmelding.
Met `readonly: false` stuurt de proxy ze ongewijzigd door, maar alleen naar apparaten die via Modbus TCP zijn verbonden.
De Home Assistant-integratie voor Huawei-omvormers heeft bijvoorbeeld `readonly: false` nodig.

:::caution
De proxy controleert niet wie verbinding maakt.
Met `readonly: false` (de standaardwaarde) kan elk apparaat in uw netwerk dat de poort kan bereiken naar het doelapparaat schrijven.
Gebruik de proxy alleen in een vertrouwd netwerk.
:::

**Voorbeeld**:

```yaml
readonly: true
```
