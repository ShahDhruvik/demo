import { useState } from 'react'
import FormBtns from '@/components/FormBtn'
import NumInput from '@/components/NumInput'
import TxtInput from '@/components/TxtInput'
import FetchSvg from '@/components/fetchSvg'
import { useEffect } from 'react'
import { theme } from '@/context/ThemeProvider'
import { SearchDDL, TableStates } from '@/types/common'
import { TABLE_STATES } from '@/utils/constants'
import { acDefaultValue, numberFieldValidation, txtFieldValidation } from '@/utils/form.validation'
import { Button, Divider } from '@mui/material'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { CountryData, CountryFields } from '@/types/location'
import { createCountry, dropdownCountry, editCountry } from '@/lib/Country'
import { useToast } from '@/hooks/useToast'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: CountryData
  getModifiedData: () => void
}

const StateForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  //states
  const [countries, setCountries] = useState<SearchDDL[]>([])
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      name: '',
      shortName: '',
      isoCode: '',
      code: '',
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
  const getCountries = async () => {
    const data = (await dropdownCountry(setLoading, showToast)) as CountryData[]
    const con: SearchDDL[] = [acDefaultValue]
    data.map((x) => {
      const conItem: SearchDDL = { label: `${x.name} ${x.shortName}`, _id: x._id }
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
        code: String(entity.code),
        isoCode: entity.isoCode,
        name: entity.name,
        shortName: entity.shortName,
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
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
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
        <TxtInput
          control={control}
          handleChange={() => {}}
          name='isoCode'
          placeholder='Enter iso code'
          validation={txtFieldValidation(true)}
        />
        <NumInput
          control={control}
          handleChange={() => {}}
          name='code'
          placeholder='Enter code'
          validation={numberFieldValidation(true)}
        />
      </div>
      {type === TABLE_STATES.ADD && (
        <div>
          <div className='px-5 flex items-center justify-between  gap-3 mb-3'>
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
              marginBottom: '12px',
              mx: '10px',
            }}
          />
          <div className='px-5 grid  gap-3 mb-5'>
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

export default StateForm
