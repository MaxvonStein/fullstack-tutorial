import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import { Link } from '@reach/router';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import StarBox from './star-box'
import { getKwhPrice, getModulePrice, estimateSOH } from '../utils/functions'
import { currentYear } from '../utils/dates'

interface BatteryItemProps {
  battery: GetTypes.Battery;
}

const BatteryItem: React.FC<BatteryItemProps> = ({ battery }) => {
  const { make, model } = battery;
  return (
    <Paper component={Link} elevation={1} sx={{ p: 1, marginBottom: 1, textDecoration: 'none' }} key={battery._id} to={`/battery/${battery._id}`} >
      <Grid container spacing={1}>
        <Grid item md={2}>
          <img src={battery.imageSrc ? battery.imageSrc : ""} />
        </Grid>
        <Grid item md={3}>
          <Box sx={{ typography: 'body1' }}>{`${make} ${model}`}</Box>
          <Box sx={{ typography: 'body2' }}>{battery.isComplete ? 'Complete pack' : 'Not complete'}</Box>
          <Box sx={{ typography: 'body2' }}>{`$${battery.price}`}</Box>
          <Box sx={{ typography: 'body2' }}>{`$${battery.price + battery.shippingCost} with shipping`}</Box>
        </Grid>
        <Grid item md={2}>
          <Box sx={{ typography: 'body2' }}>{`${battery.year} ${make} ${model}`}</Box>
          <Box sx={{ typography: 'body2', color: (battery.year && battery.odometerThousands) ? 'text.primary' : 'text.secondary' }}>{battery.odometerThousands ? `${battery.odometerThousands}k miles` : 'odometer unavailable'}</Box>
          <Box sx={{ typography: 'body2', color: (battery.year && battery.odometerThousands) ? 'text.primary' : 'text.secondary' }}>{(battery.year && battery.odometerThousands) ? `Estimated SOH: ${estimateSOH(currentYear - battery.year, battery.odometerThousands)}%` : "SOH estimate unavailable"}</Box>
        </Grid>
        <Grid item md={2}>
          <Box sx={{ typography: 'body2' }}>{battery.dealer?.substring(0, 15)}</Box>
          <Box sx={{ typography: 'body2' }}>{battery.sellerType}</Box>
          <StarBox stars={Math.floor(Math.random() * 4 + 1)} />
        </Grid>
        <Grid item md={2}>
          <Box sx={{ typography: 'body2' }}>${getKwhPrice(battery.price, battery.moduleCount * battery.module.kwh)} /kWh</Box>
          <Box sx={{ typography: 'body2' }}>${getModulePrice(battery.price, battery.moduleCount).toFixed(2)} /module</Box>
          <Box sx={{ typography: 'body2' }}>{battery.isWarrantied ? "Warranty included" : "As-is"}</Box>
          <Box sx={{ typography: 'body2' }}>{battery.isShippingAvailable ? `Shipping: $${battery.shippingCost}` : "Shipping not available"}</Box>
        </Grid>
      </Grid>
    </Paper >
  );
}

export default BatteryItem;