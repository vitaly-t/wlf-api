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
  Biometrics: {
    type: Array,
    itemType: 'Biometrics'
  },
  Samples: {
    type: Array,
    itemType: 'Samples'
  },
  Medications: {
    type: Array,
    itemType: 'Medications'
  },
  Vitals: {
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

  sqlBiometrics (eventId) {
    if (!this.Biometrics) {
      return ''
    }

    this.Biometrics.map(b => { b.event_id = eventId })
    return helpers.insert(this.Biometrics, Object.keys(this.Biometrics[0].attributes), 'biometrics')
  }

  sqlVitals (eventId) {
    /* the if statement is required in order for the transaction to be successful, without
    the returning an empty string the concanated sql string will cause the transaction to rollback */
    if (!this.Vitals) {
      return ''
    }

    this.Vitals.map(v => { v.event_id = eventId })
    return helpers.insert(this.Vitals, Object.keys(this.Vitals[0].attributes), 'vitals')
  }

  sqlSamples (eventId) {
    if (!this.Samples) {
      return ''
    }

    this.Samples.map(s => { s.event_id = eventId })
    return helpers.insert(this.Samples, Object.keys(this.Samples[0].attributes), 'samples')
  }

  sqlMedications (eventId) {
    if (!this.Medications) {
      return ''
    }

    this.Medications.map(m => { m.event_id = eventId })
    return helpers.insert(this.Medications, Object.keys(this.Medications[0].attributes), 'medications')
  }
})

module.exports = Encounter
