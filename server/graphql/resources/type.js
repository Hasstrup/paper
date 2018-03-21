const resourceType = `
  type Resource {
    author: User
    content: String
    title: String
    queries: [queryType]
    votes: Int
    reference: Message
    type: String
  }
`;

export default resourceType;
