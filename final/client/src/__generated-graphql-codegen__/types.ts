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
  GraphQLObjectId: any;
};

export type Query = {
  __typename?: 'Query';
  authenticatedQuery?: Maybe<Scalars['String']>;
  cartItems: Array<Scalars['ID']>;
  filteredListings?: Maybe<Array<Maybe<Battery>>>;
  getUser?: Maybe<User>;
  isLoggedIn: Scalars['Boolean'];
  launch?: Maybe<Launch>;
  launches: LaunchConnection;
  listing?: Maybe<Battery>;
  listingFilter: ListingFilter;
  listings: Array<Maybe<Battery>>;
  me?: Maybe<BasicUser>;
  modules: Array<Maybe<BatteryModule>>;
  twoFactorSecret?: Maybe<TwoFactorSecretKey>;
};


export type QueryFilteredListingsArgs = {
  batteryFilter?: InputMaybe<BatteryFilter>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID'];
};


export type QueryLaunchesArgs = {
  after?: InputMaybe<Scalars['String']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};


export type QueryListingArgs = {
  id: Scalars['ID'];
};

export type BatteryFilter = {
  generation: Array<InputMaybe<Scalars['String']>>;
  model: Array<InputMaybe<Scalars['String']>>;
  moduleId: Array<InputMaybe<Scalars['String']>>;
};

