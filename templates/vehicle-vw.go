package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "vw",
		Name:   "VW (e-Up, e-Golf, etc)",
		Sample: `title: Golf # display name for UI
capacity: 10 # kWh
user: # user
password: # password
vin: WVWZZZ... # optional`,
	}

	registry.Add(template)
}
