import Community from '../models/community';
import Message from '../models/message';
import User from '../models/user'
import ValidationError from './validator';

const type = (input) => {
  if (input && (typeof input === 'number')) {
    switch (input) {
      case 1:
        return User;

      case 2:
        return Community;

      case 3:
        return Message;

      default:
        return null;
    }
  }
  throw new ValidationError({ input: 'Please check the input of destination' });
};

export default type;
