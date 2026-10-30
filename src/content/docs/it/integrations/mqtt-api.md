---
title: "API MQTT"
description: "evcc pubblica via MQTT lo stato di sito, punti di ricarica, veicoli e batteria domestica e accetta topic scrivibili per cambiare modalità, limiti o piani di ricarica."
sidebar:
  order: 2
translatedFrom: "57bf7b20695d"
---

Lo [stato dell’API](/it/reference/state) viene pubblicato anche via MQTT.
Ogni campo diventa un topic a sé; oggetti annidati e liste vengono suddivisi in singoli sotto-topic (l’indice parte da `1`).

## Topic di sola lettura

### Sito

- `evcc/site/siteTitle`: titolo del sito
- `evcc/site/currency`: valuta configurata
- `evcc/site/homePower`: consumo domestico attuale (W)
- `evcc/site/pvPower`: produzione solare attuale (W)
- `evcc/site/grid/power`: potenza di rete attuale (W, positivo = prelievo)
- `evcc/site/battery/power`: potenza della batteria (W, positivo = scarica)
- `evcc/site/battery/soc`: livello di carica della batteria (%)
- `evcc/site/greenShareHome`: quota di energia autoprodotta nel consumo domestico (0–1)
- `evcc/site/greenShareLoadpoints`: quota di energia autoprodotta nel consumo dei punti di ricarica (0–1)
- `evcc/site/tariffGrid`: tariffa di prelievo attuale
- `evcc/site/tariffFeedIn`: tariffa di immissione attuale
- `evcc/site/tariffCo2`: intensità di CO₂ attuale
- `evcc/site/batteryGridChargeActive`: carica della batteria dalla rete in corso (true/false)

### Punti di ricarica

Tutti gli ID dei punti di ricarica partono da `1`.

