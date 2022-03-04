import React, { Fragment, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { LaunchTile, Header, Button, Loading } from '../components';
import { RouteComponentProps } from '@reach/router';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack';
import BatteryItem from '../components/battery-item';
import { Grid } from '@mui/material';
import ModelFilter from '../components/model-filter';
import { listingFilterVar } from '../cache';
// import typeDefs from '../index'

export const GET_FILTERED_LISTINGS = gql`
  query GetFilteredListings($batteryFilter: BatteryFilter) {
    listingFilter @client @export(as: "batteryFilter") {
      model
    }
    filteredListings(batteryFilter: $batteryFilter) {
      __typename
      make
      model
      imageSrc
      isComplete
      year
      subModel
      generationStart
      generationEnd
      description
      partGrade
      dealer
      distance
      price
      isReman
      isCore
      isNoShip
      isShippingAvailable
      sellerType
      isWarrantied
      odometerThousands
      isComplete
    }
  }
`;

interface BatteriesProps extends RouteComponentProps { }

// export type ListingFilterVarType = {
//   __typename: string,
//   model: string[],
//   generation: string[]
// }

const BatteriesServer: React.FC<BatteriesProps> = () => {
  const {
    data,
    loading,
    error,
    fetchMore
  } = useQuery<GetTypes.GetFilteredListingsQuery, GetTypes.GetFilteredListingsQueryVariables>(GET_FILTERED_LISTINGS, {
    // variables: { batteryFilter }
  });
  // typing the parameters, no variables used at the moment
  // fetcMore is a built-in function to aid in paination
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (loading) return <Loading />;
  if (error || !data) return <p>`ERROR: ${error?.message}`</p>;

  console.log(data.listingFilter)

  return (
    <Fragment>
      <Header />
      <Grid container>
        <Grid item lg={3}>
          <ModelFilter make="Toyota" models={["Prius", "Camry"]} />
        </Grid>
        <Grid item lg={9}>
          <Stack spacing={2}>
            {data?.filteredListings?.map((battery: any) => <BatteryItem battery={battery} />)}
          </Stack>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default BatteriesServer;
