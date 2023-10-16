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
import InsuranceCompanyForm from './form'
import { theme } from '@/context/ThemeProvider'
import { insuranceCompanyData } from '@/types/insuranceCompany'
import { getInsuranceCompany, inactiveInsuranceCompany } from '@/lib/insuranceCompany'
import TreeView, { useTreeState } from 'react-hyper-tree'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<TableStates>>
  open: boolean
  type: TableStates
  handleClose: () => void
}

const InsuranceCompanyList = ({ handleOpen, setType, open, type, handleClose }: Props) => {
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
  const [entity, setEntity] = useState<insuranceCompanyData | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)
  const [tree, setTree] = useState<any[]>([])

  const getData = async () => {
    const response = await getInsuranceCompany(
      setLoading,
      showToast,
      setNotFound,
      notFound,
      handleControls,
    )
    if (response) {
      const { records, ...rest } = response
      if (records.length === 0) {
        setNotFound([TABLES.INSURANCE_COMPANY])
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
      isSort: false,
    },
    {
      id: 'country',
      label: 'Country',
      isSort: false,
    },
    {
      id: 'state',
      label: 'State',
      isSort: false,
    },
    {
      id: 'city',
      label: 'City',
      isSort: false,
    },
    {
      id: 'pinCode',
      label: 'Pincode',
      isSort: false,
    },
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
    const res = await inactiveInsuranceCompany(
      setLoading,
      showToast,
      entity?._id as string,
      entity?.isActive as boolean,
    )
    if (res) {
      getModifiedData()
    }
  }

  // const tree = entity?.plans?.map((x) => {
  //   return {
  //     id: x?.coverageType,
  //     name: x?.planNo,
  //     children: x?.memberId?.map((y) => {
  //       return {
  //         id: Math.random(),
  //         name: y,
  //       }
  //     }),
  //   }
  // })

  // const xx = () => {
  //   const t = entity?.plans?.map((x) => {
  //     return {
  //       id: x?.coverageType,
  //       name: x?.planNo,
  //       children: x?.memberId?.map((y) => {
  //         return {
  //           id: Math.random(),
  //           name: y,
  //         }
  //       }),
  //     }
  //   })
  //   setTree(t)
  // }

  const xx = () => {
    const tut = []
    for (const plan of entity.plans) {
      if (plan) {
        const p = {
          id: plan?.planNo,
          name: plan?.planNo,
          children: plan?.memberId?.map((y) => {
            return {
              id: Math.random(),
              name: y,
            }
          }),
        }
        const index = tut.findIndex((x) => x.name === plan.coverageType)
        if (index >= 0) tut[index].children.push(p)
        else tut.push({ name: plan.coverageType, children: [p] })
      }
    }
    // console.log(tut)
    // const a = entity?.plans?.map((x) => {
    //   return {
    //     id: x?.planNo,
    //     name: x?.planNo,
    //     children: x?.memberId?.map((y) => {
    //       return {
    //         id: Math.random(),
    //         name: y,
    //       }
    //     }),
    //   }
    // })

    // const t = entity?.plans?.map((x) => {
    //   return {
    //     id: x?.coverageType,
    //     name: x?.coverageType,
    //     children: a ?? [],
    //   }
    // })
    // const res = []

    setTree(tut)
  }

  useEffect(() => {
    if (entity) {
      xx()
    }
  }, [entity])

  const { required, handlers } = useTreeState({
    data: tree ? tree : [],
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
        actions={[ACTIONS_TABLE.SWITCH, ACTIONS_TABLE.VIEW]}
        // tableHeading={{ tableId: TABLES.PINCODE, tableName: 'Pincode' }}
        notFound={notFound.includes(TABLES.INSURANCE_COMPANY)}
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
        maxHeight={600}
        minHeight={600}
        dialogStyleProps={{
          padding: '0px 0px 24px 0px',
        }}
      >
        <ActionModal handleClose={handleClose} type={type} entityName='Insurance Company'>
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
          {type === TABLE_STATES.ADD && (
            <InsuranceCompanyForm
              handleClose={handleClose}
              type={type}
              entity={entity as insuranceCompanyData}
              getModifiedData={getModifiedData}
            />
          )}
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

export default InsuranceCompanyList
