import jwt from 'jsonwebtoken';
import ValidationError from '../../helpers/validator';
import ErrorHandler from '../../helpers/error-class';
import Resource from '../../models/resources';

export const pushresource = async (token, input) => {
  try {
    if (token && input && (typeof token === 'string') && (typeof input === 'object')) {
      const ResourceHandler = new ErrorHandler(['author', 'content', 'title', 'destination', 'type']);
      const { id } = await jwt.verify(token, process.env.KEY);
      const data = Object.assign({}, input, { author: id });
      const errors = await ResourceHandler.validate(data);
      if (errors.passing) {
        const resource = await Resource.create(data);
        return await resource.dispatch();
      }
      throw new ValidationError(errors);
    }
    throw new ValidationError({ input: 'Invalid or null input type' });
  } catch (err) {
    console.log(err.state)
    if (err.state) {
      throw new ValidationError(err.state);
    }
    throw new ValidationError({ input: err.message });
  }
};

export const hello = ''
