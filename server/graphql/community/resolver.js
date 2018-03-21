import { fetchCommunities, fetchCommunity } from '../../controllers/community/index'
import ValidationError from '../../helpers/validator'

/* eslint no-return-await: 0 */
/* eslint arrow-body-style: [0, "always"] */

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


export const communities = async () => {
  return await fetchCommunities();
};

export const community = async (obj, { id }) => {
  try {
    return await fetchCommunity(id);
  } catch (err) {
    throw new ValidationError({ err: err.state.err });
  }
};
