import FormBtns from '@/components/FormBtn'
import { useEffect } from 'react'
import { SearchDDL, TableStates } from '@/types/common'
import { TABLE_STATES, tnCArray } from '@/utils/constants'
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
import { Button, Chip } from '@mui/material'
import ImageUploadInput from '@/components/ImageInput'
import MultiSelectInput from '@/components/MultiselectInput'
import { TNCData, TNCFields } from '@/types/termsAndCondition'
import SelectInput from '@/components/SelectInput'
import { DateInput } from '@/components/DateInput'
import { createTNC } from '@/lib/termsAndCon'
import { dropdownCountry } from '@/lib/Country'
import RichTextEditor from 'react-rte'
import RTEInput from '@/components/RTEInput'

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
  const des = useFieldArray({
    control: control,
    name: 'description',
    rules: { validate: (val) => val.length !== 0 || 'Create subheaders' },
  })
  //Validation

  const { isSubmitting, errors } = formState
  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    console.log(data)
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
  console.log(errors?.description?.message)
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
      { title: data.subHeader, description: data.descriptionX.toString('html') },
    ])
    secondForm.reset({
      subHeader: '',
      descriptionX: RichTextEditor.createEmptyValue(),
    })
    clearErrors('description')
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
            <div className='px-5 bg-white-main py-3 rounded-md min-w-[300px] flex flex-col gap-2 max-h-[380px] overflow-y-scroll scrollBar'>
              {errors.description && (
                <p className='text-lightOrange-main'>{`${
                  errors?.description.root?.message ?? errors?.description?.message
                }*`}</p>
              )}
              {des.fields.map((x, i) => {
                return (
                  <Chip
                    label={x.title}
                    key={x.id}
                    sx={{
                      minHeight: '40px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderRadius: '7px',
                    }}
                    onClick={() => {
                      secondForm.reset({
                        subHeader: x.title,
                        descriptionX: RichTextEditor.createValueFromString(x.description, 'html'),
                      })
                      const deleted = des.fields.filter((y) => y.id !== x.id)
                      des.replace(deleted)
                      if (deleted.length === 0) {
                        setError('description', { type: 'validate', message: 'Create Subheaders' })
                      }
                    }}
                    onDelete={() => {
                      const deleted = des.fields.filter((y) => y.id !== x.id)
                      des.replace(deleted)
                      if (deleted.length === 0) {
                        setError('description', { type: 'validate', message: 'Create Subheaders' })
                      }
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
              <div className='flex justify-end  mt-2 mr-2  rounded-md py-2 px-2'>
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

export default TNCForm
