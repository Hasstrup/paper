import User from '../../models/user'
import { createuser, fetchUser } from '../../controllers/users'
import ValidationError from '../../helpers/validator'


export const signup = async (obj, args, context, info) => {
  const { user } = args
  try {
    const data = await createuser(user)
    return data
  } catch (err) {
    throw new ValidationError(err.state)
  }
}

export const login = async (obj, args, context, info ) => {
  const { email, password } = args
}

export const getUser = (obj, args) => new Promise((resolve, reject) => {
  fetchUser(args.username)
    .then(user => resolve(user))
    .catch(err => reject(err))
})

export const allUsers = () => new Promise((resolve, reject) => {
  User.all((err, users) => {
    if (err) {
      reject(err)
    } else {
      resolve(users)
    }
  })
})
