const { gql } = require("apollo-server");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
// const GraphQLObjectId = require("graphql-scalar-objectid");
const GraphQLObjectId = require("graphql-objectid-scalar");

const BatteryType = new GraphQLObjectType({
  name: "Battery",
  fields: {
    _id: {
      type: GraphQLObjectId,
    },
    name: {
      type: GraphQLString,
    },
  },
});

// source: https://graphql.org/graphql-js/constructing-types/
// const ModuleType = new GraphQLObjectType({
//   name: "Module",
//   fields: {
//     _id: { type: GraphQLObjectId },
//     name: { type: GraphQLString },
//     make: { type: GraphQLString },
//     model: { type: GraphQLString },
//     firstYear: { type: GraphQLInt },
//     lastYear: { type: GraphQLInt },
//   },
// });

// const modulesQueryType = new GraphQLObjectType({
//   name: "Query",
//   fields: {
//     modules: {
//       type: new GraphQLList(ModuleType),
//     },
//   },
// });

// source (directive): https://www.accountsjs.com/docs/getting-started/
const typeDefs = gql`
  directive @auth on FIELD_DEFINITION | OBJECT
  scalar GraphQLObjectId
  type Query {
    launches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: BasicUser
    listings: [Battery]!
    filteredListings(batteryFilter: BatteryFilter): [Battery]
    modules: [BatteryModule]!
    listing(id: ID!): Battery
    authenticatedQuery: String
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    # basic login example using only an email
    basicLogin(email: String): BasicUser
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type BasicUser {
    id: ID!
    email: String!
    profileImage: String
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  type Battery {
    _id: GraphQLObjectId!
    make: String!
    model: String!
    generation: String!
    moduleId: GraphQLObjectId!
    price: Int!
    module: BatteryModule!
    moduleCount: Int
    year: Int
    subModel: String
    generationStart: String
    generationEnd: String
    imageSrc: String
    description: String
    partGrade: String
    dealer: String
    distance: Int!
    isReman: Boolean
    isCore: Boolean
    isNoShip: Boolean
    isShippingAvailable: Boolean
    shippingCost: Int
    sellerType: String
    isWarrantied: Boolean
    odometerThousands: Int
    isComplete: Boolean
  }

  type BatteryModule {
    _id: GraphQLObjectId!
    name: String!
    make: String!
    models: [String]
    firstYear: Int
    lastYear: Int
    kwh: Float!
  }

  input BatteryFilter {
    model: [String]!
    generation: [String]!
    moduleId: [String]!
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = { typeDefs };
