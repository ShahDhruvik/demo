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
  dateSelectValidation,
  numberFieldValidation,
  searchSelectValidation,
  txtFieldValidation,
} from '@/utils/form.validation'
import { Button, Divider } from '@mui/material'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { CountryData } from '@/types/location'
import { createCountry, editCountry } from '@/lib/Country'
import { useToast } from '@/hooks/useToast'
import { dropdownCurrency } from '@/lib/Currency'
import SelectInput from '@/components/SelectInput'
import { createUser, editUser } from '@/lib/user'
import { UserFields } from '@/types/user'
import { RoleData } from '@/types/role'
import { dropdownRole } from '@/lib/role'
import { DateInput } from '@/components/DateInput'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: CountryData
  getModifiedData: () => void
}

const UserForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [roles, setRoles] = useState<SearchDDL[]>([])
  const { control, handleSubmit, formState, reset, clearErrors, setError, setValue, getValues } =
    useForm({
      defaultValues: {
        name: '',
        email: '',
        confirmPassword: '',
        contactNo: '',
        dob: null,
        password: '',
        roleId: acDefaultValue,
      } as UserFields,
    })
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<UserFields> = async (data) => {
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createUser(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      // case TABLE_STATES.EDIT:
      //   const resp = await editUser(setLoading, showToast, data, entity._id)
      //   if (resp) {
      //     reset()
      //     getModifiedData()
      //   } else {
      //     reset()
      //   }
      //   break

      default:
        break
    }
  }

  //API's
  const getRoles = async () => {
    const data = (await dropdownRole(setLoading, showToast)) as RoleData[]
    const rol: SearchDDL[] = [acDefaultValue]
    data.map((x) => {
      const rolItem: SearchDDL = { label: `${x.name}`, _id: x._id }
      rol.push(rolItem)
    })
    setRoles(rol)
  }
  useEffect(() => {
    getRoles()
  }, [])
  //setting the entity on edit
  useEffect(() => {
    if (entity) {
      // reset({
      //   code: String(entity.code),
      //   isoCode: entity.isoCode,
      //   name: entity.name,
      //   shortName: entity.shortName,
      //   primaryCun: {},
      //   secondaryCun: {},
      //   states: [],
      // })
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
            label='Name*'
          />
          <SelectInput
            control={control}
            handleChange={() => {}}
            name='roleId'
            validation={searchSelectValidation('Role')}
            label='Role*'
            clearErrors={clearErrors}
            options={roles}
            setError={setError}
            setValue={setValue}
          />
          <TxtInput
            control={control}
            handleChange={() => {}}
            name='email'
            placeholder='Enter email'
            validation={txtFieldValidation(false, 'Email')}
            label='Email'
          />
          <NumInput
            control={control}
            handleChange={() => {}}
            name='contactNo'
            placeholder='Enter contact number'
            validation={numberFieldValidation(true, undefined, 'Phone')}
            label='Contact No *'
          />
          <DateInput
            clearErrors={clearErrors}
            control={control}
            handleChange={() => {}}
            label='Date of Birth*'
            name='dob'
            setError={setError}
            validation={dateSelectValidation('Date of brith')}
          />
          <TxtInput
            control={control}
            handleChange={() => {}}
            name='password'
            placeholder='Enter password'
            validation={txtFieldValidation(true, 'Password')}
            label='Password*'
          />
          <TxtInput
            control={control}
            handleChange={() => {}}
            name='confirmPassword'
            placeholder='Confirm password'
            validation={{
              required: 'required.',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            }}
            label='Confirm password*'
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

export default UserForm
