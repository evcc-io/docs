package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "vzlogger (Push Server)",
		Sample: `power:
  source: ws # use websocket plugin
  uri: ws://192.0.2.2:8082/socket
  jq: .data | select(.uuid=="<uuid>") .tuples[0][1] # parse response json
  timeout: 30s
  scale: 1`,
	}

	registry.Add(template)
}
