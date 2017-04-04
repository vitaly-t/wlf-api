const Express = require('express')
const router = Express.Router()
const sqlqs = require('../middleware/sqlqs')
const db = require('../db')

router.use((req, res, next) => {
  console.log(req.query)
  if (Object.keys(req.query).length !== 0) {
    req.predicates = sqlqs.parse(req.query)
    req.where = sqlqs.predicate(req.predicates)
  }

  console.log(req)
  next()
})

// router.get('/', (req, res) => {
//   db.species.all(req.where)
//   .then(rtn => res.status(200).json({
//     success: true,
//     query: req.query,
//     data: rtn
//   }))
//   .catch(err => res.status(400).json({ success: false, error: err.array() }))
// })
GET('/', req => db.species.all(req.where))
GET('/:speciesId', req => db.species.show(req.params.speciesId))

function GET (url, handler) {
  router.get(url, (req, res) => {
    handler(req)
    .then(rtn => res.status(200).json({
      success: true,
      query: req.query || null,
      data: rtn
    }))
    .catch(err => res.status(400).json({ success: false, error: err.array() }))
  })
}

module.exports = router
