import { Autocomplete, TextField, MenuItem, Tooltip, SxProps, Theme } from '@mui/material'
import SvgIcon from './fetchSvg'
import { splitDescription } from '../utils/constants'
import { SearchDDL } from '../types/common'

type Props = {
  options: SearchDDL[]
  label: string
  validation: any
  notRequired?: boolean
  tooltip?: { isTooltip: boolean; length: number }
  sx?: SxProps<Theme>
  fields: SearchDDL[]
  replace: any
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
        }}
        selected={selected ? true : false}
      >
        {option.label}
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
          }}
          selected={selected ? true : false}
        >
          {splitDescription(option.label, length)}
        </MenuItem>
      </Tooltip>
    )
  }
}
const MultiSelectInput = ({ label, tooltip, options, sx, fields, replace }: Props) => {
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
          } else {
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
            error={fields.length === 0}
            placeholder={`Select ${label}`}
            helperText={fields.length === 0 ? `Select ${label}` : ''}
            label={label}
            InputLabelProps={{ shrink: true }}
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
