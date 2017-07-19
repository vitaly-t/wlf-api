const Express = require('express')
// const _ = require('lodash')
const router = Express.Router()
const models = require('../models')
const helpers = require('pg-promise')().helpers
const format = require('pg-promise').as.format
const db = require('../db')
const sql = require('../db/sql')

router.get('/', (req, res) => {
  db.many('SELECT * FROM marks')
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})
router.post('/test', (req, res) => {
  const animal = new models.Animal(req.body)

  // res.status(200).json({
  // db: animal.upsertSqlMarks(5)
  //   sqlElement: animal.sqlElement(),
  //   sqlmarks: animal.sqlMarks(5),
  //   upsert: animal.upsertMarks(5)
  // })
  db.any(animal.upsertSqlMarks(5))
  // db.marks.upsert(animal.upsertMarks(5))
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
