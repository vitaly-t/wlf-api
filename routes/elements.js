const Express = require('express')
const router = Express.Router()
const db = require('../db')
// const pgp = db.$config.pgp

router.get('/', (req, res) => {
  db.elements.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:elementId', (req, res) => {
  // run param validation
  req.checkParams('elementId', 'Invalid elementId, must be an integer').notEmpty().isInt()

  // get the results of validation
  req.getValidationResult()
  .then(result => {
    if (result.isEmpty()) {
      // if no validation errors, send params to db
      return db.elements.show(req.params)
    } else {
      return result.throw()
    }
  })
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err.array() }))
})

router.post('/', (req, res) => {
  db.elements.post(req.body)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
