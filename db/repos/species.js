const sql = require('../sql').species

module.exports = (rep, pgp) => {
  return {
    all: () => rep.manyOrNone(sql.all),
    show: id => rep.oneOrNone(sql.show, id)
  }
}
