package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Victron Energy (PV Meter)",
		Sample: `power:
  source: calc
  add:
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 808 # ACout pv power L1
      type: input
      decode: uint16
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 809 # ACout pv power L2
      type: input
      decode: uint16
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 810 # ACout pv power L3
      type: input
      decode: uint16
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 811 # ACin pv power L1
      type: input
      decode: uint16
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 812 # ACin pv power L2
      type: input
      decode: uint16
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 813 # ACin pv power L3
      type: input
      decode: uint16
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 850 # DC pv power
      type: input
      decode: uint16`,
	}

	registry.Add(template)
}
