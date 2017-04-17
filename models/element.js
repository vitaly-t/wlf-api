const { attributes } = require('structure')

const Element = attributes({
  id: {
    type: Number,
    integer: true
  },
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
    required: true,
    equal: ['male', 'female', 'unk'],
    default: 'unk'
  }
})(class Element {})

module.exports = Element
