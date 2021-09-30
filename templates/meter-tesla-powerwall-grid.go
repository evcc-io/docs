package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "tesla",
		Name:   "Tesla Powerwall (Grid Meter)",
		Sample: `uri: http://192.0.2.2/
usage: grid`,
	}

	registry.Add(template)
}
