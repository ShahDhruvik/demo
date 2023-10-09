import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller } from 'react-hook-form'
import { enGB } from 'date-fns/locale'
import { useState } from 'react'
import { theme } from '../context/ThemeProvider'
import { SxProps, Theme } from '@mui/material'

type Props = {
  name: string
  control: any
  label: string
  setError: any
  clearErrors: any
  validation: any
  minDate?: Date | null
  handleChange: () => void
  isDisabled?: boolean
  sx?: SxProps<Theme>
}

export const DateInput = ({
  name,
  control,
  label,
  setError,
  clearErrors,
  validation,
  minDate,
  handleChange,
  isDisabled,
  sx,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }
  const [OpenClender, setOpenClender] = useState(false)
  const pickerProps = {
    minDate,
  }
  const onKeyDown = (e: any) => {
    e.preventDefault()
    setOpenClender(true)
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ clearButtonLabel: 'Clear' }}
      adapterLocale={enGB}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState }) => (
          <DatePicker
            open={OpenClender}
            onClose={() => setOpenClender(false)}
            onChange={(e, val) => {
              onChange(e)
              handleChange()
              if (val === undefined) {
                setError(name, {
                  type: 'validate',
                  message: `Select ${label}`,
                })
              } else {
                console.log(val, e)
                clearErrors(name)
              }
            }}
            {...pickerProps}
            value={value}
            reduceAnimations
            slotProps={{
              textField: {
                error: fieldState.invalid,
                helperText: fieldState.error?.message ?? '',
                InputLabelProps: { shrink: true },
                onKeyDown: onKeyDown,
                onClick: () => setOpenClender(!OpenClender),
                placeholder: `Select ${label}`,
                disabled: isDisabled ?? false,
                sx: inputStyleProps,
                label: label,
              },
              actionBar: {
                actions: ['clear'],
                sx: {
                  '& .MuiButtonBase-root': {
                    color: 'white !important',
                    minWidth: 100,
                    maxWidth: 100,
                    maxHeight: 20,
                    background: theme.palette.mPink?.main,
                    ':hover': {
                      background: theme.palette.mPink?.main,
                    },
                  },
                },
              },
              popper: {
                sx: {
                  '& .MuiButtonBase-root.Mui-selected': {
                    color: 'white !important',
                    backgroundColor: 'rgba(226, 0, 116, 1) !important',
                  },
                },
              },
            }}
            // slots={{ openPickerIcon: () => <SvgIcon iconName='calender' /> }}
          />
        )}
        rules={validation}
      />
    </LocalizationProvider>
  )
}
