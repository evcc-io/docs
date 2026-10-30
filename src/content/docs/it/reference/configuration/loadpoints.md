---
title: "loadpoints"
description: "Configura i punti di ricarica in evcc.yaml: collega caricabatterie, contatore e veicolo e regola modalità predefinita, interrogazione del veicolo, soglie e fasi."
sidebar:
  order: 3
translatedFrom: "3b374858a668"
---

`loadpoints` è l’elenco dei punti di ricarica: ciascuno combina un caricabatterie, i veicoli e, se necessario, un contatore, insieme ad altri parametri facoltativi. Una configurazione minima richiede un caricabatterie.

**Ad esempio**:

```yaml
loadpoints:
  - title: Garage # display name for UI
    charger: charger # charger reference
    vehicle: audi # reference to standard vehicle
    mode: smart # charge mode (off, smart, now)
```

I riferimenti corrispondono sempre ai valori del parametro `name` (ad es. `charger`) nella rispettiva configurazione del dispositivo.

Vediamo ora tutti i parametri possibili.

---

## Parametri obbligatori

### `title`

Una descrizione del punto di ricarica, mostrata nell’interfaccia utente (UI).

**Ad esempio**:

```yaml
title: Garage
```

---

### `charger`

Riferimento a una configurazione `charger`.

**Ad esempio**:

```yaml
charger: charger
```

