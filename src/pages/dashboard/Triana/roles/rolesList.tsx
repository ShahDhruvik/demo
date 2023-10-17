import Table from '@/components/Table'
import { Controls, HandleControls, HeadCell, TableStates } from '@/types/common'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ACTIONS_TABLE, HEADERBTNS, TABLES, TABLE_STATES, limitOfPage } from '@/utils/constants'
import { useLoading } from '@/context/LoadingContext'
import { useNotFound } from '@/context/NotFound'
import { useToast } from '@/hooks/useToast'
import { Box } from '@mui/material'
import CustomDialog from '@/components/Dialog-custom'
import ActionModal from '@/components/ActionModal'
import SwitchDeleteModal from '@/components/SwitchDeleteModal'
import RolesForm from './rolesForm'
import { RoleData } from '@/types/role'
import { deleteRole, getRole, inactiveRole } from '@/lib/role'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<TableStates>>
  open: boolean
  type: TableStates
  handleClose: () => void
}

const RolesList = ({ handleOpen, setType, open, type, handleClose }: Props) => {
  //context
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { setNotFound, notFound } = useNotFound()

  //default controls
  const defaultControls = {
    search: '',
    currentPage: 1,
    limitPerPage: limitOfPage,
    sort: 'name',
    sortOrder: 'asc',
  }

  // Record and Control States
  const [data, setData] = useState<any[]>([])
  const [entity, setEntity] = useState<RoleData | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)

  const getData = async () => {
    const response = await getRole(setLoading, showToast, setNotFound, notFound, handleControls)
    if (response) {
      const { records, ...rest } = response
      if (records.length === 0) {
        setNotFound([TABLES.ROLE])
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
      id: 'name',
      label: 'Name',
      isSort: true,
    },
    // {
    //   id: 'shortName',
    //   label: 'Short Name',
    //   isSort: true,
    // },
    // {
    //   id: 'isoCode',
    //   label: 'ISO code',
    //   isSort: true,
    // },
    // {
    //   id: 'code',
    //   label: 'Code',
    //   isSort: true,
    // },
    {
      id: 'isActive',
      label: 'Active',
      isSort: false,
      type: 'InformedStatus',
    },
  ]

  // Inactive and Delete entity
  const inactiveEntity = async () => {
    handleClose()
    const res = await inactiveRole(
      setLoading,
      showToast,
      entity?._id as string,
      entity?.isActive as boolean,
    )
    if (res) {
      getModifiedData()
    }
  }
  const deleteEntity = async () => {
    handleClose()
    const res = await deleteRole(setLoading, showToast, entity?._id as string)
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
        actions={[ACTIONS_TABLE.DELETE, ACTIONS_TABLE.EDIT, ACTIONS_TABLE.SWITCH]}
        // tableHeading={{ tableId: TABLES.ROLE, tableName: 'Role' }}
        notFound={notFound.includes(TABLES.ROLE)}
        btnTxtArray={[{ btnType: HEADERBTNS.CREATE, btnText: 'Create' }]}
      />
      <CustomDialog
        action={{ isAction: false, component: null }}
        header={{ isHeader: false, component: false }}
        handleClose={handleClose}
        maxWidth={'sm'}
        open={open}
        type={type}
        dialogStyleProps={{
          padding: '0px 0px 24px 0px',
        }}
      >
        <ActionModal handleClose={handleClose} type={type} entityName='Role'>
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
          {type === TABLE_STATES.DELETE && (
            <SwitchDeleteModal
              actionFnc={() => {
                deleteEntity()
              }}
              approvalTxt={'Delete'}
              handleClose={handleClose}
              type={type}
            />
          )}
          {(type === TABLE_STATES.ADD || type === TABLE_STATES.EDIT) && (
            <RolesForm
              handleClose={handleClose}
              type={type}
              entity={entity as RoleData}
              getModifiedData={getModifiedData}
            />
          )}
        </ActionModal>
      </CustomDialog>
    </Box>
  )
}

export default RolesList
