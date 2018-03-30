import mongoose, { Schema } from 'mongoose'
import type from '../helpers/type'
import ValidationError from '../helpers/validator'

const resource = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  content: {
    type: String,
    required: true,
    trim: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  queries: [{
    type: Schema.Types.ObjectId,
    ref: 'Query'
  }],

  votes: { type: Number, default: 0 },

  destination: {
    type: Schema.Types.ObjectId,
    required: true
  },

  type: {
    type: Number,
    required: true,
    trim: true
  }

},
{
  timestamps: true
}
);

resource.methods.dispatch = async function () {
  try {
  const parent = await type(this.type).findById(this.destination);
  parent.resources.push(this._id);
  await parent.save();
  return parent; }
  catch (err) {
    throw new ValidationError({ db: err.message})
  }
}

const Resource = mongoose.model('Resource', resource)
export default Resource
