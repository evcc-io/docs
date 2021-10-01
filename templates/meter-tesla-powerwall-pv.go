package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "tesla",
		Name:   "Tesla Powerwall (PV Meter)",
		Sample: `uri: https://192.0.2.2/
usage: pv
password: *** # for user 'customer'`,
	}

	registry.Add(template)
}
