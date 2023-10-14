import FormBtns from '@/components/FormBtn'
import NumInput from '@/components/NumInput'
import TxtInput from '@/components/TxtInput'
import FetchSvg from '@/components/fetchSvg'
import { useEffect } from 'react'
import { theme } from '@/context/ThemeProvider'
import { Languages, SearchDDL, TableStates } from '@/types/common'
import { TABLE_STATES } from '@/utils/constants'
import {
  acDefaultValue,
  numberFieldValidation,
  searchSelectValidation,
  txtFieldValidation,
} from '@/utils/form.validation'
import { Button, Divider } from '@mui/material'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { CountryData, PincodeFields, StateData } from '@/types/location'
import { dropdownCountry } from '@/lib/Country'
import { useToast } from '@/hooks/useToast'
import { useState } from 'react'
import SelectInput from '@/components/SelectInput'
import { dropdownState } from '@/lib/State'
import { createCity, dropdownCity, editCity } from '@/lib/City'
import CheckInput from '@/components/CheckInput'
import { createPincode, editPincode } from '@/lib/Pincode'
import { dropdownLanguage } from '@/lib/language'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: any
  getModifiedData: () => void
}

const PincodeForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [countries, setCountries] = useState<SearchDDL[]>([])
  const [states, setStates] = useState<SearchDDL[]>([])
  const [cities, setCities] = useState<SearchDDL[]>([])
  const [languages, setLanguages] = useState<SearchDDL[]>([])

  //form
  const { control, handleSubmit, formState, reset, watch, clearErrors, setError, setValue } =
    useForm({
      defaultValues: {
        value: '',
        isAvailable: true,
        stateId: acDefaultValue,
        countryId: acDefaultValue,
        cityId: acDefaultValue,
        primaryLan: acDefaultValue,
        secondaryLan: acDefaultValue,
        thirdLan: acDefaultValue,
      } as PincodeFields,
    })
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<PincodeFields> = async (data) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createPincode(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editPincode(setLoading, showToast, data, entity._id)
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

  const conWatch = watch('countryId')
  const staWatch = watch('stateId')

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
  const getLanguages = async () => {
    const data = (await dropdownLanguage(setLoading, showToast)) as Languages[]
    const lan: SearchDDL[] = [acDefaultValue]
    data.map((x) => {
      const lanItem: SearchDDL = { label: `${x.label}`, _id: x._id }
      lan.push(lanItem)
    })
    setLanguages(lan)
  }
  useEffect(() => {
    getCountries()
    getLanguages()
  }, [])
  useEffect(() => {
    getStates(conWatch._id)
  }, [conWatch])
  useEffect(() => {
    getCities(staWatch._id)
  }, [staWatch])

  //setting the entity on edit
  useEffect(() => {
    if (entity) {
      reset({
        value: entity.value,
        isAvailable: entity.isAvailable,
        stateId: { label: entity.state, _id: entity.stateId },
        countryId: { label: entity.country, _id: entity.countryId },
        cityId: { label: entity.city, _id: entity.cityId },
        primaryLan: {},
        secondaryLan: {},
        thirdLan: {},
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
  return (
    <form onSubmit={handleSubmit(onSubmitHandle)} className='flex flex-col flex-1'>
      <div className='flex-1'>
        <div className='px-5 grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 '>
          <SelectInput
            clearErrors={clearErrors}
            control={control}
            label='Country'
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
            label='State'
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
            label='City'
            name='cityId'
            options={cities as SearchDDL[]}
            setError={setError}
            setValue={setValue}
            validation={searchSelectValidation('City')}
          />
          <NumInput
            control={control}
            handleChange={() => {}}
            name={`value`}
            placeholder='Enter pincode'
            label='Pincode'
            validation={numberFieldValidation(true, undefined, 'Pincode')}
          />
          <SelectInput
            clearErrors={clearErrors}
            control={control}
            label='Primary language*'
            name='primaryLan'
            options={languages}
            setError={setError}
            setValue={setValue}
            validation={searchSelectValidation('Primary language')}
          />
          <SelectInput
            clearErrors={clearErrors}
            control={control}
            label='Secondary language'
            name='secondaryLan'
            options={languages}
            setError={setError}
            setValue={setValue}
            validation={{}}
            notRequired={true}
          />
          <SelectInput
            clearErrors={clearErrors}
            control={control}
            label='Secondary language'
            name='thirdLan'
            options={languages}
            setError={setError}
            setValue={setValue}
            validation={{}}
            notRequired={true}
          />
          <CheckInput control={control} name='isAvailable' label='available' />
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

export default PincodeForm
