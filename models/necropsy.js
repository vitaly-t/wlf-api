const { attributes } = require('structure')

const Necropsy = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  necropsy_date: {
    type: Date
  },
  general_condition: {
    type: String
  },
  integument: {
    type: String
  },
  musculoskeletal: {
    type: String
  },
  body_cavities: {
    type: String
  },
  hemolymphatic: {
    type: String
  },
  respiratory: {
    type: String
  },
  cardiovascular: {
    type: String
  },
  digestive: {
    type: String
  },
  urinary: {
    type: String
  },
  reproductive: {
    type: String
  },
  endocrine: {
    type: String
  },
  nervous: {
    type: String
  },
  sensory: {
    type: String
  },
  studies: {
    type: String
  }
})(class Necropsy {})

module.exports = Necropsy
