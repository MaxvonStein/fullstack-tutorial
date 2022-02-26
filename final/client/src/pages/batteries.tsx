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

export const GET_LISTINGS = gql`
  query GetListingList($batteryFilter: BatteryFilter) {
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

export type ListingFilterVarType = {
  __typename: string,
  model: string[],
}

// {
//   model: [],
//   [[Prototype]]: Object
// }

// interface GetLaunchListCustom {
//   launches: GetLaunchListTypes.GetLaunchList_launches;
// }

const mockBattery = {
  make: "Tyoto Prius 2020 - 2022",
  model: "Tyoto Prius 2020 - 2022",
  generation: "Tyoto Prius 2020 - 2022"
}

const Batteries: React.FC<BatteriesProps> = () => {
  const batteryFilter = { model: ["Camry"] }
  const {
    data,
    loading,
    error,
    fetchMore
  } = useQuery<GetTypes.GetListingListQuery, GetTypes.GetListingListQueryVariables>(GET_LISTINGS, {
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
            {/* {
              data.listings && data.listings.filter((battery) => {
                data.listingFilter && (Object.keys(data.listingFilter) as Array<keyof ListingFilterVarType>).every((key) => {
                  data.listingFilter && console.log(data.listingFilter[key])
                  return (
                    !data.listingFilter ||
                    key === "__typename" ||
                    data.listingFilter[key].length === 0 ||
                    (battery && data.listingFilter[key].includes(battery[key]))
                  )
                })
              }).map((battery: any) => (
                <BatteryItem battery={battery} />
                // battery item here
              ))
            } */}

            {
              data?.filteredListings?.map((battery: any) => <BatteryItem battery={battery} />)
            }

            {/* {data.listings && data.listings.hasMore && (
          isLoadingMore
            ? <Loading />
            : <Button
              onClick={async () => {
                setIsLoadingMore(true);
                await fetchMore({
                  variables: {
                    after: data.launches.cursor,
                  },
                });
                setIsLoadingMore(false);
              }}
            >
              Load More Launches
            </Button>
        )} */}
          </Stack>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Batteries;
