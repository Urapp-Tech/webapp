/* eslint-disable react/jsx-props-no-spreading */
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { forwardRef, type SyntheticEvent } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

type NotifyProps = {
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
  displayMessage: any;
};

function Notify({ isOpen, setIsOpen, displayMessage }: NotifyProps) {
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
    // setOpen(isOpen);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={2000}
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      sx={{ zIndex: 9999999999999999999 }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={displayMessage?.type}
        sx={{ width: '100%', zIndex: 1000000 }}
      >
        {displayMessage?.text}
      </Alert>
    </Snackbar>
  );
}

export default Notify;
