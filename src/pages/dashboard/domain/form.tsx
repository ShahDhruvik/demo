import FormBtns from '@/components/FormBtn'
import TxtInput from '@/components/TxtInput'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { TableStates } from '@/types/common'
import { TABLE_STATES } from '@/utils/constants'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { txtFieldValidation } from '@/utils/form.validation'
import { DomainFields, DomainFormFields } from '@/types/domain'
import { createDomain, editDomain } from '@/lib/Domain'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: DomainFields
  getModifiedData: () => void
}

const DomainForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { control, handleSubmit, setValue, formState, reset } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  })
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<DomainFormFields> = async (data: any) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createDomain(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editDomain(setLoading, showToast, data, entity._id)
        if (resp) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (entity) {
      setValue('title', entity?.title)
      setValue('description', entity?.description)
    } else {
      reset()
    }
  }, [entity])

  useEffect(() => {
    if (type === 'ADD') {
      reset()
    }
  }, [open])

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='title'
          placeholder='Enter title'
          validation={{ ...txtFieldValidation(true) }}
          label='Title*'
        />
      </div>
      <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='description'
          placeholder='Enter description'
          validation={{ ...txtFieldValidation(false, 'Description') }}
          label='Description'
          multiline={5}
        />
      </div>
      <FormBtns
        approvalFnc={() => {}}
        approvalTxt={type === TABLE_STATES.ADD ? 'Add' : 'Edit'}
        cancelFnc={handleClose}
        cancelTxt='Cancel'
        formSubmitting={isSubmitting}
        isSubmit={true}
      />
    </form>
  )
}

export default DomainForm
