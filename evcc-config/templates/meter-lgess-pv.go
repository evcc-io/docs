package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "lgess",
		Name:   "LG ESS HOME 8/10 (PV Meter)",
		Sample: `usage: pv
# uri and password are only required once if multiple lgess usages are defined
uri: https://192.0.2.2/
password: "DE200..." # registration number of the LG ESS HOME inverter`,
	}

	registry.Add(template)
}
