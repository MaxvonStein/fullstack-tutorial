import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import StarBox from './star-box'


interface BatteryItemProps {
  battery: GetTypes.Battery;
}

const estimateSOH = (years: number, milesThousands: number): number => {
  const driveWear = milesThousands / 150 / 2
  const ageWear = years / 12 / 2
  return Math.round(100 - driveWear - ageWear)
}

const currentDate = new Date()
const currentYear = currentDate.getFullYear()


const BatteryItem: React.FC<BatteryItemProps> = ({ battery }) => {
  const { make, model } = battery;
  console.log(battery.odometerThousands)
  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <img src={battery.imageSrc ? battery.imageSrc : ""}></img>
        </Grid>
        <Grid item md={3}>
          <Box sx={{ typography: 'body1' }}>{`${make} ${model}`}</Box>
          <Box sx={{ typography: 'body2' }}>{battery.isComplete ? 'Complete pack' : 'Not complete'}</Box>
          <Box sx={{ typography: 'body2' }}>{`$${battery.price}`}</Box>
        </Grid>
        <Grid item md={2}>
          <Box sx={{ typography: 'subtitle2' }}>Vehicle</Box>
          <Box sx={{ typography: 'body2' }}>{`${battery.year} ${make} ${model}, ` + (battery.odometerThousands ? `${battery.odometerThousands}k miles` : 'odometer unavailable')}</Box>
          <Box sx={{ typography: 'body2', color: (battery.year && battery.odometerThousands) ? 'text.primary' : 'text.secondary' }}>{(battery.year && battery.odometerThousands) ? `Estimated SOH: ${estimateSOH(currentYear - parseInt(battery.year), battery.odometerThousands)}%` : "SOH estimate unavailable"}</Box>
        </Grid>
        <Grid item md={2}>
          <Box sx={{ typography: 'subtitle2' }}>Seller</Box>
          <Box sx={{ typography: 'body2' }}>{battery.dealer?.substring(0, 15)}</Box>
          <Box sx={{ typography: 'body2' }}>{battery.sellerType}</Box>
          <StarBox stars={Math.floor(Math.random() * 4 + 1)} />
        </Grid>
      </Grid>
    </Paper >
  );
}

export default BatteryItem;