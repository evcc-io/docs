package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Sonnenbatterie Eco/10 (Battery Meter)",
		Sample: `power:
  source: http
  uri: http://192.0.2.2:8080/api/v1/status
  jq: .Pac_total_W
soc:
  source: http
  uri: http://192.0.2.2:8080/api/v1/status
  jq: .USOC`,
	}

	registry.Add(template)
}
