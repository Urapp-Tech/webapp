import { useState } from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  icon: JSX.Element;
  id: string;
  text: string;
  onChange: (value: dayjs.Dayjs | null) => void;
};
function DatePickerButton({ onChange, text, id, icon }: Props) {
  const [datePicker, setDatePicker] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDatePicker(event.currentTarget);
  };
  const handleClose = () => {
    setDatePicker(null);
  };

  const open = Boolean(datePicker);
  const idProp = open ? id : undefined;

  const handleChange = (value: dayjs.Dayjs | null) => {
    onChange(value);
    handleClose();
  };

  return (
    <>
      <Button
        className="border-none px-1 font-open-sans text-xs font-semibold text-neutral-900"
        variant="outlined"
        color="inherit"
        startIcon={icon}
        onClick={handleClick}
      >
        {text}
      </Button>
      <Popover
        id={idProp}
        open={open}
        anchorEl={datePicker}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <StaticDateTimePicker
            displayStaticWrapperAs="desktop"
            defaultValue={dayjs('2022-04-17T15:30')}
            onAccept={handleChange}
          />
        </ThemeProvider>
      </Popover>
    </>
  );
}

export default DatePickerButton;
