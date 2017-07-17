const Express = require('express')
const _ = require('lodash')
const router = Express.Router()
const models = require('../models')
const validate = require('../middleware/promise-validate')
const db = require('../db')
const pgp = db.$config.pgp

// router.post('/', (req, res) => {
//   const event = new models.Event(req.body)
//
//   validate(event)
//   .then(event => res.status(200).json({ data: event }))
//   .catch(err => res.status(400).json({ errors: err }))
// })

router.post('/', (req, res) => {
  // 1 - check animal is not already entered
  // 2if - if it is, get and return id
  // 2else - enter animal, then return new id
  // 3 - enter marks and devices with elements_id
  // 4 - enter event, with element_id
  // 5 - enter other modules, with event_id

  // req.body must be supplied as an event object
  // const element = new models.Element({ animal_id: 11, species_id: 866, sex: 'male' })
  const element = new models.Element(req.body)
  const event = new models.Event(req.body.Event)
  console.log(req.body)
  // check that animal_id doesn't already exist
  db.oneOrNone('SELECT id, animal_id FROM elements where animal_id = $<animal_id>', element)
  .then(data => {
    if (!data) {
      // if animal_id doesn't exist, enter new element
      let d = _.pickBy(element, value => !_.isUndefined(value))
      let sql = pgp.helpers.insert(d, null, 'elements') + ' RETURNING *'
      return db.oneOrNone(sql)
    } else {
      // else return the animal_id, id of the animal
      return data
    }
  })
  .then(data => {
    // with the animal_id, new or old, enter marks and event
    event.element_id = data.id
    let d = _.pickBy(event, value => !_.isUndefined(value))
    let sql = pgp.helpers.insert(d, null, 'events') + ' RETURNING *'
    console.log(sql)
    return db.oneOrNone(sql)
  })
  .then(data => {
    res.status(200).json({ success: true, data: data })
  })
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.post('/encounters', (req, res) => {
  const encounter = new models.Encounter(req.body)
  validate(encounter)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.post('/animals', (req, res) => {
  let element = new models.Animal(req.body)
  // find or create element occurance
  findOrCreateElement(element)
  .then(elementId => {
    let enc = new models.Encounter(element.encounters)
    enc.element_id = elementId.id
    let d = _.pickBy(enc, value => !_.isUndefined(value))
    let sql = pgp.helpers.insert(d, null, 'events') + ' RETURNING *'
    // res.status(200).json({ enc: d, sql: sql })
    // rund the query
    return db.oneOrNone(sql)
  })
  .then(dat => res.status(200).json({ success: true, data: dat }))
  .catch(err => res.status(400).json({ error: err }))
})

router.post('/test', (req, res) => {
  console.log(req.body)
  const animal = new models.Animal(req.body)

  validate(animal)
  .then(animal => animal.pushAnimal(db))
  .then(animal => res.status(200).json({
    // msg: 'chekcing animal object only',
    msg: 'successfully entered animal to database',
    data: animal
  }))
  .catch(error => res.status(400).json(error))
})

function getInsertElementId (animal) {
  return db.task(t => {
    return t.oneOrNone('SELECT id FROM elements WHERE animal_id = $/animal_id/', animal, u => u && u.id)
    .then(elementId => {
      console.log(elementId)
      return elementId ||
        t.one(
          'INSERT INTO elements (animal_id, species_id, sex) VALUES ($/animal_id/, $/species_id/, $/sex/) RETURNING id',
          animal,
          u => u.id
        )
    })
  })
}

const findOrCreateElement = (animal) => {
  const sql = `
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
  return db.one(sql, animal)
}

module.exports = router
