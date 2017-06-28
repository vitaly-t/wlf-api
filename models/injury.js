const { attributes } = require('structure')

const Injury = attributes({
  injury_side: String,
  injury_location: String,
  injury_type: String,
  injury_description: String,
  injury_treatment: String
})(class Injury {})

module.exports = Injury
