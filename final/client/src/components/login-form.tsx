import React, { useState, Component, ReactComponentElement } from 'react';
import Button from '@mui/material/Button';

import { accountsPassword } from '../utils/accounts';
import { LoginUserPasswordService } from "@accounts/types"
import * as GetTypes from '../__generated-graphql-codegen__/types';

interface LoginFormProps {
  // don't get what a is here
  login: (a: { variables: GetTypes.LoginUserMutationVariables }) => void;
}

interface LoginFormState {
  username: string;
  password: string;
}

export default class LoginForm extends Component<LoginFormProps, LoginFormState> {
  state = { username: '', password: '' };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = (event.target as HTMLInputElement).value;
    if (event.target.name === "username") {
      this.setState(s => ({ username: input }));
    } else if (event.target.name === "password") {
      this.setState(s => ({ password: input }));
    }
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submit")
    this.props.login({ variables: { serviceName: "password", params: { user: { email: this.state.username }, password: this.state.password } } });
  };

  render() {
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <input name="username" type="text" onChange={(e) => this.onChange(e)} />
        <input name="password" type="text" onChange={(e) => this.onChange(e)} />
        <Button type="submit">Submit</Button>
      </form>
    )
  }

}