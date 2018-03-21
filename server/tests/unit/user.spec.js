import { expect } from 'chai';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sinon from 'sinon';
import { createuser, SignUpHandler, loginuser, LoginHandler, fetchuser } from '../../controllers/users';
import User from '../../models/user';

dotenv.config();

/* eslint no-unused-expressions: [0, { "allowShortCircuit": true, "allowTernary": true }] */

describe('User controllers', () => {

  describe('Signup(Success case)', () => {
    const stub2 = sinon.stub(User, 'create');
    const stub1 = sinon.stub(SignUpHandler, 'validate');
    before(() => {
      stub1.returns({
        passing: true
      });
      stub2.returnsArg(0);
    });

    it('is supposed to return a new user with hashed password and token', () => {
      const testuser = {
        username: 'Hasstrupezekiel',
        password: 'Thisisatestpassword',
        email: 'hasstrup.ezekiel@gmail.com',
        firstname: 'hasstrup',
        lastname: 'Ezekiel'
      };
      const { password } = testuser;
      return createuser(testuser)
        .then((data) => {
          expect(data).to.exist;
          expect(data.token).to.exist;
          expect(bcrypt.compareSync(password, data.password)).to.be.true;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    after(() => {
      stub1.restore();
      stub2.restore();
    });
  });

  describe('Login controller(Success case)', () => {
    it('user should exist', async () => {
      try {
        const user = await loginuser('hasstrup.ezekiel@gmail.com', 'Onosetale32');
        expect(user).to.exist;
        expect(user).to.be.an('object');
      } catch (err) {
        console.log(err);
      }
    });

    it('user should have correct firstname, lastname, email, & username properties', async () => {
      try {
        const user = await loginuser('hasstrup.ezekiel@gmail.com', 'Onosetale32');
        expect(user).to.have.property('username');
        expect(user.username).to.equal('hasstrupezekiel');
        expect(user).to.have.property('firstname');
        expect(user.firstname).to.equal('Hasstrup');
        expect(user).to.have.property('lastname')
        expect(user.lastname).to.equal('Ezekiel')
      } catch (err) {
        console.log(err)
      }
    });

    it('checking the payload of token', async () => {
      try {
        const user = await loginuser('hasstrup.ezekiel@gmail.com', 'Onosetale32');
        expect(user).to.have.property('token');
        const data = await jwt.verify(user.token, process.env.KEY);
        expect(data).to.not.be.undefined;
        expect(data.id).to.equal("5aaf7f6c9cbf9b677c2150f9");
        expect(data.username).to.equal("hasstrupezekiel");
      } catch (err) {
        const user = await loginuser('hasstrup.ezekiel@gmail.com', 'Onosetale32');
      }
    });
  });

  describe('Login Controller(Failure case)', () => {
    it('should throw an error with null fields', async () => {
      try {
        expect(await loginuser(null, null)).to.throw();
      } catch (err) {
        expect(err).to.exist;
        expect(err.state).to.be.an('object');
      }
    });

    it('should throw an error with undefined fields', async () => {
      try {
        await loginuser(undefined, undefined);
      } catch (err) {
        expect(err).to.exist;
        expect(err.state).to.be.an('object');
      }
    });

    it('should throw an error with invalid email and password', async () => {
      try {
        await loginuser('hasstrupezekiel', '1234');
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.db[0]).to.equal('Sorry we dont recognize this user');
      }
    });
  });

  describe('Fectchuser controller (successcase)', () => {

    it('should return a user object with corresponding test', async () => {
      try {
        const user = await fetchuser('hasstrupezekiel');
        expect(user).to.be.an('object');
        expect(user.firstname).to.equal('Hasstrup');
        expect(user.email).to.equal('hasstrup.ezekiel@gmail.com');
      } catch (err) {
        expect(err).to.be.undefined;
      }
    });

  });

  describe('Fetchuser controller (failure cases)', () => {
    it('should throw an error with invalid datatype', async () => {
      try {
        return await fetchuser(12);
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.input).to.equal('Please send in a valid input');
      }
    });

    it('should throw an error with a wrong username', async () => {
      try {
        return await fetchuser('thisisatestusername');
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.db).to.exist
      }
    });
  });
});
