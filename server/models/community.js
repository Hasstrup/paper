import { Schema, model } from 'mongoose'

const community= new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },

  descrition: {
    type: String,
    required: true,
    trim: true
  },

  welcome: {
    type: String,
    required: true,
    trim: true
  },

  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }

  ],

  inclusion: {
    free: Boolean,
    price: Number,
    default: {
      free: true,
      price: 0
    }
  },

  privileged: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  messages: [
    {
      type: schema.Types.ObjectId,
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

// disable anonymity
safe: {
    type: Boolean,
    default: true
},

restrictions: {
  type: Schema.Types.ObjectId,
  
}

},

{
  timestamps: true
}
)

const User = model(community, 'Community')
