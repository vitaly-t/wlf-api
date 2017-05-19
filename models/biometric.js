const { attributes } = require('structure')

const Biometric = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  measurement: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  units: {
    type: String
  },
  notes: {
    type: String
  }
})(class Biometric {})

module.exports = Biometric
