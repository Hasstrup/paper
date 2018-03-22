import jwt from 'jsonwebtoken'
import User from '../../models/user'
import { createuser, loginuser, fetchuser } from '../../controllers/users'
import ValidationError from '../../helpers/validator'


export const signup = async (obj, args, context) => {
  const { user } = args;
  try {
    const data = await createuser(user);
    context.token = data.token;
    context.viewer = data;
    return data;
  } catch (err) {
    throw new ValidationError(err.state);
  }
};

export const login = async (obj, args, context) => {
  const { email, password } = args;
  try {
    const data = await loginuser(email, password);
    context.token = data.token;
    context.viewer = data;
    return data;
  } catch (err) {
    throw new ValidationError(err.state);
  }
};

export const user = async (obj, args) => {
  try {
    return await fetchuser(args.username);
  } catch (err) {
    throw new ValidationError(err.state);
  }
};

export const users = async () => {
  try {
    return await User.all();
  } catch (err) {
    throw new ValidationError(err.state);
  }
};

export const viewer = async (obj, args, context) => {
  if (args.token) {
    const { id } = await jwt.verify(args.token, process.env.KEY);
    const currentuser = await context.loaders.userloader.load(id);
    context.viewer = currentuser;
  }
  return context.viewer;
};
