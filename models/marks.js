const { attributes } = require('structure')
const helpers = require('pg-promise')().helpers
const { pick } = '../middleware/util'

const Mark = attributes({
  element_id: {
    type: Number,
    integer: true
  },
  mark_type: {
    type: String,
    required: true
  },
  mark_id: {
    type: String,
    required: true
  },
  mark_color: {
    type: String
  },
  mark_location: {
    type: String,
    required: true
  },
  date_given: {
    type: Date
  },
  date_removed: {
    type: Date
  },
  notes: {
    type: String
  }
})(class Mark {
  getMark () {
    return pick(this, 'element_id', 'mark_type', 'mark_id', 'mark_color', 'mark_location', 'date_given', 'date_removed', 'notes')
  }

  upsert (elementId) {
    let insert = helpers.insert(this, this.attributes, 'marks')
    let update = helpers.update(this, this.attributes, 'marks')

    let sql = insert + ' ON CONFLICT (element_id, mark_id, mark_location) DO UPDATE SET ' + update

    return sql
  }

  insert (elementId) {
    this.element_id = elementId
    return helpers.insert(this, this.attributes, 'marks')
  }

  update (elementId) {
    this.element_id = elementId
    return helpers.update(this, this.attributes, 'marks')
  }

  values (elementId) {
    this.element_id = elementId
    return helpers.values(this, this.attributes)
  }

  sets (elementId) {
    this.element_id = elementId
    return helpers.sets(this, this.attributes)
  }
})

module.exports = Mark
