const resourceType = `
  type Resource {
    author: User
    content: String
    title: String
    queries: [queryType]
    votes: Int
    destination: Destination
    type: Int
  }

  input ResourceInput {
      destination: ID!
      content: String
      type: Int
      title: String
  }
`;

export const resourceMutation = `
  addresource(token: ID, input: ResourceInput): Destination
`;
export default resourceType;
