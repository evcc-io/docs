package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "E3DC (PV Meter)",
		Sample: `power:
  source: modbus
  uri: e3dc.fritz.box:502
  id: 1 # ModBus slave id
  register: # manual register configuration for E3/DC "Simple-Mode"
    address: 40067 # Photovoltaikleistung in Watt
    type: holding
    decode: int32s`,
	}

	registry.Add(template)
}
