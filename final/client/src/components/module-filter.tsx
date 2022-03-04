import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { listingFilterVar } from '../cache';

const whetherArraysEqual = (a: any[], b: any[]): boolean => JSON.stringify(a) === JSON.stringify(b)

interface Module {
  _id: string
  name: string
  model: string
  firstYear: number
  lastYear: number
}

interface ModuleFilterProps {
  make: string
  modules: GetTypes.BatteryModule[]
}

// Fix the parameters here, maybe they should be a list of module objects

const ModuleFilter: React.FC<ModuleFilterProps> = ({ make, modules }) => {
  // take in a module prop so we can 
  const [checked, setChecked] = React.useState(Array(modules.length).fill(false));
  console.log(checked)

  const handleModuleChange = (event: React.ChangeEvent<HTMLInputElement>, moduleId: string) => {
    listingFilterVar({ ...listingFilterVar(), moduleId: event.target.checked ? [...listingFilterVar().moduleId, moduleId] : [...listingFilterVar().moduleId.filter(m => m != moduleId)] })
  };

  const handleModulesChange = (event: React.ChangeEvent<HTMLInputElement>, moduleIds: string[]) => {
    listingFilterVar({ ...listingFilterVar(), moduleId: event.target.checked ? [...listingFilterVar().moduleId, ...moduleIds] : [...listingFilterVar().moduleId.filter(m => !moduleIds.includes(m))] })
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {modules.map((module, i) =>
        <FormControlLabel
          label={module.name}
          name="module"
          value={module._id}
          control={<Checkbox checked={checked[i]} onChange={event => {
            setChecked(checked.map((item, j) => j == i ? event.target.checked : item))
            handleModuleChange(event, module._id)
          }} />}
          key={module._id} />
      )}
    </Box>
  );

  return (
    <Box>
      <FormControlLabel
        label={make}
        name="make"
        value={make}
        control={
          <Checkbox
            // maybe there's a more efficient function here, like a reducer that stops as soon as it's false
            checked={whetherArraysEqual(checked, Array(checked.length).fill(true))}
            indeterminate={checked.some(element => element !== checked[0])}
            onChange={event => {
              setChecked(Array(checked.length).fill(event.target.checked));
              handleModulesChange(event, modules.map(module => module._id));
            }}
          />
        }
      />
      {children}
    </Box>
  );
}

export default ModuleFilter;