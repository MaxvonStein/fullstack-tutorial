import React, { Fragment, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { LaunchTile, Header, Loading } from '../components';
import { RouteComponentProps } from '@reach/router';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BatteryItem from '../components/battery-item';
import { Grid } from '@mui/material';
import ModelFilter from '../components/model-filter';
import ModuleFilter from '../components/module-filter';
import { listingFilterVar } from '../cache';
import { makeModels, MakeModels, popularMakes, moduleGenerations, ModuleGenerations, modelGenerations, ModelGenerations } from '../utils/constants'
// import typeDefs from '../index'

export const GET_LISTINGS = gql`
  query GetListingList {
    listingFilter @client {
      model
      module
      generation
    }
    listings {
      __typename
      make
      model
      imageSrc
      generation
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

export type ListingFilterVarType = {
  __typename: string,
  generation: string[],
  module: string[],
  model: string[]
}

const BatteriesClient: React.FC<BatteriesProps> = () => {
  const {
    data,
    loading,
    error
  } = useQuery<GetTypes.GetListingListQuery>(GET_LISTINGS)
  // typing the parameters, no variables used at the moment
  // fetcMore is a built-in function to aid in paination
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (loading) return <Loading />;
  if (error || !data) return <p>`ERROR: ${error?.message}`</p>;

  return (
    <Fragment>
      <Header />
      <Grid container>
        <Grid item lg={3}>
          <Typography>Make & Model</Typography>
          {
            Object.keys(modelGenerations).map((makeKey: string) =>
              <ModelFilter make={makeKey} models={(modelGenerations as ModelGenerations)[makeKey]} />
            )
          }
          <Typography>Module</Typography>
          {
            Object.keys(moduleGenerations).map(makeKey =>
              <ModuleFilter make={makeKey} modules={(moduleGenerations as ModuleGenerations)[makeKey].map(({ name }) => name)} />
            )
          }
        </Grid>
        <Grid item lg={9}>
          {/* what about a sort child component here that would take filteredBatteries and deal with sorting only, no queries */}
          <Stack spacing={2}>
            {
              data.listings?.filter((battery) =>
                data.listingFilter && (Object.keys(data.listingFilter) as Array<keyof ListingFilterVarType>).every((key) => {
                  // battery && console.log(data?.listingFilter[key]?.includes(battery[key]))
                  return (
                    !data.listingFilter ||
                    key === "__typename" ||
                    data.listingFilter[key].length === 0 ||
                    (battery && data.listingFilter[key].includes(battery[key]))
                  )
                })
              )
                .map((battery: any) => <BatteryItem battery={battery} />)
            }
          </Stack>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default BatteriesClient;
