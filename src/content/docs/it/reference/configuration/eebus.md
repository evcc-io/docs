---
title: "eebus"
description: "Configura EEBUS in evcc.yaml con il tuo certificato, le interfacce di rete e lo SHIP-ID, e scopri come spostare la configurazione nell’interfaccia web."
sidebar:
  order: 14
translatedFrom: "0d970a6e61a6"
---

:::tip[Consiglio]
Configura EEBUS nell’interfaccia sotto **Configurazione → EEBus**.
Certificato e identificatori vengono generati automaticamente al primo avvio.
:::

**Esempio**:

```yaml
eebus:
  shipid: EVCC-1234567890abcdef
  interfaces:
    - eth0
  certificate:
    public: |
      -----BEGIN CERTIFICATE-----
      1234567890abcdef==
      -----END CERTIFICATE-----
    private: |
      -----BEGIN EC PRIVATE KEY-----
      1234567890abcdef
      -----END EC PRIVATE KEY-----
```

:::note[Migrazione da YAML all’interfaccia]
Rimuovi il blocco `eebus:` dal tuo `evcc.yaml` e riavvia la tua istanza evcc.
Viene generato automaticamente un nuovo certificato e tutti i dispositivi EEBUS devono essere accoppiati di nuovo.

Per mantenere il certificato esistente, inseriscilo nella finestra di dialogo EEBUS sotto **Mostra impostazioni avanzate**.
È utile se lo SKI (parte del certificato pubblico) è già registrato presso il tuo gestore di rete per il [controllo esterno](/it/external-limit).
:::

---

## Parametri obbligatori

### `certificate`

Definisce il certificato e la relativa chiave privata da usare per la connessione HTTPS necessaria.

Con la configurazione nell’interfaccia, il certificato viene generato automaticamente.

**Esempio**:

```yaml
certificate:
  public: |
    -----BEGIN CERTIFICATE-----
    1234567890abcdef==
    -----END CERTIFICATE-----
  private: |
    -----BEGIN EC PRIVATE KEY-----
    1234567890abcdef
    -----END EC PRIVATE KEY-----
```

---

### `certificate.public`

Il certificato pubblico.

**Esempio**:

```yaml
public: |
  -----BEGIN CERTIFICATE-----
  1234567890abcdef==
  -----END CERTIFICATE-----
```

---

### `certificate.private`

La chiave privata del certificato.

**Esempio**:

```yaml
private: |
  -----BEGIN EC PRIVATE KEY-----
  1234567890abcdef
  -----END EC PRIVATE KEY-----
```

---

## Parametri facoltativi

### `interfaces`

Definisce un elenco di interfacce di rete tramite cui EEBUS deve comunicare. Per impostazione predefinita vengono usate tutte le interfacce, ma questo può causare problemi di comunicazione.

**Esempio**:

```yaml
interfaces:
  - eth0
```

### `shipid`

Definisce lo SHIP-ID da usare.
Dovrebbe servire solo per scopi di sviluppo.

Normalmente evcc genera lo SHIP-ID automaticamente dal `machine-id` (su hardware reale) o da un ID impianto generato casualmente (in ambienti container come Docker), che viene salvato nel database.
Per una migliore portabilità è consigliabile impostare un ID impianto esplicito tramite `plant` in `evcc.yaml` o con la variabile d’ambiente `EVCC_PLANT`.
Lo SHIP-ID è legato al certificato: se cambia uno dei due, l’accoppiamento con i dispositivi va ripetuto.

:::caution[Attenzione]
Non modificare questo valore manualmente, a meno che tu non sappia esattamente cosa stai facendo.
:::

**Esempio**:

```yaml
shipid: EVCC-1234567890abcdef
```
