package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "vzlogger (split import/export channels)",
		Sample: `power:
  source: calc # use calc plugin
  add:
  - source: http # import channel
    uri: http://demo.volkszaehler.org/api/data/<import-uuid>.json?from=now
    jq: .data.tuples[0][1] # parse response json
  - source: http # export channel
    uri: http://demo.volkszaehler.org/api/data/<export-uuid>.json?from=now
    jq: .data.tuples[0][1] # parse response json
    scale: -1 # export must result in negative values`,
	}

	registry.Add(template)
}
