import { expect } from 'chai'
import type from '../../helpers/type';


describe('Type generator tests', () => {
  describe('Type generator function (success cases)', () => {
    it('should return a User (mongoose model) with input = 0', () => {
      const model = type(1);
      expect(model.schema.obj).to.be.an('object');
      expect(model.schema.obj).to.have.property('firstname');
    });

    it('should return a Community model with input = 1', () => {
      const model = type(2);
      expect(model.schema.obj).to.be.an('object');
      expect(model.schema.obj).to.have.property('members');
    });

    it('should return a Message model with input = 2', () => {
      const model = type(3);
      expect(model.schema.obj).to.be.an('object');
      expect(model.schema.obj).to.have.property('origin');
    });

    it('should return null with a input number not registered', () => {
      const model = type(10);
      expect(model).to.equal(null);
    });
  });

  describe('Type generator function (failure cases)', () => {
    it('should throw an error with no input', () => {
      try {
        type()
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should throw an error with an invalid input', () => {
      try {
        type('teststring')
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });
});
