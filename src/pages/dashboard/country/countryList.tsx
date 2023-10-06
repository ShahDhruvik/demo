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
import DashboardForm from './countryForm'
import { theme } from '@/context/ThemeProvider'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<TableStates>>
  open: boolean
  type: TableStates
  handleClose: () => void
}

const CountryList = ({ handleOpen, setType, open, type, handleClose }: Props) => {
  //context
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { setNotFound, notFound } = useNotFound()

  // Record and Control States
  const [data, setData] = useState<any[]>([])
  const [entity, setEntity] = useState<any | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>({
    search: '',
    currentPage: 1,
    limitPerPage: limitOfPage,
    sort: 'siteName',
    sortOrder: 'asc',
  })

  const getData = async () => {
    // const response = await getAllSites(setLoading, setSnack, setNotFound, notFound, handleControls);
    const response = {
      records: [
        {
          siteName: 'Site 1',
          shortName: 'Site 1',
          address: 'Site 1',
          contactNo: 'Site 1',
          state: 'Site 1',
          city: 'Site 1',
          pinCode: 'Site 1',
          active: true,
        },
      ],
      currentPage: 1,
      pages: 1,
      total: 1,
      from: 1,
      to: 1,
    }
    if (response) {
      const { records, ...rest } = response
      if (records.length === 0) {
        setNotFound([TABLES.COUNTRY])
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
      id: 'siteName',
      label: 'Name',
      isSort: true,
    },
    {
      id: 'shortName',
      label: 'Short Name',
      isSort: true,
    },
    {
      id: 'address',
      label: 'Address',
      isSort: true,
    },
    {
      id: 'contactNo',
      label: 'Contact No.',
      isSort: true,
    },
    {
      id: 'state',
      label: 'State',
      isSort: true,
    },
    {
      id: 'city',
      label: 'City',
      isSort: true,
    },

    {
      id: 'pinCode',
      label: 'Pincode',
      isSort: false,
    },
    {
      id: 'active',
      label: 'Status',
      isSort: false,
      type: 'InformedStatus',
    },
  ]

  //Inactive and Delete entity
  //   const inactiveEntity = async () => {
  //     handleClose();
  //     const res = await inactiveSiteFe(setLoading, setSnack, handleClose, entity?._id as string);
  //     if (res) {
  //       const sitesUpdated = session?.user?.sites?.map((x) => {
  //         if (x._id === entity?._id) {
  //           x.active = false;
  //           return x;
  //         } else {
  //           return x;
  //         }
  //       });
  //       if (session?.user.siteId === entity?._id) {
  //         await update({
  //           ...session?.user,
  //           sites: sitesUpdated,
  //           siteName: sitesUpdated && sitesUpdated[0].siteName,
  //           siteId: sitesUpdated && sitesUpdated[0]._id,
  //         });
  //       } else {
  //         await update({
  //           ...session?.user,
  //           sites: sitesUpdated,
  //         });
  //       }
  //       setHandleControls({
  //         search: '',
  //         currentPage: 1,
  //         limitPerPage: limitOfPage,
  //         sort: 'siteName',
  //         sortOrder: 'asc',
  //       });
  //       await getData();
  //     }
  //   };
  //   const deleteEntity = async () => {
  //     handleClose();
  //     const res = await deleteSiteFe(setLoading, setSnack, entity?._id as string);
  //     if (res) {
  //       setHandleControls({
  //         search: '',
  //         currentPage: 1,
  //         limitPerPage: limitOfPage,
  //         sort: 'siteName',
  //         sortOrder: 'asc',
  //       });
  //       await getData();
  //       handleClose();
  //     }
  //   };

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
        tableHeading={{ tableId: TABLES.COUNTRY, tableName: 'Country' }}
        notFound={notFound.includes(TABLES.COUNTRY)}
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
        <ActionModal handleClose={handleClose} type={type} entityName='Country'>
          {(type === TABLE_STATES.INACTIVE ||
            type === TABLE_STATES.ACTIVE ||
            type === TABLE_STATES.DELETE) && (
            <SwitchDeleteModal
              actionFnc={() => {}}
              approvalTxt={type.charAt(0) + type.slice(1).toLowerCase()}
              handleClose={handleClose}
              type={type}
            />
          )}
          {(type === TABLE_STATES.ADD || type === TABLE_STATES.EDIT) && (
            <DashboardForm handleClose={handleClose} />
          )}
        </ActionModal>
      </CustomDialog>
    </Box>
  )
}

export default CountryList