export type Battery = {
  __typename?: 'Battery';
  _id: Scalars['GraphQLObjectId'];
  dealer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distance: Scalars['Int'];
  generation: Scalars['String'];
  generationEnd?: Maybe<Scalars['String']>;
  generationStart?: Maybe<Scalars['String']>;
  imageSrc?: Maybe<Scalars['String']>;
  isComplete?: Maybe<Scalars['Boolean']>;
  isCore?: Maybe<Scalars['Boolean']>;
  isNoShip?: Maybe<Scalars['Boolean']>;
  isReman?: Maybe<Scalars['Boolean']>;
  isShippingAvailable?: Maybe<Scalars['Boolean']>;
  isWarrantied?: Maybe<Scalars['Boolean']>;
  make: Scalars['String'];
  model: Scalars['String'];
  module: BatteryModule;
  moduleCount: Scalars['Int'];
  moduleId: Scalars['GraphQLObjectId'];
  odometerThousands?: Maybe<Scalars['Int']>;
  partGrade?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  sellerType?: Maybe<Scalars['String']>;
  shippingCost: Scalars['Int'];
  subModel?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type BatteryModule = {
  __typename?: 'BatteryModule';
  _id: Scalars['GraphQLObjectId'];
  firstYear?: Maybe<Scalars['Int']>;
  kwh: Scalars['Float'];
  lastYear?: Maybe<Scalars['Int']>;
  make?: Maybe<Scalars['String']>;
  models?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  emails?: Maybe<Array<EmailRecord>>;
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
};

export type EmailRecord = {
  __typename?: 'EmailRecord';
  address?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
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

export type ListingFilter = {
  __typename?: 'ListingFilter';
  generation: Array<Maybe<Scalars['String']>>;
  model: Array<Maybe<Scalars['String']>>;
  moduleId: Array<Maybe<Scalars['String']>>;
};

export type BasicUser = {
  __typename?: 'BasicUser';
  email: Scalars['String'];
  id: Scalars['ID'];
  profileImage?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  trips: Array<Maybe<Launch>>;
};

export type TwoFactorSecretKey = {
  __typename?: 'TwoFactorSecretKey';
  ascii?: Maybe<Scalars['String']>;
  base32?: Maybe<Scalars['String']>;
  google_auth_qr?: Maybe<Scalars['String']>;
  hex?: Maybe<Scalars['String']>;
  otpauth_url?: Maybe<Scalars['String']>;
  qr_code_ascii?: Maybe<Scalars['String']>;
  qr_code_base32?: Maybe<Scalars['String']>;
  qr_code_hex?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEmail?: Maybe<Scalars['Boolean']>;
  authenticate?: Maybe<LoginResult>;
  basicLogin?: Maybe<BasicUser>;
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  changePassword?: Maybe<Scalars['Boolean']>;
  createUser?: Maybe<CreateUserResult>;
  impersonate?: Maybe<ImpersonateReturn>;
  logout?: Maybe<Scalars['Boolean']>;
  refreshTokens?: Maybe<LoginResult>;
  resetPassword?: Maybe<LoginResult>;
  sendResetPasswordEmail?: Maybe<Scalars['Boolean']>;
  sendVerificationEmail?: Maybe<Scalars['Boolean']>;
  twoFactorSet?: Maybe<Scalars['Boolean']>;
  twoFactorUnset?: Maybe<Scalars['Boolean']>;
  verifyAuthentication?: Maybe<Scalars['Boolean']>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
};


export type MutationAddEmailArgs = {
  newEmail: Scalars['String'];
};


export type MutationAuthenticateArgs = {
  params: AuthenticateParamsInput;
  serviceName: Scalars['String'];
};


export type MutationBasicLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationBookTripsArgs = {
  launchIds: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationImpersonateArgs = {
  accessToken: Scalars['String'];
  impersonated: ImpersonationUserIdentityInput;
};


export type MutationRefreshTokensArgs = {
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendVerificationEmailArgs = {
  email: Scalars['String'];
};


export type MutationTwoFactorSetArgs = {
  code: Scalars['String'];
  secret: TwoFactorSecretKeyInput;
};


export type MutationTwoFactorUnsetArgs = {
  code: Scalars['String'];
};


export type MutationVerifyAuthenticationArgs = {
  params: AuthenticateParamsInput;
  serviceName: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type AuthenticateParamsInput = {
  access_token?: InputMaybe<Scalars['String']>;
  access_token_secret?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  sessionId?: Maybe<Scalars['String']>;
  tokens?: Maybe<Tokens>;
  user?: Maybe<User>;
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type TripUpdateResponse = {
  __typename?: 'TripUpdateResponse';
  launches?: Maybe<Array<Maybe<Launch>>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type CreateUserResult = {
  __typename?: 'CreateUserResult';
  loginResult?: Maybe<LoginResult>;
  userId?: Maybe<Scalars['ID']>;
};

export type ImpersonationUserIdentityInput = {
  email?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type ImpersonateReturn = {
  __typename?: 'ImpersonateReturn';
  authorized?: Maybe<Scalars['Boolean']>;
  tokens?: Maybe<Tokens>;
  user?: Maybe<User>;
};

export type TwoFactorSecretKeyInput = {
  ascii?: InputMaybe<Scalars['String']>;
  base32?: InputMaybe<Scalars['String']>;
  google_auth_qr?: InputMaybe<Scalars['String']>;
  hex?: InputMaybe<Scalars['String']>;
  otpauth_url?: InputMaybe<Scalars['String']>;
  qr_code_ascii?: InputMaybe<Scalars['String']>;
  qr_code_base32?: InputMaybe<Scalars['String']>;
  qr_code_hex?: InputMaybe<Scalars['String']>;
};

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

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type IsUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsUserLoggedInQuery = { __typename?: 'Query', isLoggedIn: boolean };

export type GetFilteredListingsQueryVariables = Exact<{
  batteryFilter?: InputMaybe<BatteryFilter>;
}>;


export type GetFilteredListingsQuery = { __typename?: 'Query', listingFilter: { __typename?: 'ListingFilter', model: Array<string | null> }, filteredListings?: Array<{ __typename: 'Battery', make: string, model: string, imageSrc?: string | null, isComplete?: boolean | null, year?: number | null, subModel?: string | null, generationStart?: string | null, generationEnd?: string | null, description?: string | null, partGrade?: string | null, dealer?: string | null, distance: number, price: number, isReman?: boolean | null, isCore?: boolean | null, isNoShip?: boolean | null, isShippingAvailable?: boolean | null, sellerType?: string | null, isWarrantied?: boolean | null, odometerThousands?: number | null } | null> | null };

export type ListingsForBatteriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListingsForBatteriesQuery = { __typename?: 'Query', listings: Array<{ __typename?: 'Battery', _id: any, make: string, model: string, moduleId: any, generation: string, imageSrc?: string | null, isComplete?: boolean | null, year?: number | null, dealer?: string | null, price: number, sellerType?: string | null, odometerThousands?: number | null, isWarrantied?: boolean | null, isCore?: boolean | null, isShippingAvailable?: boolean | null, distance: number, shippingCost: number, moduleCount: number, module: { __typename?: 'BatteryModule', kwh: number } } | null>, modules: Array<{ __typename?: 'BatteryModule', _id: any, name: string, make?: string | null } | null>, listingFilter: { __typename?: 'ListingFilter', model: Array<string | null>, moduleId: Array<string | null>, generation: Array<string | null> } };

export type BatteryDetailsQueryVariables = Exact<{
  batteryId: Scalars['ID'];
}>;


export type BatteryDetailsQuery = { __typename?: 'Query', listing?: { __typename?: 'Battery', _id: any, year?: number | null, make: string, model: string, price: number, generation: string, imageSrc?: string | null, description?: string | null, odometerThousands?: number | null, isComplete?: boolean | null, dealer?: string | null, isWarrantied?: boolean | null, isCore?: boolean | null, isReman?: boolean | null, distance: number, moduleId: any, moduleCount: number, shippingCost: number, module: { __typename?: 'BatteryModule', _id: any, name: string, kwh: number, firstYear?: number | null, lastYear?: number | null, models?: Array<string | null> | null } } | null };

export type GetCartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartItemsQuery = { __typename?: 'Query', cartItems: Array<string> };

export type LaunchDetailsQueryVariables = Exact<{
  launchId: Scalars['ID'];
}>;


export type LaunchDetailsQuery = { __typename?: 'Query', launch?: { __typename: 'Launch', site?: string | null, id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', type?: string | null, id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null } | null };

export type LaunchTileFragment = { __typename: 'Launch', id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null };

export type GetLaunchListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetLaunchListQuery = { __typename?: 'Query', launches: { __typename?: 'LaunchConnection', cursor: string, hasMore: boolean, launches: Array<{ __typename: 'Launch', id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null } | null> } };

export type LoginUserMutationVariables = Exact<{
  serviceName: Scalars['String'];
  params: AuthenticateParamsInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', authenticate?: { __typename?: 'LoginResult', sessionId?: string | null, tokens?: { __typename?: 'Tokens', refreshToken?: string | null, accessToken?: string | null } | null, user?: { __typename?: 'User', username?: string | null, emails?: Array<{ __typename?: 'EmailRecord', address?: string | null, verified?: boolean | null }> | null } | null } | null };

export type GetMyTripsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTripsQuery = { __typename?: 'Query', me?: { __typename?: 'BasicUser', id: string, email: string, trips: Array<{ __typename: 'Launch', id: string, isBooked: boolean, rocket?: { __typename?: 'Rocket', id: string, name?: string | null } | null, mission?: { __typename?: 'Mission', name?: string | null, missionPatch?: string | null } | null } | null> } | null };

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
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logout
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
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
export const GetFilteredListingsDocument = gql`
    query GetFilteredListings($batteryFilter: BatteryFilter) {
  listingFilter @client @export(as: "batteryFilter") {
    model
  }
  filteredListings(batteryFilter: $batteryFilter) {
    __typename
    make
    model
    imageSrc
    isComplete
    year
    subModel
    generationStart
    generationEnd
    description
    partGrade
    dealer
    distance
    price
    isReman
    isCore
    isNoShip
    isShippingAvailable
    sellerType
    isWarrantied
    odometerThousands
    isComplete
  }
}
    `;

/**
 * __useGetFilteredListingsQuery__
 *
 * To run a query within a React component, call `useGetFilteredListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredListingsQuery({
 *   variables: {
 *      batteryFilter: // value for 'batteryFilter'
 *   },
 * });
 */
export function useGetFilteredListingsQuery(baseOptions?: Apollo.QueryHookOptions<GetFilteredListingsQuery, GetFilteredListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilteredListingsQuery, GetFilteredListingsQueryVariables>(GetFilteredListingsDocument, options);
      }
export function useGetFilteredListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilteredListingsQuery, GetFilteredListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilteredListingsQuery, GetFilteredListingsQueryVariables>(GetFilteredListingsDocument, options);
        }
export type GetFilteredListingsQueryHookResult = ReturnType<typeof useGetFilteredListingsQuery>;
export type GetFilteredListingsLazyQueryHookResult = ReturnType<typeof useGetFilteredListingsLazyQuery>;
export type GetFilteredListingsQueryResult = Apollo.QueryResult<GetFilteredListingsQuery, GetFilteredListingsQueryVariables>;
export const ListingsForBatteriesDocument = gql`
    query ListingsForBatteries {
  listings {
    _id
    make
    model
    moduleId
    generation
    imageSrc
    isComplete
    year
    dealer
    price
    sellerType
    odometerThousands
    isWarrantied
    isCore
    isShippingAvailable
    distance
    shippingCost @client
    moduleCount @client
    module {
      kwh
    }
  }
  modules {
    _id
    name
    make
  }
  listingFilter @client {
    model
    moduleId
    generation
  }
}
    `;

/**
 * __useListingsForBatteriesQuery__
 *
 * To run a query within a React component, call `useListingsForBatteriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingsForBatteriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingsForBatteriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListingsForBatteriesQuery(baseOptions?: Apollo.QueryHookOptions<ListingsForBatteriesQuery, ListingsForBatteriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingsForBatteriesQuery, ListingsForBatteriesQueryVariables>(ListingsForBatteriesDocument, options);
      }
export function useListingsForBatteriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingsForBatteriesQuery, ListingsForBatteriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingsForBatteriesQuery, ListingsForBatteriesQueryVariables>(ListingsForBatteriesDocument, options);
        }
export type ListingsForBatteriesQueryHookResult = ReturnType<typeof useListingsForBatteriesQuery>;
export type ListingsForBatteriesLazyQueryHookResult = ReturnType<typeof useListingsForBatteriesLazyQuery>;
export type ListingsForBatteriesQueryResult = Apollo.QueryResult<ListingsForBatteriesQuery, ListingsForBatteriesQueryVariables>;
export const BatteryDetailsDocument = gql`
    query BatteryDetails($batteryId: ID!) {
  listing(id: $batteryId) {
    _id
    year
    make
    model
    price
    generation
    imageSrc
    description
    odometerThousands
    isComplete
    dealer
    isWarrantied
    isCore
    isReman
    distance
    moduleId
    moduleCount
    module {
      _id
      name
      kwh
      firstYear
      lastYear
      models
    }
    shippingCost @client
  }
}
    `;

/**
 * __useBatteryDetailsQuery__
 *
 * To run a query within a React component, call `useBatteryDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatteryDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatteryDetailsQuery({
 *   variables: {
 *      batteryId: // value for 'batteryId'
 *   },
 * });
 */
export function useBatteryDetailsQuery(baseOptions: Apollo.QueryHookOptions<BatteryDetailsQuery, BatteryDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BatteryDetailsQuery, BatteryDetailsQueryVariables>(BatteryDetailsDocument, options);
      }
export function useBatteryDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatteryDetailsQuery, BatteryDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BatteryDetailsQuery, BatteryDetailsQueryVariables>(BatteryDetailsDocument, options);
        }
export type BatteryDetailsQueryHookResult = ReturnType<typeof useBatteryDetailsQuery>;
export type BatteryDetailsLazyQueryHookResult = ReturnType<typeof useBatteryDetailsLazyQuery>;
export type BatteryDetailsQueryResult = Apollo.QueryResult<BatteryDetailsQuery, BatteryDetailsQueryVariables>;
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
export const LoginUserDocument = gql`
    mutation LoginUser($serviceName: String!, $params: AuthenticateParamsInput!) {
  authenticate(serviceName: $serviceName, params: $params) {
    sessionId
    tokens {
      refreshToken
      accessToken
    }
    user {
      emails {
        address
        verified
      }
      username
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      serviceName: // value for 'serviceName'
 *      params: // value for 'params'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
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