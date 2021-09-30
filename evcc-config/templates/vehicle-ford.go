package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "ford",
		Name:   "Ford",
		Sample: `title: Kuga # display name for UI
capacity: 10 # kWh
user: # user
password: # password
vin: WF0FXX... # optional`,
	}

	registry.Add(template)
}
