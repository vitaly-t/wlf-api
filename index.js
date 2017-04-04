const Express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
// const sqlqs = require('./middleware/sqlqs').sqlqs
const cors = require('cors')
const app = Express()
const port = process.env.PORT || 1313

app.use(cors())
app.use(bodyParser.json())
app.use(expressValidator())
// app.use(sqlqs())
// app.use(bodyParser.urlencoded({ extended: false }))

const routes = require('./routes')

app.use('/species', routes.species)
app.use('/projects', routes.projects)
app.use('/elements', routes.elements)
app.use('/test', routes.testing)

app.listen(port, () => {
  console.log('API listening on port ' + port)
})

module.exports = app
