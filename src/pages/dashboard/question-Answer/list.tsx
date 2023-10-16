import Table from '@/components/Table'
import {
  AllowedAction,
  Controls,
  HandleControls,
  HeadCell,
  ShowToastFunction,
  TableStates,
} from '@/types/common'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ACTIONS_TABLE, HEADERBTNS, TABLES, TABLE_STATES, limitOfPage } from '@/utils/constants'
import { useLoading } from '@/context/LoadingContext'
import { useNotFound } from '@/context/NotFound'
import { useToast } from '@/hooks/useToast'
import { Box, Divider } from '@mui/material'
import CustomDialog from '@/components/Dialog-custom'
import ActionModal from '@/components/ActionModal'
import SwitchDeleteModal from '@/components/SwitchDeleteModal'
import QnaForm from './form'
import { theme } from '@/context/ThemeProvider'
import { deleteQna, getAllQnas, inActiveQna } from '@/lib/Question-Answer'
import { QnaFields } from '@/types/questionAnswerTypes'
import React from 'react'
import TreeView, { useTreeState } from 'react-hyper-tree'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<TableStates>>
  open: boolean
  type: TableStates
  handleClose: () => void
}

const QnaList = ({ handleOpen, setType, open, type, handleClose }: Props) => {
  //context
  const { setLoading } = useLoading()
  const showToast = useToast() as ShowToastFunction
  const { setNotFound, notFound } = useNotFound()

  //default controls
  const defaultControls = {
    search: '',
    currentPage: 1,
    limitPerPage: limitOfPage,
    sort: 'questionId',
    sortOrder: 'asc',
  }

  // Record and Control States
  const [data, setData] = useState<QnaFields[]>([])
  const [entity, setEntity] = useState<QnaFields | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)
  const [tree, setTree] = useState<any[]>([])

  const getData = async () => {
    const response = await getAllQnas(setLoading, showToast, setNotFound, notFound, handleControls)
    if (response) {
      const { records, ...rest } = response
      if (records.length === 0) {
        setNotFound([TABLES.BANNER_SLIDER])
      } else {
        setNotFound([])
        setData(records)
        setControls(rest)
      }
    } else {
      setData([])
    }
  }

  const getModifiedData = () => {
    setHandleControls(defaultControls)
  }

  useEffect(() => {
    getData()
  }, [handleControls])

  ///headCells
  const headCells: HeadCell[] = [
    {
      id: 'questionId',
      label: 'QuestionId',
      isSort: false,
    },
    {
      id: 'question',
      label: 'Question',
      isSort: false,
    },
    {
      id: 'type',
      label: 'Type',
      isSort: false,
    },
    {
      id: 'isFinal',
      label: 'Final Question',
      isSort: false,
      type: 'isFinal',
    },
    // {
    //   id: 'isActive',
    //   label: 'Status',
    //   isSort: false,
    //   type: 'InformedStatus',
    // },
  ]

  //Inactive and Delete entity
  // const inactiveEntity = async () => {
  //   const res = await inActiveQna(
  //     setLoading,
  //     showToast,
  //     entity.isActive as boolean,
  //     entity?._id as string,
  //   )
  //   if (res) {
  //     setHandleControls({
  //       search: '',
  //       currentPage: 1,
  //       limitPerPage: limitOfPage,
  //       sort: 'createdAt',
  //       sortOrder: 'asc',
  //     })
  //     await getData()
  //     handleClose()
  //   }
  // }
  // const deleteEntity = async () => {
  //   const res = await deleteQna(setLoading, showToast, entity?._id as string)
  //   if (res) {
  //     setHandleControls({
  //       search: '',
  //       currentPage: 1,
  //       limitPerPage: limitOfPage,
  //       sort: 'siteName',
  //       sortOrder: 'asc',
  //     })
  //     await getData()
  //     handleClose()
  //   }
  // }

  const xx = () => {
    const sorted = data
      .sort((x, y) => x.questionId - y.questionId)
      .map((x) => {
        const children = x.options.map((x) => {
          return {
            id: x.nextQuestionId,
            name: x.value,
            children: [],
          }
        })
        return {
          id: x.questionId,
          name: x.question,
          children,
        }
      })
    for (const element of sorted) {
      for (const option of element.children) {
        const i = sorted.findIndex((x) => x.id === element.id)
        const io = sorted[i].children.findIndex((x) => x.name === option.name)
        sorted[i].children[io].children = []
        if (option.id !== -1) {
          const que = sorted.find((x) => x.id === option.id)
          sorted[i].children[io].children.push(que)
        }
      }
    }
    if (sorted.length !== 0) {
      setTree([sorted[0]])
    }
  }

  useEffect(() => {
    xx()
  }, [data])

  const { required, handlers } = useTreeState({
    data: tree,
    id: 'storyTree',
    // defaultOpened: true,
    multipleSelect: true,
    // refreshAsyncNodes: true,
  })

  return (
    <Box>
      <Table
        handleOpen={handleOpen}
        setType={setType}
        setEntity={setEntity}
        rows={data}
        headCells={headCells}
        controls={controls as Controls}
        handleControls={handleControls}
        setHandleControls={setHandleControls}
        actions={[]}
        // tableHeading={{ tableId: TABLES.QUESTION_ANSWER, tableName: 'Question Answer' }}
        notFound={notFound.includes(TABLES.QUESTION_ANSWER)}
        btnTxtArray={[
          { btnType: HEADERBTNS.CREATE, btnText: 'Create' },
          { btnType: HEADERBTNS.VIEW, btnText: 'View Tree' },
        ]}
        isTableWithOutAction={true}
      />
      <CustomDialog
        action={{ isAction: false, component: null }}
        header={{ isHeader: false, component: false }}
        handleClose={handleClose}
        maxWidth={'lg'}
        open={open}
        type={type}
        dialogStyleProps={{
          padding: '0px 0px 24px 0px',
        }}
      >
        <ActionModal handleClose={handleClose} type={type} entityName='Question Answer'>
          {/* {type === TABLE_STATES.ACTIVE && (
            <SwitchDeleteModal
              actionFnc={() => {
                inactiveEntity()
              }}
              approvalTxt={'InActive'}
              handleClose={handleClose}
              type={type}
            />
          )}
          {type === TABLE_STATES.INACTIVE && (
            <SwitchDeleteModal
              actionFnc={() => {
                inactiveEntity()
              }}
              approvalTxt={'Active'}
              handleClose={handleClose}
              type={type}
            />
          )}
          {type === TABLE_STATES.DELETE && (
            <SwitchDeleteModal
              actionFnc={() => {
                deleteEntity()
              }}
              approvalTxt={type.charAt(0) + type.slice(1).toLowerCase()}
              handleClose={handleClose}
              type={type}
            />
          )} */}
          {type === TABLE_STATES.ADD && (
            <QnaForm
              // handleClose={handleClose}
              // entity={entity}
              // getData={getData}
              // setHandleControls={setHandleControls}
              // type={type as unknown as AllowedAction}
              // open={open}
              handleClose={handleClose}
              type={type}
              entity={entity}
              getModifiedData={getModifiedData}
            />
          )}
          {/* {type === TABLE_STATES.EDIT && (
            <QnaForm
              handleClose={handleClose}
              entity={entity}
              getData={getData}
              setHandleControls={setHandleControls}
              type={type as unknown as AllowedAction}
              open={open}
            />
          )} */}
          {type === TABLE_STATES.VIEW && (
            <div className='px-7'>
              <TreeView {...required} {...handlers} gapMode='padding' depthGap={20} />
            </div>
          )}
        </ActionModal>
      </CustomDialog>
    </Box>
  )
}

export default QnaList
