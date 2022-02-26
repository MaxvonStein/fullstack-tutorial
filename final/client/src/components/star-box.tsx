import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './launch-tile';
import { LaunchDetails_launch } from '../pages/__generated__/LaunchDetails';
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

interface StarBoxProps {
  stars: number;
}

const StarBox: React.FC<StarBoxProps> = ({ stars }) => (
  <Box>
    {Array.from(Array(stars)).map((element, i) => <StarIcon />)
    }
  </Box>
);

export default StarBox;
