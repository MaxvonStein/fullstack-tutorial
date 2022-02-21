const { gql } = require("apollo-server");

// source (directive): https://www.accountsjs.com/docs/getting-started/
const typeDefs = gql`
  directive @auth on FIELD_DEFINITION | OBJECT
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
    listings: [Battery]
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
    make: String!
    model: String!
    year: String
    subModel: String
    generationStart: String
    generationEnd: String
    imageSrc: String
    description: String
    partGrade: String
    dealer: String
    distance: Int
    price: Int
    isReman: Boolean
    isCore: Boolean
    isNoShip: Boolean
    isShippingAvailable: Boolean
    sellerType: String
    isWarrantied: Boolean
    odometerThousands: Int
    isComplete: Boolean
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
