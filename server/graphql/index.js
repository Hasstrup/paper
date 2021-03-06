import { user, users, signup, login, viewer } from './user/resolver'
import { queries, branches, addmessage, members, messages, communities, community, resources, publisher, newcommunity, id, joincommunity } from './community/resolver';
import { origin, destination, support } from './messages/resolver';
import { addresource, author } from './resources/resolver';
import Destination from './messages/helper'

const resolvers = {

  Resource: {
    author,
    destination
  },

  Destination: {
    id,
    publisher,
    queries,
    branches,
    members,
    resources,
    messages,
    origin,
    destination,
    support
  },

  Community: {
    id,
    publisher,
    queries,
    branches,
    members,
    resources,
    messages
  },

  Message: {
    origin,
    destination,
    support
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
    joincommunity,
    addmessage,
    addresource
  }
}

export default resolvers
