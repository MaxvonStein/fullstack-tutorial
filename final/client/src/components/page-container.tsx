import React, { Fragment } from 'react';
import styled from 'react-emotion';
import { unit, colors } from '../styles';

const pages = ['Buy', 'Sell', 'Market Report'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function PageContainer(props: any) {

  return (
    <ContainerDiv>{props.children}</ContainerDiv>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */


const ContainerDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto',
  padding: unit * 3,
  paddingBottom: unit * 5,
});