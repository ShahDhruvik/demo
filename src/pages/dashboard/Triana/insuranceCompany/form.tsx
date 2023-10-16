import FormBtns from '@/components/FormBtn'
import TxtInput from '@/components/TxtInput'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { createFaq, editFaq } from '@/lib/Faq'
import { AllowedAction, HandleControls, SearchDDL, TableStates } from '@/types/common'
import { FaqFields, FaqFormFields } from '@/types/faqTypes'
import { ACTIONS_TABLE, TABLES, TABLE_STATES, limitOfPage } from '@/utils/constants'
import React, { Dispatch, useEffect, SetStateAction, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import {
  txtFieldValidation,
  acDefaultValue,
  searchSelectValidation,
  numberFieldValidation,
} from '@/utils/form.validation'
import RichTextEditor from 'react-rte'
import { Plans, insuranceCompanyData, insuranceCompanyFields } from '@/types/insuranceCompany'
import { dropdownCity } from '@/lib/City'
import { dropdownState } from '@/lib/State'
import { CountryData, StateData } from '@/types/location'
import { dropdownCountry } from '@/lib/Country'
import SelectInput from '@/components/SelectInput'
import { createInsuranceCompany, dropdownPincode } from '@/lib/insuranceCompany'
import NumInput from '@/components/NumInput'
import MultiTxtInput from '@/components/MultiTxtInput'
import ImageUploadInput from '@/components/ImageInput'
import { Button, Divider, MenuItem } from '@mui/material'
import FetchSvg from '@/components/fetchSvg'
import { theme } from '@/context/ThemeProvider'
import { TextFieldCustom } from '@/components/MuiStyledComponents'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: insuranceCompanyData
  getModifiedData: () => void
}

enum CoverageTypeEnum {
  Dental = 'Dental',
  Vision = 'Vision',
  Drug = 'Drug',
  Health = 'Health',
}

const coverageType = [
  {
    _id: 1,
    label: CoverageTypeEnum.Dental,
  },
  {
    _id: 2,
    label: CoverageTypeEnum.Vision,
  },
  {
    _id: 3,
    label: CoverageTypeEnum.Drug,
  },
  {
    _id: 4,
    label: CoverageTypeEnum.Health,
  },
]

const InsuranceCompanyForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [countries, setCountries] = useState<SearchDDL[]>([])
  const [states, setStates] = useState<SearchDDL[]>([])
  const [cities, setCities] = useState<SearchDDL[]>([])
  const [pinCode, setPinCode] = useState<SearchDDL[]>([])
  const { control, handleSubmit, formState, reset, watch, clearErrors, setError, setValue } =
    useForm<FieldValues>({
      defaultValues: {
        name: '',
        addressLineOne: '',
        addressLineTwo: '',
        countryId: acDefaultValue,
        stateId: acDefaultValue,
        cityId: acDefaultValue,
        pinCodeId: acDefaultValue,
        // plans: [
        //   {
        //     coverageType: acDefaultValue,
        //     planNo: '',
        //     memberId: [],
        //   },
        // ],
        plans: [{ coverageType: acDefaultValue, planNo: '', memberId: [] }] as Plans[],
        // planNo: [],
        // memberId: [],
        description: '',
        contact: '',
        // coverageType: acDefaultValue,
        logo: '',
        website: '',
        fax: '',
        phone: '',
        email: '',
      } as insuranceCompanyFields,
    })
  const { isSubmitting } = formState

  const mem = watch('memberId', [])

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'plans',
  })

  const handleAppendClick = () => {
    append({ coverageType: acDefaultValue, planNo: '', memberId: [] })
  }

  const onSubmitHandle: SubmitHandler<insuranceCompanyFields> = async (data) => {
    console.log(data, 'data')

    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        // eslint-disable-next-line no-case-declarations
        const res = await createInsuranceCompany(setLoading, showToast, data)
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

  const conWatch = watch('countryId')
  const staWatch = watch('stateId')
  const pinWatch = watch('cityId')

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

  const getStates = async (conId: string) => {
    if (conId !== acDefaultValue._id) {
      const data = (await dropdownState(setLoading, showToast, conId)) as StateData[]
      const sta: SearchDDL[] = [acDefaultValue]
      data.map((x) => {
        const staItem: SearchDDL = { label: `${x.name}`, _id: x._id }
        sta.push(staItem)
      })
      setStates(sta)
    } else {
      setStates([])
    }
  }

  const getCities = async (staId: string) => {
    if (staId !== acDefaultValue._id) {
      const data = (await dropdownCity(setLoading, showToast, staId)) as any[]
      const cit: SearchDDL[] = [acDefaultValue]
      data.map((x) => {
        const citItem: SearchDDL = { label: `${x.name}`, _id: x._id }
        cit.push(citItem)
      })
      setCities(cit)
    } else {
      setCities([])
    }
  }

  const getPinCodes = async (citId: string) => {
    if (citId !== acDefaultValue._id) {
      const data = (await dropdownPincode(setLoading, showToast, citId)) as any[]
      const cit: SearchDDL[] = [acDefaultValue]
      data.map((x) => {
        const citItem: SearchDDL = { label: `${x.value}`, _id: x._id }
        cit.push(citItem)
      })
      setPinCode(cit)
    } else {
      setPinCode([])
    }
  }

  useEffect(() => {
    getCountries()
  }, [])
  useEffect(() => {
    getStates(conWatch._id)
  }, [conWatch])
  useEffect(() => {
    getCities(staWatch._id)
  }, [staWatch])
  useEffect(() => {
    getPinCodes(pinWatch._id)
  }, [pinWatch])

  // Reset form on open close if ADD
  useEffect(() => {
    if (type === TABLE_STATES.ADD) {
      reset()
    }
  }, [open])

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setImageUrl(url)
      setValue('logo', selectedFile)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className=' gap-5 px-5 mb-5 flex'>
        <div className='flex justify-center w-1/3'>
          <ImageUploadInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleFileChange={handleFileChange}
          />
        </div>
        <div className='w-2/3 flex items-center justify-center gap-5 pt-4'>
          <div className='mb-5'>
            <TxtInput
              control={control}
              handleChange={() => {}}
              name='name'
              placeholder='Enter name'
              validation={txtFieldValidation(true)}
              label='Name*'
              sx={{ width: '300px', marginBottom: '20px' }}
            />
            <TxtInput
              control={control}
              handleChange={() => {}}
              name='email'
              placeholder='Enter email'
              validation={txtFieldValidation(false, 'Email')}
              label='Email'
              sx={{ width: '300px', marginBottom: '20px' }}
            />
          </div>
          <div className='mb-5'>
            <NumInput
              control={control}
              handleChange={() => {}}
              name='phone'
              placeholder='Enter phone'
              validation={numberFieldValidation(false, 10, 'Phone')}
              label='Phone'
              sx={{ width: '300px', marginBottom: '20px' }}
            />
            <TxtInput
              control={control}
              handleChange={() => {}}
              name='fax'
              placeholder='Enter fax'
              validation={txtFieldValidation(false)}
              label='Fax'
              sx={{ width: '300px', marginBottom: '20px' }}
            />
          </div>
        </div>
      </div>
      <div className='px-5 grid grid-cols-auto-fit gap-5 mb-5'>
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='addressLineOne'
          placeholder='Enter addressLineOne'
          validation={txtFieldValidation(true)}
          label='AddressLineOne*'
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='addressLineTwo'
          placeholder='Enter addressLineTwo'
          validation={txtFieldValidation(false)}
          label='AddressLineTwo'
        />

        <SelectInput
          clearErrors={clearErrors}
          control={control}
          label='Country*'
          name='countryId'
          options={countries as SearchDDL[]}
          setError={setError}
          setValue={setValue}
          validation={searchSelectValidation('Country')}
          handleChange={() => {
            reset((formValues) => {
              return { ...formValues, stateId: acDefaultValue, cityId: acDefaultValue }
            })
          }}
        />
        <SelectInput
          clearErrors={clearErrors}
          control={control}
          label='State*'
          name='stateId'
          options={states as SearchDDL[]}
          setError={setError}
          setValue={setValue}
          validation={searchSelectValidation('State')}
          handleChange={() => {
            reset((formValues) => {
              return { ...formValues, cityId: acDefaultValue }
            })
          }}
        />
        <SelectInput
          clearErrors={clearErrors}
          control={control}
          label='City*'
          name='cityId'
          options={cities as SearchDDL[]}
          setError={setError}
          setValue={setValue}
          validation={searchSelectValidation('City')}
        />
        <SelectInput
          clearErrors={clearErrors}
          control={control}
          label='Pincode*'
          name='pinCodeId'
          options={pinCode as SearchDDL[]}
          setError={setError}
          setValue={setValue}
          validation={searchSelectValidation('Pincode')}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='description'
          placeholder='Enter description'
          validation={txtFieldValidation(false)}
          label='Description'
        />
        <NumInput
          control={control}
          handleChange={() => {}}
          name='contact'
          placeholder='Enter contact'
          validation={numberFieldValidation(false, 10, 'Phone')}
          label='Contact'
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='website'
          placeholder='Enter website'
          validation={txtFieldValidation(false)}
          label='Website'
        />
      </div>
      {type === TABLE_STATES.ADD && (
        <div>
          <div className='px-5 flex items-center justify-between gap-5 mb-3 w-full'>
            <h1 className='text-xl font-semibold'>Plans</h1>
            <Button
              color='mPink'
              sx={{
                minWidth: 'max-content',
                maxHeight: 30,
              }}
              onClick={handleAppendClick}
            >
              <FetchSvg iconName='add' svgProp={{ width: 20, height: 20 }} />
            </Button>
          </div>
          <Divider
            sx={{
              border: '1px solid',
              borderColor: theme.palette.mPink?.main,
              marginBottom: '20px',
              mx: '10px',
            }}
          />
          <div className='px-5 gap-5 mb-5'>
            <>
              {/* <div className='flex items-center gap-3 mb-5'>
                <div className='flex-1 gap-5 items-center justify-center flex flex-col'>
                  <SelectInput
                    clearErrors={clearErrors}
                    control={control}
                    label='CoverageType*'
                    name={`plans.coverageType`}
                    options={coverageType as any}
                    setError={setError}
                    setValue={setValue}
                    validation={searchSelectValidation('coverageType')}
                  />
                  <TxtInput
                    control={control}
                    handleChange={() => {}}
                    name={`plans.planNo`}
                    placeholder='Enter planNo'
                    validation={txtFieldValidation(true)}
                    label='PlanNo*'
                  />
                </div>
                <div className='flex-1'>
                  <MultiTxtInput
                    control={control}
                    entries={mem}
                    name={`plans.memberId`}
                    setValue={setValue}
                    placeholder='Enter memberId'
                    label='MemberId'
                    isInsideTag={true}
                  />
                </div>
              </div> */}
            </>
            {fields?.map((x, i) => {
              return (
                <>
                  <div className='flex items-center gap-3 mb-5' key={x.id}>
                    <div className='flex-1 gap-5 items-center justify-center flex flex-col'>
                      {/* <SelectInput
                        clearErrors={clearErrors}
                        control={control}
                        label='CoverageType*'
                        name={`plans.${i}.coverageType`}
                        options={coverageType as any}
                        setError={setError}
                        setValue={setValue}
                        validation={searchSelectValidation('coverageType')}
                      /> */}
                      <Controller
                        render={({
                          field: { onChange, onBlur, value, ref },
                          fieldState: { invalid, error },
                        }) => (
                          <TextFieldCustom
                            style={{ width: '100%' }}
                            theme={theme}
                            value={value ? value : 'Select'}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputRef={ref}
                            label={'CoverageType*'}
                            select
                            className='txtInput'
                            error={invalid}
                            helperText={error?.message || ''}
                          >
                            <MenuItem value='Select'>Select</MenuItem>
                            {coverageType?.map((x) => {
                              return (
                                <MenuItem value={x.label} key={Math.random()}>
                                  {x.label}
                                </MenuItem>
                              )
                            })}
                          </TextFieldCustom>
                        )}
                        name={`plans.${i}.coverageType`}
                        control={control}
                      />
                      <TxtInput
                        control={control}
                        handleChange={() => {}}
                        name={`plans.${i}.planNo`}
                        placeholder='Enter planNo'
                        validation={txtFieldValidation(true)}
                        label='PlanNo*'
                      />
                    </div>
                    <div className='flex-1'>
                      <MultiTxtInput
                        control={control}
                        entries={mem}
                        name={`plans.${i}.memberId`}
                        setValue={setValue}
                        placeholder='Enter memberId'
                        label='MemberId'
                        isInsideTag={true}
                      />
                    </div>
                    <Button
                      color='mPink'
                      sx={{
                        minWidth: 'max-content',
                        maxHeight: 30,
                      }}
                      onClick={() => remove(i)}
                    >
                      <FetchSvg iconName='subtract' svgProp={{ width: 20, height: 20 }} />
                    </Button>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      )}
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

export default InsuranceCompanyForm
