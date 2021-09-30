package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "id",
		Name:   "VW ID (ID.3, ID.4, but also e-Golf, e-Up)",
		Sample: `title: ID.3 # display name for UI
capacity: 50 # kWh
user: # user
password: # password
vin: WVWZZZ... # optional`,
	}

	registry.Add(template)
}
