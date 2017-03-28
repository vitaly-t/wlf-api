const Express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
const app = Express()
const port = process.env.PORT || 1313

app.use(cors())
app.use(bodyParser.json())
app.use(expressValidator())
// app.use(bodyParser.urlencoded({ extended: false }))

const routes = require('./routes')

app.use('/species', routes.species)
app.use('/projects', routes.projects)

app.listen(port, () => {
  console.log('API listening on port ' + port)
})

module.exports = app
