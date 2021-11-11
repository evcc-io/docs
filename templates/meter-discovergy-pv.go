package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "discovergy",
		Name:   "Discovergy Metering Service (Cloud) (PV)",
		Sample: `user: demo@discovergy.com 
password: demo # password 
meter: 1ESY1161229886
scale: -1`,
	}

	registry.Add(template)
}
