const promise = require('bluebird')
const monitor = require('pg-monitor')
const env = process.env.ENV
const config = require('../config/database.json')[env]

const repos = {
  species: require('./repos/species'),
  projects: require('./repos/projects')
}

// set pg-promise options
const options = {
  promiseLib: promise,

  // loading repos into the pg instance
  extend: obj => {
    for (let r in repos) {
      obj[r] = repos[r](obj, pgp)
    }
  }
}

if (env === 'development') {
  monitor.attach(options)
}

// req and init pg-promise with options
const pgp = require('pg-promise')(options)

const db = pgp(config)

module.exports = db
