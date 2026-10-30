---
title: "modbusproxy"
description: "Configura il proxy Modbus in evcc.yaml, così altri sistemi possono condividere con la tua istanza evcc una connessione Modbus a un inverter o a un contatore."
sidebar:
  order: 18
translatedFrom: "cd5b4859740b"
---

L’impostazione `modbusproxy` è un elenco di dispositivi che vengono resi disponibili in rete ai sistemi di terze parti tramite Modbus TCP.

Alcuni dispositivi consentono solo un numero molto limitato di client Modbus TCP. Nel caso peggiore è consentita una sola connessione, come avviene con i componenti SolarEdge. Inoltre, nei sistemi bus seriali Modbus RTU RS485 è ammesso un solo master.
Con `modbusproxy` puoi configurare evcc come proxy Modbus che condivide le connessioni Modbus esistenti con altri sistemi. In questo modo evcc comunica direttamente con il dispositivo, mentre gli altri sistemi comunicano con evcc, che raggruppa le connessioni e le inoltra al dispositivo di destinazione.

Ogni voce dell’elenco `modbusproxy` definisce un proxy.

**Esempio**:

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
In _ingresso_ (da sistemi di terze parti come domotica o logger), la funzione proxy supporta esclusivamente Modbus TCP.

In _uscita_ verso il dispositivo di destinazione da interrogare (ad es. inverter, contatore di energia), il protocollo può essere convertito in base alla configurazione del dispositivo di destinazione.
:::

:::tip[Token sponsor necessario]

Per maggiori informazioni sulla sponsorizzazione di evcc, visita [la pagina sulla sponsorizzazione](/it/sponsorship).

:::

---

## Parametri obbligatori

### `port`

La porta TCP/IP locale su cui il proxy accetta le connessioni Modbus TCP in ingresso dai sistemi di terze parti.

**Esempio**:

```yaml
port: 5021
```

## Parametri facoltativi

### `uri`

L’indirizzo IP e la porta del dispositivo di destinazione nel formato URI consueto.

Ogni porta indicata deve essere univoca e non già usata da un’altra applicazione sullo stesso host, ma non deve per forza essere diversa dalla porta del dispositivo di destinazione. È quindi possibile definire una configurazione per la porta 502 che fa riferimento alla porta 502 del dispositivo di destinazione.

**Esempio**:

```yaml
- port: 502
  uri: 192.0.2.2:502
```

### `rtu`

Modbus TCP si usa di solito per comunicare con destinazioni di rete. Se necessario, puoi passare a Modbus RTU over TCP indicando `rtu: true`. Un caso d’uso tipico sono i semplici convertitori RS485-TCP trasparenti (senza conversione di protocollo). L’impostazione deve corrispondere alla configurazione del dispositivo. Per i sistemi di destinazione seriali viene ignorata.

**Esempio**:

```yaml
rtu: true
```

### `readonly`

Con questo parametro puoi impedire gli accessi Modbus in scrittura da parte di sistemi di terze parti.

**Valori possibili**:

- `true`: l’accesso in scrittura viene bloccato senza risposta
- `deny`: l’accesso in scrittura viene bloccato con un errore Modbus come risposta
- `false`: l’accesso in scrittura viene inoltrato

I codici funzione che il proxy non gestisce direttamente, come il codice funzione proprietario 0x41 di Huawei, possono contenere operazioni di scrittura.
Per questo entrambe le modalità di sola lettura li bloccano con un errore Modbus.
Con `readonly: false` il proxy li inoltra invariati, ma solo ai dispositivi collegati tramite Modbus TCP.
L’integrazione Home Assistant per gli inverter Huawei, ad esempio, richiede `readonly: false`.

:::caution
Il proxy non controlla chi si connette.
Con `readonly: false` (il valore predefinito), qualsiasi dispositivo della tua rete che può raggiungere la porta può scrivere sul dispositivo di destinazione.
Usa il proxy solo in una rete affidabile.
:::

**Esempio**:

```yaml
readonly: true
```
