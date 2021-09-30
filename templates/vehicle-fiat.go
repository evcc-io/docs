package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "fiat",
		Name:   "Fiat",
		Sample: `title: Neuer 500 # display name for UI
capacity: 42 # kWh
user: # user
password: # password
vin: ZFAE... # optional
pin: xxxx #mandatory to deep refresh SoC`,
	}

	registry.Add(template)
}
