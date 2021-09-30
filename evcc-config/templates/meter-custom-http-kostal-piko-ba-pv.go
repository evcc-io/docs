package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Kostal Piko + Piko BA (PV Meter)",
		Sample: `power:
  source: http
  uri: http://192.0.2.2/api/dxs.json?dxsEntries=67109120 # PV AC Ausgang
  jq: .dxsEntries[0].value`,
	}

	registry.Add(template)
}
