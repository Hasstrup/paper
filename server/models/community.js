import mongoose from 'mongoose'

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
      ref: 'User'
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

const Community = mongoose.model('Community', commSchema)
export default Community
