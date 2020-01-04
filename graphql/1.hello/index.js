const { buildSchema } = require('graphql')

const rootSchema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = { hello: () => `Hello world!` }

module.exports = {
  rootSchema,
  root
}
