const sql = require('../sql').mock

module.exports = (rep, pgp) => {
  return {
    up: () => rep.none(sql.up),
    rollback: () => rep.none(sql.rollback)
  }
}
