import jwt from 'jsonwebtoken'
import ErrorHandler from '../../helpers/error-class';
import ValidationError from '../../helpers/validator';
import Message from '../../models/message'
import type from '../../helpers/type'

export const sendmessage = async (token, input) => {
  try {
    if (token && input && (typeof token === 'string') && (typeof input === 'object')) {
      const messageHandler = new ErrorHandler(['body', 'title', 'type', 'origin', 'destination']);
      const { id } = await jwt.verify(token, process.env.KEY);
      const data = Object.assign({}, input, { origin: id });
      const errors = await messageHandler.validate(data);
      if (errors.passing) {
        const message = await Message.create(data);
        return await message.dispatch();
      }
      setTimeout(() => {
        messageHandler.refresh(); }, 1000)
      throw new ValidationError(errors);
    }
    throw new ValidationError({ input: 'Please check your input' });
  } catch (err) {
    if (err.state) {
      throw new ValidationError(err.state);
    }
    throw new ValidationError({ db: err.message });
  }
};

export const mad = 'hello';
