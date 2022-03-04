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
  // eg. 27/150/2 = .09
  const ageWear = years / 12 / 2
  // eg. 5/12/2 = .21
  return Math.round((1 - driveWear - ageWear) * 100)
}

const getKwhPrice = (price: number, kwh: number) => Math.round(price / kwh)
const getModulePrice = (price: number, moduleCount: number) => (price / moduleCount).toFixed(2)

const currentDate = new Date()
const currentYear = currentDate.getFullYear()


const BatteryItem: React.FC<BatteryItemProps> = ({ battery }) => {
  const { make, model } = battery;
  return (
    <Paper sx={{ p: 2 }} key={battery._id}>
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
          <Box sx={{ typography: 'body2' }}>{`${battery.year} ${make} ${model}`}</Box>
          <Box sx={{ typography: 'body2', color: (battery.year && battery.odometerThousands) ? 'text.primary' : 'text.secondary' }}>{battery.odometerThousands ? `${battery.odometerThousands}k miles` : 'odometer unavailable'}</Box>
          <Box sx={{ typography: 'body2', color: (battery.year && battery.odometerThousands) ? 'text.primary' : 'text.secondary' }}>{(battery.year && battery.odometerThousands) ? `Estimated SOH: ${estimateSOH(currentYear - battery.year, battery.odometerThousands)}%` : "SOH estimate unavailable"}</Box>
        </Grid>
        <Grid item md={2}>
          <Box sx={{ typography: 'subtitle2' }}>Seller</Box>
          <Box sx={{ typography: 'body2' }}>{battery.dealer?.substring(0, 15)}</Box>
          <Box sx={{ typography: 'body2' }}>{battery.sellerType}</Box>
          <StarBox stars={Math.floor(Math.random() * 4 + 1)} />
        </Grid>
        <Grid item md={2}>
          <Box sx={{ typography: 'subtitle2' }}>Pricing & Terms</Box>
          <Box sx={{ typography: 'body2' }}>${getKwhPrice(battery.price, battery.moduleCount * battery.module.kwh)} /kWh</Box>
          <Box sx={{ typography: 'body2' }}>${getModulePrice(battery.price, battery.moduleCount)} /module</Box>
          <Box sx={{ typography: 'body2' }}>{battery.isWarrantied ? "Warranty included" : "As-is"}</Box>
          <Box sx={{ typography: 'body2' }}>{battery.isShippingAvailable ? `Shipping: $${battery.shippingCost}` : "Shipping not available"}</Box>
        </Grid>
      </Grid>
    </Paper >
  );
}

export default BatteryItem;