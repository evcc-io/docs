package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "lgess",
		Name:   "LG ESS HOME 8/10 (Battery Meter)",
		Sample: `usage: battery
# uri and password are only required once if multiple lgess usages are defined
uri: https://192.0.2.2/ # URI of the LG ESS HOME inverter
password: "DE200..." # registration number of the LG ESS HOME inverter`,
	}

	registry.Add(template)
}
