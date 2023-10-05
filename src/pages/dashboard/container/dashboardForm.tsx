import FormBtns from '@/components/FormBtn'
import TxtInput from '@/components/TxtInput'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  handleClose: () => void
}

const DashboardForm = ({ handleClose }: Props) => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: '',
    },
  })
  const { isSubmitting } = formState
  const onSubmitHandle = (data: any) => {
    console.log(data)
  }
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
          name='name'
          placeholder='Enter name'
          validation={{}}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='name'
          placeholder='Enter name'
          validation={{}}
        />
      </div>
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

export default DashboardForm
