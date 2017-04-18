const { attributes } = require('structure')

const Animal = attributes({
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
  },
  marks: {
    type: Array,
    itemType: 'Marks'
  }
}, {
  dynamics: {
    Marks: () => require('./marks')
  }
})(class Animal {})

module.exports = Animal
