export const userType = `
  type User {
    _id: ID
    firstname: String
    lastname: String
    avatar:  String
    username: String!
    email: String!
    followers: [User]
    friends: [User]
    token: String
  }
  input UserInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    password: String!
  }
`;

export const userQueries = `
user(username: String): User
users: [User]
`;

export const userMutations = `
signup(user: UserInput): User
login(email: String! password: String!): User
`;
