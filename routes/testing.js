const Express = require('express')
const router = Express.Router()
const sqlqs = require('../middleware/sqlqs')
const db = require('../db')

router.use((req, res, next) => {
  const qs = req.query
  req.predicates = sqlqs.parse(qs)
  req.where = sqlqs.predicate(req.predicates)

  console.log(req)
  next()
})

router.get('/', (req, res) => {
  db.species.all(req.where)
  .then(rtn => res.status(200).json({
    success: true,
    query: req.query,
    data: rtn
  }))
  .catch(err => res.status(400).json({ success: false, error: err.array() }))
})

module.exports = router
