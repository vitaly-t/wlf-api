/* eslint-env mocha */

const app = require('../../index')
const db = require('../../db').mock
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

describe('routes : element', () => {
  before((done) => {
    db.rollback()
    .then(() => { return db.up() })
    .then(() => {
      console.log('data up')
      done()
    })
    .catch(err => console.log(err))
  })

  describe('GET /elements', () => {
    it('should return all elements', done => {
      request(app)
        .get('/elements')
        .end((err, res) => {
          if (err) return done(err)
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('array')
          expect(res.body.data).to.have.length.above(0)
          done()
        })
    })
  })

  describe('GET /elements/:elementId', () => {
    it('should return on element by ID', done => {
      request(app)
        .get('/elements/1')
        .end((err, res) => {
          if (err) return done(err)
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })

    // test validation works
    it('should not pass validation if :elementId is not an integer', done => {
      request(app)
        .get('/elements/abc')
        .end((err, res) => {
          if (err) return done(err)
          expect(res.status).to.equal(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', false)
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.be.an('array')
          done()
        })
    })
  })
})
