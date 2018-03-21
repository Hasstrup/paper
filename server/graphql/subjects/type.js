const subjectType = `
  type Subject {
    title: String,
    description: String,
    resources: [Resource]
    reference: Community
    central: Boolean
  }
`
export default subjectType
