import React, { Fragment } from 'react';
import { cardClassName, getBackgroundImage } from './launch-tile';
import { LaunchDetails_launch } from '../pages/__generated__/LaunchDetails';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Carousel from 'react-material-ui-carousel'
import StarBox from './star-box'
import BatteryActionCard from './battery-action-card'
import * as GetTypes from '../__generated-graphql-codegen__/types'
import { getKwhPrice, getModulePrice, estimateSOH } from '../utils/functions'
import { currentYear } from '../utils/dates'


interface BatteryDetailProps {
  battery: GetTypes.Battery;
}

const BatteryDetail: React.FC<BatteryDetailProps> = ({ battery }) => (
  <Grid container spacing={1}>
    <Grid item md={4}>
      <Typography variant="h3">{`${battery.year} ${battery.make} ${battery.model}`}</Typography>
      <Typography variant="h4" gutterBottom>{battery.isComplete ? 'Complete pack' : 'Not complete'}</Typography>
      <Carousel autoPlay={false}>
        {
          Array(4).fill(battery.imageSrc).map((imageSrc, i) => <Box component="img" key={i} src={imageSrc} sx={{ width: 350 }} />)
        }
      </Carousel>
      <Typography variant="h5" sx={{ marginTop: 8 }}>{`$${battery.price}`}</Typography>
    </Grid>
    <Grid item md={3}>
      <Typography variant="h6">Vehicle</Typography>
      <Typography variant="body2">{`${battery.year} ${battery.make} ${battery.model}`}</Typography>
      <Typography variant="body2" sx={{ color: (battery.year && battery.odometerThousands) ? 'text.primary' : 'text.secondary' }}>{battery.odometerThousands ? `${battery.odometerThousands}k miles` : 'odometer unavailable'}</Typography>
      <Typography variant="body2" gutterBottom sx={{ color: (battery.year && battery.odometerThousands) ? 'text.primary' : 'text.secondary' }}>{(battery.year && battery.odometerThousands) ? `Estimated SOH: ${estimateSOH(currentYear - battery.year, battery.odometerThousands)}%` : "SOH estimate unavailable"}</Typography>
      {battery.description && battery.description.length > 3 && <Fragment>
        <Typography variant="body1">Notes</Typography>
        <Typography variant="body2">{battery.description.toLowerCase()}</Typography>
      </Fragment>
      }
    </Grid>
    <Grid item md={3}>
      <Typography variant="h6">Seller</Typography>
      <Typography variant="body2">{battery.dealer?.substring(0, 20)}</Typography>
      <Typography variant="body2">{battery.sellerType}</Typography>
      <Typography variant="body2">This seller ships in one business day</Typography>
      <StarBox stars={4} isMedium={true} />
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="subtitle2">Listing Accuracy</Typography>
        <StarBox stars={5} sx={{ marginBottom: 1 }} />
        <Typography variant="subtitle2">Fulfillment</Typography>
        <StarBox stars={3} />
        <Typography variant="caption">Order fulfillment rate: 75%</Typography>
      </Box>
    </Grid>
    <Grid item md={2}>
      <BatteryActionCard price={battery.price} shippingCost={battery.shippingCost} shippingBizDays={5} />
    </Grid>
    <Grid item md={8}>
      <Typography variant="h6">Module</Typography>
      <Typography variant="body2">{battery.module.name}</Typography>
      <Typography variant="body2">{`${battery.module.firstYear} - ${battery.module.lastYear} ${battery.module.models?.join(', ')}`}</Typography>
      <Typography variant="body2">{`${battery.moduleCount} modules, $${getModulePrice(battery.price, battery.moduleCount).toFixed(2)} per module`}</Typography>
      <Link>see other listings with this module</Link>
    </Grid>
  </Grid>
);

export default BatteryDetail;
