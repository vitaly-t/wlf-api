const { attributes } = require('structure')
const format = require('pg-promise').as.format
const helpers = require('pg-promise')().helpers
const sql = require('../db/sql')

const pick = (o, ...props) => {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})))
}

const Animal = attributes({
  animal_id: {
    type: Number,
    integer: true,
    required: true
  },
  species_id: {
    type: Number,
    integer: true,
    required: true
  },
  sex: {
    type: String,
    required: true,
    equal: ['male', 'female', 'unk'],
    default: 'unk'
  },
  Marks: {
    type: Array,
    itemType: 'Marks'
  },
  Devices: {
    type: Array,
    itemType: 'Devices'
  },
  Encounters: {
    type: 'Encounters'
  }
}, {
  dynamics: {
    Devices: () => require('./devices'),
    Marks: () => require('./marks'),
    Encounters: () => require('./encounter')
  }
})(class Animal {
  getElement () {
    return pick(this, 'animal_id', 'species_id', 'sex')
  }

  sqlElement () {
    // TODO: put the below in a QueryFile
    let sql = `
            WITH ins AS (
            INSERT INTO elements (animal_id, species_id, sex)
            VALUES ($/animal_id/, $/species_id/, $/sex/)
            ON CONFLICT(animal_id) DO UPDATE
            SET animal_id = elements.animal_id WHERE FALSE
            RETURNING elements.id
            )
            SELECT id FROM ins
            UNION ALL
            SELECT id FROM elements
            WHERE animal_id = $/animal_id/
            LIMIT 1;
        `
    return format(sql, this.getElement())
  }

  // event/encounter methods
  getEncounter () {
    return this.Encounters.getEvent()
  }

  sqlEncounter () {
    return this.Encounters.sqlEvent()
  }

  sqlMarks (elementId) {
    if (!this.Marks) {
      return ''
    }

    this.Marks.map(m => { m.element_id = elementId })
    return helpers.insert(this.Marks, Object.keys(this.Marks[0].attributes), 'marks')
  }

  upsertSqlMarks (elementId) {
    if (!this.Marks) {
      return ''
    }

    const val = this.Marks
      .map(v => v.values(elementId))
      .reduce((prev, curr) => prev + ', ' + curr)

    return format(sql.marks.upsert.query, {val: val})
  }

  sqlDevices (elementId) {
    if (!this.Devices) {
      return ''
    }

    this.Devices.map(m => { m.element_id = elementId })
    return helpers.insert(this.Devices, Object.keys(this.Devices[0].attributes), 'deployments')
  }

  // push to database methods
  pushAnimal (db) {
    // return db.one(this.sqlElement())
    return db.tx(t => {
      return t.one(this.sqlElement())
      .then(elementId => {
        return t.one(this.Encounters.sqlEvent(elementId.id))
        .then(data => {
          // checking if the animal object is only element and event
          if (!this.Marks && !this.Encounters.Biometrics && !this.Encounters.Vitals &&
            !this.Encounters.Samples && !this.Encounters.Medications) {
            return data
          } else {
            let ids = { elementId: elementId.id, eventId: data.id }

            // concatenate sql strings for everything else
            let sql = helpers.concat([
              this.upsertSqlMarks(ids.elementId),
              this.sqlDevices(ids.elementId),
              this.Encounters.sqlBiometrics(ids.eventId),
              this.Encounters.sqlVitals(ids.eventId),
              this.Encounters.sqlSamples(ids.eventId),
              this.Encounters.sqlLabIds(ids.eventId),
              this.Encounters.sqlMedications(ids.eventId),
              this.Encounters.sqlInjuries(ids.eventId),
              this.Encounters.sqlMortality(ids.eventId),
              this.Encounters.sqlNecropsy(ids.eventId)
            ])
            return t.oneOrNone(sql)
          }
        })
      })
    })
  }
})

module.exports = Animal
