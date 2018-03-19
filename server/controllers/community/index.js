import 'babel-polyfill'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Community from '../../models/community'

dotenv.config();

export const createCommunity = async (token, input) => {
  // check the token check for non null in the fields, create return
  try {
    const { id } = await jwt.verify(token, process.env.KEY);
    const community = await Community.create({ ...input, publisher: id });
    const newCommunity = await community.populate('publisher');
    return newCommunity;
  } catch (err) {
    throw new Error(err ? err : err.message);
  }
};

export const joinCommunity = async (token, community) => {
  console.log('Hello')
}
