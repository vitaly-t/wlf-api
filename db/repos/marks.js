const sql = require('../sql').marks

module.exports = (rep, pgp) => {
  return {
    upsert: (val) => rep.oneOrNone(sql.upsert, { val: val })
  }
}
