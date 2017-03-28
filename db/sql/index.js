const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql (file) {
  const fullPath = path.join(__dirname, file)
  const options = {
    minify: true,
    debug: true
  }
  const qf = new QueryFile(fullPath, options)

  if (qf.error) {
    console.log(qf.error)
  }
  return qf
}

module.exports = {
  species: {
    all: sql('species/all.sql'),
    show: sql('species/show.sql')
  },
  projects: {
    all: sql('projects/all.sql'),
    show: sql('projects/show.sql')
  },
  mock: {
    up: sql('mock/up.sql'),
    rollback: sql('mock/rollback.sql')
  }
}
