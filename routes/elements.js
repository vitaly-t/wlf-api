const Express = require('express')
const { attributes } = require('structure')
const router = Express.Router()
const db = require('../db')
const pgp = db.$config.pgp

const Element = attributes({
  animal_id: {
    type: Number,
    integer: true,
    required: true
  },
  species_id: {
    type: Number,
    integer: true,
    required: true
  },
  sex: {
    type: String,
    equal: ['male', 'female', 'unk'],
    required: true
  }
})(class Element {
  create () {
    let sql = pgp.as.format('INSERT INTO elements (animal_id, species_id, sex) VALUES ($<animal_id>, $<species_id>, $<sex>) RETURNING *', this)
    return db.oneOrNone(sql)
  }
  findAll () {
    return 'SELECT * FROM elements'
  }
  findById (id) {
    return pgp.as.format('SELECT * FROM elements WHERE id = $<id>', { id: id })
  }
})

const validPromise = (structure) => {
  return new Promise((resolve, reject) => {
    const { valid, errors } = structure.validate()
    if (!valid) {
      reject(errors)
    } else {
      resolve(structure)
    }
  })
}

// post request using Structure object
router.post('/', (req, res) => {
  // create new Element object, has methods to generate sql
  let animal = new Element(req.body)

  validPromise(animal)
  .then(animal => animal.create())
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))

  // const { valid, errors } = animal.validate()

  // if (!valid) {
  //   // if there are validation errors
  //   res.status(400).json({ success: false, errors: errors })
  // } else {
  //   animal.create()
  //   .then(data => res.status(201).json({ success: true, data: data }))
  //   .catch(err => res.status(400).json({ success: false, error: err }))
  // }
})

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
  .then(rtn => res.status(200).json({ success: true, data: rtn }))
  .catch(err => res.status(400).json({ success: false, error: err.array() }))
})

router.post('/', (req, res) => {
  db.elements.post(req.body)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
