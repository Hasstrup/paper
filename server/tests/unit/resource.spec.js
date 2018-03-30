import jwt from 'jsonwebtoken'
import { expect } from 'chai';
import { pushresource } from '../../controllers/resources'
import Resource from '../../models/resources'
import sinon from 'sinon'


/* eslint no-unused-expressions: [0, { "allowShortCircuit": true, "allowTernary": true }] */
const testuser = '5aaf7f6c9cbf9b677c2150f9';
const testcommunity = '5ab2edfcafa1375593aa1d46';
const testmessage = '5ab3d2ba8695c91ab536f186';
const payload = { id: testuser };

describe('Resource Controllers', () => {
  describe('pushing resource (success case)', () => {
    const stub1 = sinon.stub(Resource, 'create');
    const dispatch =  () => {
      return {
        title: '',
        body: '',
        messages: []
      };
    };

    before(() => {
      stub1.returns({ title: '', content: '', type: '', dispatch });
    });

    after(() => {
      stub1.restore();
    });

  it('should return the parent of a message (adding resource to a message)', async () => {
      try {
        const token = await jwt.sign(payload, process.env.KEY);
        const data = {
          content: 'https://github.com/Hasstrup/paper',
          title: 'A sequel to another one',
          type: 3,
          destination: testmessage
        };
        const message = await pushresource(token, data);
        expect(message).to.be.an('object');
        expect(message.title).to.be.a('string');
        expect(message.body).to.be.a('string');
      } catch (err) {
        expect(err).to.be.undefined;
      }
    });

    it('should return the community (pushing directly to a community)', async () => {
      try {
        const token = await jwt.sign(payload, process.env.KEY);
        const data = {
          content: 'https://itunes.apple.com/us/app/macos-highsierra/id1246284741?mt=12',
          title: 'A good look for resources',
          type: 2,
          destination: testcommunity
        };
        const community = await pushresource(token, data);
        expect(community).to.be.an('object');
        expect(community.messages).to.be.an('array');
      } catch (err) {
        expect(err).to.be.undefined;
      }
    });
  });

  describe('pushing resources (failure cases)', () => {

    describe('should throw err with null or invalid input', () => {

      it('should throw an error with no input', async () => {
        try {
          return await pushresource();
        } catch (err) {
          expect(err).to.exist;
          expect(err.state.input).to.equal('Invalid or null input type');
        }
      });

      it('should throw err with an invalid token', async () => {
        try {
          return await pushresource('tokennnnn', {})
        } catch (err) {
          expect(err).to.exist;
        }
      });

      it('should throw err with invalid data type of second arg', async () => {
        try {
          return await pushresource('tokennn', 123);
        } catch (err) {
          expect(err).to.exist;
          expect(err.state.input).to.equal('Invalid or null input type');
        }
      });

      it('should throw an err with missing(compulsory) fields in input type', async () => {
        try {
          const token = jwt.sign(payload, process.env.KEY);
          return await pushresource(token, { destination: 12 });
        } catch (err) {
          expect(err).to.exist;
          expect(err.state.type).to.exist;
        }
      })
    });
  })

});
