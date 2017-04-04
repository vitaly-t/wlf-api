const operators = {
  eq: '=',
  gte: '>=',
  gt: '>',
  lte: '<=',
  lt: '<',
  neq: '!=',
  in: 'IN'
}

const safeText = text => text.replace(/'/g, '\'\'')

const wrapText = text => '\'' + text + '\''

const formatValue = value => {
  return isNaN(value) ? wrapText(safeText(value)) : Number(value)
}

const formatArray = values => {
  if (values instanceof Array) {
    return '(' + values.map(formatValue).join() + ')'
  }
  return values === undefined ? '' : formatValue(values)
}

const parse = query => {
  let s = []

  if (Object.keys(query).length !== 0) {
    for (let x in query) {
      let operator = operators[query[x].split('.')[0]]
      let criteria = query[x].split('.')[1].split(',')
      s.push({
        column: x,
        operator: operator,
        criteria: criteria.length > 1 ? criteria : criteria[0]
      })
    }
  }

  return s
}

const predicate = qa => {
  let predicates = []
  for (let i = 0; i < qa.length; i++) {
    predicates.push(`${qa[i].column} ${qa[i].operator} ${formatArray(qa[i].criteria)}`)
  }

  let where = predicates.reduce((prev, curr) => prev + ' AND ' + curr)
  return `WHERE ${where}`
}

module.exports = {
  sqlqs: (req, res, next) => {
    console.log(req.query)

    if (Object.keys(req.query).length !== 0) {
      req.predicates = parse(req.query)
      req.where = predicate(req.predicates)
    } else {
      req.where = ';'
    }

    next()
  }
}
