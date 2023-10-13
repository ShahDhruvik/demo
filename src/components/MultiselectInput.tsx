import {
  Autocomplete,
  TextField,
  MenuItem,
  Tooltip,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import SvgIcon from './fetchSvg'
import { splitDescription } from '../utils/constants'
import { SearchDDL } from '../types/common'
import { FieldErrors, UseFormClearErrors, UseFormSetError } from 'react-hook-form'
import FetchSvg from './fetchSvg'

type Props = {
  options: SearchDDL[]
  label: string
  validation: any
  notRequired?: boolean
  tooltip?: { isTooltip: boolean; length: number }
  sx?: SxProps<Theme>
  fields: SearchDDL[]
  replace: any
  errors: FieldErrors<any>
  setError: UseFormSetError<any>
  clearErrors: UseFormClearErrors<any>
  name: string
  errMessage: string
  isPadding: boolean
}

const listBoxPropsDropdown = () => {
  return {
    sx: {
      maxHeight: 300,
      overflow: 'auto',
      '&& .Mui-selected': {
        backgroundColor: 'rgba(226, 0, 116, 0.7) !important',
        fontWeight: '500 !important',
      },
    },
    className: 'scrollBarNone',
  }
}
const ListItemDropdown = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: any,
  fields: SearchDDL[],
  isSplitTrue: boolean,
  length: number,
) => {
  const selected = fields.find((x) => x._id === option._id)
  if (option.label.length < 13 || !isSplitTrue || isSplitTrue === undefined) {
    return (
      <MenuItem
        {...props}
        key={option._id}
        sx={{
          color: 'black',
          fontWeight: selected ? '500' : '300',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          minWidth: '100%',
        }}
        selected={selected ? true : false}
      >
        <Typography sx={{ flexGrow: 1 }}>{option.label}</Typography>
        {selected && <FetchSvg iconName='check' />}
      </MenuItem>
    )
  } else {
    return (
      <Tooltip title={option.label} placement='right-end' arrow key={option._id}>
        <MenuItem
          {...props}
          key={option._id}
          sx={{
            color: 'black',
            fontWeight: '300',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          selected={selected ? true : false}
        >
          <Typography sx={{ flexGrow: 1 }}>{splitDescription(option.label, length)}</Typography>
          {selected && <FetchSvg iconName='check' />}
        </MenuItem>
      </Tooltip>
    )
  }
}
const MultiSelectInput = ({
  label,
  tooltip,
  options,
  sx,
  fields,
  replace,
  errors,
  setError,
  clearErrors,
  name,
  errMessage,
  isPadding,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }

  return (
    <Autocomplete
      multiple={true}
      sx={{
        ...inputStyleProps,
        '.MuiOutlinedInput-root': {
          py: 1,
        },
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      options={options}
      disableClearable
      onChange={(e, val) => {
        if (val !== null) {
          if (val.length === 0) {
            replace([])
            setError(name, { type: 'validate' })
          } else {
            clearErrors(name)
            replace(val)
          }
        } else {
          replace([])
        }
      }}
      value={fields}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            error={errors ? true : false}
            placeholder={`Select ${label}`}
            helperText={errors ? `${errMessage}` : ''}
            label={label}
            InputLabelProps={{ shrink: true }}
            multiline={isPadding}
            minRows={isPadding ? 3 : 0}
          />
        )
      }}
      ListboxProps={listBoxPropsDropdown()}
      renderOption={(props, option) =>
        ListItemDropdown(
          props,
          option,
          fields,
          tooltip ? tooltip.isTooltip : false,
          tooltip ? tooltip.length : 13,
        )
      }
      popupIcon={<SvgIcon iconName='select-arrow' svgProp={{ width: 24, height: 24 }} />}
    />
  )
}

export default MultiSelectInput
