import { user, users, signup, login, viewer } from './user/resolver'
import { queries, branches, members, communities, community, resources, publisher } from './community/resolver'

const resolvers = {
  Community: {
    publisher,
    queries,
    branches,
    members,
    resources,
  },

  Query: {
    user,
    users,
    viewer,
    communities,
    community
  },

  Mutation: {
    signup,
    login,
  }
}

export default resolvers
