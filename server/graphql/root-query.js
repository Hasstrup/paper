import { userType, userQueries, userMutations  } from './user/type'
import {communityTypes, communityQueries, communityMutations } from './community/type'

const typeDefs = `
  ${userType}


  type Query {
    ${userQueries}

  }
  type Mutation {
    ${userMutations}
    
  }
`
export default typeDefs
