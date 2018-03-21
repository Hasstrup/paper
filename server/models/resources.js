import mongoose, { Schema } from 'mongoose'

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

  votes: Number,

  reference: {
    type: Schema.Types.ObjectId,
    required: true
  },

  type: {
    type: String,
    required: true,
    trim: true
  }

},
{
  timestamps: true
}
);

const Resource = mongoose.model('Resource', resource)
export default Resource
