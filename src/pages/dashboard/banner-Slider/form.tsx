import FileUploadInput from '@/components/FileUploadInput'
import FormBtns from '@/components/FormBtn'
import TxtInput from '@/components/TxtInput'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { createBannerSlider, editBannerSlider } from '@/lib/Banner-Slider'
import { BannerSliderFields, BannerSliderFormFields } from '@/types/bannerSlider'
import { AllowedAction, HandleControls, ShowToastFunction } from '@/types/common'
import { limitOfPage } from '@/utils/constants'
import React, { Dispatch, useEffect, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { txtFieldValidation } from '@/utils/form.validation'

type Props = {
  handleClose: () => void
  entity: BannerSliderFields
  getData: () => void
  setHandleControls: Dispatch<SetStateAction<HandleControls>>
  type: AllowedAction
  open: boolean
}

const BannerSliderForm = ({
  handleClose,
  entity,
  setHandleControls,
  getData,
  type,
  open,
}: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast() as ShowToastFunction
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { control, handleSubmit, setValue, formState, reset } = useForm({
    defaultValues: {
      title: '',
      image: '',
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

  const onSubmitHandle = async (data: BannerSliderFormFields) => {
    if (type === 'ADD') {
      const res = await createBannerSlider(setLoading, showToast, handleClose, data)
      if (res) {
        reset()
        setHandleControls({
          search: '',
          currentPage: 1,
          limitPerPage: limitOfPage,
          sort: 'createdAt',
          sortOrder: 'asc',
        })
        await getData()
      }
    } else if (type === 'EDIT') {
      const res = await editBannerSlider(setLoading, showToast, handleClose, data, entity._id)
      if (res) {
        reset()
        setHandleControls({
          search: '',
          currentPage: 1,
          limitPerPage: limitOfPage,
          sort: 'createdAt',
          sortOrder: 'asc',
        })
        await getData()
      }
    } else {
      return
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setImageUrl(url)
      setValue('image', selectedFile)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
        <FileUploadInput
          imageUrl={'image'}
          setImageUrl={setImageUrl}
          handleFileChange={handleFileChange}
          editable={true}
        />
      </div>
      <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='title'
          placeholder='Enter title'
          validation={{ ...txtFieldValidation(true, 'ShortName') }}
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
