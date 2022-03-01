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
  values: string[]
  key: string
}

const KeyFilter: React.FC<ModuleFilterProps> = ({ make, values, key }) => {
  const [checked, setChecked] = React.useState(Array(values.length).fill(false));

  // would need to type key
  // const handleModuleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
  //   listingFilterVar({ ...listingFilterVar(), [key]: event.target.checked ? [...listingFilterVar()[key], value] : [...listingFilterVar()[key].filter(v => v != value)] })
  // };

  const handleModulesChange = (event: React.ChangeEvent<HTMLInputElement>, modules: string[]) => {
    listingFilterVar({ ...listingFilterVar(), [key]: event.target.checked ? [...listingFilterVar().module, ...modules] : [...listingFilterVar().module.filter(m => !modules.includes(m))] })
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {values.map((value, i) =>
        <FormControlLabel
          label={value}
          name="value.."
          value={value}
          control={<Checkbox checked={checked[i]} onChange={event => {
            setChecked(checked.map((item, j) => j == i ? event.target.checked : item))
            // handleModelChange(event, model)
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
              // handleModelsChange(event, models);
            }}
          />
        }
      />
      {children}
    </Box>
  );
}

export default KeyFilter;