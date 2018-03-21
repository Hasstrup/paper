import mongoose, { Schema } from 'mongoose';

const branchSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
})

const Branch = mongoose.model('Branch', branchSchema);
export default Branch
