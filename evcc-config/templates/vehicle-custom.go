package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "custom",
		Name:   "Generic",
		Sample: `title: Mein Auto # display name for UI
capacity: 50 # byttery capacity (kWh)
soc: # battery soc (%)
  source: # plugin type
  # ...
status: # optional charge status (A..F)
  source: # plugin type
  # ...
range: # optional electric range (km)
  source: # plugin type
  # ...
cache: 5m # optional cache duration`,
	}

	registry.Add(template)
}
