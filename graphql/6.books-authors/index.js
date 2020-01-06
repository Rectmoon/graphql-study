const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql")

const authors = [
  { id: 1, name: "J. K. Rowling" },
  { id: 2, name: "J. R. R. Tolkien" },
  { id: 3, name: "Brent Weeks" }
]

const books = [
  { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
  { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1 },
  { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
  { id: 4, name: "The Fellowship of the Ring", authorId: 2 },
  { id: 5, name: "The Two Towers", authorId: 2 },
  { id: 6, name: "The Return of the King", authorId: 2 },
  { id: 7, name: "The Way of Shadows", authorId: 3 },
  { id: 8, name: "Beyond the Shadows", authorId: 3 }
]

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: book => authors.find(author => author.id === book.authorId)
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents a author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: author => books.filter(book => book.authorId === author.id)
    }
  })
})

const MyAppQueryRootType = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is MyAppQueryRootType!",
  fields: () => ({
    hello: {
      type: GraphQLString,
      description: "hello",
      resolve: () => "123"
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of All books",
      resolve: () => books
    },
    book: {
      type: BookType,
      description: "A single book",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of All authors",
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: "A single author",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    }
  })
})

const MyAppMutationRootType = new GraphQLObjectType({
  name: "RootMutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const newBook = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(newBook)
        return newBook
      }
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const newAuthor = { id: authors.length + 1, name: args.name }
        authors.push(newAuthor)
        return newAuthor
      }
    }
  })
})

const rootSchema = new GraphQLSchema({
  query: MyAppQueryRootType,
  mutation: MyAppMutationRootType
})

const root = {}

module.exports = {
  rootSchema,
  root
}
