const queryType = `
  type queryType {
    title: String
    type: String
    content: String
    author: User
    reference: ID
    resources: [Resource]
  }
`
export default queryType
