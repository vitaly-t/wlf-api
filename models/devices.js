const { attributes } = require('structure')
const helpers = require('pg-promise')().helpers

const Device = attributes({
  element_id: {
    type: Number,
    integer: true
  },
  type: {
    type: String,
    required: true
  },
  serial_num: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  inservice: {
    type: Date
  },
  outservice: {
    type: Date
  }
})(class Device {
  cs () {
    let columns = Object.keys(this.attributes)
    return new helpers.ColumnSet(columns, { table: { table: 'deployments' } })
  }
})

module.exports = Device
