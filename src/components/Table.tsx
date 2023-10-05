import React, { Dispatch, SetStateAction, memo } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableFooterControls from './TableFooterControls'
import TableHeaderControls from './TableHeaderControls'
import TableHeader from './TableHead'
import TableContent from './TableContent'
import {
  Actions,
  Controls,
  DashboardType,
  HandleControls,
  HeaderBtnTypes,
  TableStates,
} from '@/types/common'
import { ACTIONS_TABLE, TABLE_STATES } from '@/utils/constants'

type Props = {
  handleOpen: () => void
  setType: React.Dispatch<React.SetStateAction<TableStates>>
  setEntity: React.Dispatch<React.SetStateAction<any | undefined>>
  rows: any[]
  headCells: any[]
  controls: Controls
  actions: Actions
  tableHeading: { tableId: string; tableName: string }
  handleControls: HandleControls
  setHandleControls: React.Dispatch<React.SetStateAction<HandleControls>>
  tabs?: { isTabs: boolean; tabComponent: any }
  btnTxtArray: HeaderBtnTypes
  notFound: boolean
  setSelectedRows?: React.Dispatch<React.SetStateAction<any[]>>
  selectedRows?: any[]
  setDashboardType?: Dispatch<SetStateAction<DashboardType>>
  isTableWithOutAction?: boolean
}

const CustomTable = ({
  rows,
  headCells,
  actions,
  tableHeading,
  controls,
  handleControls,
  setHandleControls,
  handleOpen,
  setType,
  setEntity,
  tabs,
  setSelectedRows,
  selectedRows,
  setDashboardType,
  notFound,
  isTableWithOutAction,
  btnTxtArray,
}: Props) => {
  // Actions
  //Create
  const create = () => {
    setType(TABLE_STATES.ADD)
    setEntity(undefined)
    handleOpen()
  }
  //Edit
  const memoizedHandleEdit = (item: any) => {
    setType(TABLE_STATES.EDIT)
    setEntity(item)
    handleOpen()
  }
  //Delete
  const memoizedHandleDelete = (item: any) => {
    setType(TABLE_STATES.DELETE)
    setEntity(item)
    handleOpen()
  }
  //Map
  const memoizedHandleMap = (item: any) => {
    setType(TABLE_STATES.MAP)
    setEntity(item)
    handleOpen()
  }
  const memoizedHandleView = (item: any) => {
    // if (setDashboardType) {
    //   setDashboardType(item.recordOf)
    // }
    setType(TABLE_STATES.VIEW)
    setEntity(item)
    handleOpen()
  }
  const memoizedHandleDashEdit = (item: any) => {
    // if (setDashboardType) {
    //   setDashboardType(item.recordOf)
    // }
    setType(TABLE_STATES.DASHBOARDEDIT)
    setEntity(item)
    handleOpen()
  }
  const handleSwitch = (item: any, switchState: boolean) => {
    console.log(item)
    if (!actions.includes(ACTIONS_TABLE.SWITCH)) {
      return
    } else {
      if (item.active) {
        console.log('object')
        setType(TABLE_STATES.INACTIVE)
      } else {
        setType(TABLE_STATES.ACTIVE)
      }
      setEntity(item)
      handleOpen()
    }
  }
  // Sorting, Searching and Pagination
  //search
  const search = (srhTxt: string) =>
    setHandleControls({ ...handleControls, search: srhTxt, currentPage: 1 })
  //sort
  const sort = (sort: string, sortOrder: string) =>
    setHandleControls({
      ...handleControls,
      sort: sort,
      currentPage: 1,
      sortOrder: sortOrder,
    })

  //Page
  const handlePage = (newPage: number) =>
    setHandleControls({ ...handleControls, currentPage: newPage })

  //RowsPerPage
  const handleRowsPerPage = (pageLimit: number) =>
    setHandleControls({
      ...handleControls,
      limitPerPage: pageLimit,
      currentPage: 1,
    })
  return (
    <Paper sx={{ width: '100%' }}>
      <TableHeaderControls
        heading={tableHeading.tableName}
        searchFnc={search}
        clickFnc={create}
        tabs={tabs}
        btnTxtArray={btnTxtArray}
        selectedRows={selectedRows as any[]}
      />
      <TableContainer
        sx={{
          pl: '16px',
          pr: '16px',
        }}
        className='scrollBar'
      >
        <Table aria-labelledby='tableTitle' size='medium'>
          <TableHeader
            headCells={headCells}
            sortFnc={sort}
            handleControls={handleControls}
            setSelectedRows={setSelectedRows as Dispatch<SetStateAction<any[]>>}
            selectedRows={selectedRows as any[]}
            rows={rows}
            isTableWithOutAction={isTableWithOutAction ? isTableWithOutAction : false}
          />
          <TableContent
            rows={rows}
            key={Math.random()}
            handleDelete={memoizedHandleDelete}
            handleEdit={memoizedHandleEdit}
            handleSwitch={handleSwitch}
            handleMap={memoizedHandleMap}
            handleView={memoizedHandleView}
            actions={actions}
            headCells={headCells}
            selectedRows={selectedRows as any[]}
            setSelectedRows={setSelectedRows as Dispatch<SetStateAction<any[]>>}
            handleDashEdit={memoizedHandleDashEdit}
            notFound={notFound}
            isTableWithOutAction={isTableWithOutAction ? isTableWithOutAction : false}
          />
        </Table>
      </TableContainer>
      <TableFooterControls
        handlePage={handlePage}
        handleRowsPerPage={handleRowsPerPage}
        numberOfPages={controls.pages}
        from={controls.from}
        to={controls.to}
        total={controls.total}
        currentPage={controls.currentPage}
        handleControls={handleControls}
        notFound={notFound}
      />
    </Paper>
  )
}

export default memo(CustomTable)
