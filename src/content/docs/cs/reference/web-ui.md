---
title: "Webové rozhraní"
description: "Každá stránka webového rozhraní má vlastní URL pro záložky a odkazy a nastavení zobrazení, např. design, jazyk nebo jednotky, lze předat pomocí parametrů v URL."
sidebar:
  order: 3
translatedFrom: "e90418bf26a9"
---

Webové rozhraní běží na portu `7070` a používá směrování přes hash (#).
URL může určit stránku i nastavení zobrazení.

## Dostupné stránky {#links}

Každá stránka má vlastní adresu za znakem #.
Můžete na ni odkázat přímo nebo si ji uložit do záložek.

| Stránka                  | Cesta        | Přihlášení | Parametry                                         |
| ------------------------ | ------------ | ---------- | ------------------------------------------------- |
| Nabíjení / nabíjecí body | `#/`         | ne         | `lp`                                              |
| Domácí baterie           | `#/battery`  | ne         | —                                                 |
| Předpověď                | `#/forecast` | ne         | —                                                 |
| Nabíjecí relace          | `#/sessions` | ne         | `month`, `year`, `loadpoint`, `vehicle`, `period` |
| Konfigurace              | `#/config`   | ano        | —                                                 |
| Protokoly                | `#/log`      | ano        | `areas`, `level`                                  |
| Historie 🧪              | `#/history`  | ne         | `day`, `month`, `year`, `period`                  |
| Optimalizace 🧪          | `#/optimize` | ne         | —                                                 |
| Nahlásit problém         | `#/issue`    | ano        | —                                                 |

🧪 označuje experimentální stránky.

| Parametr    | Popis                                              |
| ----------- | -------------------------------------------------- |
| `lp`        | Číslo nabíjecího bodu, počínaje `1`                |
| `year`      | Zobrazený rok, např. `2026`                        |
| `month`     | Měsíc, `1`–`12`                                    |
| `day`       | Den v měsíci, `1`–`31`                             |
| `period`    | Časový rozsah: `day`, `month`, `year` nebo `total` |
| `loadpoint` | Název nabíjecího bodu                              |
| `vehicle`   | Název vozidla                                      |
| `areas`     | Zobrazené oblasti protokolu, oddělené čárkou       |
| `level`     | Minimální úroveň protokolu                         |

### Příklady {#examples}

Předvolte nabíjecí bod na stránce Nabíjení:

```
http://evcc.local:7070/#/?lp=1
```

Nejjednodušší způsob, jak získat správný odkaz, je vybrat nabíjecí bod v rozhraní a zkopírovat adresu z prohlížeče.

Filtrujte stránku **Nabíjecí relace** nebo **Historie** podle časového rozsahu nebo zařízení:

```
http://evcc.local:7070/#/sessions?year=2026&month=3
```

## Nastavení přes URL {#settings}

Volby v **Více → Nastavení rozhraní** lze nastavit také přes URL.
Zobrazení rozhraní se tím vynutí bez ohledu na nastavení uložené v prohlížeči, což se hodí pro kioskové obrazovky, dashboardy a vložení do iframe:

| Název       | Parametr | Hodnoty                 |
| ----------- | -------- | ----------------------- |
| Design      | `theme`  | `auto`, `light`, `dark` |
| Jazyk       | `lang`   | `auto`, `de`, …         |
| Jednotky    | `unit`   | `km`, `mi`              |
| Formát času | `format` | `12`, `24`              |

### Příklad {#example}

```
http://evcc.local:7070/?theme=dark&lang=de&unit=mi&format=24
```

Hodnoty se použijí jednou při načtení, uloží se do prohlížeče a poté se z adresního řádku odstraní.

`lang` přijímá jakýkoli kód jazyka, pro který existuje překlad ve [složce `i18n`](https://github.com/evcc-io/evcc/tree/master/i18n) (např. `de`, `fr`, `zh-Hans`), nebo `auto`, které se řídí jazykem prohlížeče.

Nastavení a stránku lze zkombinovat v jedné URL.
Nastavení se píší před `#`, stránka za něj:

```
http://evcc.local:7070/?theme=dark&lang=de#/sessions
```
