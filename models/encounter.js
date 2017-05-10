const { attributes } = require('structure')

const Encounter = attributes({
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
})(class Encounter {})

module.exports = Encounter
