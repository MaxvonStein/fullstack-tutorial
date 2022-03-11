import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import { LAUNCH_TILE_DATA } from './launches';
import { Loading, Header } from '../components';
import BatteryDetail from '../components/battery-detail';
import { ActionButton } from '../containers';
import { RouteComponentProps } from '@reach/router';
import * as GetTypes from '../__generated-graphql-codegen__/types'

export const GET_BATTERY_DETAILS = gql`
  query BatteryDetails($batteryId: ID!) {
    listing(id: $batteryId) {
      _id
      year
      make
      model
      price
      generation
      imageSrc
      description
      odometerThousands
      isComplete
      dealer
      isWarrantied
      isCore
      isReman
      distance
      moduleId
      moduleCount
      module {
        _id
        name
        kwh
        firstYear
        lastYear
        models
      }
      shippingCost @client
    }
  }
`;

interface BatteryProps extends RouteComponentProps {
  batteryId?: any;
}

const Battery: React.FC<BatteryProps> = ({ batteryId }) => {
  const {
    data,
    loading,
    error,
  } = useQuery<
    GetTypes.BatteryDetailsQuery,
    GetTypes.BatteryDetailsQueryVariables
  >(GET_BATTERY_DETAILS,
    { variables: { batteryId } }
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      {data.listing && <BatteryDetail battery={data.listing} />}
    </Fragment>
  );
}

export default Battery;