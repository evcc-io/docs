package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Shelly 3EM (HTTP)",
		Sample: `power:
  source: http
  uri: http://192.0.2.2/status
  jq: .emeters | map(.power) | add
energy:
  source: http
  uri: http://192.0.2.2/status
  jq: .emeters | map(.total) | add
  scale: 0.001
currents:
- source: http
  uri: http://192.0.2.2/emeter/0
  jq: .current
- source: http
  uri: http://192.0.2.2/emeter/1
  jq: .current
- source: http
  uri: http://192.0.2.2/emeter/2
  jq: .current`,
	}

	registry.Add(template)
}
