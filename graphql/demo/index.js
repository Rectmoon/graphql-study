const { buildSchema } = require("graphql")

class Item {
  constructor(id, { name, password }) {
    this.id = id
    this.name = name
    this.password = password
  }
}

const rootSchema = buildSchema(`
  input ItemInput {
    name: String
    password: String
  }

  type Item {
    id: ID!
    name: String
    password: String
  }

  type Query {
    hello: String
    id: ID!
    name: String!
    getItem(id: ID!): Item
  }

  type Mutation {
    createItem(input: ItemInput): Item
    updateItem(id: ID!, input: ItemInput): Item
  }
`)

const fakeDatabase = {}

const root = {
  id: () => `12345`,
  hello: () => `Hello world!`,
  getItem: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no item exists with id " + id)
    }
    return new Item(id, fakeDatabase[id])
  },
  createItem: ({ input }) => {
    // Create a random id for our "database".
    var id = require("crypto")
      .randomBytes(10)
      .toString("hex")

    fakeDatabase[id] = input
    return new Item(id, input)
  },
  updateItem: ({ id, input }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no Item exists with id " + id)
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input
    return new Item(id, input)
  }
}

module.exports = {
  rootSchema,
  root
}
