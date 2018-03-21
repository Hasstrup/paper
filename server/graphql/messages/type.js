const messageType = `
  type Message {
    body: String
    title: String
    type: String
    origin: User
    destination: ID
    queries: [queryType]
    upvotes: Int
    resources: [Resource]
  }
`
export default messageType
