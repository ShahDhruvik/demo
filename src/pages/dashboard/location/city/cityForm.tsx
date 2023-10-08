import FormBtns from '@/components/FormBtn'
import NumInput from '@/components/NumInput'
import TxtInput from '@/components/TxtInput'
import FetchSvg from '@/components/fetchSvg'
import { useEffect } from 'react'
import { theme } from '@/context/ThemeProvider'
import { SearchDDL, TableStates } from '@/types/common'
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
import { CountryData, CityFields, StateData } from '@/types/location'
import { dropdownCountry } from '@/lib/Country'
import { useToast } from '@/hooks/useToast'
import { useState } from 'react'
import SelectInput from '@/components/SelectInput'
import { dropdownState } from '@/lib/State'
import { createCity, editCity } from '@/lib/City'
import CheckInput from '@/components/CheckInput'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: any
  getModifiedData: () => void
}

const CityForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [countries, setCountries] = useState<SearchDDL[]>([])
  const [states, setStates] = useState<SearchDDL[]>([])

  //form
  const { control, handleSubmit, formState, reset, watch, clearErrors, setError, setValue } =
    useForm({
      defaultValues: {
        name: '',
        shortName: '',
        stateId: acDefaultValue,
        countryId: acDefaultValue,
        pinCodes: [] as CityFields['pinCodes'],
      } as CityFields,
    })
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<CityFields> = async (data) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createCity(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editCity(setLoading, showToast, data, entity._id)
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
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'pinCodes',
  })
  const conWatch = watch('countryId')

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
  useEffect(() => {
    getCountries()
  }, [])
  useEffect(() => {
    getStates(conWatch._id)
  }, [conWatch])

  //setting the entity on edit
  useEffect(() => {
    if (entity) {
      reset({
        name: entity.name,
        shortName: entity.shortName,
        stateId: { label: entity.stateId, _id: entity.state },
        countryId: { label: entity.countryId, _id: entity.country },
        pinCodes: [],
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
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
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
              return { ...formValues, stateId: acDefaultValue }
            })
          }}
        />
        <SelectInput
          clearErrors={clearErrors}
          control={control}
          label='Country'
          name='stateId'
          options={states as SearchDDL[]}
          setError={setError}
          setValue={setValue}
          validation={searchSelectValidation('Country')}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='name'
          placeholder='Enter name'
          validation={txtFieldValidation(true)}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='shortName'
          placeholder='Enter short name'
          validation={txtFieldValidation(true)}
        />
      </div>
      {type === TABLE_STATES.ADD && (
        <div>
          <div className='px-5 flex items-center justify-between  gap-3 mb-3'>
            <h1 className='text-xl font-semibold'>Pincodes</h1>
            <Button
              color='mPink'
              sx={{
                minWidth: 'max-content',
              }}
              onClick={() => append({ value: '', isAvailable: true })}
            >
              <FetchSvg iconName='add' svgProp={{ width: 20, height: 20 }} />
            </Button>
          </div>
          <Divider
            sx={{
              border: '1px solid',
              borderColor: theme.palette.mPink?.main,
              marginBottom: '12px',
              mx: '10px',
            }}
          />
          <div className='px-5 grid  gap-3 mb-5'>
            {fields.map((x, i) => {
              return (
                <div className='flex items-center gap-10 ' key={x.id}>
                  <NumInput
                    control={control}
                    handleChange={() => {}}
                    name={`pinCodes.${i}.value`}
                    placeholder='Enter name'
                    validation={numberFieldValidation(true, undefined, 'Pincode')}
                    sx={{
                      flexGrow: 1,
                    }}
                  />
                  <CheckInput
                    control={control}
                    name={`pinCodes.${i}.isAvailable`}
                    label='available'
                    sxProps={{
                      flexGrow: 0.5,
                    }}
                  />
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
              )
            })}
          </div>
        </div>
      )}
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

export default CityForm
