const { attributes } = require('structure')

const Injury = attributes({
  injury_type: {
    side: String,
    location: String,
    type: String,
    treatment: String
  }
})(class Injury {})

module.exports = Injury
