import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { listingFilterVar } from '../cache';

const whetherArraysEqual = (a: any[], b: any[]): boolean => JSON.stringify(a) === JSON.stringify(b)

interface ModuleFilterProps {
  make: string
  modules: string[]
}

const ModuleFilter: React.FC<ModuleFilterProps> = ({ make, modules }) => {
  const [checked, setChecked] = React.useState(Array(modules.length).fill(false));

  const handleModuleChange = (event: React.ChangeEvent<HTMLInputElement>, module: string) => {
    listingFilterVar({ ...listingFilterVar(), module: event.target.checked ? [...listingFilterVar().module, module] : [...listingFilterVar().module.filter(m => m != module)] })
  };

  const handleModulesChange = (event: React.ChangeEvent<HTMLInputElement>, modules: string[]) => {
    listingFilterVar({ ...listingFilterVar(), module: event.target.checked ? [...listingFilterVar().module, ...modules] : [...listingFilterVar().module.filter(m => !modules.includes(m))] })
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {modules.map((module, i) =>
        <FormControlLabel
          label={module}
          name="module"
          value={module}
          control={<Checkbox checked={checked[i]} onChange={event => {
            setChecked(checked.map((item, j) => j == i ? event.target.checked : item))
            handleModuleChange(event, module)
          }} />}
        />
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
              handleModulesChange(event, modules);
            }}
          />
        }
      />
      {children}
    </Box>
  );
}

export default ModuleFilter;