- `evcc/loadpoints`: numero di punti di ricarica disponibili
- `evcc/loadpoints/<id>/title`: titolo del punto di ricarica
- `evcc/loadpoints/<id>/connected`: veicolo collegato (true/false)
- `evcc/loadpoints/<id>/charging`: ricarica in corso (true/false)
- `evcc/loadpoints/<id>/enabled`: caricabatterie abilitato (true/false)
- `evcc/loadpoints/<id>/mode`: modalità di ricarica (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: opzione carica sempre (`off`, `on`, `once`)
- `evcc/loadpoints/<id>/chargePower`: potenza di ricarica attuale (W)
- `evcc/loadpoints/<id>/chargedEnergy`: energia caricata nella sessione (Wh)
- `evcc/loadpoints/<id>/chargeDuration`: durata della ricarica (ns)
- `evcc/loadpoints/<id>/chargeRemainingDuration`: durata residua della ricarica (ns)
- `evcc/loadpoints/<id>/chargeRemainingEnergy`: energia residua (Wh)
- `evcc/loadpoints/<id>/chargeTotalImport`: lettura totale del contatore di ricarica (Wh)
- `evcc/loadpoints/<id>/vehicleName`: identificativo del veicolo
- `evcc/loadpoints/<id>/vehicleTitle`: nome visualizzato del veicolo
- `evcc/loadpoints/<id>/vehicleSoc`: livello di carica del veicolo (%)
- `evcc/loadpoints/<id>/vehicleRange`: autonomia del veicolo (km)
- `evcc/loadpoints/<id>/phasesActive`: fasi attive
- `evcc/loadpoints/<id>/planActive`: piano di ricarica attualmente attivo (true/false)
- `evcc/loadpoints/<id>/sessionEnergy`: energia della sessione (Wh)
- `evcc/loadpoints/<id>/sessionSolarPercentage`: quota di energia autoprodotta nella sessione (%)
- `evcc/loadpoints/<id>/smartCostActive`: ricarica intelligente dalla rete in corso (true/false)
- `evcc/loadpoints/<id>/effectivePriority`: priorità effettiva

:::caution[Altri topic]
Questo elenco è incompleto.
Per tutti i topic disponibili usa [MQTT Explorer](https://mqtt-explorer.com/).
:::

## Topic scrivibili

Per modificare un topic scrivibile, aggiungi `/set` al topic e invia il nuovo valore.

```bash
mosquitto_pub -t "evcc/loadpoints/1/phasesConfigured/set" -m "3"
```

Gli orari sono in UTC nel formato `yyyy-mm-ddThh:mm:ssZ`, ad es. `2023-03-05T07:00:00Z` (= 5 marzo 2023, 8:00 CET).

Le seguenti stringhe vengono riconosciute come valori vuoti: `nil`, `null`, `none`, `-`.
Usale per cancellare i limiti impostati in precedenza:

```bash
mosquitto_pub -t "evcc/site/batteryGridChargeLimit/set" -m "none"
```

### Sito

- `evcc/site/prioritySoc`: livello di carica prioritario della batteria
- `evcc/site/bufferSoc`: livello di carica tampone della batteria
- `evcc/site/bufferStartSoc`: livello di carica della batteria per l’avvio del tampone
- `evcc/site/residualPower`: potenza residua di rete
- `evcc/site/batteryGridChargeLimit`: limite di prezzo per la ricarica intelligente
- `evcc/site/batteryDischargeControl`: abilita/disabilita il controllo della scarica della batteria (true/false)
- `evcc/site/batteryMode`: modalità esterna della batteria (`normal`, `hold`, `charge`, `holdcharge`, `discharge`), controlla direttamente tutte le batterie controllabili, ha la precedenza sulle altre modalità di evcc e si reimposta dopo 60 s
- `evcc/site/smartCostLimit`: limite di prezzo intelligente per tutti i punti di ricarica
- `evcc/site/smartFeedInPriorityLimit`: limite di priorità dell’immissione in rete per tutti i punti di ricarica

### Punti di ricarica

- `evcc/loadpoints/<id>/mode`: modalità di ricarica (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: opzione carica sempre (`off`, `on`, `once`), solo in modalità intelligente
- `evcc/loadpoints/<id>/minSoc`: livello di carica minimo
- `evcc/loadpoints/<id>/limitSoc`: limite di carica in %, applicabile solo ai veicoli online
- `evcc/loadpoints/<id>/limitEnergy`: limite di energia in kWh, applicabile solo ai veicoli offline
- `evcc/loadpoints/<id>/planEnergy`: energia del piano di ricarica (payload JSON: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phasesConfigured`: fasi configurate
- `evcc/loadpoints/<id>/minCurrent`: valore di corrente minima
- `evcc/loadpoints/<id>/maxCurrent`: valore di corrente massima
- `evcc/loadpoints/<id>/solarShare`: quota solare della potenza di ricarica minima (0–1)
- `evcc/loadpoints/<id>/enableThreshold`: soglia di attivazione
- `evcc/loadpoints/<id>/enableDelay`: ritardo di attivazione (s)
- `evcc/loadpoints/<id>/disableThreshold`: soglia di disattivazione
- `evcc/loadpoints/<id>/disableDelay`: ritardo di disattivazione (s)
- `evcc/loadpoints/<id>/batteryboost`: boost da batteria abilitato (1/0)
- `evcc/loadpoints/<id>/batteryBoostLimit`: livello di carica limite per il boost da batteria
- `evcc/loadpoints/<id>/priority`: valore di priorità
- `evcc/loadpoints/<id>/smartCostLimit`: limite di prezzo intelligente
- `evcc/loadpoints/<id>/smartFeedInPriorityLimit`: limite di priorità dell’immissione in rete
- `evcc/loadpoints/<id>/planStrategy`: strategia del piano di ricarica (JSON)
- `evcc/loadpoints/<id>/vehicle`: imposta il veicolo per nome

### Veicoli

Per i nomi dei veicoli vedi `evcc/vehicles`.

- `evcc/vehicles/<name>/minSoc`: livello di carica minimo in %
- `evcc/vehicles/<name>/limitSoc`: limite di carica in %
- `evcc/vehicles/<name>/planSoc`: livello di carica del piano di ricarica (payload JSON: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/vehicles/<name>/planStrategy`: strategia del piano di ricarica (JSON)
