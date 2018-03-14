import { getUser, signup, allUsers } from './user/resolver'

const resolvers = {
  Query: {
    user: (obj, args, context) => getUser(obj, args)
      .then(user => user),

    users: (obj, args, context) => allUsers()
      .then(users => users)
      .catch(err => err)
  },

  Mutation: {
    signup,
  }
}

export default resolvers
