const Express = require('express')
// const _ = require('lodash')
const router = Express.Router()
const models = require('../models')
const db = require('../db')

router.get('/', (req, res) => {
  db.many('SELECT * FROM marks')
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})
router.post('/test', (req, res) => {
  const animal = new models.Animal(req.body)

  // res.status(200).json({
  //   devices: animal.Devices,
  //   columnSet: animal.Devices[0].cs(),
  //   sql: animal.upsertDevices(6)
  // })
  db.any(animal.upsertDevices(6))
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
