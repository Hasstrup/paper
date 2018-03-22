const messageType = `
  type Message {
    body: String
    title: String
    type: String
    origin: User
    destination: Destination
    queries: [queryType]
    upvotes: Int
    resources: [Resource]
  }

  input messageInput {
    body: String!
    title: String!
    destination: ID!
  }

  enum Destination {
    Community
    User
    Message
  }
`
export default messageType
