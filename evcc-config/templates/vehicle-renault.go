package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "renault",
		Name:   "Renault",
		Sample: `title: Zoe # display name for UI
capacity: 60 # kWh
user: # user
password: # password
vin: WREN... # optional`,
	}

	registry.Add(template)
}
