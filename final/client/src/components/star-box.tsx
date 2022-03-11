import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './launch-tile';
import { LaunchDetails_launch } from '../pages/__generated__/LaunchDetails';
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { yellow } from '@mui/material/colors';

interface StarBoxProps {
  stars: number;
  isMedium?: boolean;
  sx?: any;
}

const StarBox: React.FC<StarBoxProps> = ({ stars, isMedium, sx }) => (
  <Box sx={sx}>
    {Array.from(Array(stars)).map((element, i) => <StarIcon sx={{ color: yellow[400] }} key={i.toString()} fontSize={isMedium ? "medium" : "small"} />)
    }
  </Box>
);

export default StarBox;
