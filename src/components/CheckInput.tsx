import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  FormLabel,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { useToast } from '@/hooks/useToast'
import FetchSvg from './fetchSvg'
import { ReactNode } from 'react'
type Props = {
  name: string
  control: Control<any> | undefined
  label: FormControlLabelProps['label']
  handleToggle?: (check: boolean) => void
  sxProps?: SxProps<Theme>
}

const CheckInput = ({ control, name, label, handleToggle, sxProps }: Props) => {
  const shoeToast = useToast()
  return (
    <div className='flex items-center '>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const { onChange: fieldOnChange, ...rest } = field
          return (
            <div className=''>
              <Checkbox
                {...rest}
                onChange={(e, checked) => {
                  fieldOnChange(e)
                  if (handleToggle) {
                    handleToggle(checked)
                  }
                }}
                checkedIcon={
                  <FetchSvg iconName='check-box' svgProp={{ width: '1rem', height: '1rem' }} />
                }
                checked={field.value ?? false}
                indeterminateIcon={
                  <FetchSvg iconName='check-box' svgProp={{ width: '1rem', height: '1rem' }} />
                }
                icon={<div className='h-4 aspect-square  border-[2px] border-black-main'></div>}
                sx={{
                  maxWidth: 'max-content',
                }}
              />
              <FormHelperText>{fieldState.invalid ?? fieldState.error?.message}</FormHelperText>
            </div>
          )
        }}
        rules={{}}
      />
      <FormLabel
        sx={{
          ...(sxProps ? sxProps : {}),
        }}
      >
        {label}
      </FormLabel>
    </div>
  )
}

export default CheckInput
