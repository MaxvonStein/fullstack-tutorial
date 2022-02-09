import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  cartItems: Array<Scalars['ID']>;
  isLoggedIn: Scalars['Boolean'];
  launch?: Maybe<Launch>;
  launches: LaunchConnection;
  listings?: Maybe<Array<Maybe<Battery>>>;
  me?: Maybe<User>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID'];
};


export type QueryLaunchesArgs = {
  after?: InputMaybe<Scalars['String']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type Launch = {
  __typename?: 'Launch';
  id: Scalars['ID'];
  isBooked: Scalars['Boolean'];
  mission?: Maybe<Mission>;
  rocket?: Maybe<Rocket>;
  site?: Maybe<Scalars['String']>;
};

export type Mission = {
  __typename?: 'Mission';
  missionPatch?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type MissionMissionPatchArgs = {
  size?: InputMaybe<PatchSize>;
};

export enum PatchSize {
  Large = 'LARGE',
  Small = 'SMALL'
}

export type Rocket = {
  __typename?: 'Rocket';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
  __typename?: 'LaunchConnection';
  cursor: Scalars['String'];
  hasMore: Scalars['Boolean'];
  launches: Array<Maybe<Launch>>;
};

export type Battery = {
  __typename?: 'Battery';
  generation: Scalars['String'];
  make: Scalars['String'];
  model: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  profileImage?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  trips: Array<Maybe<Launch>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  login?: Maybe<User>;
};


export type MutationBookTripsArgs = {
  launchIds: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID'];
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
};

export type TripUpdateResponse = {
  __typename?: 'TripUpdateResponse';
  launches?: Maybe<Array<Maybe<Launch>>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LaunchTileFragment = { __typename: 'Launch', id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null };

export type GetListingListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListingListQuery = { __typename?: 'Query', listings?: Array<{ __typename: 'Battery', make: string, model: string } | null> | null };

export type CancelMutationVariables = Exact<{
  launchId: Scalars['ID'];
}>;


export type CancelMutation = { __typename?: 'Mutation', cancelTrip: { __typename?: 'TripUpdateResponse', success: boolean, message?: string | null, launches?: Array<{ __typename?: 'Launch', id: string, isBooked: boolean } | null> | null } };

export type BookTripsMutationVariables = Exact<{
  launchIds: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type BookTripsMutation = { __typename?: 'Mutation', bookTrips: { __typename?: 'TripUpdateResponse', success: boolean, message?: string | null, launches?: Array<{ __typename?: 'Launch', id: string, isBooked: boolean } | null> | null } };

export type GetLaunchQueryVariables = Exact<{
  launchId: Scalars['ID'];
}>;


export type GetLaunchQuery = { __typename?: 'Query', launch?: { __typename: 'Launch', id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null } | null };

export type IsUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsUserLoggedInQuery = { __typename?: 'Query', isLoggedIn: boolean };

export type GetCartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartItemsQuery = { __typename?: 'Query', cartItems: Array<string> };

export type LaunchDetailsQueryVariables = Exact<{
  launchId: Scalars['ID'];
}>;


export type LaunchDetailsQuery = { __typename?: 'Query', launch?: { __typename: 'Launch', site?: string | null, id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', type?: string | null, id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null } | null };

export type GetLaunchListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetLaunchListQuery = { __typename?: 'Query', launches: { __typename?: 'LaunchConnection', cursor: string, hasMore: boolean, launches: Array<{ __typename: 'Launch', id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null } | null> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, token?: string | null } | null };

export type GetMyTripsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTripsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, trips: Array<{ __typename: 'Launch', id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null } | null> } | null };

export const LaunchTileFragmentDoc = gql`
    fragment LaunchTile on Launch {
  __typename
  id
  isBooked
  rocket {
    id
    name
  }
  mission {
    name
    missionPatch
  }
}
    `;
export const GetListingListDocument = gql`
    query GetListingList {
  listings {
    __typename
    make
    model
  }
}
    `;

/**
 * __useGetListingListQuery__
 *
 * To run a query within a React component, call `useGetListingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListingListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListingListQuery(baseOptions?: Apollo.QueryHookOptions<GetListingListQuery, GetListingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListingListQuery, GetListingListQueryVariables>(GetListingListDocument, options);
      }
export function useGetListingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListingListQuery, GetListingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListingListQuery, GetListingListQueryVariables>(GetListingListDocument, options);
        }
export type GetListingListQueryHookResult = ReturnType<typeof useGetListingListQuery>;
export type GetListingListLazyQueryHookResult = ReturnType<typeof useGetListingListLazyQuery>;
export type GetListingListQueryResult = Apollo.QueryResult<GetListingListQuery, GetListingListQueryVariables>;
export const CancelDocument = gql`
    mutation cancel($launchId: ID!) {
  cancelTrip(launchId: $launchId) {
    success
    message
    launches {
      id
      isBooked
    }
  }
}
    `;
export type CancelMutationFn = Apollo.MutationFunction<CancelMutation, CancelMutationVariables>;

/**
 * __useCancelMutation__
 *
 * To run a mutation, you first call `useCancelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMutation, { data, loading, error }] = useCancelMutation({
 *   variables: {
 *      launchId: // value for 'launchId'
 *   },
 * });
 */
export function useCancelMutation(baseOptions?: Apollo.MutationHookOptions<CancelMutation, CancelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelMutation, CancelMutationVariables>(CancelDocument, options);
      }
export type CancelMutationHookResult = ReturnType<typeof useCancelMutation>;
export type CancelMutationResult = Apollo.MutationResult<CancelMutation>;
export type CancelMutationOptions = Apollo.BaseMutationOptions<CancelMutation, CancelMutationVariables>;
export const BookTripsDocument = gql`
    mutation BookTrips($launchIds: [ID]!) {
  bookTrips(launchIds: $launchIds) {
    success
    message
    launches {
      id
      isBooked
    }
  }
}
    `;
export type BookTripsMutationFn = Apollo.MutationFunction<BookTripsMutation, BookTripsMutationVariables>;

/**
 * __useBookTripsMutation__
 *
 * To run a mutation, you first call `useBookTripsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookTripsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookTripsMutation, { data, loading, error }] = useBookTripsMutation({
 *   variables: {
 *      launchIds: // value for 'launchIds'
 *   },
 * });
 */
export function useBookTripsMutation(baseOptions?: Apollo.MutationHookOptions<BookTripsMutation, BookTripsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookTripsMutation, BookTripsMutationVariables>(BookTripsDocument, options);
      }
export type BookTripsMutationHookResult = ReturnType<typeof useBookTripsMutation>;
export type BookTripsMutationResult = Apollo.MutationResult<BookTripsMutation>;
export type BookTripsMutationOptions = Apollo.BaseMutationOptions<BookTripsMutation, BookTripsMutationVariables>;
export const GetLaunchDocument = gql`
    query GetLaunch($launchId: ID!) {
  launch(id: $launchId) {
    ...LaunchTile
  }
}
    ${LaunchTileFragmentDoc}`;

/**
 * __useGetLaunchQuery__
 *
 * To run a query within a React component, call `useGetLaunchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLaunchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLaunchQuery({
 *   variables: {
 *      launchId: // value for 'launchId'
 *   },
 * });
 */
export function useGetLaunchQuery(baseOptions: Apollo.QueryHookOptions<GetLaunchQuery, GetLaunchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLaunchQuery, GetLaunchQueryVariables>(GetLaunchDocument, options);
      }
export function useGetLaunchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchQuery, GetLaunchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLaunchQuery, GetLaunchQueryVariables>(GetLaunchDocument, options);
        }
export type GetLaunchQueryHookResult = ReturnType<typeof useGetLaunchQuery>;
export type GetLaunchLazyQueryHookResult = ReturnType<typeof useGetLaunchLazyQuery>;
export type GetLaunchQueryResult = Apollo.QueryResult<GetLaunchQuery, GetLaunchQueryVariables>;
export const IsUserLoggedInDocument = gql`
    query IsUserLoggedIn {
  isLoggedIn @client
}
    `;

/**
 * __useIsUserLoggedInQuery__
 *
 * To run a query within a React component, call `useIsUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsUserLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, options);
      }
export function useIsUserLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, options);
        }
export type IsUserLoggedInQueryHookResult = ReturnType<typeof useIsUserLoggedInQuery>;
export type IsUserLoggedInLazyQueryHookResult = ReturnType<typeof useIsUserLoggedInLazyQuery>;
export type IsUserLoggedInQueryResult = Apollo.QueryResult<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>;
export const GetCartItemsDocument = gql`
    query GetCartItems {
  cartItems @client
}
    `;

/**
 * __useGetCartItemsQuery__
 *
 * To run a query within a React component, call `useGetCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetCartItemsQuery, GetCartItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCartItemsQuery, GetCartItemsQueryVariables>(GetCartItemsDocument, options);
      }
export function useGetCartItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartItemsQuery, GetCartItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCartItemsQuery, GetCartItemsQueryVariables>(GetCartItemsDocument, options);
        }
export type GetCartItemsQueryHookResult = ReturnType<typeof useGetCartItemsQuery>;
export type GetCartItemsLazyQueryHookResult = ReturnType<typeof useGetCartItemsLazyQuery>;
export type GetCartItemsQueryResult = Apollo.QueryResult<GetCartItemsQuery, GetCartItemsQueryVariables>;
export const LaunchDetailsDocument = gql`
    query LaunchDetails($launchId: ID!) {
  launch(id: $launchId) {
    site
    rocket {
      type
    }
    ...LaunchTile
  }
}
    ${LaunchTileFragmentDoc}`;

/**
 * __useLaunchDetailsQuery__
 *
 * To run a query within a React component, call `useLaunchDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaunchDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaunchDetailsQuery({
 *   variables: {
 *      launchId: // value for 'launchId'
 *   },
 * });
 */
export function useLaunchDetailsQuery(baseOptions: Apollo.QueryHookOptions<LaunchDetailsQuery, LaunchDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaunchDetailsQuery, LaunchDetailsQueryVariables>(LaunchDetailsDocument, options);
      }
export function useLaunchDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaunchDetailsQuery, LaunchDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaunchDetailsQuery, LaunchDetailsQueryVariables>(LaunchDetailsDocument, options);
        }
export type LaunchDetailsQueryHookResult = ReturnType<typeof useLaunchDetailsQuery>;
export type LaunchDetailsLazyQueryHookResult = ReturnType<typeof useLaunchDetailsLazyQuery>;
export type LaunchDetailsQueryResult = Apollo.QueryResult<LaunchDetailsQuery, LaunchDetailsQueryVariables>;
export const GetLaunchListDocument = gql`
    query GetLaunchList($after: String) {
  launches(after: $after) {
    cursor
    hasMore
    launches {
      ...LaunchTile
    }
  }
}
    ${LaunchTileFragmentDoc}`;

/**
 * __useGetLaunchListQuery__
 *
 * To run a query within a React component, call `useGetLaunchListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLaunchListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLaunchListQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetLaunchListQuery(baseOptions?: Apollo.QueryHookOptions<GetLaunchListQuery, GetLaunchListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLaunchListQuery, GetLaunchListQueryVariables>(GetLaunchListDocument, options);
      }
export function useGetLaunchListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchListQuery, GetLaunchListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLaunchListQuery, GetLaunchListQueryVariables>(GetLaunchListDocument, options);
        }
export type GetLaunchListQueryHookResult = ReturnType<typeof useGetLaunchListQuery>;
export type GetLaunchListLazyQueryHookResult = ReturnType<typeof useGetLaunchListLazyQuery>;
export type GetLaunchListQueryResult = Apollo.QueryResult<GetLaunchListQuery, GetLaunchListQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!) {
  login(email: $email) {
    id
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetMyTripsDocument = gql`
    query GetMyTrips {
  me {
    id
    email
    trips {
      ...LaunchTile
    }
  }
}
    ${LaunchTileFragmentDoc}`;

/**
 * __useGetMyTripsQuery__
 *
 * To run a query within a React component, call `useGetMyTripsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTripsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTripsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTripsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTripsQuery, GetMyTripsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTripsQuery, GetMyTripsQueryVariables>(GetMyTripsDocument, options);
      }
export function useGetMyTripsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTripsQuery, GetMyTripsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTripsQuery, GetMyTripsQueryVariables>(GetMyTripsDocument, options);
        }
export type GetMyTripsQueryHookResult = ReturnType<typeof useGetMyTripsQuery>;
export type GetMyTripsLazyQueryHookResult = ReturnType<typeof useGetMyTripsLazyQuery>;
export type GetMyTripsQueryResult = Apollo.QueryResult<GetMyTripsQuery, GetMyTripsQueryVariables>;