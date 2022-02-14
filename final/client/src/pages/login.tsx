import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { LoginForm, Loading } from '../components';
import { isLoggedInVar } from '../cache';
import * as GetTypes from '../__generated-graphql-codegen__/graphql'
import * as LoginTypes from './__generated__/Login'
import { AuthenticationService, LoginUserPasswordService } from '@accounts/types';

// is there a params input
export interface LoginVariables {
  serviceName: string;
  params: ...
}

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
}
`;

export default function Login() {
  const [login, { loading, error }] = useMutation<
    // # find appropriate types here from accounts/types
    // or define
    // add callback type, was:
    LoginTypes.Login,
    // LoginTypes.LoginVariables
    LoginUserPasswordService,
  >(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        if (login) {
          localStorage.setItem('token', login.token as string);
          localStorage.setItem('userId', login.id as string);
          isLoggedInVar(true);
        }
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
