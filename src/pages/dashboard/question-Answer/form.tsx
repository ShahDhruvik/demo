import FormBtns from '@/components/FormBtn'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import {
  AllowedAction,
  HandleControls,
  QnaType,
  ShowToastFunction,
  TableStates,
} from '@/types/common'
import { TABLE_STATES, limitOfPage } from '@/utils/constants'
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
import { createQna } from '@/lib/Question-Answer'
import { QnaFields, QnaFormFields } from '@/types/questionAnswerTypes'
import * as XLSX from 'xlsx'
import { Button, Divider } from '@mui/material'
import FetchSvg from '@/components/fetchSvg'
import { theme } from '@/context/ThemeProvider'
import { useNotFound } from '@/context/NotFound'
import { styled } from '@mui/system'
import { toast } from 'react-toastify'

type Props = {
  // handleClose: () => void
  // entity: QnaFields
  // getData: () => void
  // setHandleControls: Dispatch<SetStateAction<HandleControls>>
  // type: AllowedAction
  // open: boolean
  handleClose: () => void
  type: TableStates
  entity: QnaFields
  getModifiedData: () => void
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

const QnaForm = ({ handleClose, entity, getModifiedData, type }: Props) => {
  const { setLoading } = useLoading()
  const { setNotFound, notFound } = useNotFound()
  const showToast = useToast() as ShowToastFunction
  const { control, handleSubmit, setValue, formState, reset, setError, clearErrors } = useForm({
    defaultValues: {
      question: '',
      questionId: 0,
      isFinal: false,
      type: '',
      options: [
        {
          value: '',
          label: '',
          nextQuestionId: -1,
          treatmentId: -1,
        },
      ],
    },
  })

  const [errs, setErrs] = useState<any[]>([])
  const { isSubmitting, errors } = formState

  const [data, setData] = useState<ExcelDataRow[] | null>(null)

  useEffect(() => {
    if (type === 'ADD') {
      reset()
    }
  }, [open])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    setErrs([])
    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const data = event.target?.result as ArrayBuffer
        const arrayBufferView = new Uint8Array(data)
        const workbook = XLSX.read(arrayBufferView, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const sheetData = XLSX.utils.sheet_to_json(sheet)

        const formattedData = sheetData.map((row: any) => ({
          questionId: row.questionId === 0 ? -1 : row.questionId,
          question: row.question,
          type: row.type,
          isFinal: row.isFinal,
          options: [
            {
              value: row.options,
              label: row.options,
              nextQuestionId: row.nextQuestionId !== undefined ? row.nextQuestionId : -1,
              treatmentId: row.treatmentId || -1,
            },
          ],
        }))

        const x: {
          question: string
          questionId: number
          type: any
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

        console.log(x, 'xxxxxxxx')

        let error: {
          errName: string
        }[] = []

        for (const item of x) {
          if (item.questionId <= 0) {
            // setErrs([
            //   ...errs,
            //   {
            //     errName: `Question id should not be Zero(0) or Negative`,
            //   },
            // ])
            error.push({
              errName: `Question id should not be Zero(0) or Negative`,
            })
          }

          if (!Object.values(QnaType).includes(item.type)) {
            // setErrs([
            //   ...errs,
            //   {
            //     errName: `At Question Number ${item.questionId}, Type should be one of the following: "${QnaType.SELECT}" or "${QnaType.MULTI}" or "${QnaType.SHORT_ANS}"`,
            //   },
            // ])
            error.push({
              errName: `At Question Number ${item.questionId}, Type should be one of the following: "${QnaType.SELECT}" or "${QnaType.MULTI}" or "${QnaType.SHORT_ANS}"`,
            })
          }

          for (const opt of item.options) {
            if (item.isFinal === true && opt.treatmentId <= 0) {
              // setErrs([
              //   ...errs,
              //   {
              //     errName: `At Question Number ${item.questionId}, One of the options is missing treatmentId.`,
              //   },
              // ])
              error.push({
                errName: `At Question Number ${item.questionId}, One of the options is missing treatmentId.`,
              })
            }
            if (!item.isFinal && opt.nextQuestionId === -1) {
              // setErrs([
              //   ...errs,
              //   {
              //     errName: `At Question Number ${item.questionId}, One of the options is missing nextQuestionId.`,
              //   },
              // ])
              error.push({
                errName: `At Question Number ${item.questionId}, One of the options is missing nextQuestionId.`,
              })
            }
          }
          setErrs(error)
        }
        setData(x)
      }

      reader.readAsArrayBuffer(file)
    }
  }

  console.log(errs, 'err')

  const onSubmitHandle = async (values: QnaFormFields) => {
    // if (type === 'ADD') {
    //   const res = await createQna(setLoading, showToast, handleClose, data)
    //   if (res) {
    //     reset()
    //     setHandleControls({
    //       search: '',
    //       currentPage: 1,
    //       limitPerPage: limitOfPage,
    //       sort: 'createdAt',
    //       sortOrder: 'asc',
    //     })
    //     await getData()
    //   }
    // } else {
    //   return
    // }
    handleClose()
    switch (type) {
      case TABLE_STATES.ADD:
        const res = await createQna(setLoading, showToast, data)
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

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        {type === 'ADD' && (
          <div className='px-5 grid grid-cols-auto-fit gap-3 mb-5'>
            <div className='flex items-center justify-center'>
              {errs?.length > 0 ? (
                <Button
                  component='label'
                  variant='contained'
                  color='mPink'
                  endIcon={<FetchSvg iconName='fileUpload' />}
                  disabled={true}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type='file'
                    accept='.xlsx'
                    onChange={handleFileUpload}
                    disabled={true}
                  />
                </Button>
              ) : (
                <Button
                  component='label'
                  variant='contained'
                  color='mPink'
                  endIcon={<FetchSvg iconName='fileUpload' />}
                >
                  Upload file
                  <VisuallyHiddenInput type='file' accept='.xlsx' onChange={handleFileUpload} />
                </Button>
              )}
            </div>
            {/* <input type='file' accept='.xlsx' onChange={handleFileUpload} /> */}
          </div>
        )}
        {errs?.length > 0 ? (
          <FormBtns
            approvalFnc={() => {}}
            approvalTxt='Add'
            cancelFnc={handleClose}
            cancelTxt='Cancel'
            formSubmitting={!isSubmitting}
            isSubmit={true}
            disable={true}
          />
        ) : (
          <FormBtns
            approvalFnc={() => {}}
            approvalTxt='Add'
            cancelFnc={handleClose}
            cancelTxt='Cancel'
            formSubmitting={isSubmitting}
            isSubmit={true}
          />
        )}
      </form>
      <div className='px-7 pt-3'>
        {errs?.map((x) => (
          <ul key={Math.random()}>
            <li className='text-orange-dark'>*{x.errName}</li>
          </ul>
        ))}
      </div>
      {type === 'ADD' && data?.length !== 0 && (
        <div>
          <div className='flex py-5 px-2 w-full text-center'>
            <div className='w-[15%]'>QuestionId</div>
            <div className='w-[30%]'>Question</div>
            <div className='w-[10%]'>Type</div>
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
          {/* className='max-h-[280px] overflow-auto scrollBar' */}
          <div className='max-h-[250px] overflow-auto scrollBar'>
            {data?.map((x) => (
              <div key={Math.random()}>
                <div className='flex py-5 px-2 w-full text-center' key={Math.random()}>
                  <div className='w-[15%]'>{x.questionId}</div>
                  <div className='w-[30%]'>{x.question}</div>
                  <div className='w-[10%]'>{x.type}</div>
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
                          <span className='font-bold'>NextQueId</span>
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
        </div>
      )}
    </>
  )
}

export default QnaForm
