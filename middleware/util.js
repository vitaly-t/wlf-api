const name = require('pg-promise').as.name
const helpers = require('pg-promise')().helpers

const pick = (o, ...props) => {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})))
}

const upsertSql = (data, cs, conflict) => {
  return helpers.insert(data, cs) +
    ' ON CONFLICT (' + conflict + ') DO UPDATE SET ' +
    cs.columns.map(x => {
      let col = name(x.name)
      return col + ' = EXCLUDED.' + col
    }).join()
}

module.exports = {
  pick,
  upsertSql
}
