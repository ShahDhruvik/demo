import { Autocomplete, Chip, TextField } from '@mui/material'
import React from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'

type Props = {
  entries: string[]
  name: string
  control: Control<any> | undefined
  setValue: UseFormSetValue<any>
  placeholder: string
  label: string
}

const MultiTxtInput = ({ entries, name, control, setValue, placeholder, label }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple={true}
            freeSolo={true}
            renderTags={() => null}
            options={[]}
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                fullWidth
                placeholder={placeholder}
                label={label}
                InputLabelProps={{ shrink: true }}
              />
            )}
            clearIcon={true}
          />
        )}
      />
      <div className='min-h-[100px] max-h-[200px] border-2 flex flex-wrap gap-2 overflow-y-scroll scrollBar border-gray-main rounded-lg mb-3 p-2'>
        {entries.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() =>
              setValue(
                name,
                entries.filter((t) => t !== tag),
              )
            }
            variant='outlined'
          />
        ))}
      </div>
    </div>
  )
}

export default MultiTxtInput
