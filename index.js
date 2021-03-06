const Express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
// const sqlqs = require('./middleware/sqlqs').sqlqs
const db = require('./db')
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
app.use('/events', routes.events)
app.use('/marks', routes.marks)

app.get('/animals', (req, res) => {
  db.many('SELECT * FROM animals')
  /*
  animals is a view in the database that serializes in Postgres. An alternative that I may
  investigate is batch the queries as a transaction (task), then coercing the results to a
  model of the data? maybe? Either way, filtering will likely be difficult.
  */
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

app.listen(port, () => {
  console.log('API listening on port ' + port)
})

module.exports = app
