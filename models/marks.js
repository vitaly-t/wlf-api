const { attributes } = require('structure')

const Mark = attributes({
  mark_type: {
    type: String,
    required: true
  },
  mark_id: {
    type: String,
    required: true
  },
  mark_color: {
    type: String
  },
  mark_location: {
    type: String,
    required: true
  },
  date_given: {
    type: Date
  },
  date_removed: {
    type: Date
  },
  notes: {
    type: String
  }
})(class Mark {})

module.exports = Mark
