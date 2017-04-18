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
  const animal = new models.Animal(req.body)
  // const encounter = new models.Encounter(req.body.encounters)
  // animal['encounters'] = encounter
  validate(animal)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
