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
import { TreatmentFields } from '@/types/treatment'
import { createTreatment, editTreatment } from '@/lib/Treatment'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: PackageData
  getModifiedData: () => void
}

const TreatmentForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [packages, setPackages] = useState<SearchDDL[]>([])

  //form
  const { control, handleSubmit, formState, reset, watch, setValue, clearErrors, setError } =
    useForm({
      defaultValues: {
        title: '',
        packages: [] as SearchDDL[],
      } as TreatmentFields,
    })

  const { fields, replace } = useFieldArray({
    control: control,
    name: 'packages',
    rules: {
      validate: (val) => val.length !== 0 || 'Select packages',
    },
  })
  const { isSubmitting, errors } = formState
  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createTreatment(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editTreatment(setLoading, showToast, data, entity._id)
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
  //API
  const getPackage = async () => {
    const data = (await dropdownPackage(setLoading, showToast, {
      isParent: true,
    })) as PackageData[]
    const pack: SearchDDL[] = []
    data.map((x) => {
      const packItem: SearchDDL = { label: `${x.title}`, _id: x._id }
      pack.push(packItem)
    })
    setPackages(pack)
  }
  //setting the entity on edit
  useEffect(() => {
    if (entity) {
      reset({
        title: entity.title,
        packages: entity.packages.map((x) => {
          return { label: x.title, _id: x._id }
        }),
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

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)} className='flex flex-col flex-1'>
      <div className='px-5 grid grid-cols-auto-fit gap-5 mb-5 flex-1'>
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='title'
          placeholder='Enter title'
          validation={txtFieldValidation(true)}
          label='Title'
          sx={{
            '.MuiOutlinedInput-root': {
              py: 1,
            },
          }}
        />
        <MultiSelectInput
          fields={fields}
          label='Packages'
          options={packages}
          replace={replace}
          validation={{}}
          errors={errors.packages as any}
          name='packages'
          clearErrors={clearErrors}
          setError={setError}
          errMessage={'Select Packages'}
          isPadding={false}
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

export default TreatmentForm
