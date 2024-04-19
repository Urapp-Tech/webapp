/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

// Custom CircularProgress component
function FastSpinner(props: any) {
  return (
    <CircularProgress
      style={{ color: 'inherit', width: '20px', height: '20px' }}
      size={20}
      {...props}
    />
  );
}

export default FastSpinner;
