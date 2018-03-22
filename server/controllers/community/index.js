import 'babel-polyfill'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../../helpers/error-class';
import ValidationError from '../../helpers/validator';
import Community from '../../models/community';

dotenv.config();

export const createCommunity = async (token, input) => {
  try {
    const createHandler = new ErrorHandler(['title', 'publisher', 'description'])
    if (token && input && (typeof token === 'string') && (typeof input === 'object')) {

      const { id } = await jwt.verify(token, process.env.KEY)
      const errors = await createHandler.validate({ ...input, publisher: id });
      if (errors.passing) {
        const { id } = await jwt.verify(token, process.env.KEY);
        const community = await Community.create({ ...input, publisher: id });
        return community;
      }
      throw new ValidationError(errors);
    }
    throw new ValidationError({ input: 'Something must be wrong with the input sent' });
  } catch (err) {
    throw new ValidationError(err.state ? err.state : err.message)
  }
};


export const joinCommunity = async (token, communityID) => {
  try {
    const joinHandler = new ErrorHandler(['token', 'communityID']);
    const errors = await joinHandler.validate({ token, communityID });
    if (errors.passing) {
      const { id } = jwt.verify(token, process.env.KEY);
      if (id && id.constructor === String) {
        const community = await Community.findById(communityID);
        const newCommunity = await community.addMember(id);
        return newCommunity;
      }
      throw new ValidationError({ id: 'Invalid token' });
    }
    joinHandler.refresh();
    throw new ValidationError(errors);
  } catch (err) {
    if (err.state) {
      throw new ValidationError(err.state);
    }
    throw new ValidationError(err.message);
  }
};


export const fetchCommunity = async (communityID) => {
  try {
    if (communityID && communityID.constructor === String) {
      const community = await Community.findById(communityID).populate('publisher members');
      if (community) {
        return community;
      }
      throw new ValidationError({ db: 'User doesnt exist' });
    }
    throw new ValidationError({ db: 'Invalid input' });
  } catch (err) {
    if (err.state) {
      throw new ValidationError({ err: err.state.db });
    }
    throw new ValidationError({ err: err.message });
  }
};

export const fetchCommunities = async () => {
  try {
    const communities = await Community.find({}).populate('publisher members');
    return communities;
  } catch (err) {
    throw new ValidationError({ err: err.message });
  }
};
