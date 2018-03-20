import 'babel-polyfill'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import ErrorHandler from '../../helpers/error-class'
import ValidationError from '../../helpers/validator'
import Community from '../../models/community'

dotenv.config();

export const createCommunity = async (token, input) => {
  try {
    const { id } = await jwt.verify(token, process.env.KEY);
    const community = await Community.create({ ...input, publisher: id });
    return community
  } catch (err) {
    throw new Error(err ? err : err.message);
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
        return newCommunity
      }
      throw new ValidationError({id: 'Invalid token'});
    }
    joinHandler.refresh();
    throw new ValidationError(errors);
  } catch (err) {
    if (err.state.db) {
      throw new ValidationError({err: err.state.db})
    }
    throw new ValidationError({ err: err.state ? err.state : err.message })
  }
}
