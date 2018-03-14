import sinon from 'sinon'
import 'babel-polyfill'
import chai from 'chai'
import { fetchUser } from '../../controllers/users'
import ErrorHandler from '../../helpers/error-class'
import User from '../../models/user'

const { expect, should } = chai

describe('Error Handler Class', () => {
  should()
  const TestError = new ErrorHandler(User)
  it('should have property model', () => {
    TestError.should.have.property('model')
  })
  it('should have property errors', () => {
    TestError.should.have.property('errors')
  })
  it('should have property keys', () => {
    TestError.should.have.property('keys')
  })
  it('errors & keys should be empty', () => {
    expect(TestError.keys).to.be.an('array')
    TestError.keys.should.have.length(0)
    TestError.errors.should.be.an('object')
  });
  describe('Registering keys', () => {
    it('should return a an array of keys', async () => {
      const keys = await TestError.register('email', 13, 'shoulder')
      expect(JSON.stringify(keys)).to.equal(JSON.stringify(['email', 'shoulder']))
    })
  })
  describe('main validation method', () => {
    it('should throw an error with wrong data', async () => {
      try {
        const result = await TestError.validate(undefined)
      } catch (err) {
        expect(err).to.exist
      }
    })
  })
  console.log('hello')
  describe('another validation method', () => {
    it('should throw an error with hasstrupezekiel as username', async () => {
      const mock = {
        username: 'hasstro',
        password: '1234',
        firstname: 'hasstrupezekiel',
        email: 'hasstrup.ezekiel@gmail.com',
        shoulder: 'hasstrup'
      }
      try {
        const result = await TestError.validate(mock)
        expect(result.passing).to.be.true
        expect(result).to.exist
      } catch (err) {
        expect(err).to.be.undefined
      }
    })
  })
})
