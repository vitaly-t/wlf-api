const { attributes } = require('structure')

const Sample = attributes({
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
