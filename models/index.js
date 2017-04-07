const glob = require('glob')
const path = require('path')

glob.sync('./models/*.js').forEach(file => {
  if (path.parse(file).name !== 'index') {
    let name = path.parse(file).name
    name = name.charAt(0).toUpperCase() + name.slice(1)
    console.log(name)
    exports[name] = require(path.resolve(file))
  }
})

module.exports = exports
