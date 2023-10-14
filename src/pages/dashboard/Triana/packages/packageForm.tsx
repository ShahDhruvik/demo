import FormBtns from '@/components/FormBtn'
import NumInput from '@/components/NumInput'
import { useEffect } from 'react'
import { SearchDDL, TableStates } from '@/types/common'
import { PackagesArray, TABLE_STATES, TreatmentPackageTypes } from '@/utils/constants'
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
import RadioInput from '@/components/RadioInput'
import { PackageData, PackageFields } from '@/types/package'
import { createPackage, dropdownPackage, editPackage } from '@/lib/Packages'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: PackageData
  getModifiedData: () => void
}

const PackageForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [premiumPackages, setPremiumPackages] = useState<SearchDDL[]>([])

  //form
  const { control, handleSubmit, formState, reset, watch, setValue, clearErrors, setError } =
    useForm({
      defaultValues: {
        title: '',
        price: '',
        discount: '',
        tag: [],
        description: '',
        points: [],
        isInternal: false,
        isParent: true,
        isPremium: false,
        packageImage: null,
        packages: [] as SearchDDL[],
      } as PackageFields,
    })
  const internal = watch('isInternal')
  const parent = watch('isParent')
  const premium = watch('isPremium')
  //Validation
  const packageValidation = (val: SearchDDL[], parent: boolean, premium: boolean) => {
    if (parent && premium) {
      return val.length !== 0 || 'Select packages'
    } else {
      return true
    }
  }
  const { fields, replace } = useFieldArray({
    control: control,
    name: 'packages',
    rules: { validate: (val) => packageValidation(val, parent, premium) },
  })
  const points = watch('points', [])
  const tags = watch('tag', [])
  const { isSubmitting, errors } = formState
  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    if (!parent && !premium && !internal) {
      setError('isParent', { type: 'required', message: 'check any one from above' })
      return
    } else {
      handleClose()
      switch (type) {
        case TABLE_STATES.ADD:
          const res = await createPackage(setLoading, showToast, data)
          if (res) {
            reset()
            getModifiedData()
          } else {
            reset()
          }
          break
        case TABLE_STATES.EDIT:
          const resp = await editPackage(setLoading, showToast, data, entity._id)
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
  }
  //API
  const getPackage = async () => {
    const data = (await dropdownPackage(setLoading, showToast, {
      isPremium: true,
      isParent: false,
      isInternal: false,
    })) as PackageData[]
    const pack: SearchDDL[] = []
    data.map((x) => {
      const packItem: SearchDDL = { label: `${x.title}`, _id: x._id }
      pack.push(packItem)
    })
    setPremiumPackages(pack)
  }
  //File onChange
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
      reset({
        packageImage: null,
        title: entity.title,
        price: entity.price,
        discount: entity.discount,
        tag: entity.tag,
        isInternal: entity.isInternal,
        isParent: entity.isParent,
        isPremium: entity.isPremium,
        packages: entity.packages.map((x) => {
          return { label: x.title, _id: x._id }
        }),
        points: entity.points,
        description: entity.description,
      })
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
  useEffect(() => {
    getPackage()
  }, [])
  // handle type of packages
  const handleInternal = () => {
    if (parent && premium) {
      reset((formValues) => {
        return { ...formValues, isParent: false, isPremium: false }
      })
    } else if (parent) {
      reset((formValues) => {
        return { ...formValues, isParent: false }
      })
    } else if (premium) {
      reset((formValues) => {
        return { ...formValues, isPremium: false }
      })
    } else {
      reset((formValues) => {
        return { ...formValues }
      })
    }
  }
  const handlePremium = () => {
    clearErrors('packages')
    if (internal) {
      reset((formValues) => {
        return { ...formValues, isInternal: false }
      })
    } else {
      reset((formValues) => {
        return { ...formValues }
      })
    }
  }
  const handleParent = () => {
    clearErrors('packages')
    if (internal) {
      reset((formValues) => {
        return { ...formValues, isInternal: false }
      })
    } else {
      reset((formValues) => {
        return { ...formValues }
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)} className='flex flex-col flex-1'>
      <div className='flex-1'>
        <div className='px-5 grid grid-cols-3 gap-5 mb-5'>
          <div className='flex flex-col items-center '>
            <ImageUploadInput
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              handleFileChange={handleFileChange}
            />
            <div className='mt-4'>
              <div className=' flex gap-3 '>
                <CheckInput
                  control={control}
                  label='Parent'
                  name='isParent'
                  handleToggle={handleParent}
                />
                <CheckInput
                  control={control}
                  label='Premiuim'
                  name='isPremium'
                  handleToggle={handlePremium}
                />
                <CheckInput
                  control={control}
                  label='Internal'
                  name='isInternal'
                  handleToggle={handleInternal}
                />
              </div>
              <p className='text-lightOrange-main'>
                {errors.isParent ? errors.isParent.message : ''}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
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
              validation={numberFieldValidation(true)}
              label='Discount'
            />
          </div>
          <div className='flex flex-col gap-5'>
            <MultiTxtInput
              control={control}
              entries={tags}
              name='tag'
              setValue={setValue}
              placeholder='Type and enter to add tags'
              label='Tags'
              isInsideTag={true}
            />
            {parent && premium && (
              <MultiSelectInput
                fields={fields}
                label='Packages'
                options={premiumPackages}
                replace={replace}
                validation={{}}
                errors={errors.packages as any}
                name='packages'
                clearErrors={clearErrors}
                setError={setError}
                errMessage={'Select Packages'}
                isPadding={true}
              />
            )}
          </div>
        </div>
        <div className='px-5 mb-5'>
          <h1 className='text-xl font-semibold '>Points & Description</h1>
          <Divider
            sx={{
              border: '1px solid',
              borderColor: theme.palette.mPink?.main,
            }}
          />
        </div>
        <div className='px-5 mb-5 flex  gap-5'>
          <MultiTxtInput
            control={control}
            entries={points}
            name='points'
            setValue={setValue}
            placeholder='Type and enter to add points'
            label='Points'
            isInsideTag={false}
          />
          <TxtInput
            control={control}
            handleChange={() => {}}
            name='description'
            placeholder='Enter description'
            validation={txtFieldValidation(true, 'Description')}
            multiline={6}
            label='Description'
          />
        </div>
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
