import { useState } from 'react'
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
import { CountryData, StateData, StateFields } from '@/types/location'
import { createCountry, dropdownCountry, editCountry } from '@/lib/Country'
import { useToast } from '@/hooks/useToast'
import SelectInput from '@/components/SelectInput'
import { createState, editState } from '@/lib/State'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: StateData
  getModifiedData: () => void
}

const StateForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const [countries, setCountries] = useState<SearchDDL[]>([])
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { control, handleSubmit, formState, reset, clearErrors, setError, setValue } = useForm({
    defaultValues: {
      name: '',
      shortName: '',
      countryId: acDefaultValue,
      cities: [] as StateFields['cities'],
    } as StateFields,
  })
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<StateFields> = async (data) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createState(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editState(setLoading, showToast, data, entity._id)
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
    name: 'cities',
  })
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

  useEffect(() => {
    if (entity) {
      reset({
        name: entity.name,
        shortName: entity.shortName,
        countryId: { label: entity.country, _id: entity.countryId },
        cities: [],
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
        <div className='px-5 grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
          <SelectInput
            clearErrors={clearErrors}
            control={control}
            label='Country'
            name='countryId'
            options={countries}
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
            label='Name'
          />
          <TxtInput
            control={control}
            handleChange={() => {}}
            name='shortName'
            placeholder='Enter short name'
            validation={txtFieldValidation(true)}
            label='Short name'
          />
        </div>
        {type === TABLE_STATES.ADD && (
          <div>
            <div className='px-5 flex items-center justify-between  gap-5 mb-3'>
              <h1 className='text-xl font-semibold'>Cities</h1>
              <Button
                color='mPink'
                sx={{
                  minWidth: 'max-content',
                }}
                onClick={() => append({ name: '', shortName: '' })}
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
            <div className='px-5 grid  gap-5 mb-5'>
              {fields.map((x, i) => {
                return (
                  <div className='flex items-center gap-3 ' key={x.id}>
                    <TxtInput
                      control={control}
                      handleChange={() => {}}
                      name={`cities.${i}.name`}
                      placeholder='Enter name'
                      validation={txtFieldValidation(true)}
                      sx={{
                        flexGrow: 0.5,
                      }}
                      label='Name'
                    />
                    <TxtInput
                      control={control}
                      handleChange={() => {}}
                      name={`cities.${i}.shortName`}
                      placeholder='Enter short name'
                      validation={txtFieldValidation(true)}
                      sx={{
                        flexGrow: 0.5,
                      }}
                      label='Short name'
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

export default StateForm
