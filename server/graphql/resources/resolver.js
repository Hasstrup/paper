
import ValidationError from '../../helpers/validator';
import { pushresource } from '../../controllers/resources';

/* eslint no-return-await: [0] */
export const author = async (obj, args, context) => {
  return await context.loaders.userloader.load(obj.author);
}

export const addresource = async (obj, args) => {
  try {
    return await pushresource(args.token, args.input);
  } catch (err) {
    throw new ValidationError(err.state);
  }
};
