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
    equal: ['disease surveilance', 'population monitoring', 'translocation'],
    default: null
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  Biometrics: {
    type: Array,
    itemType: 'Biometrics'
  },
  Samples: {
    type: Array,
    itemType: 'Samples'
  },
  LabIds: {
    type: Array,
    itemType: 'LabIds'
  },
  Medications: {
    type: Array,
    itemType: 'Medications'
  },
  Vitals: {
    type: Array,
    itemType: 'Vitals'
  },
  Injuries: {
    type: Array,
    itemType: 'Injuries'
  },
  Mortality: {
    type: 'Mortality'
  },
  Necropsy: {
    type: 'Necropsy'
  }
}, {
  dynamics: {
    Biometrics: () => require('./biometric'),
    Samples: () => require('./sample'),
    LabIds: () => require('./labid'),
    Medications: () => require('./medication'),
    Vitals: () => require('./vitals'),
    Injuries: () => require('./injury'),
    Mortality: () => require('./mortality'),
    Necropsy: () => require('./necropsy')
  }
})(class Encounter {
  getEvent () {
    return pick(this, 'element_id', 'status', 'age', 'event_date', 'enc_method', 'enc_reason', 'x', 'y')
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

  sqlLabIds (eventId) {
    if (!this.LabIds) {
      return ''
    }

    this.LabIds.map(s => { s.event_id = eventId })
    return helpers.insert(this.LabIds, Object.keys(this.LabIds[0].attributes), 'lab_ids')
  }

  sqlMedications (eventId) {
    if (!this.Medications) {
      return ''
    }

    this.Medications.map(m => { m.event_id = eventId })
    return helpers.insert(this.Medications, Object.keys(this.Medications[0].attributes), 'medications')
  }

  sqlInjuries (eventId) {
    if (!this.Injuries) {
      return ''
    }

    this.Injuries.map(m => { m.event_id = eventId })
    return helpers.insert(this.Injuries, Object.keys(this.Injuries[0].attributes), 'injuries')
  }

  sqlMortality (eventId) {
    if (!this.Mortality) {
      return ''
    }

    this.Mortality.event_id = eventId
    // return this.Mortality
    return helpers.insert(this.Mortality, Object.keys(this.Mortality.attributes), 'mortalities')
  }

  sqlNecropsy (eventId) {
    if (!this.Necropsy) {
      return ''
    }

    this.Necropsy.event_id = eventId
    return helpers.insert(this.Necropsy, Object.keys(this.Necropsy.attributes), 'necropsies')
  }
})

module.exports = Encounter
