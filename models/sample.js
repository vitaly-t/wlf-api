const { attributes } = require('structure')

const Sample = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  sample: {
    type: String,
    required: true
  },
  destination: {
    type: String
  },
  test: {
    type: String
  },
  notes: {
    type: String
  }
})(class Sample {})

module.exports = Sample
