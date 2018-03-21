import { userType, userQueries, userMutations } from './user/type';
import branchType from './branches/type'
import messageType from './messages/type'
import subjectType from './subjects/type'
import queryType from './queries/type';
import resourceType from './resources/type'
import {communityTypes, communityQueries, communityMutations } from './community/type'

const typeDefs = `
  ${userType}
  ${branchType}
  ${messageType}
  ${subjectType}
  ${queryType}
  ${resourceType}
  ${communityTypes}

  type Query {
    viewer(token: ID): User
    ${userQueries}
    ${communityQueries}
  }

  type Mutation {
    ${userMutations}
    ${communityMutations}
  }
`
export default typeDefs
