import React, { useState, Component, ReactComponentElement } from 'react';
import Button from '@mui/material/Button';

import { accountsPassword } from '../utils/accounts';
import { LoginUserPasswordService } from "@accounts/types"
import * as GetTypes from '../__generated-graphql-codegen__/graphql';

interface LoginFormProps {
  // no types
  login: (a: { variables: LoginUserPasswordService }) => void;
}
interface LoginFormState {
  email: string;
  password: string;
}

export default class LoginForm extends Component<LoginFormProps, LoginFormState> {
  state = { email: '', password: '' };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = (event.target as HTMLInputElement).value;
    if (event.target.name === "email") {
      this.setState(s => ({ email: input }));
    } else if (event.target.name === "password") {
      this.setState(s => ({ password: input }));
    }
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.login({ variables: { user: { email: this.state.email }, password: this.state.password } });
  };

  render() {
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <input name="email" type="text" onChange={(e) => this.onChange(e)} />
        <input name="password" type="text" onChange={(e) => this.onChange(e)} />
      </form>
    )
  }

}