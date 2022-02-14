import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { LoginForm, Loading } from '../components';
import { isLoggedInVar } from '../cache';
import { AuthenticateParamsInput } from '../__generated-graphql-codegen__/types'
// imported seperately to avoid a graphql syntax error inside mutation definition
import * as GetTypes from '../__generated-graphql-codegen__/types'
import * as LoginTypes from './__generated__/Login'
import { AuthenticationService, LoginUserPasswordService } from '@accounts/types';

export const LOGIN_USER = gql`
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

// export interface LoginUserPasswordService {
//   user: string | LoginUserIdentity;
//   password: string;
//   // 2FA code
//   code?: string;
// }

export default function Login() {
  const [login, { loading, error }] = useMutation<
    // # find appropriate types here from accounts/types
    // or define
    // add mutation function type, was:
    GetTypes.LoginUserMutation,
    // LoginTypes.LoginVariables
    GetTypes.LoginUserMutationVariables
  >(
    LOGIN_USER,
    {
      onCompleted(authenticate) {
        console.log(authenticate)
        if (authenticate) {
          console.log(authenticate)
          // localStorage.setItem('token', login.token as string);
          // localStorage.setItem('userId', login.id as string);
          isLoggedInVar(true);
        }
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
