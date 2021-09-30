package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "go-e",
		Name:   "go-eCharger",
		Sample: `uri: http://192.0.2.2 # go-e ip address (local)`,
	}

	registry.Add(template)
}
