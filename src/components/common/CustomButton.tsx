/* eslint-disable react/jsx-props-no-spreading */
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

type CustomButtonProps = {
  onclick?: (item?: any) => void;
  onchange?: (item?: any) => void;
  register?: any;
  className?: string;
  title?: string;
  icon?: any;
  iconRight?: any;
  buttonType: string;
  type?: any;
  isMenuOpen?: boolean;
  sx?: any;
  disabled?: boolean;
  required?: any;
};

function CustomButton({
  onclick,
  onchange,
  register,
  buttonType,
  type,
  className,
  icon,
  iconRight,
  title,
  isMenuOpen,
  sx,
  disabled,
  required,
}: CustomButtonProps) {
  if (buttonType === 'button') {
    return (
      <Button
        disabled={disabled}
        type={type && type}
        sx={sx && sx}
        variant="contained"
        className={className}
        onClick={onclick || (() => {})}
      >
        {/* {disabled ? <Loader /> : */}
        <>
          {icon && icon} {title} &nbsp; {iconRight && iconRight}
        </>
        {/* } */}
      </Button>
    );
  }
  if (buttonType === 'dots') {
    return (
      <IconButton
        disabled={disabled}
        className="btn-dot"
        aria-label="more"
        id="long-button"
        aria-controls={isMenuOpen ? 'long-menu' : undefined}
        aria-expanded={isMenuOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={onclick}
      >
        <MoreVertIcon />
      </IconButton>
    );
  }
  if (buttonType === 'upload') {
    return (
      <>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          {...register('avatar', {
            required: required && 'avatar is required',
          })}
          onChange={onchange}
          onClick={onclick}
        />
        <label htmlFor="raised-button-file" className="ImageLabel">
          <Button component="span" className="ImageBtn">
            {icon && icon} {title}
          </Button>
        </label>
      </>
    );
  }

  return null;
}

export default CustomButton;
