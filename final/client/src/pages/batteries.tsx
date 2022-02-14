import React, { Fragment, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { LaunchTile, Header, Button, Loading } from '../components';
import { RouteComponentProps } from '@reach/router';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack';
import BatteryItem from '../components/battery-item';


export const GET_LISTINGS = gql`
  query GetListingList {
    listings {
      __typename
      make
      model
    }
  }
`;

interface LaunchesProps extends RouteComponentProps { }

// interface GetLaunchListCustom {
//   launches: GetLaunchListTypes.GetLaunchList_launches;
// }

const mockBattery = {
  make: "Tyoto Prius 2020 - 2022",
  model: "Tyoto Prius 2020 - 2022",
  generation: "Tyoto Prius 2020 - 2022"
}

const Batteries: React.FC<LaunchesProps> = () => {
  const {
    data,
    loading,
    error,
    fetchMore
  } = useQuery<GetTypes.GetListingListQuery>(GET_LISTINGS);
  // typing the parameters, no variables used at the moment
  // fetcMore is a built-in function to aid in paination
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (loading) return <Loading />;
  if (error || !data) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header />
      <Stack>
        {data.listings &&
          data.listings.map((battery: any) => (
            <BatteryItem battery={battery} />
            // battery item here
          ))}
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
    </Fragment>
  );
}

export default Batteries;
