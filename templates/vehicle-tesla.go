package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "tesla",
		Name:   "Tesla",
		Sample: `title: Model S # display name for UI
capacity: 90 # kWh
tokens:
  access: ...
  refresh: ...
vin: # optional`,
	}

	registry.Add(template)
}
