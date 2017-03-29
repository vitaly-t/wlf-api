const sql = require('../sql').species

module.exports = (rep, pgp) => {
  return {
    all: where => rep.manyOrNone(sql.all, where),
    show: id => rep.oneOrNone(sql.show, id)
  }
}
