package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "peugeot",
		Name:   "Peugeot",
		Sample: `title: e-208 # display name for UI
capacity: 50 # kWh
user: user@example.com
password: xxx
vin: # optional`,
	}

	registry.Add(template)
}
