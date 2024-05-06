/* eslint-disable react/jsx-props-no-spreading */
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

type CustomDropDownProps = {
  inputTitle?: string;
  customWidth?: string;
  customHeight?: string;
  options?: any;
  register?: any;
  control?: any;
  id?: any;
  value?: string;
  error?: any;
  validateRequired?: any;
  customClassInputTitle?: string;
  defaultValue?: string;
  setValue?: any;
  alternativeId?: string;
  border?: string;
  disabled?: boolean;
};

function CustomDropDown({
  disabled,
  inputTitle,
  customWidth,
  customHeight,
  options,
  control,
  id,
  validateRequired,
  defaultValue,
  customClassInputTitle,
  setValue,
  alternativeId,
  border,
}: CustomDropDownProps) {
  return (
    <div className="">
      {inputTitle && (
        <div className="" style={{ paddingBottom: '5px', display: 'flex' }}>
          <span className={`FormLabel ${customClassInputTitle}`}>
            {inputTitle}
          </span>
        </div>
      )}
      <div className="">
        <Controller
          name={id}
          control={control}
          defaultValue={options?.role || 'none'}
          rules={
            validateRequired
              ? {
                  validate: (value) => {
                    return value !== 'none' || 'Select an option';
                  },
                }
              : {}
          }
          render={({ field, fieldState }) => (
            <>
              <Select
                disabled={disabled}
                fullWidth
                variant="outlined"
                style={{
                  border: border || '1px solid',
                }}
                className={`${customHeight || 'fixed-height'} ${
                  customWidth || 'w-[100%]'
                }`}
                labelId="demo-simple-select-label"
                id={id}
                {...field}
                onChange={(event) => {
                  if (alternativeId) setValue(alternativeId, []);
                  field.onChange(event);
                }}
              >
                <MenuItem value="none">
                  {defaultValue ? `-- ${defaultValue} --` : `-- Select Role --`}
                </MenuItem>
                {options?.roles?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {fieldState.error && (
                <p style={{ color: 'red', fontSize: '12px' }}>
                  *{fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}

export default CustomDropDown;
