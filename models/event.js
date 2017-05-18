const { attributes } = require('structure')

const Event = attributes({
  id: {
    type: Number,
    integer: true
  },
  element_id: {
    type: Number,
    integer: true
    // required: true
  },
  // cap_loc_id: {
  //   type: Number,
  //   integer: true,
  //   required: true
  // },
  // rel_loc_id: {
  //   type: Number,
  //   integer: true,
  //   empty: true
  // },
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
  },
  x: {
    type: Number
  },
  y: {
    type: Number
  }
})(class Event {
  keys () { Object.keys(this.attributes) }
})

module.exports = Event
