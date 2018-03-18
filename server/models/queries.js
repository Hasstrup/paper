import { Schema, model } from 'mongoose'

const query = new Schema ({

  title: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    required: true,
    trim: true
  },

  content: {
    type: String,
    trim: true,
    required: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  reference: {
    type: Schema.Types.ObjectId,
  },

  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],

})

const Query = model(query, 'Query')
