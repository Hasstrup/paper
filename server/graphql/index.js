import { user, users, signup, login, viewer } from './user/resolver'
import { queries, branches, members, communities, community, resources, publisher, newcommunity, id, joincommunity } from './community/resolver';
import { origin, destination, resources } from './messages/resolver'

const resolvers = {
  Community: {
    id,
    publisher,
    queries,
    branches,
    members,
    resources,
  },

  Message: {
    origin,
    destination,
    resources
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
    newcommunity,
    joincommunity
  }
}

export default resolvers
