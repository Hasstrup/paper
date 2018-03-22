import mongoose, { Schema } from 'mongoose'
import type from '../helpers/type'
import ValidationError from '../helpers/validator';


const messageSchema = new Schema({
  body: {
    type: String,
    trim: true,
    required: true,
  },

  title: {
    type: String,
    trim: true,
  },

  type: {
    type: Number,
    required: true,
    index: true
  },

  origin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  destination: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },

  queries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Query',
    }
  ],

  upvotes: {
    type: Number,
    default: 0
  },

  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Resource'
    }
  ],
})

/* eslint func-names: [0, "as-needed"] */
messageSchema.methods.dispatch = async function () {
  try {
    const parent = await type(this.type).findById(this.destination);
    parent.messages.push(this);
    return parent;
  } catch (err) {
    if (err.state) {
      throw new ValidationError(err.state);
    }
    throw new ValidationError({ db: err.message });
  };
};
const Message = mongoose.model('Message', messageSchema)
export default Message
