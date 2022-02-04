package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "amtron",
		Name:   "Mennekes Amtron XTRA/PREMIUM",
		Sample: `uri: 192.0.2.2:502 # TCP ModBus address
id: 1 
# an evcc sponsortoken is required for using this charger`,
	}

	registry.Add(template)
}
