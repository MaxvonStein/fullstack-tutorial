import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import Batteries from './batteries';
import { Footer, PageContainer } from '../components';
import Login from './login';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Batteries path="/batteries" />
          <Login path="/login" />
          <Launches path="/launches" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
          <Batteries path="/" />

        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
