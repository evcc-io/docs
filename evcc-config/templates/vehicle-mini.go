package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "mini",
		Name:   "Mini",
		Sample: `title: Cooper SE # display name for UI
capacity: 32 # kWh
user: # user
password: # password
vin: WBMW... # optional`,
	}

	registry.Add(template)
}
