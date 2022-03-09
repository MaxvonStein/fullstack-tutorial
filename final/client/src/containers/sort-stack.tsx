import React, { Fragment } from 'react';
import BatteryItem from '../components/battery-item';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import { getKwhPrice, getModulePrice } from '../utils/functions'

interface SortStackProps {
  batteries: GetTypes.Battery[]
}

const SortLink = styled(Link)<TypographyProps>(({ theme }) => ({
  display: "inline-block",
  marginRight: 8,
  cursor: "pointer",
  textDecoration: "none"
}))

const options = [
  { name: 'Price', field: 'price' },
  { name: 'Total Cost', field: 'totalCost' },
  { name: 'Complete', field: 'isComplete' },
  { name: 'Year', field: 'year' },
  { name: 'Make', field: 'make' },
  { name: 'Model', field: 'model' },
  { name: 'Odometer', field: 'odometerThousands' },
  { name: 'Seller Type', field: 'sellerType' },
  { name: 'Seller Name', field: 'dealer' },
  { name: 'Warranty/As-is', field: 'isWarrantied' },
  { name: 'Price /module', field: 'modulePrice' },
  { name: 'Price /kWh', field: 'kWhPrice' },
  { name: 'Shipping Cost', field: 'shippingCost' },
]

const SortStack: React.FC<SortStackProps> = ({ batteries }) => {
  const [sortField, setSortField] = React.useState('price');
  const [isReverse, setIsReverse] = React.useState(false);

  const compareBy = (field: string) => (a: any, b: any): number => (a[field] > b[field] && isReverse) ? 1 : -1

  const compareModulePrice = (a: any, b: any): number => (getModulePrice(a.price, a.moduleCount) > getModulePrice(b.price, b.moduleCount) && isReverse) ? 1 : -1

  const compareKwhPrice = (a: any, b: any): number => (getKwhPrice(a.price, a.moduleCount) > getKwhPrice(b.price, b.moduleCount) && isReverse) ? 1 : -1

  const compareTotalCost = (a: any, b: any): number => ((a.price + a.shippingCost) > (b.price + b.shippingCost) && isReverse) ? 1 : -1


  const getCompareBy = (field: string) => {
    // return a compare function
    if (field == 'modulePrice') {
      return compareModulePrice
    } else if (field == 'kWhprice') {
      return compareKwhPrice
    } else if (field == 'totalCost') {
      return compareTotalCost
    } else {
      return compareBy(field)
    }
  }

  const handleClick = (field: string) => () => {
    setSortField(field);
    if (field == sortField) {
      setIsReverse(prev => !prev)
    }
  }

  return <Fragment>
    <Grid container spacing={2}>
      <Grid item md={2}>
      </Grid>
      <Grid item md={3}>
        <Typography variant="body1">General</Typography>
        {options.slice(0, 3).map(({ name, field }, i) =>
          <SortLink variant="body2" onClick={handleClick(field)}>{name + (field == sortField ? (isReverse ? "\u25e3" : "\u25e4") : "")}</SortLink>
        )}
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1">Vehicle</Typography>
        {options.slice(3, 7).map(({ name, field }, i) =>
          <SortLink variant="body2" onClick={handleClick(field)}>{name + (field == sortField ? (isReverse ? "\u25e3" : "\u25e4") : "")}</SortLink>
        )}
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1">Seller</Typography>
        {options.slice(7, 9).map(({ name, field }, i) =>
          <SortLink variant="body2" onClick={handleClick(field)}>{name + (field == sortField ? (isReverse ? "\u25e3" : "\u25e4") : "")}</SortLink>
        )}
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1">Pricing & Terms</Typography>
        {options.slice(9, 13).map(({ name, field }, i) =>
          <SortLink variant="body2" onClick={handleClick(field)}>{name + (field == sortField ? (isReverse ? "\u25e3" : "\u25e4") : "")}</SortLink>
        )}
      </Grid>
    </Grid>
    <Stack>
      {
        batteries.sort(getCompareBy(sortField)).map(battery => <BatteryItem battery={battery} key={battery._id} />)
      }
    </Stack>
  </Fragment >
}

export default SortStack;
