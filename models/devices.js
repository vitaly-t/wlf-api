const { attributes } = require('structure')

const Device = attributes({
  element_id: {
    type: Number,
    integer: true
  },
  device_type: {
    type: String,
    required: true
  },
  serial_number: {
    type: String,
    required: true
  },
  date_given: {
    type: Date
  },
  date_removed: {
    type: Date
  }
})(class Device {})

module.exports = Device
