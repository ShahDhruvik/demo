import FormBtns from '@/components/FormBtn'
import NumInput from '@/components/NumInput'
import { useEffect } from 'react'
import { SearchDDL, TableStates, tnCArray } from '@/types/common'
import { PackagesArray, TABLE_STATES, TreatmentPackageTypes } from '@/utils/constants'
import {
  acDefaultValue,
  dateSelectValidation,
  numberFieldValidation,
  searchSelectValidation,
  txtFieldValidation,
} from '@/utils/form.validation'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { CountryData, PincodeFields } from '@/types/location'
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
import { TNCData, TNCFields } from '@/types/termsAndCondition'
import SelectInput from '@/components/SelectInput'
import { DateInput } from '@/components/DateInput'
import { createTNC } from '@/lib/termsAndCon'
import { dropdownCountry } from '@/lib/Country'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: TNCData
  getModifiedData: () => void
}

const TNCForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [countries, setCountries] = useState<SearchDDL[]>([])

  //API's
  const getCountries = async () => {
    const data = (await dropdownCountry(setLoading, showToast)) as CountryData[]
    const con: SearchDDL[] = [acDefaultValue]
    data.map((x) => {
      const conItem: SearchDDL = { label: `${x.name}`, _id: x._id }
      con.push(conItem)
    })
    setCountries(con)
  }
  useEffect(() => {
    getCountries()
  }, [])

  //form
  const { control, handleSubmit, formState, reset, watch, setValue, clearErrors, setError } =
    useForm({
      defaultValues: {
        name: acDefaultValue,
        countryIds: [] as SearchDDL[],
        description: '',
        effectiveDate: null,
        revisionDate: null,
        header: '',
        image: null,
        revisionVersion: '',
      } as TNCFields,
    })

  const { fields, replace } = useFieldArray({
    control: control,
    name: 'countryIds',
    rules: { validate: (val) => val.length !== 0 || 'Select countries' },
  })

  //Validation

  const { isSubmitting, errors } = formState
  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createTNC(setLoading, showToast, data)
        if (res) {
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

  //File onChange
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setImageUrl(url)
      setValue('image', selectedFile)
    }
  }

  // Reset form on open close if ADD
  useEffect(() => {
    if (type === TABLE_STATES.ADD) {
      reset()
    }
  }, [open])

  // handle type of packages

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='px-5 mb-5'>
        <div className='flex items-center gap-10 justify-center'>
          <ImageUploadInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleFileChange={handleFileChange}
          />
          <div className='flex-1 grid grid-cols-auto-fit gap-5'>
            <SelectInput
              clearErrors={clearErrors}
              control={control}
              label='Name*'
              name='name'
              options={tnCArray}
              setError={setError}
              setValue={setValue}
              validation={searchSelectValidation('name')}
            />
            <TxtInput
              control={control}
              handleChange={() => {}}
              name='header'
              placeholder='Enter header'
              validation={txtFieldValidation(true)}
              label='Header'
            />

            <DateInput
              clearErrors={clearErrors}
              control={control}
              handleChange={() => {}}
              label='Effective Date'
              name='effectiveDate'
              setError={setError}
              validation={dateSelectValidation('Effective Date')}
            />
            <DateInput
              clearErrors={clearErrors}
              control={control}
              handleChange={() => {}}
              label='Revision Date'
              name='revisionDate'
              setError={setError}
              validation={dateSelectValidation('Revision Date')}
            />
            <TxtInput
              control={control}
              handleChange={() => {}}
              name='revisionVersion'
              placeholder='Enter revision version'
              validation={numberFieldValidation(true, 100)}
              label='Revision Version'
            />
          </div>
        </div>
        <div className='grid grid-cols-auto-fit gap-5 mt-10'>
          <MultiSelectInput
            fields={fields}
            label='Country'
            options={countries}
            replace={replace}
            validation={{}}
            errors={errors.countryIds as any}
            name='countryIds'
            clearErrors={clearErrors}
            setError={setError}
            errMessage={'Select Country'}
            isPadding={true}
          />
          <TxtInput
            control={control}
            handleChange={() => {}}
            name='description'
            placeholder='Enter description'
            validation={txtFieldValidation(true)}
            label='Description'
            multiline={2.2}
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

export default TNCForm
