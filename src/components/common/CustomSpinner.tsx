/* eslint-disable react/jsx-props-no-spreading */
import CircularProgress from '@mui/material/CircularProgress';

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
