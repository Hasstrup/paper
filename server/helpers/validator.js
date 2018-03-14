import { GraphQLError } from 'graphql'

class ValidationError extends GraphQLError {
  constructor(errors) {
    super('This request is invalid');
    if (!errors || (typeof errors) !== 'object') {
      throw new GraphQLError('Please send in an object of error messages')
    }
    this.state = errors
  }
}

export default ValidationError
