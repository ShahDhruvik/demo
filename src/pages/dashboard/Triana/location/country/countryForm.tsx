import FormBtns from '@/components/FormBtn'
import NumInput from '@/components/NumInput'
import TxtInput from '@/components/TxtInput'
import FetchSvg from '@/components/fetchSvg'
import { useEffect, useState } from 'react'
import { theme } from '@/context/ThemeProvider'
import { Currencies, SearchDDL, TableStates } from '@/types/common'
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
import { CountryData, CountryFields } from '@/types/location'
import { createCountry, editCountry } from '@/lib/Country'
import { useToast } from '@/hooks/useToast'
import { dropdownCurrency } from '@/lib/Currency'
import SelectInput from '@/components/SelectInput'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: CountryData
  getModifiedData: () => void
}

const CountryForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [currencies, setCurrencies] = useState<SearchDDL[]>([])
  const { control, handleSubmit, formState, reset, clearErrors, setError, setValue } = useForm({
    defaultValues: {
      name: '',
      shortName: '',
      isoCode: '',
      code: '',
      primaryCun: acDefaultValue,
      secondaryCun: acDefaultValue,
      states: [] as CountryFields['states'],
    } as CountryFields,
  })
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<CountryFields> = async (data) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createCountry(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editCountry(setLoading, showToast, data, entity._id)
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
    name: 'states',
  })
  //API's
  const getCurriencies = async () => {
    const data = (await dropdownCurrency(setLoading, showToast)) as Currencies[]
    const cun: SearchDDL[] = [acDefaultValue]
    data.map((x) => {
      const cunItem: SearchDDL = { label: `${x.label}`, _id: x._id }
      cun.push(cunItem)
    })
    setCurrencies(cun)
  }
  useEffect(() => {
    getCurriencies()
  }, [])
  //setting the entity on edit
  useEffect(() => {
    if (entity) {
      reset({
        code: String(entity.code),
        isoCode: entity.isoCode,
        name: entity.name,
        shortName: entity.shortName,
        primaryCun: {},
        secondaryCun: {},
        states: [],
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
          <TxtInput
            control={control}
            handleChange={() => {}}
            name='isoCode'
            placeholder='Enter iso code'
            validation={txtFieldValidation(true)}
            label='ISO code'
          />
          <NumInput
            control={control}
            handleChange={() => {}}
            name='code'
            placeholder='Enter code'
            validation={numberFieldValidation(true)}
            label='Code'
          />
          <SelectInput
            clearErrors={clearErrors}
            control={control}
            label='Primary currency*'
            name='primaryCun'
            options={currencies}
            setError={setError}
            setValue={setValue}
            validation={searchSelectValidation('Primary currency')}
          />
          <SelectInput
            clearErrors={clearErrors}
            control={control}
            label='Secondary currency'
            name='secondaryCun'
            options={currencies}
            setError={setError}
            setValue={setValue}
            validation={{}}
            notRequired={true}
          />
        </div>
        {type === TABLE_STATES.ADD && (
          <div>
            <div className='px-5 flex items-center justify-between  gap-5 mb-3'>
              <h1 className='text-xl font-semibold'>States</h1>
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
                      name={`states.${i}.name`}
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
                      name={`states.${i}.shortName`}
                      placeholder='Enter short name'
                      validation={txtFieldValidation(true)}
                      sx={{
                        flexGrow: 0.5,
                      }}
                      label='Short Name'
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

export default CountryForm
