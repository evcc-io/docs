package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "E3DC (Battery Meter)",
		Sample: `power:
  source: modbus
  uri: e3dc.fritz.box:502
  id: 1 # ModBus slave id
  register: # manual register configuration for E3/DC "Simple-Mode"
    address: 40069 # Batterie-Leistung in Watt
    type: holding
    decode: int32s
  scale: -1 # reverse direction
soc:
  source: modbus
  uri: e3dc.fritz.box:502
  id: 1 # ModBus slave id
  register: # manual register configuration for E3/DC "Simple-Mode"
    address: 40082 # Batterie-SOC in Prozent
    type: holding
    decode: uint16`,
	}

	registry.Add(template)
}
