import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





interface BatteryActionCardProps {
  price: number;
  shippingCost: number;
  pickupCityState?: string;
  shippingBizDays: number;
}

const BatteryActionCard: React.FC<BatteryActionCardProps> = ({ price, shippingCost, pickupCityState, shippingBizDays }) => {
  const [shippingChoice, setShippingChoice] = React.useState('ship');

  return <Card variant="outlined" >
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Order
      </Typography>
      <Box>
        <FormControl>
          <FormLabel>Shipping</FormLabel>
          <RadioGroup
            value={shippingChoice}
            name="shipping"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setShippingChoice((event.target as HTMLInputElement).value)}
          >
            <FormControlLabel value="pickup" control={<Radio size="small" />} label="pick up" />
            <FormControlLabel value="ship" control={<Radio size="small" />} label="shipping" />
          </RadioGroup>
        </FormControl>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: "unset", padding: "6px 0" }}>price</TableCell>
              <TableCell sx={{ border: "unset", padding: "6px 0", textAlign: "right" }}>{`$${price}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderBottomColor: 'text.primary', padding: "6px 0" }}>shipping</TableCell>
              <TableCell sx={{ borderBottomColor: 'text.primary', padding: "6px 0", textAlign: "right" }}>{shippingChoice == 'ship' ? `$${shippingCost}` : '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: "unset", padding: "6px 0" }}>total</TableCell>
              <TableCell sx={{ border: "unset", padding: "6px 0", textAlign: "right" }}>{`$${price + (shippingChoice == 'ship' ? shippingCost : 0)}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
    <CardActions>
      <Button variant="contained">Add to Cart</Button>
    </CardActions>
  </Card>
};

export default BatteryActionCard;
