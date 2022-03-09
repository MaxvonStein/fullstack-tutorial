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
  & .MuiAccordionSummary-root.Mui-expanded {
    min-height: unset;
  }
  & .MuiAccordionDetails-root {
    padding: 0 16px;
    & > .MuiBox-root > .MuiBox-root {
      margin-left: 14px;
    }
  }
`;

type Field = "model" | "moduleId" | "generation";

interface FieldFilterProps {
  field: Field
  values: string[]
  label: string
  names?: string[]
}

const FieldFilter: React.FC<FieldFilterProps> = ({ field, values, label, names }) => {
  const [checked, setChecked] = React.useState(Array(values.length).fill(false));
  const [expanded, setExpanded] = React.useState(false);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>, model: string) => {
    listingFilterVar({ ...listingFilterVar(), [field]: event.target.checked ? [...listingFilterVar()[field], model] : [...listingFilterVar()[field].filter(m => m != model)] })
  };

  const handleValuesChange = (event: React.ChangeEvent<HTMLInputElement>, values: string[]) => {
    listingFilterVar({ ...listingFilterVar(), [field]: event.target.checked ? [...listingFilterVar()[field], ...values] : [...listingFilterVar()[field].filter(v => !values.includes(v))] })
  }

  const toggleExpanded = () => setExpanded(prev => !prev)

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {values.map((value, i) =>
        <FormControlLabel
          label={names ? names[i] : value}
          name={label}
          value={value}
          control={<Checkbox size="small" checked={checked[i]} onChange={event => {
            setChecked(checked.map((item, j) => j == i ? event.target.checked : item))
            handleValueChange(event, value)
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
            label={label}
            name={field}
            control={
              <Checkbox
                // maybe there's a more efficient function here, like a reducer that stops as soon as it's false
                size="small"
                checked={whetherArraysEqual(checked, Array(checked.length).fill(true))}
                indeterminate={checked.some(element => element !== checked[0])}
                onChange={event => {
                  setExpanded(true);
                  setChecked(Array(checked.length).fill(event.target.checked));
                  handleValuesChange(event, values);
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

export default FieldFilter;