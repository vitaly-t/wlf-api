const Express = require('express')
const router = Express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.species.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:speciesId', (req, res) => {
  // run param validation
  req.checkParams('speciesId', 'Invalid speciesId').notEmpty().isInt()

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

  // .then(result => {
  //   if (!result.isEmpty()) {
  //     res.status(400)
  //     return result.array()]
  //   } else {
  //     res.status(200)
  //     return db.species.show(speciesId)
  //   }
  // })
  // .then(rtn => {
  //   console.log(rtn)
  //   if (rtn[0]) {
  //     res.json({ success: rtn[0], err: rtn[1] })
  //   } else {
  //     res.json({ success: rtn[0], data: rtn[1] })
  //   }
  // })
  // .catch(err => res.json({ success: false, error: err }))
})

module.exports = router
