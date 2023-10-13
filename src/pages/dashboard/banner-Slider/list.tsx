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
import BannerSliderForm from './form'
import { theme } from '@/context/ThemeProvider'
import { BannerSliderFields } from '@/types/bannerSlider'
import { deleteBannerSlider, getAllBannerSliders, inActiveBannerSlider } from '@/lib/Banner-Slider'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<TableStates>>
  open: boolean
  type: TableStates
  handleClose: () => void
}

const BannerSliderList = ({ handleOpen, setType, open, type, handleClose }: Props) => {
  //context
  const { setLoading } = useLoading()
  const showToast = useToast() as ShowToastFunction
  const { setNotFound, notFound } = useNotFound()

  // Record and Control States
  const [data, setData] = useState<BannerSliderFields[]>([])
  const [entity, setEntity] = useState<BannerSliderFields | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>({
    search: '',
    currentPage: 1,
    limitPerPage: limitOfPage,
    sort: 'createdAt',
    sortOrder: 'asc',
  })

  const getData = async () => {
    const response = await getAllBannerSliders(setLoading, showToast, setNotFound, handleControls)
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

  useEffect(() => {
    getData()
  }, [handleControls])

  ///headCells
  const headCells: HeadCell[] = [
    {
      id: 'title',
      label: 'Title',
      isSort: true,
    },
    {
      id: 'image',
      label: 'Image',
      isSort: false,
      type: 'image',
    },
    {
      id: 'isActive',
      label: 'Status',
      isSort: true,
      type: 'InformedStatus',
    },
  ]

  //Inactive and Delete entity
  const inactiveEntity = async () => {
    const res = await inActiveBannerSlider(
      setLoading,
      showToast,
      entity.isActive as boolean,
      entity?._id as string,
    )
    if (res) {
      setHandleControls({
        search: '',
        currentPage: 1,
        limitPerPage: limitOfPage,
        sort: 'createdAt',
        sortOrder: 'asc',
      })
      await getData()
      handleClose()
    }
  }
  const deleteEntity = async () => {
    const res = await deleteBannerSlider(setLoading, showToast, entity?._id as string)
    if (res) {
      setHandleControls({
        search: '',
        currentPage: 1,
        limitPerPage: limitOfPage,
        sort: 'siteName',
        sortOrder: 'asc',
      })
      await getData()
      handleClose()
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
        tableHeading={{ tableId: TABLES.BANNER_SLIDER, tableName: 'Banner Slider' }}
        notFound={notFound.includes(TABLES.BANNER_SLIDER)}
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
              minWidth: 800,
            },
          },
          [theme.breakpoints.down('lg')]: {
            '.MuiPaper-root ': {
              minWidth: 600,
            },
          },
        }}
        dialogStyleProps={{
          padding: '0px 0px 24px 0px',
        }}
      >
        <ActionModal handleClose={handleClose} type={type} entityName='Banner Slider'>
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
          {type === TABLE_STATES.DELETE && (
            <SwitchDeleteModal
              actionFnc={() => {
                deleteEntity()
              }}
              approvalTxt={type.charAt(0) + type.slice(1).toLowerCase()}
              handleClose={handleClose}
              type={type}
            />
          )}
          {(type === TABLE_STATES.ADD || type === TABLE_STATES.EDIT) && (
            <BannerSliderForm
              handleClose={handleClose}
              entity={entity}
              getData={getData}
              setHandleControls={setHandleControls}
              type={type as unknown as AllowedAction}
              open={open}
            />
          )}
        </ActionModal>
      </CustomDialog>
    </Box>
  )
}

export default BannerSliderList
