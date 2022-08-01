const { createServer } = require("graphql-yoga");
const resolvers = require("./graphql/resolvers/index");
const pubsub = require("./pubsub");
let db = require("../data");

const server = new createServer({
  schema: {
    typeDefs: `${__dirname}/graphql/type-defs/schema.graphql`,
    resolvers,
  },
  context: { pubsub, db },
});

server.start(() => console.log("Server started"));
