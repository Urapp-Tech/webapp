import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../redux/redux-hooks';

type Props = {
  icon: JSX.Element;
  id: string;
  text: string;
  onChange: (value: dayjs.Dayjs | null) => void;
  initialValue: dayjs.Dayjs | null;
};
function DatePickerButton({ onChange, text, id, icon, initialValue }: Props) {
  const systemConfig = useAppSelector((state) => state.appState.systemConfig);
  const muiThemeColor = systemConfig?.theme.value.themeColor.primary ?? '';
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        primary: { main: muiThemeColor },
      },
    });
  }, [systemConfig]);

  const [datePicker, setDatePicker] = useState<HTMLButtonElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    initialValue
  );
  const buttonElement = useRef(null);
  const handleClick = () => {
    setDatePicker(buttonElement.current);
  };
  const handleClose = () => {
    setDatePicker(null);
  };

  const open = Boolean(datePicker);
  const idProp = open ? id : undefined;

  const handleChange = (value: dayjs.Dayjs | null) => {
    setSelectedDate(value);
    onChange(value);
    handleClose();
  };

  return (
    <>
      <Button
        ref={buttonElement}
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
        <ThemeProvider theme={theme}>
          <StaticDateTimePicker
            displayStaticWrapperAs="desktop"
            onAccept={handleChange}
            value={selectedDate}
            minDate={dayjs()}
          />
        </ThemeProvider>
      </Popover>
    </>
  );
}

export default DatePickerButton;
