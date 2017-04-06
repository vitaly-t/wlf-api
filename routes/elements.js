const Express = require('express')
const { attributes } = require('structure')
const router = Express.Router()
const db = require('../db')

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
})(class Element {})

router.post('/', (req, res) => {
  let animal = new Element(req.body)

  const { valid, errors } = animal.validate()

  if (!valid) {
    res.status(400).json(errors)
  } else {
    const sql = db.format('INSERT INTO elements ($<this~>) VALUES ($<animal_id>, $<species_id>, $<sex>) RETURNING *)', animal)
    // db.oneOrNone('INSERT INTO elements (animal_id, species_id, sex) VALUES ($<animal_id>, $<species_id>, $<sex>) RETURNING *', animal)
    db.oneOrNone(sql)
    res.status(200).json(animal)
  }
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
