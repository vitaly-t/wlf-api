const Express = require('express')
const _ = require('lodash')
const router = Express.Router()
const db = require('../db')
const pgp = db.$config.pgp
const models = require('../models')
const validate = require('../middleware/promise-validate')
// const pgp = db.$config.pgp

// GET ALL ANIMALS/ELEMENTS. THIS IS A SUMMARIZED VIEW SIMILAR TO THE SPECIMEN LOG
router.get('/', (req, res) => {
  // db.manyOrNone('SELECT * FROM animal_log ORDER BY animal_id, event_date')
  db.manyOrNone('SELECT * FROM speclog ORDER BY ndow_id, date')
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// GET ANIMAL BY ID. THIS WILL RETURN A COMPLETE ANIMAL RECORD
router.get('/:elementId', (req, res) => {
  // run param validation
  req.checkParams('elementId', 'Invalid elementId, must be an integer').notEmpty().isInt()

  // get the results of validation
  req.getValidationResult()
  .then(result => {
    if (result.isEmpty()) {
      // if no validation errors, send params to db
      return db.oneOrNone('SELECT * FROM animals WHERE id = $<elementId>', req.params)
    } else {
      return result.throw()
    }
  })
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err.array() }))
})

// POST ELEMENT
router.post('/', (req, res) => {
  const element = new models.Element(req.body)
  validate(element)
  .then(data => {
    // FIXME: encapsulate the following two lines
    const d = _.pickBy(data, value => !_.isUndefined(value))
    const sql = pgp.helpers.insert(d, null, 'elements') + ' RETURNING *'
    return db.oneOrNone(sql)
  })
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
