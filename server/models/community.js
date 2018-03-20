import 'babel-polyfill'
import mongoose from 'mongoose'
import User from './user'
import ValidationError from '../helpers/validator'

const { Schema } = mongoose


const commSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  welcome: {
    type: String,
    trim: true
  },

  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],

  inclusion: {
    free: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
  },

  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject'
    }
  ],

  privileged: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ],

  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Resource',
    }
  ],

  rules: [
    {
      type: String,
      trim: true
    }
  ],

  tags: [
    {
      type: String,
      trim: true,
      lowercase: true,
    }
  ],

  blacklist: [
    {
      type: String,
      trim: true,
    }
  ],

  branches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Branch'
    }
  ],

  // disable anonymity
  safe: {
    type: Boolean,
    default: true
  },

  queries: [{
    type: Schema.Types.ObjectId,
    ref: 'Query'
  }],

  likes: Number

},

{
  timestamps: true
}
);

/* eslint func-names: [0, "as-needed"] */
commSchema.methods.addMember = async function (_id) {
try {
    const user = await User.findOne({ _id });
    if (user) {
      const members = this.members.map(item => item.toString());
      if (!members.includes(_id)) {
        this.members.push(user._id);
        await this.save();
        return this
      }
      throw new ValidationError({ db: 'Youre already in the group big fella' });
    }
    throw new ValidationError({ db: 'Sorry we dont recognize this user' });
  } catch (err) {
    if(err.state.db) {
      throw new ValidationError({ db: err.state.db });
    }
    throw new ValidationError({ db: err.message });
  }
}

const Community = mongoose.model('Community', commSchema)
export default Community
