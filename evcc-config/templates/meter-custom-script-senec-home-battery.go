package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "SENEC.Home (Battery)",
		Sample: `power:
  source: script
  cmd: >
    /bin/bash -c "set +H; curl --data '{\"ENERGY\":{\"GUI_BAT_DATA_POWER\":\"\"}}' --header \"Content-Type: application/json\" --request POST http://192.0.2.2/lala.cgi | jq .ENERGY.GUI_BAT_DATA_POWER | python3 -c 'import struct;print(struct.unpack(\"!f\",bytes.fromhex(input()[4:12]))[0])'"
  timeout: 5s
  scale: -1
soc:
  source: script
  cmd: >
    /bin/bash -c "set +H; curl --data '{\"ENERGY\":{\"GUI_BAT_DATA_FUEL_CHARGE\":\"\"}}' --header \"Content-Type: application/json\" --request POST http://192.0.2.2/lala.cgi | jq .ENERGY.GUI_BAT_DATA_FUEL_CHARGE | python3 -c 'import struct;print(struct.unpack(\"!f\",bytes.fromhex(input()[4:12]))[0])'"
  timeout: 5s`,
	}

	registry.Add(template)
}
