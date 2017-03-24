const Express = require('express')
const router = Express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.species.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:id', (req, res) => {
  db.species.show(req.params)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(200).json({ success: false, error: err }))
})

module.exports = router
