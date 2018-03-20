import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { spy, stub } from 'sinon'
import Community from '../../models/community'
import { createCommunity, joinCommunity } from '../../controllers/community/index'

mongoose.connect('mongodb://localhost/paperstack-c', {
});

/* eslint no-unused-expressions: [0, { "allowShortCircuit": true, "allowTernary": true }] */

describe('Community Controllers', () => {

  describe('Create community controller', () => {
    const createstub = stub(Community, 'create');
    before(() => {
      createstub.resolves({
        title: 'A discussion on the future of technology',
        description: 'simple event on the future',
        inclusion: {
          free: true
        },
        publisher: "5aaf7f6c9cbf9b677c2150f9"
      });
    });

    after(() => {
      createstub.restore()
    });


    it('should return a community', async () => {
      const community = {
        title: 'A discussion on the future of technology',
        description: 'simple event on the future',
      };
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYWY3ZjZjOWNiZjliNjc3YzIxNTBmOSIsInVzZXJuYW1lIjoiaGFzc3RydXBlemVraWVsIiwiaWF0IjoxNTIxNDUwODYwfQ.J9GGk-2RBqLyq5TkvKWMeASfnCBVmiFg6aXqlhjFpUA';
      try {
        const { id } = await jwt.verify(token, process.env.KEY);
        const newCommunity = await createCommunity(token, community);
        expect(newCommunity).to.be.an('object');
        expect(newCommunity).to.have.property('title');
        expect(JSON.stringify(newCommunity.publisher)).to.equal(JSON.stringify(id));
        expect(newCommunity).to.have.property('inclusion');
        expect(newCommunity.inclusion.free).to.be.true;
      } catch (err) {
        expect(err).to.be.undefined;
      }
    });
  });


  describe('JoinCommunity Controller(sucess case)', () => {

    before(async () => {
      try {
        const test = await Community.findById('5aafa3e2373c5348310513fd');
        test.members = [];
        await test.save();
      } catch (err) {
        console.log(err);
      }
    });

    after(async () => {
      try {
        const test = await Community.findById('5aafa3e2373c5348310513fd');
        test.members = [];
        await test.save();
      } catch (err) {
        console.log(err);
      }
    });

    it('should successfully add valid user into the members list', async () => {
      try {
        const data = {
          id: '5aaf7f6c9cbf9b677c2150f9',
          username: 'hasstrupezekiel'
        };
        const token = await jwt.sign(data, process.env.KEY);
        const comm = await joinCommunity(token, "5aafa3e2373c5348310513fd");
        expect(comm.members).to.not.be.undefined;
        expect(comm.members).to.be.an('array');
        expect(comm.members.indexOf(data.id)).to.not.equal(-1);
      } catch (err) {
        expect(err).to.be.undefined;
      }
    });
  });

  describe('JoinCommunity controller(failure cases)', () => {

    it('should throw an error with undefined values', async () => {
      try {
        const comm = await joinCommunity(null, null);
      } catch (err) {
        expect(err).to.exist;
        expect(err).to.have.property('state');
        expect(err.state.err.token).to.be.an('array');
      }
    });

    it('should throw an error with an invalid token', async () => {
      try {
        const data = {
          id: null,
          username: 'boompowpow'
        }
        const token = await jwt.sign(data, process.env.KEY);
        const comm = await joinCommunity(token, "5aafa3e2373c5348310513fd");
      } catch (err) {
        expect(err).to.exist;
        expect(err.state.err).to.have.property('id');
        expect(err.state.err.id).to.equal('Invalid token');
      }
    });
  });

  it('should throw an error if the user already exists', async () => {
    try {
      const testcomm = await Community.findById("5aafa3e2373c5348310513fd");
      testcomm.members.push("5aaf7f6c9cbf9b677c2150f9")
      await testcomm.save()
      const testdata = {
        id: '5aaf7f6c9cbf9b677c2150f9',
        username: 'hasstrupezekiel'
      }
      const token = await jwt.sign(testdata, process.env.KEY)
      const comm = await joinCommunity(token, "5aafa3e2373c5348310513fd")
    } catch (err) {
      expect(err).to.exist;
      expect(err.state.err).to.exist;
      expect(err.state.err).to.equal('Youre already in the group big fella')
    }
  });
});
