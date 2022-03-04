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

const GET_LISTINGS_FOR_BATTERIES = gql`
  query ListingsForBatteries {
    listings {
      make
      model
      moduleId
      generation
      imageSrc
      isComplete
      year
      dealer
      price
      sellerType
      odometerThousands
    }
    modules {
      make 
    }
    listingFilter @client {
      model
      moduleId
      generation
    }
  }
`;

interface BatteriesProps extends RouteComponentProps { }

interface ListingFilterVarType {
  generation: string[],
  moduleId: string[],
  model: string[]
}

interface RocketInventoryData {
  listings: GetTypes.Battery[];
  modules: GetTypes.BatteryModule[];
  listingFilter: ListingFilterVarType;
}

const BatteriesClient: React.FC<BatteriesProps> = () => {
  const {
    data,
    loading,
    error
  } = useQuery<RocketInventoryData>(GET_LISTINGS_FOR_BATTERIES)
  // typing the parameters, no variables used at the moment
  // fetcMore is a built-in function to aid in paination
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const whetherInFilter = (filter: ListingFilterVarType, battery: GetTypes.Battery): boolean => (Object.keys(filter) as Array<keyof ListingFilterVarType>).every(key => {
    return (
      filter[key].length == 0 ||
      (key == 'moduleId' && filter.moduleId.includes(battery.moduleId.toHexString)) ||
      filter[key].includes(battery[key])
    )
  });


  if (loading) return <Loading />;
  if (error || !data) return <p>`ERROR: ${error?.message}`</p>;

  // data.modules && console.log(Array.from(new Set(data.modules.map((module: any) => module.make))))
  // return array of makes
  // let moduleMakes = Array.from(new Set(data.modules?.map((module as GetTypes.BatteryModule) => module.make)))

  return (
    <Fragment>
      <Header />
      <Grid container>
        <Grid item lg={3}>
          <Typography>Make & Model</Typography>
          {
            Object.keys(modelGenerations).map((makeKey: string) =>
              <ModelFilter make={makeKey} models={(modelGenerations as ModelGenerations)[makeKey].map(generation => generation.name)} />
            )
          }
          <Typography>Module</Typography>
          {/* {
            // (Array.from(new Set(data.modules?.map((module as any) => module.make)))).map((moduleMake: string) => <ModuleFilter make={moduleMake} modules={data.modules?.filter(module => module.make == make)} />)
            data.modules && data.modules.map((module: any) => module.make).map((moduleMake: string) => {
              if (data.modules && data.modules.filter((module: GetTypes.BatteryModule) => module.make == moduleMake).length != 0) {
                return <ModuleFilter make={moduleMake} modules={data.modules.filter((module: GetTypes.BatteryModule) => module.make == moduleMake)} />
              }
            }
          } */}
        </Grid>
        <Grid item lg={9}>
          {/* what about a sort child component here that would take filteredBatteries and deal with sorting only, no queries */}
          <Stack spacing={2}>
            {
              data && data.listings && data.listingFilter && data.listingFilter.generation && data.listings.filter((batteryListing: any) => {
                return whetherInFilter(data.listingFilter, batteryListing)
              }).map((batteryListing: any) => (
                <BatteryItem battery={batteryListing} />
              ))

            }

            {/* data.listingFilter && (Object.keys(data.listingFilter) as Array<keyof ListingFilterVarType>).every((key) => {
                // battery && console.log(data?.listingFilter[key]?.includes(battery[key]))
                // battery && console.log(data.listingFilter[key])
                // battery && data && data.listingFilter && console.log(data.listingFilter[key].includes(battery[key]))
                return (
              !data.listingFilter ||
              key === "__typename" ||
              data.listingFilter[key].length === 0 ||
              (battery && data.listingFilter[key].includes(battery[key]))
              )
              }) */}
          </Stack>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default BatteriesClient;
