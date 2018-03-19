import { Schema, model } from 'mongoose'

const { ObjectId } = Schema.Types

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
    type: String,
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
      type: ObjectId,
      ref: 'Query',
    }
  ],

  upvotes: {
    type: Number,
    default: 0
  },

  resources: [
    {
      type: ObjectId,
      ref: 'Resource'
    }
  ],
})

const Message = model('Message', messageSchema)
