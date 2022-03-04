import React, { Fragment } from 'react';
import BatteryItem from '../components/battery-item';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import * as GetTypes from '../__generated-graphql-codegen__/types'

interface SortStackProps {
  batteries: GetTypes.Battery[]
}

const options = [
  { name: 'Price', field: 'price' },
  { name: 'Year', field: 'year' },
  { name: 'Odometer', field: 'odometerThousands' },
  { name: 'Model', field: 'model' },
  { name: 'Make', field: 'make' },
  { name: 'Seller Type', field: 'sellerType' },
  { name: 'Warranty/As-is', field: 'model' }
]

const SortStack: React.FC<SortStackProps> = ({ batteries }) => {
  const [sortField, setSortField] = React.useState('price');
  const [isReverse, setIsReverse] = React.useState(false);

  const getCompareBy = (field: string) => {
    // return a compare function
    return (a: any, b: any): number => {
      return (a[field] > b[field] && isReverse) ? 1 : -1
    }
  }

  const handleClick = (field: string) => () => {
    setSortField(field);
    if (field == sortField) {
      setIsReverse(prev => !prev)
    }
  }

  return <Fragment>
    <Box>
      {options.map(({ name, field }, i: number) =>
        <Fragment key={i}>
          <Link sx={{ margin: 1 }} onClick={handleClick(field)}>{name}</Link>
          {
            (field == sortField) && (isReverse ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)
          }

        </Fragment>
      )}
    </Box>
    <Stack>
      {
        batteries.sort(getCompareBy(sortField)).map(battery => <BatteryItem battery={battery} key={battery._id} />)
      }
    </Stack>
  </Fragment>
}

export default SortStack;
