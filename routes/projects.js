const Express = require('express')
const router = Express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.projects.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:projectId', (req, res) => {
  // run param validation
  req.checkParams('projectId', 'Invalid projectId').notEmpty().isInt()

  // get the results of the validation
  req.getValidationResult()
  .then(result => {
    if (result.isEmpty()) {
      // if no validation errors, send params to db
      return db.projects.show(req.params)
    } else {
      // else return expressValidator error object (this triggers .catch)
      return result.throw()
    }
  })
  .then(rtn => res.status(200).json({ success: true, data: rtn }))
  .catch(err => res.status(400).json({ success: false, error: err.array() }))
})

module.exports = router
