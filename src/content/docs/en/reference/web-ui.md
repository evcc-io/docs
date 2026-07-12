---
title: "Web UI"
sidebar:
  order: 3
---

The web UI runs on port `7070` and uses hash routing.
The URL can set both the page and the display settings.

## Available Pages {#links}

Each page has its own hash route.
Link to it directly or bookmark it.

| Page              | Route        | Login | Parameters                                        |
| ----------------- | ------------ | ----- | ------------------------------------------------- |
| Home / loadpoints | `#/`         | no    | `lp`                                              |
| Home Battery      | `#/battery`  | no    | —                                                 |
| Forecast          | `#/forecast` | no    | —                                                 |
| Charging Sessions | `#/sessions` | no    | `month`, `year`, `loadpoint`, `vehicle`, `period` |
| Configuration     | `#/config`   | yes   | —                                                 |
| Logs              | `#/log`      | yes   | `areas`, `level`                                  |
| History 🧪        | `#/history`  | no    | `day`, `month`, `year`, `period`                  |
| Optimize 🧪       | `#/optimize` | no    | —                                                 |
| Report a problem  | `#/issue`    | yes   | —                                                 |

🧪 marks experimental pages.

| Parameter   | Description                                   |
| ----------- | --------------------------------------------- |
| `lp`        | Loadpoint number, starting at `1`             |
| `year`      | Year to show, e.g. `2026`                     |
| `month`     | Month, `1`–`12`                               |
| `day`       | Day of month, `1`–`31`                        |
| `period`    | Time range: `day`, `month`, `year` or `total` |
| `loadpoint` | Loadpoint title                               |
| `vehicle`   | Vehicle title                                 |
| `areas`     | Log areas to show, comma-separated            |
| `level`     | Minimum log level                             |

### Examples {#examples}

Pre-select a loadpoint on the home screen:

```
http://evcc.local:7070/#/?lp=1
```

The simplest way to get the right link is to select the loadpoint in the UI and copy the address from your browser.

Filter **Charging Sessions** or **History** by time range or device:

```
http://evcc.local:7070/#/sessions?year=2026&month=3
```

## Applying Settings {#settings}

The options under **More → User Interface** can also be set through the URL.
This forces the UI's appearance regardless of any stored browser preference, useful for kiosk screens, dashboards and iframe embeds:

| Name        | Parameter | Values                  |
| ----------- | --------- | ----------------------- |
| Design      | `theme`   | `auto`, `light`, `dark` |
| Language    | `lang`    | `auto`, `de`, …         |
| Units       | `unit`    | `km`, `mi`              |
| Time format | `format`  | `12`, `24`              |

### Example {#example}

```
http://evcc.local:7070/?theme=dark&lang=de&unit=mi&format=24
```

The values are applied once on load, stored as a browser preference and then removed from the address bar.

`lang` accepts any language code with a translation in the [`i18n` folder](https://github.com/evcc-io/evcc/tree/master/i18n) (e.g. `de`, `fr`, `zh-Hans`) or `auto` to follow the browser language.

Settings and a page can be combined in one URL.
Settings go before the `#`, the page after it:

```
http://evcc.local:7070/?theme=dark&lang=de#/sessions
```
