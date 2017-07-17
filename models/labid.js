const { attributes } = require('structure')

const Labid = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  lab_id: {
    type: String,
    required: true
  }
})(class Labid {})

module.exports = Labid
