const { attributes } = require('structure')

const Mortality = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  investigator: {
    type: String
  },
  cause_of_death: {
    type: String
  },
  certainty_of_cause: {
    type: Number
  },
  carcass_age: {
    type: Number,
    integer: true
  },
  femur_index: {
    type: Number,
    integer: true
  },
  gross_diagnoses: {
    type: String
  },
  histological_diagnoses: {
    type: String
  },
  description: {
    type: String
  }
})(class Mortality {})

module.exports = Mortality
