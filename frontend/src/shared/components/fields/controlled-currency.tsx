import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField, TextFieldProps, Typography } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface IControlledCurrencyProps
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

const CurrencyMask = forwardRef<HTMLInputElement, any>(
  function CurrencyMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={Number}
        scale={2}
        radix=","
        thousandsSeparator="."
        padFractionalZeros={true}
        normalizeZeros={true}
        mapToRadix={['.']}
        unmask={true}
        onAccept={(value) => onChange(value)}
        inputRef={ref}
      />
    );
  },
);

export function ControlledCurrency({
  fullWidth = true,
  size = 'small',
  ...props
}: IControlledCurrencyProps) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <TextField
      {...props}
      {...field}
      size={size}
      fullWidth={fullWidth}
      error={props.error ?? !!error}
      helperText={props.error ?? error?.message}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          inputComponent: CurrencyMask,
          startAdornment: (
            <Typography variant="body1" marginRight={1}>
              R$
            </Typography>
          ),
        },
      }}
    />
  );
}
