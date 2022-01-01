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
tokens:
  access: # access token
  refresh: # refresh token
vin: W... # VIN
cache: 5m # optional`,
	}

	registry.Add(template)
}
