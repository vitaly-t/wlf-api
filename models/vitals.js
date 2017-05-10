const { attributes } = require('structure')

const Vitals = attributes({
  measurement: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  time_rec: {
    type: String,
    required: true
  },
  interval: {
    type: Number
  },
  notes: {
    type: String
  }
})(class Vitals {})

module.exports = Vitals
