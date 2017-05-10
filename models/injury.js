const { attributes } = require('structure')

const Injury = attributes({
  injury_type: {
    type: String,
    required: true
  }
})(class Injury {})

module.exports = Injury
