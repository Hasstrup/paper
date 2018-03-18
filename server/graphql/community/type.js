const communityType = `
  type Community {
    title: String
    description: String
    _id: String
    welcome: String
    publisher: User
    members: [User]
    inclusion:
    subjects: [Subject]
    privileged: [User]
    messages: [Message]
    resources: [Resource]
    rules: [String]
    tags: [String]
    blacklist: [String]
    branches: [Branch]
    queries: [Query]
    timestamps: String
  }

type Query {
  communities: [Community]
  community(id: String): Community
}
`
