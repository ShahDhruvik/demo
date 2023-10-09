import FormBtns from '@/components/FormBtn'
import NumInput from '@/components/NumInput'
import { useEffect } from 'react'
import { SearchDDL, TableStates } from '@/types/common'
import { TABLE_STATES } from '@/utils/constants'
import { acDefaultValue, numberFieldValidation, txtFieldValidation } from '@/utils/form.validation'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { PincodeFields } from '@/types/location'
import { useToast } from '@/hooks/useToast'
import { useState } from 'react'
import CheckInput from '@/components/CheckInput'
import MultiTxtInput from '@/components/MultiTxtInput'
import TxtInput from '@/components/TxtInput'
import { Divider } from '@mui/material'
import { theme } from '@/context/ThemeProvider'
import ImageUploadInput from '@/components/ImageInput'
import MultiSelectInput from '@/components/MultiselectInput'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: any
  getModifiedData: () => void
}

const PackageForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  //form
  const { control, handleSubmit, formState, reset, watch, clearErrors, setError, setValue } =
    useForm({
      defaultValues: {
        title: '',
        price: '',
        discount: '',
        tag: '',
        description: '',
        isPremium: true,
        isParent: true,
        isInternal: true,
        points: [],
        packageImage: null,
        packages: [] as SearchDDL[],
      } as { title: string; points: string[]; packageImage: File | null; packages: SearchDDL[] },
    })
  const { fields, replace } = useFieldArray({
    control: control,
    name: 'packages',
  })
  const points = watch('points', [])
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    console.log(data)
    // handleClose()
    // switch (type) {
    //   case TABLE_STATES.ADD:
    //     const res = await createCity(setLoading, showToast, data)
    //     if (res) {
    //       reset()
    //       getModifiedData()
    //     } else {
    //       reset()
    //     }
    //     break
    //   case TABLE_STATES.EDIT:
    //     const resp = await editCity(setLoading, showToast, data, entity._id)
    //     if (resp) {
    //       reset()
    //       getModifiedData()
    //     } else {
    //       reset()
    //     }
    //     break
    //   default:
    //     break
    // }
  }
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setImageUrl(url)
      setValue('packageImage', selectedFile)
    }
  }
  //setting the entity on edit
  useEffect(() => {
    if (entity) {
      // reset({
      //   value: entity.value,
      //   isAvailable: entity.isAvailable,
      //   stateId: { label: entity.stateId, _id: entity.state },
      //   countryId: { label: entity.countryId, _id: entity.country },
      //   cityId: { label: entity.cityId, _id: entity.city },
      // })
    } else {
      reset()
    }
  }, [entity])

  // Reset form on open close if ADD
  useEffect(() => {
    if (type === TABLE_STATES.ADD) {
      reset()
    }
  }, [open])

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='mb-5 px-5'>
        <ImageUploadInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          handleFileChange={handleFileChange}
        />
        <MultiSelectInput
          fields={fields}
          label='Packages'
          options={[
            { _id: '0', label: 'hello' },
            { _id: '1', label: 'helloojn' },
          ]}
          replace={replace}
          validation={{}}
        />
      </div>
      <div className='px-5 grid grid-cols-auto-fit gap-5 mb-5'>
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='title'
          placeholder='Enter title'
          validation={txtFieldValidation(true)}
          label='Title'
        />
        <NumInput
          control={control}
          handleChange={() => {}}
          name='price'
          placeholder='Enter price'
          validation={numberFieldValidation(true, 100)}
          label='Price'
        />
        <NumInput
          control={control}
          handleChange={() => {}}
          name='discount'
          placeholder='Enter discount'
          validation={numberFieldValidation(true, 3)}
          label='Discount'
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='tag'
          placeholder='Enter tag'
          validation={txtFieldValidation(true)}
          label='Tag'
        />
        <div className='grid grid-cols-3'>
          <CheckInput control={control} name='isPremium' label='premium' />
          <CheckInput control={control} name='isParent' label='parent' />
          <CheckInput control={control} name='isInternal' label='internal' />
        </div>
      </div>
      <div className='px-5 mb-5 flex flex-col gap-5'>
        <h1 className='text-xl font-semibold '>Points & Description</h1>
        <Divider
          sx={{
            border: '1px solid',
            borderColor: theme.palette.mPink?.main,
          }}
        />
        <MultiTxtInput
          control={control}
          entries={points}
          name='points'
          setValue={setValue}
          placeholder='Type and enter to add points'
          label='Points'
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='description'
          placeholder='Enter description'
          validation={txtFieldValidation(true, 'Description')}
          multiline={7}
          label='Description'
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

export default PackageForm
