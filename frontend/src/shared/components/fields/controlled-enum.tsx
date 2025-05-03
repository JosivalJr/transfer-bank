import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { Option } from '@/shared/domain/types';

interface ControlledEnumProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<
      AutocompleteProps<any, boolean, boolean, boolean>,
      | 'renderInput'
      | 'translate'
      | 'options'
      | 'onChange'
      | 'value'
      | 'defaultValue'
    > {
  translate?: Record<string, string>;
  options: Record<string, string>;
  excludeOptions?: Array<string>;
  label?: string;
  placeholder?: string;
}

export function ControlledEnum<T extends FieldValues>({
  fullWidth = true,
  size = 'small',
  label,
  multiple,
  placeholder,
  options,
  translate,
  excludeOptions = [],
  ...props
}: ControlledEnumProps<T>) {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController(props);

  const [selected, setSelected] = useState<Option<string> | null>(null);
  const [selectees, setSelectees] = useState<Array<Option<string>>>([]);

  const formattedOptions = Object.entries(options)
    .map(([key, value]) => ({
      label: key,
      value: value,
    }))
    .filter((options) => !excludeOptions.includes(options.value));

  function handleChange(data: Option<string> | Option<string>[] | null) {
    multiple
      ? setSelectees((data as Array<Option<string>> | null) ?? [])
      : setSelected(data as Option<string> | null);

    onChange(
      multiple
        ? ((data as Array<Option<string>> | null)?.map(({ value }) => value) ??
            [])
        : (data as Option<string> | null)?.value,
    );
  }

  function EnumKeyToLabel(key: string): string {
    if (translate) return translate[key];

    return key
      .split('_')
      .map((label) => label.toLowerCase())
      .map((label) => {
        const first = label.at(0);
        if (first) return label.replace(first, first.toUpperCase());
        return label;
      })
      .join(' ');
  }

  function formatLabel(key: string | null): string {
    if (!key) return '';

    return EnumKeyToLabel(key);
  }

  useEffect(() => {
    multiple
      ? setSelectees(
          formattedOptions.filter(
            (option) => !!value && value.includes(option.value),
          ),
        )
      : setSelected(
          formattedOptions.find((option) => option.value == value) ?? null,
        );
  }, [value]);

  return (
    <Autocomplete
      {...props}
      multiple={multiple}
      size={size}
      fullWidth={fullWidth}
      options={formattedOptions}
      value={multiple ? selectees : selected}
      onChange={(_, data) => handleChange(data)}
      getOptionLabel={(option) => formatLabel(option.label)}
      isOptionEqualToValue={(option, selected) =>
        option?.value == selected?.value
      }
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
            },
          }}
        />
      )}
    />
  );
}
