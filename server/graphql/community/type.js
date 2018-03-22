// join mutation and what not

export const communityTypes = `
  type Community {
    title: String
    description: String
    id: String
    welcome: String
    publisher: User
    members: [User]
    subjects: [Subject]
    privileged: [User]
    messages: [Message]
    resources: [Resource]
    rules: [String]
    tags: [String]
    blacklist: [String]
    branches: [Branch]
    queries: [queryType]
    inclusion: Inclusion
    timestamps: String
    likes: Int
  }

type Inclusion {
  free: Boolean
  number: Int
}

input CommunityInput {
  title: String!
  description: String!
  subject: String
}
`;

export const communityQueries = `
  communities: [Community]
  community(id: ID): Community
`;

export const communityMutations = `
newcommunity(input: CommunityInput): Community
joincommunity(token: String, community: ID): Community
leavecommunity(token: String, community: ID): User
invokePrivilege(token: String, community: ID): Community
revokePrivilege(token: String, community: ID): Community
deleteCommunity(token: String): Community
likeCommunity(token: String): Community
unlikeCommunity(token: String): Community
`;
