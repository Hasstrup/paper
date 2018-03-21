import mongoose, { Schema } from 'mongoose'

const subSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  reference: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  central: {
    type: Boolean,
    default: true
  }
});

const Subject = mongoose.model('Subject', subSchema)
export default Subject
