# Configuration examples for EVCC

[![Build Status](https://github.com/evcc-io/config/workflows/Build/badge.svg)](https://github.com/evcc-io/config/actions?query=workflow%3ABuild)

Configuration examples for the [EVCC EV Charge Controller](https://github.com/evcc-io/evcc).

[EVCC](https://github.com/evcc-io/evcc) supports a growing list of [chargers](#chargers), [meters](#meters) and [vehicles](#vehicles). See below for detailed configuration.
Additional devices can be configured using `custom` devices and related [plugins](#https://github.com/evcc-io/evcc#plugins).

## Contributing

If you want to contribute configurations to this repository please open a Pull Request ("PR"). PRs should contain:

- updated or new `yaml` configuration (see https://github.com/evcc-io/config/tree/master/yaml)
- run `make` to generate compilable Go code (configurations are used for testing) and update the README

## Chargers
{{range filter "charger" .}}
- [{{.Name}}](#{{href "charger" .Name}}){{end}}

## Meters
{{range filter "meter" .}}
- [{{.Name}}](#{{href "meter" .Name}}){{end}}

## Vehicles
{{range filter "vehicle" .}}
- [{{.Name}}](#{{href "vehicle" .Name}}){{end}}

## Details

### Meters

{{range filter "meter" .}}
<a id="{{href "meter" .Name}}"></a>
#### {{.Name}}

```yaml
- type: {{.Type}}
{{.Sample | indent 2}}
```
{{end}}

### Chargers

{{range filter "charger" .}}
<a id="{{href "charger" .Name}}"></a>
#### {{.Name}}

```yaml
- type: {{.Type}}
{{.Sample | indent 2}}
```
{{end}}

### Vehicles

{{range filter "vehicle" .}}
<a id="{{href "vehicle" .Name}}"></a>
#### {{.Name}}

```yaml
- type: {{.Type}}
{{.Sample | indent 2}}
```
{{end}}
