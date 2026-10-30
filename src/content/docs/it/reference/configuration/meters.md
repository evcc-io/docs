---
title: "meters"
description: "Definisci in evcc.yaml i contatori per rete, impianto fotovoltaico, batteria domestica e consumatori, e scopri la convenzione dei segni e i tipi di contatore disponibili."
sidebar:
  order: 5
translatedFrom: "731e5e09d04f"
---

I _contatori_ (dispositivi di misura della corrente) sono un elenco di dispositivi della casa che possono misurare potenza e consumo di energia, produzione solare o utilizzo della batteria domestica. Un `meter` definisce un punto di misurazione dell’energia e può essere un dispositivo fisico (ad es. un contatore al punto di connessione alla rete), un inverter solare (AC o, nel caso di inverter ibridi, DC) o un inverter per batterie.

I caricabatterie possono avere un contatore integrato oppure un contatore collegato esternamente. Se un caricabatterie ha un contatore integrato, non serve creare una voce in `meters`. Se il caricabatterie non ha un contatore di questo tipo, evcc usa il contatore configurato qui e assegnato al caricabatterie in [`meter`](/it/reference/configuration/loadpoints#meter) nella configurazione del punto di ricarica, oppure presume che la potenza di ricarica impostata venga effettivamente usata.

evcc usa una convenzione dei segni coerente per i valori di potenza e corrente (`power`, `powers`, `currents`):

- **Positivo (+)** per l’energia in entrata: prelievo dalla rete, produzione solare, scarica della batteria domestica
- **Negativo (-)** per l’energia in uscita: immissione in rete, consumo in standby dell’inverter solare, carica della batteria domestica
- I **consumatori** (caricabatterie, contatori aux) sono sempre **positivi (+)**

Se il dispositivo restituisce valori con il segno opposto, lo si può correggere nella [configurazione del plugin](/it/reference/plugins) con `scale: -1`.

La configurazione `meters` è un elenco dei diversi dispositivi disponibili.

**Ad esempio**:

```yaml
meters:
  - name: grid
    type: ...
  - name: pv
    type: ...
  - name: battery
    type: ...
  - name: charge
    type: ...
  - name: aux
    type: ...
```

Le configurazioni per i dispositivi noti si trovano in [Dispositivi - Impianto domestico](/it/meters).

Di seguito vengono spiegati i vari parametri.

---

## Parametri obbligatori

### `name`

Una breve denominazione del contatore. Il valore viene usato per fare riferimento al dispositivo nella configurazione del [sito](/it/reference/configuration/site) o del [punto di ricarica](/it/reference/configuration/loadpoints#meter).

**Ad esempio**:

```yaml
name: charger1
```

---

### `type`

È il tipo di contatore specifico di evcc che permette la comunicazione con il dispositivo. Il tipo adatto per i dispositivi noti si trova in [Dispositivi - Impianto domestico](/it/meters).

**Ad esempio**:

```yaml
type: modbus
```

I vari tipi possibili e i loro parametri aggiuntivi sono documentati di seguito:

---

:::note[Nota]
Per motivi tecnici, i campi aggiuntivi `title` e `icon` del contatore non sono supportati nel file `evcc.yaml`.
Titoli e icone (a seconda del caso d’uso) si possono definire solo per i contatori creati tramite l’interfaccia di configurazione.
:::

## Tipi supportati

### `movingaverage`

Questo tipo di contatore può livellare valori di misura fluttuanti. Si può usare con qualsiasi utilizzo (`usage`) del contatore. Il parametro `decay` indica la percentuale del nuovo valore che entra nel calcolo.

**Ad esempio**:

```yaml
meters:
- name: grid
  type: movingaverage
  decay: 0.1
  meter:
    type: template
    template: solarlog
    usage: grid
    host: 192.0.2.2
    ...
```

In questo esempio entra nel calcolo il 10% del nuovo valore. Dopo 10 cicli il valore più vecchio esce dal calcolo. La durata di questo processo dipende da `interval`.

---

### `modbus`

Dispositivi collegati tramite l’interfaccia Modbus e supportati dal progetto [MBMD (ModBus Measurement Daemon)](https://github.com/volkszaehler/mbmd#supported-devices).

**Ad esempio**:

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Parametri obbligatori

Oltre ai parametri definiti qui, servono altri parametri. Sono elencati nella documentazione [Modbus](/it/reference/modbus).

##### `power`

Definisce il valore di misura MBMD che restituisce la potenza, di solito `Power`.

**Ad esempio**:

```yaml
power: Power
```

---

##### `energy`

Definisce il valore di misura MBMD che restituisce l’energia, di solito `Sum`.

**Ad esempio**:

```yaml
energy: Sum
```

---

#### Parametri opzionali

##### `soc`

Definisce il valore di misura MBMD che restituisce il livello di carica della batteria, di solito `ChargeState`.

**Ad esempio**:

```yaml
soc: ChargeState
```

---

### `lgess`

Dispositivi LG ESS Home 8/10.

**Ad esempio**:

```yaml
type: lgess
usage: grid
uri: https://192.0.2.2/
password: "DE200..."
```

:::note
I parametri `uri` e `password` sono necessari per un dispositivo `meter` solo se sono configurati più dispositivi.
:::

#### Parametri obbligatori

##### `usage`

Definisce quali misurazioni usare.

**Valori possibili**:

- **`grid`**: per le misurazioni al punto di connessione alla rete
- **`pv`**: per le misurazioni della produzione solare
- **`battery`**: per le misurazioni della batteria domestica

---

##### `uri`

Definisce l’URL del dispositivo LG ESS nella rete domestica.

**Ad esempio**:

```yaml
uri: https://192.0.2.2/
```

---

##### `password`

Qui va inserito il numero di registrazione dell’inverter LG ESS HOME.

**Ad esempio**:

```yaml
password: "DE200..."
```

---

### `openwb`

Per usare le misurazioni di un caricabatterie OpenWB.

**Ad esempio**:

```yaml
type: openwb
usage: grid
broker: 192.0.2.2
```

#### Parametri obbligatori

##### `usage`

Definisce quali misurazioni usare.

**Valori possibili**:

- **`grid`**: per le misurazioni al punto di connessione alla rete
- **`pv`**: per le misurazioni della produzione solare
- **`battery`**: per le misurazioni della batteria domestica

---

##### `broker`

Definisce l’hostname o l’indirizzo IP e la porta dell’OpenWB nella rete domestica.

**Ad esempio**:

```yaml
broker: 192.0.2.2:1883
```

---

### `sma`

Per usare SMA Home Manager 2.0, SMA Energy Meter o un inverter SMA. I dispositivi devono supportare il protocollo Speedwire.

**Ad esempio**:

```yaml
type: sma
uri: 192.0.2.2
serial: 12345678
interface: eth0
```

---

#### Parametri obbligatori

:::note
Basta definire `uri` oppure `serial`.
:::

##### `uri`

Definisce l’hostname o l’indirizzo IP del dispositivo nella rete domestica.

**Ad esempio**:

```yaml
uri: 192.0.2.2
```

##### `serial`

Definisce il numero di serie del dispositivo da cui ricevere le misurazioni.

**Ad esempio**:

```yaml
serial: 12345678
```

#### Parametri opzionali

##### `interface`

I messaggi multicast si possono ricevere solo su una specifica interfaccia di rete. Di solito è la prima interfaccia del sistema. Se il contatore è collegato a un’altra interfaccia, va indicata esplicitamente.

**Ad esempio**:

```yaml
interface: eth0
```

---

### `tesla`

_`tesla`_: Per usare le misurazioni di una Tesla Powerwall.

**Ad esempio**:

```yaml
type: tesla
usage: grid
uri: https://192.0.2.2/
password: "***"
```

---

#### Parametri obbligatori

##### `usage`

Definisce quali misurazioni usare.

**Valori possibili**:

- **`grid`**: per le misurazioni al punto di connessione alla rete
- **`pv`**: per le misurazioni della produzione solare
- **`battery`**: per le misurazioni della batteria domestica

---

##### `uri`

Definisce l’hostname o l’indirizzo IP del dispositivo nella rete domestica.

**Ad esempio**:

```yaml
uri: 192.0.2.2
```

---

##### `password`

Qui va inserita la password dell’utente _customer_.

**Ad esempio**:

```yaml
password: "ThePassword"
```

---

### `custom`

Implementazione standard, in cui i singoli valori vengono definiti tramite [plugin](/it/user-defined-devices#meter).

**Ad esempio**:

```yaml
  type: custom
  power: # Potenza (W)
    source: # Tipo di plugin
    ...
  energy: # Energia (kWh)
    source: # Tipo di plugin
    ...
  returnenergy: # Energia nel verso opposto (kWh)
    source: # Tipo di plugin
    ...
  soc: # Livello di carica della batteria (%)
    source: # Tipo di plugin
    ...
  capacity: # Capacità della batteria, opzionale (kWh)
  currents: # Corrente (A) per fase
    - source: # Tipo di plugin fase 1
      ...
    - source: # Tipo di plugin fase 2
      ...
    - source: # Tipo di plugin fase 3
      ...
  powers: # Potenza (W) per fase
    - source: # Tipo di plugin fase 1
      ...
    - source: # Tipo di plugin fase 2
      ...
    - source: # Tipo di plugin fase 3
      ...
  voltages: # Tensione (V) per fase
    - source: # Tipo di plugin fase 1
      ...
    - source: # Tipo di plugin fase 2
      ...
    - source: # Tipo di plugin fase 3
      ...
  ...
```

---

#### Parametri obbligatori

##### `power`

Definizione del plugin che restituisce la potenza in watt (W).

**Ad esempio**:

```yaml
  power: ... # Potenza (W)
    source: # Tipo di plugin
    ...
```

---

#### Parametri opzionali

##### `energy`

Definizione del plugin che restituisce l’energia consumata in chilowattora (kWh).

**Ad esempio**:

```yaml
  energy: ... # Energia (kWh)
    source: # Tipo di plugin
    ...
```

---

##### `returnenergy`

Definizione del plugin che restituisce l’energia nel verso opposto in chilowattora (kWh), ad es. l’immissione in rete.

**Ad esempio**:

```yaml
  returnenergy: ... # Energia nel verso opposto (kWh)
    source: # Tipo di plugin
    ...
```

---

#### `soc`

Definizione del plugin che restituisce il livello di carica della batteria in percentuale (%).

**Ad esempio**:

```yaml
  soc: ... # Livello di carica della batteria (%)
    source: # Tipo di plugin
    ...
```

---

#### `capacity`

Indicazione della capacità della batteria. Utile solo se sono presenti più batterie. Serve a determinare il livello di carica complessivo.

---

#### `currents`

Un elenco di definizioni di plugin che restituiscono la corrente in ampere (A) per fase.

**Ad esempio**:

```yaml
  currents: # Corrente (A) per fase
    - source: # Tipo di plugin fase 1
      ...
    - source: # Tipo di plugin fase 2
      ...
    - source: # Tipo di plugin fase 3
      ...
  ...
```

---

#### `powers`

Un elenco di definizioni di plugin che restituiscono la potenza in watt (W) per fase.

**Ad esempio**:

```yaml
  powers: # Potenza (W) per fase
    - source: # Tipo di plugin fase 1
      ...
    - source: # Tipo di plugin fase 2
      ...
    - source: # Tipo di plugin fase 3
      ...
  ...
```

---

#### `voltages`

Un elenco di definizioni di plugin che restituiscono la tensione in volt (V) per fase.

**Ad esempio**:

```yaml
  voltages: # Tensione (V) per fase
    - source: # Tipo di plugin fase 1
      ...
    - source: # Tipo di plugin fase 2
      ...
    - source: # Tipo di plugin fase 3
      ...
  ...
```
