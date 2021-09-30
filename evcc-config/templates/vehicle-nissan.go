package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "nissan",
		Name:   "Nissan",
		Sample: `title: Leaf # display name for UI
capacity: 60 # kWh
user: # user
password: # password`,
	}

	registry.Add(template)
}
