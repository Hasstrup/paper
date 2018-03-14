 const userType = `
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
  type Query {
    user(username: String): User
    users: [User]
  }
  type Mutation {
    signup(user: UserInput): User
    login(email: String! password: String!): User

  }
  input UserInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    password: String!
  }
`
export default userType
