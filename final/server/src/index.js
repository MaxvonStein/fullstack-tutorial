require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const { MongoClient } = require("mongodb");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { getFieldsWithDirectives } = require("@graphql-modules/utils");

const { AccountsModule, authenticated } = require("@accounts/graphql-api");
const { AccountsServer } = require("@accounts/server");
const { AccountsPassword } = require("@accounts/password");
// const { authenticated } = require("@accounts/boost");
const { Mongo } = require("@accounts/mongo");

const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const isEmail = require("isemail");

const { typeDefs } = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("./utils");
const ListingAPI = require("./datasources/listing");
const ModuleAPI = require("./datasources/module");

// quick try based on: https://stackoverflow.com/questions/59657450/mongoerror-topology-is-closed-please-connect
const dbURL = `mongodb+srv://${process.env.MONGO_USER_USERNAME}:${process.env.MONGO_USER_PASSWORD}@battery-marketplace.g9e2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbName = "battery-marketplace-database";

const { mapSchema, getDirective, MapperKind } = require("@graphql-tools/utils");

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
        // # Replace this value with a strong secret
        tokenSecret: "my-super-random-secret",
      },
      {
        // what's this for?
        password: accountsPassword,
      }
      // # setvsendEmail param here, details: https://www.accountsjs.com/docs/email/
    );

    // We generate the accounts-js GraphQL module
    const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

    // source: https://www.apollographql.com/docs/apollo-server/schema/creating-directives/
    function authenticatedDirectiveTransformer(schema, directiveName) {
      return mapSchema(schema, {
        // Executes once for each object field in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          // Check whether this field has the specified directive
          const upperDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];

          if (upperDirective) {
            // Get this field's original resolver
            const { resolve = defaultFieldResolver } = fieldConfig;

            // Replace the original resolver with a function that *first* calls
            // the original resolver, then converts its result to upper case
            fieldConfig.resolve = async (source, args, context, info) => {
              const authenticatedResult = await authenticated(
                (source, args, context, info) => {
                  return true;
                }
              );
              console.log(authenticatedResult);
              if (!authenticatedResult) {
                throw new Error("not auth");
              }
              return resolve(source, args, context, info);

              // const result = await resolve(source, args, context, info);
              // console.log(result);

              // authenticated((source, args, context, info) => {
              //   return await resolve(source, args, context, info);
              // });

              // console.log(authenticatedResult);
              // console.log(authenticated(source, args, context));
              // console.log(isAuthenticated);
              // if (isAuthenticated) {
              //   // problem is async function
              //   console.log("authenticated");
              //   // is authenticated's root param equivalent to source?
              //   return result;
              // }
            };
            return fieldConfig;
          }
        },
      });
    }

    // source: https://github.com/pradel/accounts-js-server-tutorial/blob/master/index.js
    let schema = makeExecutableSchema({
      typeDefs: mergeTypeDefs([
        typeDefs,
        // { Query: modulesQueryType },
        accountsGraphQL.typeDefs,
      ]),
      resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
      schemaDirectives: {
        ...accountsGraphQL.schemaDirectives,
      },
    });

    // not working, use in resolver instead
    // schema = authenticatedDirectiveTransformer(schema, "auth");
    // source: https://community.apollographql.com/t/what-is-up-with-schema-directives-right-now/1031/6
    // SchemaDirectiveVisitor.visitSchemaDirectives(schema, directives);

    const server = new ApolloServer({
      // typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
      // resolvers: mergeResolvers([resolvers, accountsGraphQL.resolvers]),
      // dropped for v3
      // schemaDirectives: {
      //   ...accountsGraphQL.schemaDirectives,
      // },
      schema,
      context: accountsGraphQL.context,
      dataSources: () => {
        return {
          listingAPI: new ListingAPI(db.collection("listings")),
          moduleAPI: new ModuleAPI(db.collection("modules")),
        };
      },
    });
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  }
);

// export all the important pieces for integration/e2e tests to use
// # add other servers here
module.exports = {
  // dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  ListingAPI,
  // server,
};
