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
import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModelFilter from '../components/model-filter';
import FieldFilter from '../components/field-filter';
import ModuleFilter from '../components/module-filter';
import { listingFilterVar } from '../cache';
import { makeModels, MakeModels, popularMakes, moduleGenerations, ModuleGenerations, modelGenerations, ModelGenerations } from '../utils/constants'
import SortStack from '../containers/sort-stack';
import { grey } from '@mui/material/colors';


const GET_LISTINGS_FOR_BATTERIES = gql`
  query ListingsForBatteries {
    listings {
      _id
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
      isWarrantied
      isCore
      isShippingAvailable
      distance
      shippingCost @client
      moduleCount @client
      module {
        kwh
      }
    }
    modules {
      _id
      name
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

interface ListingsData {
  listings: GetTypes.Battery[];
  modules: GetTypes.BatteryModule[];
  listingFilter: ListingFilterVarType;
}

const Batteries: React.FC<BatteriesProps> = () => {
  const {
    data,
    loading,
    error
  } = useQuery<ListingsData>(GET_LISTINGS_FOR_BATTERIES)
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
      <Grid spacing={1} container>
        <Grid item lg={3}>
          <Accordion square={true} variant={'outlined'}>
            <AccordionSummary sx={{ background: grey[200] }} expandIcon={<ExpandMoreIcon />}>
              <Typography>Model Generation</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {
                Object.keys(modelGenerations).map((makeKey: string, i: number) =>
                  <FieldFilter field="generation" values={(modelGenerations as ModelGenerations)[makeKey].map(generation => generation.name)} key={i.toString()} label={makeKey} />
                )
              }
            </AccordionDetails>
          </Accordion>
          <Accordion square={true} variant={'outlined'}>
            <AccordionSummary sx={{ background: grey[200] }} expandIcon={<ExpandMoreIcon />}>
              <Typography>Module</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {
                // (Array.from(new Set(data.modules?.map((module as any) => module.make)))).map((moduleMake: string) => <ModuleFilter make={moduleMake} modules={data.modules?.filter(module => module.make == make)} />)
                data.modules && popularMakes.map((make: string, j: number) =>
                  (data.modules.filter((module: GetTypes.BatteryModule) => module.make == make).length != 0) &&
                  <FieldFilter field="moduleId" values={data.modules.filter((module: GetTypes.BatteryModule) => module.make == make).map(module => module._id)} names={data.modules.filter((module: GetTypes.BatteryModule) => module.make == make).map(module => module.name)} label={make} key={j.toString()} />
                )
              }
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item lg={9}>
          {/* what about a sort child component here that would take filteredBatteries and deal with sorting only, no queries */}
          <SortStack
            batteries={data && data.listings && data.listingFilter && data.listingFilter.generation && data.listings.filter((battery: any) => {
              return whetherInFilter(data.listingFilter, battery)
            })} />
        </Grid>
      </Grid>
    </Fragment >
  );
}

export default Batteries;
