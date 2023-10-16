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
import { Box } from '@mui/material'
import CustomDialog from '@/components/Dialog-custom'
import ActionModal from '@/components/ActionModal'
import SwitchDeleteModal from '@/components/SwitchDeleteModal'
import DomainForm from './form'
import { theme } from '@/context/ThemeProvider'
import { FaqFields } from '@/types/faqTypes'
import { DomainFields } from '@/types/domain'
import { getAllDomains, inActiveDomain } from '@/lib/Domain'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<TableStates>>
  open: boolean
  type: TableStates
  handleClose: () => void
}

const DomainList = ({ handleOpen, setType, open, type, handleClose }: Props) => {
  //context
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { setNotFound, notFound } = useNotFound()

  //default controls
  const defaultControls = {
    search: '',
    currentPage: 1,
    limitPerPage: limitOfPage,
    sort: 'createdAt',
    sortOrder: 'asc',
  }

  // Record and Control States
  const [data, setData] = useState<DomainFields[]>([])
  const [entity, setEntity] = useState<DomainFields | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)

  const getData = async () => {
    const response = await getAllDomains(
      setLoading,
      showToast,
      setNotFound,
      notFound,
      handleControls,
    )
    if (response) {
      const { records, ...rest } = response
      if (records.length === 0) {
        setNotFound([TABLES.FAQ])
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
      id: 'title',
      label: 'Title',
      isSort: false,
    },
    {
      id: 'description',
      label: 'Description',
      isSort: false,
    },
    {
      id: 'isActive',
      label: 'Status',
      isSort: false,
      type: 'InformedStatus',
    },
  ]

  //Inactive and Delete entity
  const inactiveEntity = async () => {
    handleClose()
    const res = await inActiveDomain(
      setLoading,
      showToast,
      entity?._id as string,
      entity?.isActive as boolean,
    )
    if (res) {
      getModifiedData()
    }
  }

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
        actions={[ACTIONS_TABLE.EDIT, ACTIONS_TABLE.SWITCH]}
        // tableHeading={{ tableId: TABLES.FAQ, tableName: 'FAQ' }}
        notFound={notFound.includes(TABLES.DOMAIN)}
        btnTxtArray={[{ btnType: HEADERBTNS.CREATE, btnText: 'Create' }]}
      />
      <CustomDialog
        action={{ isAction: false, component: null }}
        header={{ isHeader: false, component: false }}
        handleClose={handleClose}
        maxWidth={'sm'}
        open={open}
        sxProps={{
          [theme.breakpoints.up('lg')]: {
            '.MuiPaper-root ': {
              minWidth: 1000,
            },
          },
          [theme.breakpoints.down('lg')]: {
            '.MuiPaper-root ': {
              minWidth: 800,
            },
          },
        }}
        dialogStyleProps={{
          padding: '0px 0px 24px 0px',
        }}
      >
        <ActionModal handleClose={handleClose} type={type} entityName='Domain'>
          {type === TABLE_STATES.ACTIVE && (
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

          {(type === TABLE_STATES.ADD || type === TABLE_STATES.EDIT) && (
            <DomainForm
              handleClose={handleClose}
              type={type}
              entity={entity as DomainFields}
              getModifiedData={getModifiedData}
            />
          )}
        </ActionModal>
      </CustomDialog>
    </Box>
  )
}

export default DomainList
