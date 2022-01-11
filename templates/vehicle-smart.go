package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "smart",
		Name:   "Smart EQ",
		Sample: `title: Smart EQ # display name for UI
capacity: 17.6 # kWh
user: # user
password: # password
vin: W...`,
	}

	registry.Add(template)
}
