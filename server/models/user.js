import 'babel-polyfill'
import mongoose from 'mongoose'
import { isEmail, isEmpty } from 'validator'

const { Schema } = mongoose

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource',
  }],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Community',
    }
  ],
});



userSchema.statics.checkname = async function (username) {
  try {
    const user = await this.findOne({username})
    if (user) {
      return true
    }
  return false
} catch (err) {
   throw new Error(err)
  }
}

userSchema.statics.checkmail = async function (email) {
  try {
    const user = await this.findOne({email})
    if (user) {
      return true
    }
  return false
} catch (err) {
   throw new Error(err)
  }
}

userSchema.statics.validator = async function (user) {
  let arr = { passing: true, messages: []}
  if (!user || !user.username || !user.email || (typeof user.email) !== 'string' || (typeof user.username) !== 'string')
   {
    arr.messages.push('Invalid input, please check the fields')
    arr.passing = false
    return arr
  }

  try {
    const check1 = await this.checkname(user.username)
    const check2 = await this.checkmail(user.email);
    if(check1) {
      arr.messages.push('The username is not available')
      arr.passing = false
    } if (check2) {
      arr.messages.push('The email is not available')
      arr.passing = false
    }
    return arr
  } catch (err) {
    throw new Error(err)
  }
}

userSchema.statics.all = function (callback) {
  this.find({}, (err, users) => callback(err, users))}


const User = mongoose.model('User', userSchema)

module.exports = User
