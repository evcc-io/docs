package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "tplink",
		Name:   "TP-LINK Smart Plug",
		Sample: `uri: 192.0.2.2 # TP-LINK Smart Plug ip address (local)
standbypower: 15 # treat as charging above this power`,
	}

	registry.Add(template)
}
