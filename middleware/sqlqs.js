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

module.exports = {
  parse: (query) => {
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
  },

  predicate: (qa) => {
    let predicates = []
    for (let i = 0; i < qa.length; i++) {
      predicates.push(`${qa[i].column} ${qa[i].operator} ${formatArray(qa[i].criteria)}`)
    }

    return predicates.reduce((prev, curr) => prev + ' AND ' + curr)
  }
}
