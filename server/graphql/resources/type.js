const resourceType = `
  type Resource {
    author: User
    content: String
    title: String
    queries: [queryType]
    votes: Number
    reference: Message
    type: String
    created_at: Date
  }
`;

export default resourceType;
