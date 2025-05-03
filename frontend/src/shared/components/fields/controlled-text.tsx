import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField, TextFieldProps } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface IControlledTextProps
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {
  mask?: string | Array<{ mask: string }>;
  maxLength?: number;
  disabledErrorOnValue?: boolean;
}

const TextMask = forwardRef<HTMLInputElement, any>(
  function TextMask(props, ref) {
    const { onChange, mask, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        unmask={true}
        onAccept={(value, _mask) => onChange(value)}
        inputRef={ref}
      />
    );
  },
);

export function ControlledText({
  fullWidth = true,
  size = 'small',
  mask,
  ...props
}: IControlledTextProps) {
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
      minRows={props.minRows ?? 4}
      value={field.value ?? ''}
      error={props.error ?? !!error}
      helperText={props.error ?? error?.message}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          inputComponent: mask ? TextMask : undefined,
          inputProps: { mask },
        },
      }}
    />
  );
}
