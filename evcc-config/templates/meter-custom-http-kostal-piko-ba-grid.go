package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Kostal Piko + Piko BA (Grid Meter)",
		Sample: `power:
  source: calc
  add:
  - source: http
    uri: http://192.0.2.2/api/dxs.json?dxsEntries=67109120 # PV AC Ausgang
    jq: .dxsEntries[0].value
    scale: -1.0
  - source: http
    uri: http://192.0.2.2/api/dxs.json?dxsEntries=83886848 # Netzbezug
    jq: .dxsEntries[0].value
  - source: http
    uri: http://192.0.2.2/api/dxs.json?dxsEntries=83886336 # PV Eigenverbrauch
    jq: .dxsEntries[0].value`,
	}

	registry.Add(template)
}
