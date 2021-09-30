package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "bmw",
		Name:   "BMW",
		Sample: `title: i3 # display name for UI
capacity: 65 # kWh
user: # user
password: # password
vin: WBMW... # optional`,
	}

	registry.Add(template)
}
