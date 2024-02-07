require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const resolvers = require("./graphql/resolvers/index");
const { ApolloServer, PubSub } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const { User, Snap } = require("./models/index");

mongoose
  .connect(process.env.easysnap)
  .then((response) => console.log("connected to easysnap"))
  .catch((error) => console.log(error));

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: importSchema("./src/graphql/schema.graphql"),
  resolvers: resolvers,
  context: ({ req }) => ({
    activeUser: req ? req.activeUser : null,
    User,
    Snap,
    pubsub,
  }),
});

const app = express();

app.use((req, res, next) => {
  const token = req.headers["authentication"];

  if (token && token.length > 10 && token !== null) {
    try {
      req.activeUser = jwt.verify(
        token,
        process.env.encrypt,
        (err, decoded) => {
          return decoded;
        }
      );
    } catch (error) {}
  }
  next();
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: process.env.port }, () => {
  console.log(`http://localhost:${process.env.port}${server.graphqlPath}`);
  console.log(`ws://localhost:${process.env.port}${server.subscriptionsPath}`);
});
