const { attributes } = require('structure')

const Device = attributes({
  element_id: {
    type: Number,
    integer: true
  },
  type: {
    type: String,
    required: true
  },
  serial_num: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  inservice: {
    type: Date
  },
  outservice: {
    type: Date
  }
})(class Device {})

module.exports = Device
