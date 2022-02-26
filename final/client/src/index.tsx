import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useQuery
} from '@apollo/client';

import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';
import { cache } from './cache';
import { setContext } from '@apollo/client/link/context';

// import typeDefs from './schema';
// const typeDefs = require('./schema');


// client-side schema


export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
    listingFilter: ListingFilter!
  }

  type ListingFilter {model: [String]!}
`;

// source: https://www.apollographql.com/docs/react/networking/authentication/
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// update to pull from local file for codegen

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
// typed to a functoin call with a typed parameter
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  uri: 'http://localhost:4000/graphql',
  headers: {
    // # need to update to the new authorization model
    // believe there is a problem here where network requests are sent with the old authorization - client doesn't get rebuilt when user logs out
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Space Explorer [web]',
    'client-version': '1.0.0',
  },
  typeDefs,
  resolvers: {},
});

/**
 * Render our app
 * - We wrap the whole app with ApolloProvider, so any component in the app can
 *    make GraphqL requests. Our provider needs the client we created above,
 *    so we pass it as a prop
 * - We need a router, so we can navigate the app. We're using Reach router for this.
 *    The router chooses between which component to render, depending on the url path.
 *    ex: localhost:3000/login will render only the `Login` component
 */

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  // don't need loading or error fields since the querry is for client data only
  return data.isLoggedIn ? <Pages /> : <Login />;
}

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root'),
);
