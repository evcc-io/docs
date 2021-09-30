package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "mcc",
		Name:   "Mobile Charger Connect (Audi, Bentley, Porsche)",
		Sample: `uri: https://192.0.2.2
password: # home user password`,
	}

	registry.Add(template)
}
