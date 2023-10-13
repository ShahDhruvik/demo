import FileUploadInput from '@/components/FileUploadInput'
import FormBtns from '@/components/FormBtn'
import TxtInput from '@/components/TxtInput'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { AllowedAction, HandleControls, SearchDDL, ShowToastFunction } from '@/types/common'
import { limitOfPage } from '@/utils/constants'
import React, { Dispatch, useEffect, SetStateAction, useState } from 'react'
import {
  Controller,
  ErrorOption,
  Field,
  FieldArray,
  FieldArrayPath,
  FieldError,
  FieldErrors,
  FieldValues,
  FormState,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegisterReturn,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { txtFieldValidation, numberFieldValidation, labelAndError } from '@/utils/form.validation'
import { createQna, editQna, getAllTreatmentPlan, getAllQnas } from '@/lib/Question-Answer'
import { QnaFields, QnaFormFields } from '@/types/questionAnswerTypes'
import * as XLSX from 'xlsx'
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  MenuItem,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  TableBody,
} from '@mui/material'
import FetchSvg from '@/components/fetchSvg'
import { theme } from '@/context/ThemeProvider'
import { StyledInputBase, TextFieldCustom } from '@/components/MuiStyledComponents'
import { useNotFound } from '@/context/NotFound'
import SelectInput, { listBoxPropsDropdown } from '@/components/SelectInput'

type Props = {
  handleClose: () => void
  entity: QnaFields
  getData: () => void
  setHandleControls: Dispatch<SetStateAction<HandleControls>>
  type: AllowedAction
  open: boolean
}

type OptionType = {
  value: string
  label: string
  nextQuestionId: number
  treatmentId: number
}

type ExcelDataRow = {
  question: string
  questionId: number
  type: string
  isFinal: boolean
  options: OptionType[]
}

