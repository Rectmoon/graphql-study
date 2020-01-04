const { buildSchema } = require("graphql")

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides)
  }

  roll({ numRolls }) {
    var output = []
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce())
    }
    return output
  }
}

const rootSchema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
 
  type Query {
    getDie(numSides: Int): RandomDie
  }
`)

const root = {
  hello: () => `Hello world!`,
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6)
  }
}

module.exports = {
  rootSchema,
  root
}
