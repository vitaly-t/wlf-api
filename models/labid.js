const { attributes } = require('structure')
const helpers = require('pg-promise')().helpers

const Labid = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  lab_id: {
    type: String,
    required: true
  }
})(class Labid {
  cs () {
    let columns = Object.keys(this.attributes)
    return new helpers.ColumnSet(columns, { table: { table: 'lab_ids' } })
  }
})

module.exports = Labid
