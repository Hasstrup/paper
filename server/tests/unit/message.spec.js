import jwt from 'jsonwebtoken'
import { expect } from 'chai';
import { sendmessage } from '../../controllers/messages';
import type from '../../helpers/type'

const id = '5aaf7f6c9cbf9b677c2150f9';
const username = 'hasstrupezekiel';
const destination = '5ab2edfcafa1375593aa1d46';
const input = { body: 'Hello there', title: 'Look at me', type: 2, destination, };

/* eslint no-unused-expressions: [0, { "allowShortCircuit": true, "allowTernary": true }] */
describe('Message Controllers', () => {

  describe('Create message controller (success case)', () => {
    after(async () => {
      const parent = await type(input.type).findById(input.destination);
      parent.messages = [];
      await parent.save();
    });
    it('should return the successful parent with message populated in it', async () => {
      try {
        const payload = { id, username };

        const token = await jwt.sign(payload, process.env.KEY);
        const parent = await sendmessage(token, input);
        expect(parent).to.exist;
        expect(parent.members).to.exist;
        expect(parent.members).to.be.an('array');
      } catch (err) {
        expect(err).to.be.undefined;
      }
    });
  });

  describe('Create message controller (failure cases)', () => {

    it('should throw an error with empty args', async () => {
      try {
        return await sendmessage();
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.input).to.equal('Please check your input');
      }
    });

    it('should throw an error with invalid arguments', async () => {
      try {
        return await sendmessage({ damn: 'thisisatesttoken' }, 'thiisawrongpositionalargument')
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.input).to.equal('Please check your input');
      }
    });

    it('should throw an error with an invalid token', async () => {
      try {
        await sendmessage('thistokenshouldfail', {});
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.db).to.be.a('string');
      }
    });

    it('should throw an error with missing input fields', async () => {
      try {
        const token = await jwt.sign({ id }, process.env.KEY);
        const data = { body: 'this is a test', title: 'Hello' };
        return await sendmessage(token, data);
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.type).to.exist;
        expect(err.state.destination).to.exist;
      }
    })

    it('should throw an error with invalid input fields', async () => {
      try {
        const token = await jwt.sign({ id }, process.env.KEY);
        const data = { body: 'this is a test', title: 'test message', type: 2, destination: 'destination' };
        return await sendmessage(token, data);
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.db).to.exist;
      }
    });
  });
});
