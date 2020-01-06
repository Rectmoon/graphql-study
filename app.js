const path = require("path")
const express = require("express")
const graphqlHTTP = require("express-graphql")
// const { rootSchema, root } = require('./graphql/1.hello')
// const { rootSchema, root } = require('./graphql/2.basic-types')
// const { rootSchema, root } = require('./graphql/3.pass-arguments')
// const { rootSchema, root } = require("./graphql/4.object-types")
// const { rootSchema, root } = require("./graphql/5.mutations-input-types")
// const { rootSchema, root } = require("./graphql/demo")
const { rootSchema, root } = require("./graphql/6.books-authors")

const loggingMiddleware = (req, res, next) => {
  console.log(`ip: ${req.ip}`)
  next()
}

const app = express()
app.use(loggingMiddleware)
app.use(
  "/graphql",
  graphqlHTTP({
    schema: rootSchema,
    rootValue: root,
    graphiql: true
  })
)

app.use(express.static(path.join(__dirname, "public")))

app.listen(3000, () => {
  console.log(`Graphql App is running at http://localhost:3000/graphql`)
})
