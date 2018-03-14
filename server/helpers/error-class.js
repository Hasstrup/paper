import { isEmpty } from 'validator';

class ErrorHandler {

  constructor(keys, model) {
    this.errors = { passing: true }
    this.keys = []
    this.model = model && model.schema.obj ? model : null
    if (keys && (keys.constructor === Array || String)) {
      this.register(keys)
    } else {
      throw new Error('The first argument has to be an array of keys to validat')
    }
  }

  async register(args) {
    if (args.map) {
      const filter = args.filter(key => (typeof key) === 'string')
      await filter.forEach(key => this.keys.push(key))
      return this.keys
    }
    Object.values(arguments).forEach((arg) => {
      if ((typeof arg) === 'string') {
        this.keys.push(arg)
      }
    });
    return this.keys
  }

  refresh () {
    this.errors = {passing: true}
    return this
  }

  feedModel(input) {
    if (input && input.schema.obj) {
      this.model = input
      return this
    }
    throw new Error('Invalid model')
  }

  adderror(err) {
    if (this.errors.db) {
      this.errors.db.push(err)
    }
    this.errors.db = [err]
    return this.errors
  }

  async validate(args) {
    try {
      if ((typeof args) !== 'object') {
        throw new Error('this method only accepts an object')
      }

      if (this.keys.length < 1) {
        throw new Error('There are no keys to compare input against')
      }
      await this.keys.forEach((key) => {
        if (!args[`${key}`] || isEmpty(args[`${key}`])) {
          this.errors.passing = false
          this.errors[`${key}`] = ['This field is either empty or doesnt exist']
        }
      })

      if (this.model && this.model.schema.obj) {
        const schema = this.model.schema.obj
        const schemaArr = Object.keys(schema).map((key) => {
          const mockObject = {}
          mockObject[`${key}`] = schema[`${key}`]
          return mockObject
        }).filter(ele => ele[`${Object.keys(ele)[0]}`].unique)

        const testObj = {}
        schemaArr.forEach((item) => {
          const key = Object.keys(item)[0]
          if (args[`${key}`]) {
            testObj[`${key}`] = args[`${key}`]
          }
        })

        const check = await this.model.validator(testObj)
        if (!check.passing) {
          check.messages.forEach((message, index) => {
            this.errors[`dbtest${index}`] = message
            this.errors.passing = false
          });
        }
      }
      return this.errors
    } catch (err) {
      throw new Error(err.message ? err.message : err)
    }
  }
}

export default ErrorHandler
