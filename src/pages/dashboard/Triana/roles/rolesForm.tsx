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
import { Button, Divider, FormLabel } from '@mui/material'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { CountryData } from '@/types/location'
import { RoleData, RoleFields } from '@/types/role'
import { createCountry, editCountry } from '@/lib/Country'
import { useToast } from '@/hooks/useToast'
import { dropdownCurrency } from '@/lib/Currency'
import SelectInput from '@/components/SelectInput'
import CheckInput from '@/components/CheckInput'
import { createRole, editRole } from '@/lib/role'

type Props = {
  handleClose: () => void
  type: TableStates
  entity: RoleData
  getModifiedData: () => void
}

const RolesForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const defaultPermission: RoleFields['permission'] = {
    compliance: {
      create: false,
      delete: false,
      update: false,
      view: false,
    },
    location: {
      create: false,
      delete: false,
      update: false,
      view: false,
    },
    packages: {
      create: false,
      delete: false,
      update: false,
      view: false,
    },
    plans: {
      create: false,
      delete: false,
      update: false,
      view: false,
    },
    tnc: {
      create: false,
      delete: false,
      update: false,
      view: false,
    },
  }
  const { control, handleSubmit, formState, reset, clearErrors, setError, setValue } = useForm({
    defaultValues: {
      name: '',
      permission: defaultPermission,
    } as RoleFields,
  })
  const { isSubmitting } = formState
  const onSubmitHandle: SubmitHandler<RoleFields> = async (data) => {
    console.log(data)
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createRole(setLoading, showToast, data)
        if (res) {
          reset()
          getModifiedData()
        } else {
          reset()
        }
        break
      case TABLE_STATES.EDIT:
        const resp = await editRole(setLoading, showToast, data, entity._id)
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

  //setting the entity on edit
  useEffect(() => {
    if (entity) {
      reset({
        name: entity.name,
        permission: entity.permissions,
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
        </div>
        <div className='px-5 grid grid-cols-1 md:grid-cols-1 gap-1 mb-5 mt-10'>
          <div className='grid grid-cols-5'>
            <FormLabel sx={{ color: theme.palette.mBlack.main, fontSize: '16px', fontWeight: 600 }}>
              Module
            </FormLabel>
            <FormLabel sx={{ color: theme.palette.mBlack.main, fontSize: '16px', fontWeight: 600 }}>
              Create
            </FormLabel>
            <FormLabel sx={{ color: theme.palette.mBlack.main, fontSize: '16px', fontWeight: 600 }}>
              View
            </FormLabel>
            <FormLabel sx={{ color: theme.palette.mBlack.main, fontSize: '16px', fontWeight: 600 }}>
              Update
            </FormLabel>
            <FormLabel sx={{ color: theme.palette.mBlack.main, fontSize: '16px', fontWeight: 600 }}>
              Delete
            </FormLabel>
          </div>
          <Divider />
          {Object.keys(defaultPermission).map((sublistName) => {
            return (
              <div className=''>
                <div className='grid grid-cols-5 justify-center items-center'>
                  <FormLabel
                    sx={{
                      color: theme.palette.mBlack.main,
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {sublistName}
                  </FormLabel>
                  <CheckInput
                    control={control}
                    label={''}
                    name={`permission.${sublistName}.create`}
                  />
                  <CheckInput
                    control={control}
                    label={''}
                    name={`permission.${sublistName}.view`}
                  />
                  <CheckInput
                    control={control}
                    label={''}
                    name={`permission.${sublistName}.update`}
                  />
                  <CheckInput
                    control={control}
                    label={''}
                    name={`permission.${sublistName}.delete`}
                  />
                </div>
                <Divider />
              </div>
            )
          })}
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

export default RolesForm