Il valore `charger` corrisponde al valore del parametro `name` nella [definizione del caricabatterie](/it/reference/configuration/chargers#name).

---

## Parametri facoltativi

### `meter`

Riferimento a una configurazione `meter` (contatore).

Questa voce serve solo se il caricabatterie usato non misura da sé la corrente o se evcc non riesce a leggere i valori di misura dal caricabatterie. Anche in questo caso la voce resta comunque facoltativa, perché evcc presuppone che per la ricarica venga effettivamente usata la corrente massima impostata.

**Ad esempio**:

```yaml
meter: charge
```

Il valore `charge` corrisponde al valore del parametro `name` nella [definizione del contatore](/it/reference/configuration/meters#name).

---

### `vehicle`

`vehicle`: riferimento a una configurazione `vehicle` assegnata come veicolo predefinito al punto di ricarica.

Quando un veicolo viene collegato al caricabatterie, si presume che sia collegato questo veicolo. Il riconoscimento automatico del veicolo viene saltato. Se è collegato un veicolo diverso (ad es. un veicolo ospite), lo si può assegnare manualmente in seguito.

**Ad esempio**:

```yaml
vehicle: renault
```

Il valore `renault` corrisponde al valore del parametro `name` nella [definizione del veicolo](/it/reference/configuration/vehicles#name).

---

### `mode`

evcc ricorda l’ultima modalità di ricarica usata.
Con il parametro `mode` puoi indicare la modalità di ricarica da usare dopo che il veicolo è stato scollegato.

**Valori possibili**:

- `off`: la ricarica viene interrotta, anche se al caricabatterie è collegato un veicolo.
- `smart`: ricarica con surplus solare, nelle ore economiche di una tariffa dinamica e secondo i piani di ricarica. Se non è disponibile energia economica, la ricarica va in pausa.
- `now`: avvia subito la ricarica alla massima potenza possibile.

**Valore predefinito:** `smart`

I valori obsoleti `pv` e `minpv` vengono ancora accettati in scrittura:
`pv` attiva `smart` e disattiva [Carica sempre](/it/features/modes#always-charge), `minpv` attiva `smart` e attiva Carica sempre.

:::caution[Modifica non retrocompatibile]
Le letture dello stato e dell’API (`/api/state`, websocket, MQTT) riportano `smart` invece di `pv`; `minpv` non compare più in lettura.
Le automazioni esterne che in lettura confrontano con `pv` o `minpv` vanno aggiornate.
Le integrazioni possono riconoscere il nuovo schema delle modalità dalla presenza di `loadpoints[].alwaysCharge` in `/api/state`.
:::

:::note
In generale un’auto elettrica richiede per la ricarica una potenza minima di 1,4 kW per fase. Con caricabatterie e veicoli che comunicano secondo lo standard ISO15118 serve in totale una potenza di almeno 1,4 kW, indipendentemente dal numero di fasi usate per la ricarica.
:::

**Ad esempio**:

```yaml
mode: smart
```

---

### `soc`

Definisce le impostazioni predefinite per la gestione del livello di carica di un veicolo collegato.

**Ad esempio**:

```yaml
soc:
  poll:
    mode: charging
    interval: 60m
  estimate: true
```

#### `poll`

Definisce come vengono usate le API del veicolo per ottenere informazioni in tempo reale sul veicolo.

:::caution
**NON** è consigliato modificare le impostazioni predefinite, perché potrebbe scaricare la batteria del veicolo o portare il produttore del veicolo a impedire attivamente il controllo della ricarica tramite evcc. **Lo fai a tuo rischio e pericolo**.
:::

#### `poll.mode`

Definisce a quali condizioni vengono letti i dati del veicolo.

**Valori possibili**:

- `charging`: aggiorna i dati **SOLO** durante una sessione di ricarica (impostazione predefinita consigliata).
- `connected`: aggiorna i dati quando il veicolo è collegato al caricabatterie (non solo durante la ricarica); il parametro `interval` definisce la frequenza.
- `always`: aggiorna sempre i dati, anche quando il veicolo non è collegato al caricabatterie; il parametro [`interval`](#pollinterval) definisce la frequenza (supportato solo per un veicolo per punto di ricarica).

**Valore predefinito:** `charging`

**Ad esempio**:

```yaml
mode: charging
```

#### `poll.interval`

Definisce ogni quanto viene interrogato il veicolo quando **NON** è in ricarica.

**Valore predefinito:** `60m`

**Ad esempio**:

```yaml
interval: 60m
```

#### `estimate`

Calcola (interpola) il livello di carica attuale tra un’interrogazione dei dati del veicolo e l’altra.

**Valori possibili**:

- `true`: evcc interpola i valori del livello di carica tra un’interrogazione dei dati del veicolo e l’altra (consigliato).
- `false`: evcc usa solo i valori del livello di carica restituiti dal veicolo.

**Valore predefinito:** `true`

**Ad esempio**:

```yaml
estimate: false # No interpolation
```

---

### `enable`

Definisce il comportamento all’avvio della ricarica con surplus solare in modalità intelligente. Definisce inoltre il comportamento durante la commutazione automatica delle fasi da 1p a 3p.

:::note
Per consentire una quota di potenza di rete, usa invece il cursore **Quota solare** nelle impostazioni del punto di ricarica (vedi [Surplus insufficiente?](/it/features/solar-charging#not-enough-surplus)).
Il cursore è disattivato finché è impostata una soglia `enable` o `disable`.
:::

**Ad esempio**:

```yaml
enable:
  threshold: 0
  delay: 1m
```

#### `threshold`

Definisce la soglia di potenza al punto di connessione alla rete in watt (W).

**Valori possibili**: un valore positivo per il prelievo dalla rete, un valore negativo per l’immissione in rete. Con `0` l’immissione deve raggiungere la potenza di ricarica minima.

**Valore predefinito:** `0`

**Ad esempio**:

```yaml
threshold: 0
```

:::note
Se nel sito hai impostato `residualPower` per spostare il punto di lavoro desiderato della regolazione del surplus, tienine conto quando imposti il valore `threshold`.

Ad esempio, se `residualPower` è impostato a 200 (la regolazione di evcc porta il punto di lavoro desiderato a 200 W di immissione in rete), un valore `threshold` di `enable` pari a 100 non significa che la ricarica parta con 100 W di prelievo dalla rete. La potenza di immissione in rete residua si riduce invece di 100 W, quindi la ricarica parte con 100 W di immissione in rete.

Per avviare in questo caso la ricarica con 100 W di prelievo dalla rete, il valore `threshold` va impostato a 300.
:::

#### `delay`

Definisce per quanto tempo deve essere soddisfatta la condizione `threshold`.

**Valore predefinito:** `1m`

**Ad esempio**:

```yaml
delay: 1m
```

---

### `disable`

Definisce il comportamento all’arresto della ricarica con surplus solare in modalità intelligente. Definisce inoltre il comportamento durante la commutazione automatica delle fasi da 3p a 1p.

**Ad esempio**:

```yaml
disable:
  threshold: 200 # maximum import power (W)
  delay: 10m
```

#### `threshold`

Definisce la soglia di potenza al punto di connessione alla rete in watt (W).

**Valori possibili**: un valore positivo per il prelievo dalla rete. Con `0` la ricarica si ferma non appena il surplus non copre più la potenza di ricarica minima.

**Valore predefinito:** `0`

**Ad esempio**:

```yaml
threshold: 200 # Maximum grid consumption of 200W is allowed
```

:::note
Se nel sito hai impostato `residualPower` per spostare il punto di lavoro desiderato della regolazione del surplus, tienine conto quando imposti il valore `threshold`. Vedi l’esempio nelle informazioni su `threshold` di [`enable`](#enable).
:::

:::caution
I valori negativi non hanno effetto: finché è disponibile surplus, evcc continua a ricaricare e non verifica mai la soglia.
:::

#### `delay`

Definisce per quanto tempo deve essere soddisfatta la condizione `threshold`.

**Valore predefinito:** `3m`

**Ad esempio**:

```yaml
delay: 10m
```

---

### `phases`

:::note[Obsoleto in YAML]
Questo valore ora si può impostare nella finestra di dialogo delle impostazioni del punto di ricarica.
:::

**Caricabatterie senza commutazione automatica delle fasi**:

Definisce il numero di fasi con cui è collegato il caricabatterie.

Questo parametro non modifica il collegamento fisico del caricabatterie, ma serve a determinare la potenza minima di avvio per la ricarica con surplus solare (insieme a `minCurrent`).

Da qualche tempo vengono valutate le tensioni in ingresso, se il contatore del caricabatterie le fornisce. In base alle tensioni, il valore `phases` viene modificato automaticamente tramite API. Se il caricabatterie viene impostato su 1p o 3p con un interruttore, non è più necessario modificare manualmente il valore `phases`.

Se invece la ricarica 1p/3p si ottiene con il cavo di ricarica corrispondente anziché con un interruttore, questo comportamento “automatico” crea problemi. In questo caso il valore `phases` va adattato di conseguenza nella configurazione del veicolo (`vehicle`). Poiché questo valore non si può modificare tramite API, si può usare la seguente soluzione alternativa:

Configura il veicolo due volte: una volta con `phases: 1` e una volta con `phases: 3`. A seconda del numero di fasi con cui vuoi caricare, seleziona nell’interfaccia il veicolo corrispondente.

Se è collegato un veicolo noto, per il calcolo viene usato il valore più basso tra `vehicle: phases` e `loadpoint: phases`. Per i veicoli sconosciuti viene considerato solo `loadpoint: phases`.

Mentre il veicolo è in ricarica e il caricabatterie o il contatore di ricarica forniscono le correnti di fase, viene rilevato il numero effettivo di fasi, che (finché il veicolo resta collegato) viene usato per i calcoli successivi. Questo funziona solo per punti di ricarica trifase.

**Valore predefinito:** `3`

**Valori possibili:** `1|3`

**Ad esempio**:

```yaml
phases: 1
```

**Caricabatterie con commutazione automatica delle fasi**:

Il valore determina se la commutazione automatica delle fasi è attivata o disattivata.

`phases: 0` = commutazione automatica attivata

`phases: 1 or 3` = commutazione automatica disattivata, il valore impostato è fisso

**Valore predefinito:** `3`

**Valori possibili:** `0|1|3`

**Ad esempio**:

```yaml
phases: 0
```

:::note
Se al punto di ricarica non è assegnato un caricabatterie ma una delle prese commutabili supportate (AVM FritzDECT, Shelly, Tasmota, TP-Link ecc.), `phases` va impostato a **1** per garantire un corretto controllo della ricarica.
:::

---

### `priority`

Durante la ricarica questo parametro stabilisce la priorità dei punti di ricarica tra loro.

Il punto di ricarica con priorità riceve la potenza di ricarica degli altri punti di ricarica senza priorità o con priorità più bassa. Quando un punto di ricarica con priorità attinge a questa potenza, può verificarsi un breve prelievo dalla rete finché la regolazione non si stabilizza.

Valori più alti indicano una priorità più alta. I punti di ricarica senza questa voce hanno `priority: 0`.

Con più punti di ricarica questo parametro non influisce sull’ordine in cui vengono avviate le sessioni di ricarica. Se però sta ricaricando un punto di ricarica con priorità più bassa, può essere attivato uno con priorità più alta, se gli viene dato accesso alla potenza di ricarica inutilizzata.

Questa assegnazione delle priorità funziona in modalità `smart`. Con [Carica sempre](/it/features/modes#always-charge) attivo la ricarica non viene interrotta, ma solo ridotta al minimo.

:::note
Se per un veicolo è definita una priorità, questa prevale sulla priorità del punto di ricarica a cui è collegato.
:::

**Valore predefinito:** `0`

**Ad esempio**:

```yaml
priority: 2
```

---
