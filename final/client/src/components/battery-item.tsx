import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"


interface BatteryItemProps {
  battery: GetTypes.Battery;
}

const BatteryItem: React.FC<BatteryItemProps> = ({ battery }) => {
  const { make, model } = battery;
  return (
    <Box sx={{ display: 'grid', gridAutoColumns: '1fr' }}>
      <Box sx={{ gridRow: '1' }}>
        <img src={battery.imageSrc ? battery.imageSrc : ""}></img>
      </Box>
      <Box sx={{ gridRow: '1' }}>
        <Box sx={{ typography: 'body1' }}>{`${make} ${model}`}</Box>
        <Box sx={{ typography: 'body2' }}>{battery.isComplete ? 'Complete pack' : 'Not Complete'}</Box>
        <Box sx={{ typography: 'body2' }}>{`$${battery.price}`}</Box>
      </Box>
    </Box>
  );
}

export default BatteryItem;