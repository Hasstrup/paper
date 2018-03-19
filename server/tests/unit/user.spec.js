import { expect } from 'chai'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sinon from 'sinon'
import { createuser, SignUpHandler } from '../../controllers/users'
import User from '../../models/user'



describe('User controllers', () => {
  describe('Signup(Success case)', () => {
    const stub2 = sinon.stub(User, 'create')
    const stub1 = sinon.stub(SignUpHandler, 'validate')
    before(() => {
      stub1.returns({
        passing: true
      })
      stub2.returnsArg(0)
    })
    it('is supposed to return a new user with hashed password and token', () => {
      const testuser = {
        username: 'Hasstrupezekiel',
        password: 'Thisisatestpassword',
        email: 'hasstrup.ezekiel@gmail.com',
        firstname: 'hasstrup',
        lastname: 'Ezekiel'
      }
      const { password } = testuser

      return createuser(testuser)
        .then((data) => {
          expect(data).to.exist
          expect(data.token).to.exist
          // expect(JSON.stringify(jwt.sign(testuser, process.env.KEY))).to.equal(JSON.stringify(data.token))
          expect(bcrypt.compareSync(password, data.password)).to.be.true
      })
        .catch((err) => {
          console.log(err)
        })
    })
    after(() => {
      stub1.restore()
      stub2.restore()
    })
  })
})
