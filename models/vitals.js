const { attributes } = require('structure')

const Vitals = attributes({
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
