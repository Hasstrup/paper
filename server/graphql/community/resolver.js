import { fetchCommunities, fetchCommunity, createCommunity, joinCommunity } from '../../controllers/community/index'
import ValidationError from '../../helpers/validator'

/* eslint no-return-await: 0 */
/* eslint arrow-body-style: [0, "always"] */

export const id = (obj) => {
  return obj._id;
};

export const publisher = async (obj, args, context) => {
  return await context.loaders.userloader.load(obj.publisher);
};

export const members = async (obj, args, context) => {
  return await Promise.all(obj.members.map(async (id) => {
    return await context.loaders.userloader.load(id);
  }));
};

export const resources = async (obj, args, context) => {
  return await Promise.all(obj.resources.map(async (id) => {
    return await context.loaders.resourceloader.load(id);
  }));
};

export const branches = async (obj, args, context) => {
  return await Promise.all(obj.branches.map(async (id) => {
    return await context.loaders.branchloader.load(id);
  }));
};

export const queries = async (obj, args, context) => {
  return await Promise.all(obj.queries.map(async (id) => {
    return await context.loaders.queryloader.load(id);
  }));
};

// QUERIES

export const communities = async () => {
  return await fetchCommunities();
};

export const community = async (obj, { id }) => {
  try {
    return await fetchCommunity(id);
  } catch (err) {
    throw new ValidationError(err.state);
  }
};

// MUTATIONS

export const newcommunity = async (obj, args, context) => {
  try {
    return await createCommunity(context.token, args.input);
  } catch (err) {
    throw new ValidationError(err.state);
  }
};

export const joincommunity = async (obj, args, context) => {
  try {
    const token = args.token ? args.token : context.token
    return await joinCommunity(token, args.community);
  } catch (err) {
    throw new ValidationError(err.state);
  }
};
