const { attributes } = require('structure')

const Biometric = attributes({
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
