const sql = require('../sql').elements

module.exports = (rep, pgp) => {
  return {
    all: () => rep.manyOrNone(sql.all),
    show: elementId => rep.oneOrNone(sql.show, elementId)
  }
}
