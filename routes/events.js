const Express = require('express')
const { attributes } = require('structure')
const router = Express.Router()
const db = require('../db')
const pgp = db.$config.pgp

const Event = attributes({
  id: {
    type: Number,
    integer: true
  },
  element_id: {
    type: Number,
    integer: true,
    required: true
  },
  cap_loc_id: {
    type: Number,
    integer: true,
    required: true
  },
  rel_loc_id: {
    type: Number,
    integer: true,
    empty: true
  },
  status: {
    type: String,
    required: true,
    equal: ['alive', 'mortality', 'harvest', 'unk']
  },
  age: {
    type: String,
    default: null
  },
  event_date: {
    type: Date,
    required: true
  },
  enc_method: {
    type: String,
    equal: ['basecamp', 'capture crew', 'marked observation', 'unmarked observation',
      'marked mortality', 'unmarked mortality'],
    required: true
  },
  enc_reason: {
    type: String,
    empty: true,
    equal: ['disease', 'monitoring', 'translocation'],
    default: null
  }
})(class Event {
  keys () { Object.keys(this.attributes) }
})

router.post('/', (req, res) => {
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

  const event = new Event(req.body)

  validPromise(event)
  .then(event => res.status(200).json({ data: event }))
  .catch(err => res.status(400).json({ errors: err }))
})

module.exports = router
