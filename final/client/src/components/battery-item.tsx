import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"


interface BatteryItemProps {
  battery: GetTypes.Battery;
}

const BatteryItem: React.FC<BatteryItemProps> = ({ battery }) => {
  const { make, model, generation } = battery;
  return (
    <Box>
      <Link>{battery.make} {battery.model}</Link>
    </Box>
  );
}

export default BatteryItem;