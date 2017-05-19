const { attributes } = require('structure')
const format = require('pg-promise').as.format
const helpers = require('pg-promise')().helpers

const pick = (o, ...props) => {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})))
}

const Encounter = attributes({
  element_id: {
    type: Number,
    integer: true
  },
  status: {
    type: String,
    required: true,
    equal: ['alive', 'mortality', 'harvest', 'unk']
  },
  age: {
    type: String,
    default: null
  },
  event_date: {
    type: Date,
    required: true
  },
  enc_method: {
    type: String,
    equal: ['basecamp', 'capture crew', 'marked observation', 'unmarked observation',
      'marked mortality', 'unmarked mortality'],
    required: true
  },
  enc_reason: {
    type: String,
    empty: true,
    equal: ['disease', 'monitoring', 'translocation'],
    default: null
  },
  biometrics: {
    type: Array,
    itemType: 'Biometrics'
  },
  samples: {
    type: Array,
    itemType: 'Samples'
  },
  medications: {
    type: Array,
    itemType: 'Medications'
  },
  vitals: {
    type: Array,
    itemType: 'Vitals'
  }
}, {
  dynamics: {
    Biometrics: () => require('./biometric'),
    Samples: () => require('./sample'),
    Medications: () => require('./medication'),
    Vitals: () => require('./vitals')
  }
})(class Encounter {
  getEvent () {
    return pick(this, 'element_id', 'status', 'age', 'event_date', 'enc_method', 'enc_reason')
  }

  sqlEvent (elementId) {
    this.element_id = elementId
    return helpers.insert(this.getEvent(), null, 'events') + ' RETURNING *'
  }
})

module.exports = Encounter
