require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const { MongoClient } = require("mongodb");
const isEmail = require("isemail");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("./utils");
const ListingAPI = require("./datasources/listing");

// what's the new authentication mode?
// the function that sets up the global context for each resolver, using the req
// const context = async ({ req }) => {
//   // simple auth check on every request
//   const auth = (req.headers && req.headers.authorization) || '';
//   const email = Buffer.from(auth, 'base64').toString('ascii');

//   // if the email isn't formatted validly, return null for user
//   if (!isEmail.validate(email)) return { user: null };
//   // find a user by their email
//   const users = await store.users.findOrCreate({ where: { email } });
//   const user = users && users[0] ? users[0] : null;

//   return { user };
// };

// from other project
// quick try based on: https://stackoverflow.com/questions/59657450/mongoerror-topology-is-closed-please-connect
const dbURL = `mongodb+srv://${process.env.MONGO_USER_USERNAME}:${process.env.MONGO_USER_PASSWORD}@battery-marketplace.g9e2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbName = "battery-marketplace-database";

const init = (db) => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      listingAPI: new ListingAPI(db.collection("listings")),
    }),
  });
};

// Use .connect() instead of new MongoClient
// Pass the new db to the init function defined above once it's been defined
// Call server.listen() from within MongoClient
MongoClient.connect(
  dbURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) console.log("error: ", error);
    const db = client.db(dbName);
    console.log(`Mongo database ${dbName} at ${dbURL}`);

    const server = init(db);

    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  }
);

// export all the important pieces for integration/e2e tests to use
module.exports = {
  // dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  ListingAPI,
  // server,
};
