package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "volvo",
		Name:   "Volvo",
		Sample: `title: Volvo # display name for UI
capacity: 50 # kWh
user: # user
password: # password
vin: W... # optional`,
	}

	registry.Add(template)
}
