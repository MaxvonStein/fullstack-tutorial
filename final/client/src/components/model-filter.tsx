import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import { listingFilterVar } from '../cache';

const whetherArraysEqual = (a: any[], b: any[]): boolean => JSON.stringify(a) === JSON.stringify(b)

interface ModelFilterProps {
  make: string
  models: string[]
}

const ModelFilter: React.FC<ModelFilterProps> = ({ make, models }) => {
  const [checked, setChecked] = React.useState(Array(models.length).fill(false));
  const [expanded, setExpanded] = React.useState(false);

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>, model: string) => {
    listingFilterVar({ ...listingFilterVar(), generation: event.target.checked ? [...listingFilterVar().generation, model] : [...listingFilterVar().generation.filter(m => m != model)] })
  };

  const handleModelsChange = (event: React.ChangeEvent<HTMLInputElement>, models: string[]) => {
    listingFilterVar({ ...listingFilterVar(), generation: event.target.checked ? [...listingFilterVar().generation, ...models] : [...listingFilterVar().generation.filter(m => !models.includes(m))] })
  }

  const toggleExpanded = () => setExpanded(prev => !prev)

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
      <Accordion expanded={expanded} >
        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={toggleExpanded} />}>
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
                  setExpanded(true);
                  setChecked(Array(checked.length).fill(event.target.checked));
                  handleModelsChange(event, models);
                }}
              />
            }
          />
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {children}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box >
  );
}

export default ModelFilter;