---
title: "Modbus"
description: "Spiega come evcc comunica con contatori e caricabatterie tramite Modbus, in seriale via RS485, via TCP o con un convertitore RTU-TCP, e come configurare ogni variante."
sidebar:
  order: 4
translatedFrom: "01c339d6465c"
---

Alcuni dispositivi, come i contatori ([`meters`](/it/reference/configuration/meters#modbus)) o i caricabatterie ([`chargers`](/it/reference/configuration/chargers)), sono collegati e indirizzati tramite il protocollo Modbus.

La configurazione `meter` comprende il tipo di collegamento fisico (interfaccia), parametri tecnici opzionali dell’interfaccia, il protocollo Modbus usato, l’ID Modbus univoco del dispositivo sul bus e il numero e il tipo del registro da leggere o scrivere.

È importante sapere che esistono tre diversi protocolli Modbus: Modbus RTU, Modbus ASCII e Modbus TCP. Tecnicamente possono essere trasmessi su diversi tipi di interfaccia. La variante classica è Modbus RTU su un’interfaccia bus seriale RS485, usata dalla maggior parte dei contatori e da alcuni caricabatterie. I dispositivi con un’interfaccia di rete nativa (Ethernet/Wi-Fi), invece, comunicano di solito tramite il protocollo Modbus TCP.

Se un dispositivo Modbus seriale deve essere collegato in rete (Ethernet/Wi-Fi/PowerLAN) tramite un convertitore di interfaccia, si stabilisce una connessione con protocollo Modbus RTU su TCP. Il protocollo Modbus RTU viene trasmesso direttamente sulla rete (cioè “incapsulato”). Anche se il metodo di trasporto (TCP/IP) è lo stesso, il protocollo NON è lo stesso di Modbus TCP. È fondamentale distinguere tra protocollo e metodo di trasporto. “Modbus RTU su TCP” è diverso da Modbus TCP!

:::caution
Esistono convertitori di interfaccia più complessi che possono anche tradurre il protocollo Modbus stesso tra Modbus RTU e Modbus TCP!

Se questa funzione è attiva, evcc deve comunicare con il convertitore tramite Modbus TCP, mentre il convertitore comunica con il dispositivo seriale tramite Modbus RTU e traduce i due protocolli in entrambe le direzioni.
In questo caso occorre prestare molta attenzione alle specifiche e alla configurazione del dispositivo, altrimenti la comunicazione potrebbe non funzionare!
:::

Se usi un convertitore di interfaccia, i parametri del bus seriale si impostano solo sul convertitore. In evcc si configura quindi solo il tratto fino al convertitore.

## Collegamento fisico

### Collegamento seriale (RS485)

Se il dispositivo è collegato direttamente tramite un adattatore RS485 (Modbus RTU), occorre indicare `device` e i parametri di comunicazione seriale `baudrate` e `comset` in base alla configurazione del dispositivo. Consulta il relativo manuale d’uso, le schede tecniche o le impostazioni del sistema.

:::note
Su un bus seriale RS485 si possono far funzionare più dispositivi con parametri di comunicazione identici, se a ciascun dispositivo è assegnato un ID Modbus univoco. Se non tutti i dispositivi di un bus possono usare gli stessi parametri di comunicazione (ma con ID diversi), occorre suddividerli su più bus indipendenti.
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

Se un dispositivo seriale è collegato tramite un convertitore di interfaccia RS485-IP trasparente interposto (senza traduzione del protocollo), occorre indicare `rtu: true`, così il protocollo Modbus RTU viene usato anche sulla connessione TCP/IP.

**Ad esempio**:

```yaml
source: modbus
id: 1
uri: 192.168.0.10:502
rtu: true # Modbus RTU su TCP
```

## Dispositivi predefiniti

I modelli di dispositivo predefiniti integrati (`model`) sono identici a quelli di [MBMD](https://github.com/volkszaehler/mbmd/blob/master/docs/mbmd_run.md#options):

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

Qualsiasi `model` diverso da questi viene trattato come tipo di dispositivo _SunSpec_.

Con `value` si definisce il valore da leggere dal dispositivo. Tutti i valori supportati sono predefiniti in [MBMD](https://github.com/volkszaehler/mbmd/blob/master/meters/measurements.go#L28).

Nel caso di un inverter o contatore compatibile _SunSpec_, i valori da leggere si indicano nel formato `model:[block:]point` secondo la definizione _SunSpec_. Ad esempio, la potenza DC sulla seconda stringa di un inverter fotovoltaico trifase (corrispondente a SunSpec Model 103) si legge così: `value: 103:2:W`.

Il modello di dispositivo (`model`) e l’ID Modbus (`id`) sono sempre obbligatori:

**Ad esempio**:

```yaml
source: modbus
---
model: sdm
value: Power
scale: -1 # fattore in virgola mobile applicato al risultato, ad es. per convertire kW in W
```

## Inversione dei valori

Per i contatori MBMD, i valori di misura possono essere invertiti anteponendo al nome dell’alias un `-` (segno meno).
È utile quando i contatori vengono usati in configurazioni o orientamenti di montaggio diversi e il segno dei valori di misura va adattato.

### Misure supportate

L’inversione funziona per le seguenti misure MBMD:

- `power`: potenza totale
- `currents`: correnti per fase (array)
- `powers`: potenze per fase (array)

### Sintassi

```yaml
meters:
  - name: my-meter
    type: modbus
    model: sdm
    power: -Power # inverte il valore della potenza
```

### Esempi

#### Potenza totale invertita

```yaml
meters:
  - name: pv-meter
    type: modbus
    model: sdm
    power: -Power # la potenza viene invertita (ad es. +1000 W diventa -1000 W)
```

#### Potenze di fase invertite

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    powers:
      - -PowerL1 # fase 1 invertita
      - -PowerL2 # fase 2 invertita
      - -PowerL3 # fase 3 invertita
```

#### Correnti invertite (singole fasi)

```yaml
meters:
  - name: grid-meter
    type: modbus
    model: sdm
    power: Power
    currents:
      - -CurrentL1 # corrente fase 1 invertita
      - CurrentL2 # corrente fase 2 normale
      - -CurrentL3 # corrente fase 3 invertita
```

### Casi d’uso

**Contatori montati in modo errato**:
Se un sensore di corrente o un contatore è installato fisicamente nella direzione sbagliata, puoi correggere i valori via software.

**Immissione in rete o consumo**:
Per i contatori dell’impianto fotovoltaico in cui la convenzione dei segni va invertita.

**Orientamenti diversi dei trasformatori di corrente**:
Per installazioni multifase con trasformatori di corrente (TA) orientati in modo diverso.

## Configurazione manuale

Se il dispositivo Modbus non è supportato direttamente o se si vogliono leggere o scrivere valori diversi da quelli dei modelli predefiniti, i registri Modbus possono essere configurati anche manualmente.
A questo scopo, oltre alle impostazioni Modbus generali (vedi sopra), occorre definire un `register` al posto del `value` usato per i dispositivi predefiniti. Non è consentito indicare sia `value` sia `register`.

La definizione di un registro richiede i seguenti parametri:

- `address`: l’indirizzo del registro
- `type`: il tipo di registro. I tipi di lettura consentiti sono `coil`, `input` e `holding`, quelli di scrittura sono `writeholding`, `writeholdings` e `writecoil`
- `decode`: il tipo di codifica dei dati. Sono consentiti: `int16|32|64, uint16|32|64, float32|64 and u|int32s + float32s`. Per il tipo `coil` la codifica viene ignorata, ma deve comunque essere indicata. Per il tipo `writecoil` occorre indicare `bool8`.
- `bitmask`: opzionale. Il valore viene combinato in AND con il valore letto per estrarre singoli bit.

Altri parametri consentiti in una configurazione manuale sono:

- `scale`: numero in virgola mobile che può servire a convertire i valori letti (ad es. da W a kW o viceversa). Questo valore viene moltiplicato per il valore grezzo letto e decodificato.
- `timeout`: timeout Modbus. Senza unità il valore è in nanosecondi, altrimenti va indicata l’unità, ad es. 10s per 10 secondi.

**Ad esempio**:

```yaml
source: modbus
---
register:
  address: 40070
  type: holding # coil, holding o input
  decode: int32 # int16|32|64, uint16|32|64, float32|64 e u|int32s + float32s
  bitmask: 2 # opzionale: maschera di bit applicata al valore letto. Qui la maschera è 0000000000000010b, ignorata se il valore è 0
scale: -1.0 # fattore in virgola mobile applicato al risultato, ad es. per convertire kW in W
timeout: 2s # timeout, senza unità in ns
```

Per le codifiche `int32s/uint32s` l’ordine delle word viene invertito (prima la word meno significativa), il che è utile per i dispositivi E3/DC.

### Scrittura dei registri

Si possono scrivere sia gli holding register sia i coil. A questo scopo occorre indicare `type: writeholding` per gli holding register oppure `type: writecoil` per i coil. Per scrivere più registri (codice funzione 16) è disponibile il tipo `writeholdings`.

`type: writeholding` scrive sempre un registro a 16 bit (int o bool16). Per questo `decode` deve essere sempre `uint16`.
`type: writecoil` scrive un coil. Per `decode` occorre indicare `bool8`.

**Ad esempio**:

```yaml
source: modbus
---
register:
  address: 40070
  type: writeholding # writeholding, writeholdings o writecoil
```

### Esempio completo

Ecco un esempio completo di caricabatterie definito dall’utente con interfaccia Modbus (qui un Phoenix EM-CP-PP-ETH con indirizzo IP 192.168.1.10):

**Ad esempio**:

```yaml
chargers:
  - type: custom
    name: CustomCharger
    status:
      # legge lo stato del caricabatterie
      # A, B, C oppure F
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      timeout: 3s
      register:
        address: 100
        type: input # legge un input register
        decode: int16
    enabled:
      # il caricabatterie è abilitato (1) o no (0)
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: coil # legge un coil
        decode: bool16 # irrilevante ma obbligatorio
    enable:
      # abilita il caricabatterie
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 400
        type: writecoil # scrive un coil
        decode: bool8
    maxcurrent:
      # imposta la corrente massima
      source: modbus
      id: 180
      uri: 192.168.1.10:502
      register:
        address: 300
        type: writeholding # scrive un holding register
        decode: uint16
```
