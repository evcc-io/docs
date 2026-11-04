---
title: "curtailers"
description: "Aggiungi in evcc.yaml i dispositivi limitatori che riducono l’immissione in rete dell’impianto fotovoltaico su richiesta del gestore di rete e scopri quando servono."
sidebar:
  order: 6
translatedFrom: "ca8194269ca0"
---

I _curtailers_ (dispositivi limitatori) sono un elenco di dispositivi che limitano soltanto l’immissione in rete dell’impianto fotovoltaico su richiesta del gestore di rete (§ 9 EEG).
La maggior parte degli inverter viene limitata tramite la propria voce in [`meters`](/it/reference/configuration/meters) e non richiede un dispositivo separato.
Un dispositivo limitatore serve solo in questi casi: se l’inverter non può essere limitato tramite la sua configurazione del contatore, con l’SMA Sunny Home Manager 2.0 oppure negli impianti con più inverter, in cui il limite va scritto sull’inverter principale.
Per il contesto e l’elenco dei dispositivi supportati, vedi [Limite esterno](/it/external-limit#curtailment-devices).

I dispositivi limitatori vanno elencati in [`site.curtailers`](/it/reference/configuration/site#curtailers).
Diventano attivi solo quando l’integrazione [`hems`](/it/reference/configuration/hems) segnala un limite di immissione in rete.
Il limite viene passato come percentuale della potenza installata del generatore sia a tutti i contatori `pv` limitabili sia ai dispositivi limitatori.

**Esempio**:

```yaml
curtailers:
  - name: my_curtailer
    type: template
    template: solaredge
    modbus: tcpip
    host: 192.168.0.10
    port: 1502
    id: 1
    productionnominalmax: 15000 # installed generator power of the whole installation (Wp)

site:
  curtailers:
    - my_curtailer
```

---

## Parametri obbligatori

### `name`

Nome univoco del dispositivo.
Viene usato come riferimento in [`site.curtailers`](/it/reference/configuration/site#curtailers).

---

### `type`

- `template`: uno dei [dispositivi supportati](/it/external-limit#curtailment-devices). La pagina del dispositivo mostra il blocco di configurazione completo.
- `custom`: [dispositivo definito dall’utente](/it/user-defined-devices#curtailer) con i plugin `curtail` e `curtailed`.
