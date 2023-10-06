import FormBtns from '@/components/FormBtn'
import TxtInput from '@/components/TxtInput'
import FetchSvg from '@/components/fetchSvg'
import { theme } from '@/context/ThemeProvider'
import { Button, Divider } from '@mui/material'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

type Props = {
  handleClose: () => void
}

export type StatesField = {
  name: string
  shortName: string
}
export type CountryFields = {
  name: string
  shortName: string
  isoCode: string
  code: number
  states: StatesField[]
}

const CountryForm = ({ handleClose }: Props) => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: '',
      shortName: '',
      isoCode: '',
      code: '',
      states: [] as CountryFields['states'],
    },
  })
  const { isSubmitting } = formState
  const onSubmitHandle = (data: any) => {
    console.log(data)
  }
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'states',
  })
  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='name'
          placeholder='Enter name'
          validation={{}}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='shortName'
          placeholder='Enter short name'
          validation={{}}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='isoCode'
          placeholder='Enter iso code'
          validation={{}}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='code'
          placeholder='Enter code'
          validation={{}}
        />
      </div>
      <div className='px-5 flex items-center justify-between  gap-3 mb-3'>
        <h1 className='text-xl font-semibold'>States</h1>
        <Button
          color='mPink'
          sx={{
            minWidth: 'max-content',
          }}
          onClick={() => append({ name: '', shortName: '' })}
        >
          <FetchSvg iconName='add' svgProp={{ width: 20, height: 20 }} />
        </Button>
      </div>
      <Divider
        sx={{
          border: '1px solid',
          borderColor: theme.palette.mPink?.main,
          marginBottom: '12px',
          mx: '10px',
        }}
      />
      <div className='px-5 grid  gap-3 mb-5'>
        {fields.map((x, i) => {
          return (
            <div className='flex items-center gap-3 '>
              <TxtInput
                control={control}
                handleChange={() => {}}
                name={`states.${i}.name`}
                placeholder='Enter name'
                validation={{}}
                sx={{
                  flexGrow: 0.5,
                }}
              />
              <TxtInput
                control={control}
                handleChange={() => {}}
                name={`states.${i}.shortName`}
                placeholder='Enter short name'
                validation={{}}
                sx={{
                  flexGrow: 0.5,
                }}
              />
              <Button
                color='mPink'
                sx={{
                  minWidth: 'max-content',
                  maxHeight: 30,
                }}
                onClick={() => remove(i)}
              >
                <FetchSvg iconName='subtract' svgProp={{ width: 20, height: 20 }} />
              </Button>
            </div>
          )
        })}
      </div>
      {/* <Divider sx={{ border: '1px solid', borderColor: theme.palette.mPink?.main, my: '12px' }} /> */}
      <FormBtns
        approvalFnc={() => {}}
        approvalTxt='Add'
        cancelFnc={handleClose}
        cancelTxt='Cancel'
        formSubmitting={isSubmitting}
        isSubmit={true}
      />
    </form>
  )
}

export default CountryForm
