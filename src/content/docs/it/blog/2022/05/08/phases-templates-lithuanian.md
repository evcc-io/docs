---
date: 2022-05-08
title: "Gestione delle fasi, template e lituano"
description: "A maggio 2022 riassumiamo le release di evcc dalla 0.81 alla 0.91: nuovi caricabatterie e veicoli, commutazione delle fasi migliorata, template e interfaccia in lituano."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "261c638cde95"
---

Sono passati alcuni mesi dall’ultimo articolo del blog. È quindi il momento di darti un breve riepilogo e una panoramica di ciò che è successo in evcc nelle ultime undici release (da v0.81 a v0.91).

<!-- excerpt -->

## Nuovi dispositivi supportati

L’elenco dell’hardware supportato da evcc cresce costantemente.

### Caricabatterie 🔌

Abbiamo aggiunto alcune integrazioni di caricabatterie. Dato che evcc ora supporta anche il diffusissimo [Bender Controller](https://github.com/evcc-io/evcc/pull/3103), abbiamo potuto ampliare in modo significativo la gamma di dispositivi supportati.

Ecco i produttori aggiunti dall’inizio dell’anno: Alphatec, Ebee, Ensto, Garo, HardyBarth, Innogy, Juice, Mennekes, OpenWB Pro, Optec, PC Electric, SmartWB, TechniSat, Tapo Smarthome, Ubitricity Vestel, Webasto. [(Tutti i caricabatterie)](/it/chargers)

### Veicoli 🚗 🛵

Audi (e-tron), Cupra, Jaguar, Landrover, Mercedes, Silence S01, Smart. [(Tutti i veicoli)](/it/vehicles)

### Inverter ☀️ 🔋

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Tutti i contatori)](/it/meters)

### Contatori di rete 📟

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Tutti i contatori)](/it/meters)

### Supporto RFID 🪪

Ora anche i caricabatterie di Easee e Warp possono usare la [funzione RFID di evcc per il riconoscimento del veicolo](/it/features/vehicle).

## Gestione delle fasi migliorata (1P/3P)

La prima versione della commutazione delle fasi per i caricabatterie supportati è disponibile in evcc dalla metà dello scorso anno. Abbiamo potuto raccogliere un po’ di esperienza e, sulla base di questa, a febbraio abbiamo [riprogettato a fondo](https://github.com/evcc-io/evcc/pull/2613) il meccanismo. In questo modo la commutazione delle fasi è molto più affidabile e si comporta meglio anche in situazioni con valori di configurazione o di misura sconosciuti o non plausibili.

## Template e documentazione

[A dicembre](/it/blog/2021/12/12/version-0-73#evcc-configure) abbiamo posto le basi per semplificare la configurazione iniziale con la procedura guidata da riga di comando `evcc configure`.

La sintassi di configurazione di evcc è molto flessibile e potente. Ad esempio, i dispositivi non ancora supportati ufficialmente si possono spesso collegare solo tramite configurazione, se si conoscono i relativi registri Modbus e le strutture JSON dell’interfaccia. Nel repository `evcc-io/config`, ora archiviato, avevamo raccolto configurazioni di esempio da copiare e incollare nella propria configurazione.

Insieme alla procedura guidata da riga di comando abbiamo introdotto il concetto di **template**. I template ci permettono di incapsulare in modo pulito il codice ripetitivo e la conoscenza interna dei dispositivi (protocolli, indirizzi, tipi di dati, nomi dei campi). L’esempio seguente per la configurazione di un contatore di rete Solarlog illustra bene il cambiamento:

Prima:

```yaml
meters:
  - name: my_solarlog
    type: custom
    power:
      source: calc
      add:
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3502
            type: input
            decode: uint32s
          scale: -1
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3518
            type: input
            decode: uint32s
```

Dopo:

```yaml
meters:
  - name: my_solarlog
    type: template
    template: solarlog
    usage: grid
    host: 192.168.0.77
```

Ora l’utente deve solo conoscere e inserire il nome host o l’indirizzo IP della propria istanza Solarlog: protocollo e struttura dei dati sono incapsulati nel template `solarlog`.

Inoltre i template ricevono anche una descrizione strutturata di tutti i parametri obbligatori e facoltativi, oltre a valori predefiniti e testi di aiuto localizzati.

[Da marzo](https://github.com/evcc-io/docs/pull/92) abbiamo riscritto la [documentazione dei dispositivi su docs.evcc.io](/it/chargers) basandola sui template. Naturalmente le sintassi precedenti funzionano ancora. Dato che funzioni future come la configurazione via web (sì, arriverà 😄) si basano su `type: template`, ti consigliamo di convertire già ora le tue configurazioni esistenti al nuovo formato.

## Nuova lingua: lituano 🇱🇹

Con la v0.91 abbiamo ricevuto una nuova traduzione. L’interfaccia di evcc è ora disponibile anche in lituano. È la quarta lingua oltre a tedesco, inglese e italiano. Un grande grazie a [RTTTC](https://github.com/RTTTC) 💚.

Dato che le nostre conoscenze linguistiche sono piuttosto limitate, siamo sempre grati per i contributi alle traduzioni. Al momento non c’è documentazione in merito, ma se ti interessa, dai semplicemente un’occhiata alla [pull request di RTTTC](https://github.com/evcc-io/evcc/pull/3205).

## Cosa ci aspetta?

Forse l’hai già notato. Con la prossima release evcc riceverà un’interfaccia utente completamente ridisegnata. È già disponibile nelle attuali nightly build e [qui](https://github.com/evcc-io/evcc/discussions/3149) e [qui](https://github.com/evcc-io/evcc/pull/2889) trovi informazioni sul processo di sviluppo. Ma ne parleremo meglio nel prossimo articolo del blog.

## Correzioni di bug

Le ultime versioni contenevano numerose correzioni di bug e molti piccoli miglioramenti. Trovi un elenco dettagliato tramite il link al changelog qui sotto.

## Changelog

Qui trovi maggiori dettagli sulle ultime modifiche:

- [Versione 0.91](https://github.com/evcc-io/evcc/releases/tag/0.91)
- [Versione 0.90](https://github.com/evcc-io/evcc/releases/tag/0.90)
- [Versione 0.89](https://github.com/evcc-io/evcc/releases/tag/0.89)
- [Versione 0.88](https://github.com/evcc-io/evcc/releases/tag/0.88)
- [Versione 0.87](https://github.com/evcc-io/evcc/releases/tag/0.87)
- [Versione 0.86](https://github.com/evcc-io/evcc/releases/tag/0.86)
- [Versione 0.85](https://github.com/evcc-io/evcc/releases/tag/0.85)
- [Versione 0.84](https://github.com/evcc-io/evcc/releases/tag/0.84)
- [Versione 0.83](https://github.com/evcc-io/evcc/releases/tag/0.83)
- [Versione 0.82](https://github.com/evcc-io/evcc/releases/tag/0.82)
- [Versione 0.81](https://github.com/evcc-io/evcc/releases/tag/0.81)
