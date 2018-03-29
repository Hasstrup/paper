import { Type, communityType } from './helper'
const messageType = `
  type Message {
    body: String
    title: String
    type: String
    origin: User
    destination: Destination
    queries: [queryType]
    upvotes: Int
    support: [Resource]
  }

  input messageInput {
    body: String!
    title: String!
    destination: ID!
    type: Int
  }

type Destination {
  ${communityType}
  ${Type}
}
`;
export default messageType;
