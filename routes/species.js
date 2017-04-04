const Express = require('express')
const router = Express.Router()
const db = require('../db')
const sqlqs = require('../middleware/sqlqs').sqlqs

router.get('/', sqlqs, (req, res) => {
  // TODO: qs.s = search full text scientific name and common name
  db.species.all(req.where)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

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
  .then(rtn => res.status(200).json({ success: true, data: rtn }))
  .catch(err => res.status(400).json({ success: false, error: err.array() }))
})

module.exports = router
