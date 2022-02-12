package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "tronity",
		Name:   "Tronity Cloud Service",
		Sample: `title: Golf # display name for UI
capacity: 10 # kWh
credentials:
  id: # user id
  secret: # secret
vin: W... # VIN optional
cache: 5m # optional`,
	}

	registry.Add(template)
}
