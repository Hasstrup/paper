import { Schema, model } from 'mongoose';

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

const Branch = model(branchSchema, 'Branch')
