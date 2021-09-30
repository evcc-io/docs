package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "hyundai",
		Name:   "Hyundai",
		Sample: `title: Kona # display name for UI
capacity: 64 # kWh
user: # user
password: # password`,
	}

	registry.Add(template)
}
