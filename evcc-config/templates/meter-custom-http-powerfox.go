package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Powerfox Poweropti (Cloud)",
		Sample: `power:
  source: http
  uri: https://backend.powerfox.energy/api/2.0/my/main/current
  auth:
    type: basic
    user: xxxxxxxxx
    password: *****
  jq: .Watt`,
	}

	registry.Add(template)
}
