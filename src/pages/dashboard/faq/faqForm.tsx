import FormBtns from '@/components/FormBtn'
import TxtInput from '@/components/TxtInput'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { createFaq, editFaq } from '@/lib/Faq'
import { AllowedAction, HandleControls, TableStates } from '@/types/common'
import { FaqFields, FaqFormFields } from '@/types/faqTypes'
import { ACTIONS_TABLE, TABLES, TABLE_STATES, limitOfPage } from '@/utils/constants'
import React, { Dispatch, useEffect, SetStateAction, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { txtFieldValidation } from '@/utils/form.validation'
import RichTextEditor from 'react-rte'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: FaqFields
  getModifiedData: () => void
}

const FaqForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [val, setVal] = useState(RichTextEditor.createEmptyValue())
  const { control, handleSubmit, setValue, formState, reset } = useForm<FieldValues>({
    defaultValues: {
      question: '',
      answer: RichTextEditor.createEmptyValue(),
    },
  })
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<FaqFormFields> = async (data: any) => {
    // data.answer = val.toString('html')
    // if (type === ACTIONS_TABLE.ADD) {
    //   const res = await createFaq(setLoading, showToast, data)
    //   if (res) {
    //     reset()
    //     setHandleControls({
    //       search: '',
    //       currentPage: 1,
    //       limitPerPage: limitOfPage,
    //       sort: 'createdAt',
    //       sortOrder: 'asc',
    //     })
    //     await getData()
    //   }
    // } else if (type === ACTIONS_TABLE.EDIT) {
    //   const res = await editFaq(setLoading, showToast, handleClose, data, entity._id)
    //   if (res) {
    //     reset()
    //     setHandleControls({
    //       search: '',
    //       currentPage: 1,
    //       limitPerPage: limitOfPage,
    //       sort: 'createdAt',
    //       sortOrder: 'asc',
    //     })
    //     await getData()
    //   }
    // } else {
    //   return
    // }
    handleClose()
    data.answer = val.toString('html')
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createFaq(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editFaq(setLoading, showToast, data, entity._id)
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
      setValue('question', entity?.question)
      const answerValue = RichTextEditor.createValueFromString(entity?.answer, 'html')
      setVal(answerValue)
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
          name='question'
          placeholder='Enter question'
          validation={{ ...txtFieldValidation(true, 'Description') }}
          label='Question*'
        />
      </div>
      <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
        <RichTextEditor
          value={val}
          onChange={(newValue) => {
            setVal(newValue)
          }}
          className='min-h-[230px]'
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

export default FaqForm
