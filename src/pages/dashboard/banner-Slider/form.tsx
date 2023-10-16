import FileUploadInput from '@/components/FileUploadInput'
import FormBtns from '@/components/FormBtn'
import TxtInput from '@/components/TxtInput'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { createBannerSlider, editBannerSlider } from '@/lib/Banner-Slider'
import { BannerSliderFields, BannerSliderFormFields } from '@/types/bannerSlider'
import { AllowedAction, HandleControls, ShowToastFunction, TableStates } from '@/types/common'
import { TABLE_STATES, limitOfPage } from '@/utils/constants'
import React, { Dispatch, useEffect, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { txtFieldValidation } from '@/utils/form.validation'
import ImageUploadInput from '@/components/ImageInput'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: BannerSliderFormFields
  getModifiedData: () => void
}

const BannerSliderForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { control, handleSubmit, setValue, formState, reset } = useForm({
    defaultValues: {
      title: '',
      image: null,
    },
  })
  const { isSubmitting } = formState

  useEffect(() => {
    if (entity) {
      setValue('title', entity?.title)
      setValue('image', entity?.image)
    } else {
      reset()
    }
  }, [entity])

  useEffect(() => {
    if (type === 'ADD') {
      reset()
    }
  }, [open])

  const onSubmitHandle: SubmitHandler<BannerSliderFormFields> = async (data) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createBannerSlider(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editBannerSlider(setLoading, showToast, data, entity._id)
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setImageUrl(String(url))
      setValue('image', selectedFile as string)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='px-5 flex justify-center gap-3 mb-5'>
        {/* <FileUploadInput
          imageUrl={'image'}
          setImageUrl={setImageUrl}
          handleFileChange={handleFileChange}
          editable={true}
        /> */}
        <ImageUploadInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          handleFileChange={handleFileChange}
        />
      </div>
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

export default BannerSliderForm
