import { InputAdornment, MenuItem, SxProps, TextField, Theme } from '@mui/material'
import { MobileSelect } from './MuiStyledComponents'
import { countryCodes } from '../utils/data'
import { Controller, Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { numberFieldValidation } from '../utils/form.validation'
type Props = {
  placeholder: string
  name: string
  control: Control<any> | undefined
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  handleChange: () => void
  isDisabled?: boolean
  sx?: SxProps<Theme>
  label: string
}

const MobileInput = ({
  placeholder,
  name,
  control,
  watch,
  setValue,
  handleChange,
  isDisabled,
  sx,
  label,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }

  const contryCode = watch('contryCode')
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
            sx={inputStyleProps}
            disabled={isDisabled ?? false}
            placeholder={placeholder}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MobileSelect
                    value={contryCode}
                    onChange={(e) => {
                      setValue('contryCode', e.target.value)
                    }}
                  >
                    {countryCodes.map((x) => {
                      return (
                        <MenuItem value={x} key={x}>
                          {x}
                        </MenuItem>
                      )
                    })}
                  </MobileSelect>
                </InputAdornment>
              ),
              sx: {
                paddingLeft: 0,
              },
            }}
            type='number'
            error={fieldState.invalid}
            helperText={fieldState.error?.message || ''}
          />
        )
      }}
      rules={{ ...numberFieldValidation(true, undefined, 'Phone') }}
    />
  )
}

export default MobileInput
