const app = require('../../index')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

describe('routes : species', () => {

  describe('GET /species', function () {
    it('should return all species', (done) => {
      request(app)
        .get('/species')
        .end((err, res) => {
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

  describe('GET /species/:speciesId', () => {
    it('should return species by id', (done) => {
      request(app)
        .get('/species/1')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })

    it('should not pass validation if :speciesId is not an integer', done => {
      request(app)
        .get('/species/abc')
        .end((err, res) => {
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

exports.species_show_should_
