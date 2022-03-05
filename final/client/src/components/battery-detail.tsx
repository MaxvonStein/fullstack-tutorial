import React from 'react';
import { cardClassName, getBackgroundImage } from './launch-tile';
import { LaunchDetails_launch } from '../pages/__generated__/LaunchDetails';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import * as GetTypes from '../__generated-graphql-codegen__/types'

interface BatteryDetailProps {
  battery: GetTypes.Battery;
}

const BatteryDetail: React.FC<BatteryDetailProps> = ({ battery }) => (
  <Card>
    <Typography>{battery.make}</Typography>
    <Typography>{battery.description}</Typography>
  </Card>
);

export default BatteryDetail;
