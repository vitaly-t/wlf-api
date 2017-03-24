const glob = require('glob')
const path = require('path')

glob.sync('./routes/*.js').forEach(function (file) {
  if (path.parse(file).name !== 'index') {
    let name = path.parse(file).name
    exports[name] = require(path.resolve(file))
  }
})

module.exports = exports
