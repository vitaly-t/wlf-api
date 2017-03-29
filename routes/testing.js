const Express = require('express')
const router = Express.Router()
const db = require('../db')
const pgp = db.$config.pgp

router.use(function (req, res, next) {
  // console.log('Time:', Date.now())
  req.zzzTime = Date.now()
  next()
})

// router.use((req, res, next) => {
//   console.log(req)
//   next()
// })

router.use((req, res, next) => {
  let q = req.query
  let where = ''
  let s = []

  if (Object.keys(q).length !== 0) {
    for (let x in q) {
      s.push({
        column: x,
        operator: q[x].split('.')[0],
        criteria: q[x].split('.')[1]
      })
    }
  }

  console.log(req.query)
  console.log(s)
  next()
})

router.get('/', (req, res) => {
  router.get('/', (req, res) => {
    res.end()
  })
})

// GET('/', 'species')
//
// function GET (url, route) {
//   router.get(url, (req, res) => {
//     db[route].all(true)
//     .then(data => res.status(200).json({ success: true, data: data }))
//     .catch(err => res.status(400).json({ success: false, error: err }))
//   })
// }

module.exports = router
