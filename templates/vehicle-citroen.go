package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "citroen",
		Name:   "Citroen",
		Sample: `title: e-C4 # display name for UI
capacity: 50 # kWh
user: user@example.com
password: xxx
vin: # optional`,
	}

	registry.Add(template)
}
