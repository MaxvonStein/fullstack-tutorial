import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { listingFilterVar } from '../cache';

const whetherArraysEqual = (a: any[], b: any[]): boolean => JSON.stringify(a) === JSON.stringify(b)

interface ModelFilterProps {
  make: string
  models: string[]
}

const ModelFilter: React.FC<ModelFilterProps> = ({ make, models }) => {
  const [checked, setChecked] = React.useState(Array(models.length).fill(false));

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>, model: string) => {
    listingFilterVar({ ...listingFilterVar(), model: event.target.checked ? [...listingFilterVar().model, model] : [...listingFilterVar().model.filter(m => m != model)] })
  };

  const handleModelsChange = (event: React.ChangeEvent<HTMLInputElement>, models: string[]) => {
    listingFilterVar({ ...listingFilterVar(), model: event.target.checked ? [...listingFilterVar().model, ...models] : [...listingFilterVar().model.filter(m => !models.includes(m))] })
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {models.map((model, i) =>
        <FormControlLabel
          label={model}
          name="model"
          value={model}
          control={<Checkbox checked={checked[i]} onChange={event => {
            setChecked(checked.map((item, j) => j == i ? event.target.checked : item))
            handleModelChange(event, model)
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
              handleModelsChange(event, models);
            }}
          />
        }
      />
      {children}
    </Box>
  );
}

export default ModelFilter;