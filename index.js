const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = Express()
const db = require('./db')
const port = process.env.PORT || 1313

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/species', (req, res) => {
  db.species.all()
  .then((data) => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

app.listen(port, () => {
  console.log('API listening on port ' + port)
})
