require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const { MongoClient } = require("mongodb");

const { AccountsModule } = require("@accounts/graphql-api");
const { AccountsServer } = require("@accounts/server");
const { AccountsPassword } = require("@accounts/password");
const { Mongo } = require("@accounts/mongo");

const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const isEmail = require("isemail");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("./utils");
const ListingAPI = require("./datasources/listing");

// quick try based on: https://stackoverflow.com/questions/59657450/mongoerror-topology-is-closed-please-connect
const dbURL = `mongodb+srv://${process.env.MONGO_USER_USERNAME}:${process.env.MONGO_USER_PASSWORD}@battery-marketplace.g9e2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbName = "battery-marketplace-database";

// source: https://github.com/GraphQLGuide/apollo-datasource-mongodb/
MongoClient.connect(
  dbURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    // callback - MongoClient.connect
    var db = client.db(dbName);

    // source: https://www.apollographql.com/blog/backend/auth/email-password-authentication-with-accounts-js/
    const accountsPassword = new AccountsPassword({});
    const accountsMongo = new Mongo(db, {});
    const accountsServer = new AccountsServer(
      {
        db: accountsMongo,
        // Replace this value with a strong secret
        tokenSecret: "my-super-random-secret",
      },
      {
        password: accountsPassword,
      }
    );

    console.log(accountsServer);

    // We generate the accounts-js GraphQL module
    const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

    const server = new ApolloServer({
      typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
      resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
      schemaDirectives: {
        ...accountsGraphQL.schemaDirectives,
      },
      context: accountsGraphQL.context,
      dataSources: () => {
        return {
          listingAPI: new ListingAPI(db.collection("listings")),
          // do we need another datasource here for accounts in order to make resolvers wokr
        };
      },
    });
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  }
);

// export all the important pieces for integration/e2e tests to use
// [] add other servers here
module.exports = {
  // dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  ListingAPI,
  // server,
};
