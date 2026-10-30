---
title: "Modbus"
description: "Spiega come evcc comunica con contatori e caricabatterie tramite Modbus, in seriale via RS485, via TCP o con un convertitore RTU-TCP, e come configurare ogni variante."
sidebar:
  order: 4
translatedFrom: "8cbbf87533c1"
---

Alcuni dispositivi, come i contatori ([`meters`](/it/reference/configuration/meters#modbus)) o i caricabatterie ([`chargers`](/it/reference/configuration/chargers)), sono collegati e comunicano tramite il protocollo Modbus.

La configurazione `meter` comprende il tipo di collegamento fisico (interfaccia), parametri tecnici opzionali dell’interfaccia, il protocollo Modbus usato, l’ID Modbus univoco del dispositivo sul bus e il numero e il tipo del registro da leggere o scrivere.

È importante sapere che esistono tre diversi protocolli Modbus: Modbus RTU, Modbus ASCII e Modbus TCP. Tecnicamente possono essere trasmessi su diversi tipi di interfaccia. La variante classica è Modbus RTU su un’interfaccia bus seriale RS485, usata dalla maggior parte dei contatori o da alcuni caricabatterie. I dispositivi con un’interfaccia di rete nativa (Ethernet/WiFi), invece, comunicano di solito tramite il protocollo Modbus TCP.

Se un dispositivo Modbus seriale deve essere collegato in rete (Ethernet/WiFi/PowerLAN) tramite un convertitore di interfaccia, si stabilisce una connessione con protocollo Modbus RTU su TCP/IP. Il protocollo Modbus RTU viene trasmesso direttamente sulla rete (cioè “incapsulato”). Anche se il metodo di trasporto (TCP/IP) è lo stesso, il protocollo NON è lo stesso di Modbus TCP. È fondamentale distinguere tra protocollo e metodo di trasporto. “Modbus (RTU) over TCP” è diverso da Modbus TCP!

:::caution
Attenzione: esistono convertitori di interfaccia più complessi che possono anche tradurre il protocollo Modbus stesso tra Modbus RTU e Modbus TCP!

Se questa funzione è attiva, evcc deve comunicare con il convertitore tramite Modbus TCP, mentre il convertitore comunica con il dispositivo seriale tramite Modbus RTU e traduce i due protocolli in entrambe le direzioni.
In questo caso occorre prestare molta attenzione alle specifiche e alla configurazione del dispositivo, altrimenti la comunicazione potrebbe non funzionare!
:::

Nel caso di una configurazione con convertitore di interfaccia, la configurazione del bus seriale si definisce solo sul convertitore. La configurazione di evcc riguarda quindi solo il tratto fino al convertitore.

## Collegamento fisico

### Collegamento seriale (RS485)

Se il dispositivo è collegato direttamente tramite un adattatore RS485 (Modbus RTU), occorre indicare `device` e i parametri di comunicazione seriale `baudrate` e `comset` in base alla configurazione del dispositivo. Consulta il relativo manuale d’uso, le schede tecniche o le impostazioni dell’impianto.

:::note
Su un bus seriale RS485 si possono far funzionare più dispositivi con parametri di comunicazione identici, se a ciascun dispositivo è assegnato un ID Modbus univoco. Se non tutti i dispositivi di un bus possono essere configurati con impostazioni di comunicazione uniformi (ma con ID diversi), è necessario suddividerli in più sistemi bus indipendenti.
:::

:::caution
Mescolare sullo stesso bus dispositivi con parametri di comunicazione seriale diversi non è possibile e porta a errori di comunicazione imprevedibili.
:::

**Ad esempio**:

```yaml
source: modbus
id: 1
device: /dev/ttyUSB0
baudrate: 38400
comset: "8E1"
```

### Collegamento di rete diretto

Se il dispositivo è collegato direttamente tramite una connessione di rete nativa (Modbus TCP), occorre indicare un `uri` composto da HOSTNAME:PORTA o IP:PORTA:

**Ad esempio**:

```yaml
source: modbus
id: 1
uri: 192.168.0.11:502
```

### Dispositivo seriale tramite connessione di rete (con convertitore di interfaccia)

Se un dispositivo seriale è collegato tramite un convertitore RS485-IP trasparente (senza traduzione del protocollo), occorre impostare con `rtu: true` il protocollo Modbus RTU anche sulla connessione TCP/IP.

**Ad esempio**:

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU over TCP
```

## Dispositivi predefiniti

I modelli di dispositivo integrati (`model`) sono identici a quelli di [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

     ABB       ABB A/B-Series meters
     DDM       DDM18SD
     DZG       DZG Metering GmbH DVH4013 meters
     IEM3000   Schneider Electric iEM3000 series
     INEPRO    Inepro Metering Pro 380
     JANITZA   Janitza meters
     MPM       Bernecker Engineering MPM3PM meters
     ORNO1P    ORNO WE-514 & WE-515
     ORNO1P504 ORNO WE-504
     ORNO3P    ORNO WE-516 & WE-517
     SBC       Saia Burgess Controls ALE3 meters
     SDM       Eastron SDM630/120/72DMv2
     SDM220    Eastron SDM220
     SDM230    Eastron SDM230
     SDM72     Eastron SDM72
     SEMTR     SolarEdge SE-MTR-3Y

Qualsiasi `model` diverso da questi viene

trattato come tipo di dispositivo _SunSpec_.

Con `value` si definisce il valore da leggere dal dispositivo. Tutti i valori supportati sono predefiniti in [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28).

Nel caso di un inverter o contatore compatibile _SunSpec_, i valori da leggere si indicano nel formato `model:[block:]point` secondo la definizione _SunSpec_. Ad esempio, la potenza DC sulla seconda stringa di un inverter fotovoltaico trifase (corrispondente a SunSpec Model 103) si legge così: `value: 103:2:W`.

Il modello di dispositivo (`model`) e l’ID Modbus (`id`) sono sempre obbligatori:

**Ad esempio**:

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # floating point factor applied to result, e.g. for kW to W conversion
```

## Inversione dei valori

Per i contatori MBMD, i valori di misura possono essere invertiti anteponendo al nome dell’alias un `-` (segno meno).
È utile quando i contatori vengono usati in configurazioni o orientamenti di montaggio diversi e il segno dei valori di misura va adattato.

### Misure supportate

L’inversione funziona per le seguenti misure MBMD:

- `power` - potenza totale
- `currents` - correnti per fase (array)
- `powers` - potenze per fase (array)

### Sintassi

```yaml
meters:
  - name: my-meter
    type: modbus
    model: sdm
    power: -Power # inverts the power value
```

### Esempi

#### Potenza totale invertita

```yaml
meters:
  - name: pv-meter
    type: modbus
    model: sdm
    power: -Power # Power will be inverted (e.g. +1000 W becomes -1000 W)
```

#### Potenze di fase invertite

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    powers:
      - -PowerL1 # Phase 1 inverted
      - -PowerL2 # Phase 2 inverted
      - -PowerL3 # Phase 3 inverted
```

#### Correnti invertite (singole fasi)

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    currents:
      - -CurrentL1 # Current Phase 1 inverted
      - CurrentL2 # Current Phase 2 normal
      - -CurrentL3 # Current Phase 3 inverted
```

### Casi d’uso

**Contatori montati in modo errato**:
Se un sensore di corrente o un contatore è installato fisicamente nella direzione sbagliata, puoi correggere i valori via software.

**Immissione in rete e consumo**:
Per contatori solari in cui la convenzione dei segni deve essere invertita.

**Orientamenti diversi dei TA**:
Per installazioni multifase con trasformatori di corrente orientati in modo diverso.

## Configurazione manuale

Se il dispositivo Modbus non è supportato direttamente o se si vogliono leggere o scrivere valori diversi da quelli dei modelli predefiniti, i registri Modbus possono essere configurati anche manualmente.
A questo scopo, oltre alle impostazioni Modbus generali (vedi sopra), occorre definire un `register` al posto del `value` usato per i dispositivi predefiniti. Non è consentito indicare sia `value` sia `register`.

La definizione di un registro richiede i seguenti parametri:

- `address`: l’indirizzo del registro
- `type`: il tipo di registro. I tipi di lettura consentiti sono `coil`, `input` e `holding`, quelli di scrittura sono `writeholding`, `writeholdings`, `writecoil`
- `decode`: il tipo di codifica dei dati. Sono consentiti: `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. Per il tipo `coil` la codifica viene ignorata, ma deve comunque essere indicata. Per il tipo `writecoil` occorre indicare `bool8`.
- `bitmask`: un’indicazione opzionale. Il valore indicato viene combinato in AND con il valore letto per estrarre singoli bit.

Altri parametri consentiti in una configurazione manuale sono:

- `scale`: numero in virgola mobile che può servire a convertire i valori letti (ad es. da W a kW o viceversa). Questo valore viene moltiplicato per il valore grezzo letto e decodificato.
- `timeout`: timeout Modbus. Senza unità il valore è in nanosecondi, altrimenti va indicata l’unità, ad es. 10s per 10 secondi.

**Ad esempio**:

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # coil, holding or input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s
  bitmask: 2 # Optional: a bitmask that is applied to the read value. Here the mask is 0000000000000010b, ignored if value is 0
scale: -1.0 # floating point factor applied to result, e.g. for kW to W conversion
timeout: 2s # timeout, without unit in ns
```

Per le codifiche `int32s/uint32s` l’ordine dei byte viene invertito, il che è utile per i dispositivi E3/DC.

### Scrittura dei registri

Si possono scrivere sia gli holding register sia i coil. A questo scopo occorre indicare `type: writeholding` per gli holding register oppure `type: writecoil` per i coil. Per scrivere più registri (function code 16) è disponibile il tipo `writeholdings`.

`type: writeholding` scrive sempre un registro a 16 bit (int o bool16). Per questo, per `decode` occorre indicare sempre `uint16`.
`type: writecoil` scrive un coil. Per `decode` occorre indicare `bool8`.

**Ad esempio**:

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding, writeholdings or writecoil
```

### Esempio completo

Un esempio completo di caricabatterie definito dall’utente con interfaccia Modbus (qui un Phoenix EM-CP-PP-ETH con indirizzo IP 192.168.1.10) potrebbe essere il seguente:

**Ad esempio**:

```yaml
chargers:
  - type: custom
    name: CustomCharger
    status:
      # Read the status of the charger
      # Either A,B,C or F
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      timeout: 3s
      register:
        address: 100
        type: input # Read an input register
        decode: int16
    enabled:
      # Is the charger enabled (1) or not (0)
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: coil # Read a coil
        decode: bool16 # Doesn't matter but required
    enable:
      # Enable the charger
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: writecoil # Write a coil
        decode: bool8
    maxcurrent:
      # Set the maximum current
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 300
        type: writeholding # Write a holding register
        decode: uint16
```
