import { SxProps, TextField, Theme } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
type Props = {
  placeholder: string
  name: string
  control: Control<any> | undefined
  handleChange: () => void
  validation: any
  isDisabled?: boolean
  sx?: SxProps<Theme>
  label: string
}

const NumInput = ({
  placeholder,
  name,
  control,
  handleChange,
  validation,
  isDisabled,
  sx,
  label,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, ...rest } = field
        return (
          <TextField
            {...rest}
            onChange={(e) => {
              onChange(e)
              handleChange()
            }}
            label={label}
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
            error={fieldState.invalid}
            helperText={fieldState.error?.message || ''}
            disabled={isDisabled ?? false}
            sx={inputStyleProps}
            inputProps={{
              type: 'number',
            }}
          />
        )
      }}
      rules={validation}
    />
  )
}

export default NumInput
