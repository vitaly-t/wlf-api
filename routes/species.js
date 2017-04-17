const Express = require('express')
const _ = require('lodash')
const router = Express.Router()
const db = require('../db')
const pgp = db.$config.pgp
const sqlqs = require('../middleware/sqlqs').sqlqs
const models = require('../models')
const validate = require('../middleware/promise-validate')

// GET ALL SPECIES
router.get('/', sqlqs, (req, res) => {
  // TODO: qs.s = search full text scientific name and common name
  db.species.all(req.where)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// GET SPECIES BY ID
router.get('/:speciesId', (req, res) => {
  // run param validation
  req.checkParams('speciesId', 'Invalid speciesId, must be an integer').notEmpty().isInt()

  // get the results of the validation
  req.getValidationResult()
  .then(result => {
    if (result.isEmpty()) {
      // if no validation errors, send params to db
      return db.species.show(req.params)
    } else {
      // else return expressValidator error object (this triggers .catch)
      return result.throw()
    }
  })
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err.array() }))
})

// CREATE NEW SPECIES
router.post('/', (req, res) => {
  // create new species instance
  const species = new models.Species(req.body)

  // validate species model, errors should trigger catch()
  validate(species)
  .then(data => {
    // remove undefined properties from species object
    const d = _.pickBy(data, value => !_.isUndefined(value))
    // create insert sql statement
    const sql = pgp.helpers.insert(d, null, 'species') + ' RETURNING *'
    return db.oneOrNone(sql)
  })
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// DELETE SPECIES BY ID
router.delete('/:id', (req, res) => {
  db.oneOrNone('DELETE FROM species WHERE id = $/id/ RETURNING *', req.params)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
