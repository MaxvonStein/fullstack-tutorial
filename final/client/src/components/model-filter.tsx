import React from 'react';
import { unit } from '../styles';
import * as GetTypes from '../__generated-graphql-codegen__/types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import { listingFilterVar } from '../cache';
import { styled } from '@mui/material/styles';

const whetherArraysEqual = (a: any[], b: any[]): boolean => JSON.stringify(a) === JSON.stringify(b)

const FilterAccordion = styled(Accordion)`
  & .MuiAccordionSummary-content {
    margin: 6px 0;
  }
  & .MuiFormControlLabel-label {
    font-size: 0.875rem;
  }
  & .MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }
  & .MuiAccordionDetails-root {
    padding: 0 16px;
    & > .MuiBox-root > .MuiBox-root {
      margin-left: 14px;
    }
  }
`;

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
          control={<Checkbox size="small" checked={checked[i]} onChange={event => {
            setChecked(checked.map((item, j) => j == i ? event.target.checked : item))
            handleModelChange(event, model)
          }} />}
          key={i.toString()} />
      )}
    </Box>
  );

  return (
    <Box>
      <FilterAccordion expanded={expanded} square={true} variant={'outlined'}>
        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={toggleExpanded} fontSize="small" />}>
          <FormControlLabel
            label={make}
            name="make"
            value={make}
            control={
              <Checkbox
                // maybe there's a more efficient function here, like a reducer that stops as soon as it's false
                size="small"
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
      </FilterAccordion>
    </Box >
  );
}

export default ModelFilter;