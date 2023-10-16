import FormBtns from '@/components/FormBtn'
import { useEffect } from 'react'
import { SearchDDL, TableStates } from '@/types/common'
import { TABLE_STATES, complianceArray } from '@/utils/constants'
import {
  acDefaultValue,
  dateSelectValidation,
  numberFieldValidation,
  searchSelectValidation,
  txtFieldValidation,
} from '@/utils/form.validation'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { CountryData } from '@/types/location'
import { useToast } from '@/hooks/useToast'
import { useState } from 'react'
import TxtInput from '@/components/TxtInput'
import ImageUploadInput from '@/components/ImageInput'
import MultiSelectInput from '@/components/MultiselectInput'
import { PackageData, PackageFields } from '@/types/package'
import SelectInput from '@/components/SelectInput'
import { DateInput } from '@/components/DateInput'
import { createTNC } from '@/lib/termsAndCon'
import { dropdownCountry } from '@/lib/Country'
import { ComplianceFields } from '@/types/compliance'
import RichTextEditor from 'react-rte'
import { createCompliance } from '@/lib/complaince'
import RTEInput from '@/components/RTEInput'
import { Button, Chip } from '@mui/material'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: PackageData
  getModifiedData: () => void
}

const ComplianceForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [countries, setCountries] = useState<SearchDDL[]>([])
  const [description, setDescription] = useState(RichTextEditor.createEmptyValue())

  //API's
  const getCountries = async () => {
    const data = (await dropdownCountry(setLoading, showToast)) as CountryData[]
    const con: SearchDDL[] = []
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
        description: [],
        revisionDate: null,
        header: '',
        image: null,
        revisionVersion: '',
      } as ComplianceFields,
    })

  const { fields, replace } = useFieldArray({
    control: control,
    name: 'countryIds',
    rules: { validate: (val) => val.length !== 0 || 'Select countries' },
  })
  const des = useFieldArray({
    control: control,
    name: 'description',
    // rules: { validate: (val) => val.length !== 0 || 'Select countries' },
  })

  //Validation
  const { isSubmitting, errors } = formState
  const onSubmitHandle: SubmitHandler<ComplianceFields> = async (data) => {
    console.log(data)
    // handleClose()
    // switch (type) {
    //   case TABLE_STATES.ADD:
    //     const res = await createCompliance(setLoading, showToast, data)
    //     if (res) {
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

  //second form
  const secondForm = useForm({
    defaultValues: {
      subHeader: '',
      descriptionX: RichTextEditor.createEmptyValue(),
    },
  })

  const onSubmitSecondForm: SubmitHandler<any> = async (data) => {
    des.replace([
      ...des.fields,
      { subHeader: data.subHeader, description: data.descriptionX.toString('html') },
    ])
    secondForm.reset()
  }
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
              options={complianceArray}
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
        <div className='flex flex-col gap-3 mt-5'>
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
            isPadding={false}
          />

          <div className='flex mt-5 gap-4'>
            <div className='px-5 bg-white-main py-3 rounded-md min-w-[300px] flex flex-col gap-2 max-h-[440px] overflow-y-scroll'>
              {des.fields.map((x) => {
                return (
                  <Chip
                    label={x.subHeader}
                    key={x.id}
                    sx={{
                      minHeight: '40px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderRadius: '7px',
                    }}
                    onDelete={() => {
                      const deleted = des.fields.filter((y) => y.id !== x.id)
                      des.replace(deleted)
                    }}
                  />
                )
              })}
            </div>
            <div className='flex-1'>
              <TxtInput
                control={secondForm.control}
                name='subHeader'
                handleChange={() => {}}
                label='Sub header*'
                placeholder='Enter sub header'
                validation={txtFieldValidation(true)}
              />
              <div>
                <p className='pl-2 mb-1 mt-4'> Description</p>
                <RTEInput name='descriptionX' control={secondForm.control} />
              </div>
              <div className='flex justify-end mt-2 mr-2 bg-white-main rounded-md py-2 px-2'>
                <Button
                  sx={{ minWidth: 'max-content', maxHeight: '20px' }}
                  color={'mPink'}
                  onClick={secondForm.handleSubmit(onSubmitSecondForm)}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
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

export default ComplianceForm
