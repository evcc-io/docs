---
title: "hems"
description: "Configura in evcc.yaml i limiti esterni per consumo e immissione in rete, ad es. per § 14a EnWG o § 9 EEG, tramite relè, centralina di controllo FNN o EEBUS."
sidebar:
  order: 8
translatedFrom: "426c429c285d"
---

La sezione `hems` configura il controllo esterno della potenza di consumo e di immissione in rete.
Si usa ad es. per attuare le norme tedesche § 14a EnWG o § 9 EEG.
Per il contesto e i dettagli sulla configurazione, vedi [Limite esterno](/it/external-limit).

:::note[Nota]
La limitazione della produzione agisce direttamente sui contatori `pv` limitabili e sui [dispositivi limitatori](/it/reference/configuration/curtailers), mentre la riduzione di potenza agisce direttamente sui consumatori controllabili.
In nessuno dei due casi serve una configurazione dei circuiti.
Per applicare il limite di consumo ai punti di ricarica, i circuiti devono essere configurati nella [gestione del carico](/it/features/loadmanagement).
Un limite attivo si applica quindi al circuito principale.
:::

:::note[SMA Sunny Home Manager e protocollo SEMP]
L’integrazione SMA Sunny Home Manager (SHM) è attiva per impostazione predefinita e non va più configurata sotto `hems:`.
Per dettagli e opzioni di configurazione, vedi **Configurazione → Sunny Home Manager**.
:::

---

## Parametri obbligatori

### `type`

Definisce il tipo di controllo esterno.

**Valori possibili**:

- `relay`: collegamento tramite contatto di commutazione
- `fnn`: collegamento tramite centralina di controllo FNN con più contatti di commutazione
- `eebus`: collegamento tramite il protocollo EEBUS

---

## `type: relay`

Collegamento tramite un contatto di commutazione (ad es. centralina di controllo).
Il contatto segnala se è attiva una limitazione di potenza.

```yaml
hems:
  type: relay
  maxPower: 8400 # Total power limit when signal is active (in watts)
  limit:
    source: gpio
    function: read
    pin: 17
```

### Parametri

#### `maxPower`

Limite di potenza totale in watt, applicato quando il segnale è attivo.

#### `limit`

Configurazione del [plugin](/it/reference/plugins) per leggere il contatto di commutazione.
Valore di ritorno atteso: `true`/`1` = limitato, `false`/`0` = normale.

#### `passthrough`

Configurazione facoltativa del [plugin](/it/reference/plugins) per inoltrare il segnale di limitazione a un sistema esterno.

#### `interval`

Intervallo di interrogazione del contatto di commutazione.
Predefinito: `10s`.

Per altri esempi di collegamento (GPIO, MQTT, HTTP), vedi [integrazioni definite dall’utente](/it/user-defined-devices#external-limit).

---

## `type: fnn`

Collegamento tramite una centralina di controllo FNN con contatti di commutazione separati.
La riduzione di potenza del consumo (W4) e la limitazione dell’immissione in rete (W3, S2, S1) vengono segnalate tramite contatti singoli.

```yaml
hems:
  type: fnn
  maxDimPower: 4200 # Consumption limit while dimmed (in watts)
  maxCurtailPower: 10000 # Installed PV power, base for curtailment steps (in watts)
  w4:
    source: gpio
    function: read
    pin: 17 # Read GPIO pin 17
    # Return value: false = normal, true = active
  w3:
    source: gpio
    function: read
    pin: 27
  s2:
    source: gpio
    function: read
    pin: 22
  s1:
    source: gpio
    function: read
    pin: 23
```

### Parametri

Deve essere configurato almeno uno dei segnali `w4` o `w3`.

#### `maxDimPower`

Limite di consumo in watt, applicato mentre il segnale di riduzione di potenza (W4) è attivo.
Obbligatorio se `w4` è configurato.

#### `maxCurtailPower`

Potenza solare installata in watt.
Valore di base per i livelli di limitazione (W3, S2, S1).

#### `w4`

Configurazione del [plugin](/it/reference/plugins) per leggere il segnale di riduzione di potenza.
Quando è attivo, il consumo viene limitato a `maxDimPower`.

#### `w3`

Configurazione del [plugin](/it/reference/plugins) per leggere il segnale di limitazione “0%”.
Quando è attivo, l’immissione in rete viene limitata allo 0% di `maxCurtailPower`.

#### `s2`

Configurazione del [plugin](/it/reference/plugins) per leggere il segnale di limitazione “30%”.
Quando è attivo, l’immissione in rete viene limitata al 30% di `maxCurtailPower`.

#### `s1`

Configurazione del [plugin](/it/reference/plugins) per leggere il segnale di limitazione “60%”.
Quando è attivo, l’immissione in rete viene limitata al 60% di `maxCurtailPower`.

#### `interval`

Intervallo di interrogazione dei contatti di commutazione.
Predefinito: `10s`.

Per i dettagli sulla configurazione, vedi [Limite esterno](/it/external-limit).

---

## `type: eebus`

Collegamento tramite il protocollo EEBUS.
La centralina di controllo trasmette automaticamente il limite di potenza.

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF" # SKI of the control box
```

### Parametri

#### `ski`

SKI (Subject Key Identifier) della centralina di controllo.
Necessario per l’accoppiamento.

#### Limiti avanzati

Per la comunicazione EEBUS si possono impostare i seguenti parametri facoltativi:

- `contractualConsumptionNominalMax`: potenza di consumo massima contrattuale (in watt)
- `failsafeConsumptionActivePowerLimit`: limite failsafe per la potenza di consumo (in watt)
- `productionNominalMax`: potenza installata del generatore (Wp, in watt)
- `failsafeProductionActivePowerLimit`: limite failsafe per la potenza di immissione in rete (in watt)
- `failsafeDurationMinimum`: durata minima del failsafe (ad es. `2h`)

#### `passthrough`

Configurazione facoltativa del [plugin](/it/reference/plugins) per inoltrare il segnale di limitazione a un sistema esterno.

#### `interval`

Intervallo di interrogazione.
Predefinito: `10s`.

Per i dettagli su configurazione e accoppiamento, vedi [Limite esterno](/it/external-limit#eebus-pairing).
