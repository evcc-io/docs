package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "vzlogger (HTTP)",
		Sample: `power: # power reading
  source: http # use http plugin
  uri: http://demo.volkszaehler.org/api/data/<uuid>.json?from=now
  jq: .data.tuples[0][1] # parse response json`,
	}

	registry.Add(template)
}
