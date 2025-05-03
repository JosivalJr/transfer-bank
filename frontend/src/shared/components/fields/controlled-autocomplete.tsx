import { Fragment, useEffect, useState } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  TextField,
} from '@mui/material';

interface ControlledAutocompleteProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<
      AutocompleteProps<any, any, any, any>,
      'defaultValue' | 'name' | 'renderInput'
    > {
  label?: string;
  placeholder?: string;
  onSelect?: (data: any) => void;
  required?: boolean;
}

export function ControlledAutocomplete<T extends FieldValues>({
  fullWidth = true,
  size = 'small',
  label,
  options,
  multiple,
  required,
  placeholder,
  getOptionLabel,
  isOptionEqualToValue,
  ...props
}: ControlledAutocompleteProps<T>) {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController(props);

  const [selected, setSelected] = useState<unknown | null>(null);

  useEffect(() => {
    !multiple &&
      setSelected(
        options.find(
          (option) =>
            isOptionEqualToValue && isOptionEqualToValue(option, value),
        ) ?? null,
      );
  }, [value, options]);

  return (
    <Autocomplete
      {...props}
      multiple={multiple}
      value={multiple ? value : selected}
      fullWidth={fullWidth}
      onChange={(_, data) => {
        if (props.onSelect) {
          props.onSelect(data);
        } else {
          return onChange(data);
        }
      }}
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      slotProps={{
        chip: {
          ...props.slotProps?.chip,
          size,
        },
      }}
      renderInput={(params) => (
        <TextField
          {...field}
          {...params}
          size={size}
          label={label}
          required={required}
          fullWidth={fullWidth}
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
          slotProps={{
            htmlInput: params.inputProps,
            inputLabel: params.InputLabelProps,
            input: {
              ...params.InputProps,
              readOnly: props.readOnly,
              endAdornment: (
                <Fragment>
                  {props.loading && (
                    <CircularProgress
                      color="inherit"
                      size="1.25rem"
                      title="LOADING. . ."
                    />
                  )}
                  {!props.readOnly && params.InputProps.endAdornment}
                </Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
