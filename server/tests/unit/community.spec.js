import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { spy, stub } from 'sinon'
import { createCommunity } from '../../controllers/community/index'

mongoose.connect('mongodb://localhost/paperstack-c', {
});

describe('Community Controllers', () => {
  describe('Create community controller', () => {
    it('should return a community', async () => {
      const community = {
        title: 'A discussion on the future of technology',
        description: 'simple event on the future',
      }
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYWY3ZjZjOWNiZjliNjc3YzIxNTBmOSIsInVzZXJuYW1lIjoiaGFzc3RydXBlemVraWVsIiwiaWF0IjoxNTIxNDUwODYwfQ.J9GGk-2RBqLyq5TkvKWMeASfnCBVmiFg6aXqlhjFpUA'
      try {
        const { id } = await jwt.verify(token, process.env.KEY)
        const newCommunity = await createCommunity(token, community)
        expect(newCommunity).to.be.an('object')
        expect(newCommunity).to.have.property('title')
        expect(JSON.stringify(newCommunity.publisher)).to.equal(JSON.stringify(id))
        expect(newCommunity).to.have.property('inclusion')
        expect(newCommunity.inclusion.free).to.be.true
      } catch (err) {
        console.log(err)
        expect(err).to.be.undefined
      }
    });
  })
})