const QnaForm = ({ handleClose, entity, setHandleControls, getData, type, open }: Props) => {
  const { setLoading } = useLoading()
  const { setNotFound, notFound } = useNotFound()
  const showToast = useToast() as ShowToastFunction
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { control, handleSubmit, setValue, formState, reset, setError, clearErrors } = useForm({
    defaultValues: {
      question: '',
      questionId: 0,
      isFinal: false,
      type: '',
      // treatmentPlanIds: [] as { label: string; _id: string }[],
      options: [
        {
          value: '',
          label: '',
          // nextQuestionId: [] as { label: string; _id: string }[],
          nextQuestionId: -1,
          treatmentId: -1,
        },
      ],
    },
  })
  const [treatmentPlan, setTreatmentPlan] = useState<SearchDDL[]>([])
  const [nextQue, setNextQne] = useState<SearchDDL[]>([])

  const [errs, setErrs] = useState([])
  const { isSubmitting, errors } = formState

  // const { replace, fields } = useFieldArray({
  //   control: control,
  //   name: 'treatmentPlanIds',
  //   rules: {
  //     required: 'Atleast One Required',
  //   },
  // })

  const [data, setData] = useState<ExcelDataRow[] | null>(null)

  const getTreatmentPlan = async () => {
    const data = (await getAllTreatmentPlan(setLoading, showToast, setNotFound, {
      search: '',
      currentPage: 1,
      limitPerPage: 100,
      sort: 'createdAt',
      sortOrder: 'asc',
    })) as any[]
    const user: SearchDDL[] = []
    data?.map((x) => {
      const userItem: SearchDDL = { label: x.title, _id: x._id }
      user.push(userItem)
    })
    setTreatmentPlan(user)
  }

  const getNextQue = async () => {
    const data = (await getAllQnas(setLoading, showToast, setNotFound, {
      search: '',
      currentPage: 1,
      limitPerPage: 100,
      sort: 'createdAt',
      sortOrder: 'asc',
    })) as any[]
    const user: SearchDDL[] = []
    data?.map((x) => {
      const userItem: SearchDDL = { label: x.question, _id: x._id }
      user.push(userItem)
    })
    setNextQne(user)
  }

  //getting the users
  useEffect(() => {
    getTreatmentPlan()
    getNextQue()
  }, [])

  // useEffect(() => {
  //   if (entity) {
  //     setValue('question', entity?.question)
  //     setValue('questionId', entity?.questionId)
  //     setValue('isFinal', entity?.isFinal)
  //     setValue('treatmentPlanIds', entity?.treatmentPlanIds)
  //     setValue('options', entity?.options)
  //   } else {
  //     reset()
  //   }
  // }, [entity])

  useEffect(() => {
    if (type === 'ADD') {
      reset()
    }
  }, [open])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      // setErrs([])
      const reader = new FileReader()

      reader.onload = (event) => {
        const data = event.target?.result as ArrayBuffer
        const arrayBufferView = new Uint8Array(data)
        const workbook = XLSX.read(arrayBufferView, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const sheetData = XLSX.utils.sheet_to_json(sheet)

        const formattedData = sheetData.map((row: any) => ({
          questionId: row.questionId,
          question: row.question,
          type: row.type,
          isFinal: row.isFinal,
          options: [
            {
              value: row.options,
              label: row.options,
              nextQuestionId: Number(row.nextQuestionId) || -1,
              treatmentId: row.treatmentId || -1,
            },
          ],
        }))

        const x: {
          question: string
          questionId: number
          type: string
          isFinal: boolean
          options: {
            value: string
            label: string
            nextQuestionId: number
            treatmentId: number
          }[]
        }[] = []
        for (const [index, elementx] of formattedData.entries()) {
          const element = elementx as any
          if (element.questionId) {
            x.push({
              questionId: element?.questionId,
              question: element.question,
              type: element.type,
              isFinal: element.isFinal,
              options: element.options,
            })
          } else {
            // const index = formattedData.findIndex(element);
            for (let i = index; i >= 0; i--) {
              const e = formattedData[i] as any
              if (e.questionId) {
                const n = x.findIndex((y) => y.questionId === e.questionId)
                x[n].options.push(element.options[0])
                break
              }
            }
          }
        }
        console.log(x, 'XXXXXXXXXXXXXXXXXXX')
        setData(x)
        // setErrs(errors)
      }

      reader.readAsArrayBuffer(file)
    }
  }

  const onSubmitHandle = async (values: QnaFormFields) => {
    if (type === 'ADD') {
      const res = await createQna(setLoading, showToast, handleClose, data)
      if (res) {
        reset()
        setHandleControls({
          search: '',
          currentPage: 1,
          limitPerPage: limitOfPage,
          sort: 'createdAt',
          sortOrder: 'asc',
        })
        await getData()
      }
    } else if (type === 'EDIT') {
      const res = await editQna(setLoading, showToast, handleClose, values, entity._id)
      if (res) {
        reset()
        setHandleControls({
          search: '',
          currentPage: 1,
          limitPerPage: limitOfPage,
          sort: 'createdAt',
          sortOrder: 'asc',
        })
        await getData()
      }
    } else {
      return
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        {type === 'ADD' && (
          <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
            {/* <FileUploadInput
            imageUrl={'image'}
            setImageUrl={setImageUrl}
            handleFileChange={handleFileChange}
            editable={true}
          /> */}
            <input type='file' accept='.xlsx' onChange={handleFileUpload} />
          </div>
        )}
        {type === 'EDIT' && (
          <>
            <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
              <TxtInput
                control={control}
                handleChange={() => {}}
                name='question'
                placeholder='Enter question'
                validation={{ ...txtFieldValidation(true, 'Description') }}
              />
              <TxtInput
                control={control}
                handleChange={() => {}}
                name='questionId'
                placeholder='Enter questionId'
                validation={{ ...numberFieldValidation(true) }}
              />
            </div>
            {/* <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
              <Autocomplete
                disableClearable
                multiple={true}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, val) => option._id === val._id}
                options={treatmentPlan}
                onChange={(e, val) => {
                  if (val !== null) {
                    if (val.length === 0) {
                      // replace(val)
                      setError('treatmentPlanIds', {
                        type: 'validate',
                        message: 'Select treatmentPlan',
                      })
                    } else {
                      const valFields = val.map((x) => {
                        return { label: x.label, _id: x._id }
                      })
                      replace(valFields)
                      clearErrors('treatmentPlanIds')
                    }
                  }
                }}
                value={fields}
                renderTags={(value) =>
                  value.map((option, index) => {
                    return (
                      <Chip
                        sx={{
                          background: '#ffffff',
                          border: '2px solid black',
                          fontWeight: '500',
                          fontSize: '14px',
                          borderRadius: '10px',
                          my: '5px',
                          mx: '2px',
                        }}
                        deleteIcon={<FetchSvg iconName='ser' />}
                        variant='outlined'
                        label={option.label}
                        key={index}
                        onDelete={(e) => {
                          const emails = [...fields]
                          emails.splice(index, 1)
                          replace(emails)
                        }}
                      />
                    )
                  })
                }
                renderOption={(props, option) => {
                  const selectedGroup = fields
                    .map((x) => {
                      return x._id
                    })
                    .includes(option._id)
                  return (
                    <MenuItem
                      value={option._id}
                      {...props}
                      key={Math.random()}
                      sx={{
                        color: 'black',
                        fontWeight: '300',
                        backgroundColor: 'white',
                      }}
                      selected={selectedGroup}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        width={'100%'}
                      >
                        <Typography>{option.label}</Typography>
                        {selectedGroup && <FetchSvg iconName='ser' />}
                      </Box>
                    </MenuItem>
                  )
                }}
                renderInput={(params) => {
                  return (
                    <TextFieldCustom
                      theme={theme}
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: null,
                      }}
                      className='txtInput'
                      sx={{
                        maxWidth: '400px',
                      }}
                      {...labelAndError(
                        errors.treatmentPlanIds ? true : false,
                        'Select treatmentPlan',
                        'TreatmentPlan*',
                        'Select treatmentPlan',
                      )}
                    />
                  )
                }}
                ListboxProps={listBoxPropsDropdown()}
              />
              <Controller
                name='isFinal'
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel control={<Checkbox {...field} />} label='Final Question?' />
                )}
              />
            </div> */}
            <div className='px-5 flex items-center justify-between  gap-3 mb-3'>
              <h1 className='text-xl font-semibold'>Options</h1>
            </div>
            <Divider
              sx={{
                border: '1px solid',
                borderColor: theme.palette.mPink?.main,
                marginBottom: '12px',
                mx: '10px',
              }}
            />
            <div className='px-5 grid gap-3 mb-5'>
              {entity.options.map((x, i) => {
                return (
                  <div className='flex items-center gap-3 '>
                    <TxtInput
                      control={control}
                      handleChange={() => {}}
                      name={`options.${i}.value`}
                      placeholder='Enter value'
                      validation={{}}
                      sx={{
                        flexGrow: 0.5,
                      }}
                    />
                    <TxtInput
                      control={control}
                      handleChange={() => {}}
                      name={`options.${i}.label`}
                      placeholder='Enter label'
                      validation={{}}
                      sx={{
                        flexGrow: 0.5,
                      }}
                    />
                    {/* <TxtInput
                      control={control}
                      handleChange={() => {}}
                      name={`options.${i}.nextQuestionId`}
                      placeholder='Enter nextQuestionId'
                      validation={{ ...numberFieldValidation(true) }}
                      sx={{
                        flexGrow: 0.5,
                      }}
                    /> */}
                    {/* <SelectInput
                      options={nextQue}
                      name={`options.${i}.nextQuestionId`}
                      control={control}
                      label={'Next Question'}
                      setValue={nextQuestionId}
                      validation={{}}
                    /> */}
                  </div>
                )
              })}
            </div>
          </>
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
      <div>
        {errs.map((x) => (
          <p>{x}</p>
        ))}
      </div>
      {type === 'ADD' && (
        <div>
          <div className='flex py-5 px-2 w-full text-center'>
            <div className='w-[15%]'>QuestionId</div>
            <div className='w-[30%]'>Question</div>
            <div className='w-[10%]'>isFinal</div>
            <div className='w-[35%]'>Options</div>
          </div>
          <Divider
            sx={{
              border: '1px solid',
              borderColor: theme.palette.mPink?.main,
              marginBottom: '12px',
              mx: '10px',
            }}
          />
          {data?.map((x) => (
            <div key={Math.random()}>
              <div className='flex py-5 px-2 w-full text-center' key={Math.random()}>
                <div className='w-[15%]'>{x.questionId}</div>
                <div className='w-[30%]'>{x.question}</div>
                <div className='w-[10%]'>{x.isFinal ? 'True' : 'False'}</div>
                <div className='w-[35%]'>
                  <div className='flex items-center justify-center gap-2'>
                    <div className='flex items-center flex-col'>
                      <span className='font-bold'>Value</span>
                      {x.options?.map((y) => (
                        <div
                          key={Math.random()}
                          className='border-2 border-black-main px-3 rounded-md my-1'
                        >
                          {y.value}
                        </div>
                      ))}
                    </div>
                    {!x.isFinal && (
                      <div className='flex items-center flex-col'>
                        <span className='font-bold'>QueId</span>
                        {x.options?.map((y) => (
                          <div
                            key={Math.random()}
                            className='border-2 border-black-main px-3 rounded-md my-1'
                          >
                            {y?.nextQuestionId ? y?.nextQuestionId : 0}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Divider
                sx={{
                  border: '1px solid',
                  borderColor: theme.palette.mDarkGray?.main,
                  marginBottom: '12px',
                  mx: '10px',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default QnaForm
