import {
  Grid,
  IconButton,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Link,
  Tooltip,
} from '@mui/material'
import { Actions, HeadCell } from '@/types/common'
import { ACTIONS_TABLE, sortTableRowsByHeadCells } from '@/utils/constants'
import { COMMON_MESSAGE } from '../utils/commonMessages'
import TableRowCell from './TableRowCells'
import { Dispatch, SetStateAction } from 'react'
import FetchSvg from './fetchSvg'
import { useToast } from '@/hooks/useToast'

type Props = {
  rows: any[]
  handleEdit: (item: any) => void
  handleDelete: (item: any) => void
  handleMap: (item: any) => void
  handleSwitch: (item: any, switchState: boolean) => void
  handleView: (item: any) => void
  handleDashEdit: (item: any) => void
  actions: Actions
  headCells: HeadCell[]
  selectedRows: any[]
  setSelectedRows: Dispatch<SetStateAction<any[]>>
  notFound: boolean
  isTableWithOutAction: boolean
}

const TableContent = ({
  rows,
  handleEdit,
  handleDelete,
  handleSwitch,
  handleMap,
  handleView,
  actions,
  headCells,
  selectedRows,
  setSelectedRows,
  handleDashEdit,
  notFound,
}: Props) => {
  const showToast = useToast()
  const handleChecked = (checked: boolean, row: any) => {
    if (selectedRows.find((x) => x._id == row._id)) {
      const arr = selectedRows.filter((x) => x._id !== row._id)
      setSelectedRows(arr)
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row])
    }
  }
  const rowProps = {
    paddingTop: '10px',
    paddingBottom: '10px',
  }
  return (
    <>
      {!notFound && (
        <TableBody
          sx={{
            maxWidth: 'max-content',
            overflow: 'scroll',
          }}
        >
          {rows.map((row, i) => {
            let tableRows: HeadCell[] = []
            if (row?.image) {
              const { image, ...rest } = row
              tableRows = sortTableRowsByHeadCells(Object.keys(rest), headCells)
            } else {
              const { ...rest } = row
              tableRows = sortTableRowsByHeadCells(Object.keys(rest), headCells)
            }
            return (
              <TableRow
                role='checkbox'
                tabIndex={-1}
                key={row._id}
                sx={{
                  cursor: 'pointer',
                }}
              >
                {tableRows.map((x, i) => {
                  return (
                    <TableRowCell
                      x={x}
                      i={i}
                      row={row}
                      key={Math.random()}
                      handleView={handleView}
                      selectedRows={selectedRows}
                      handleChecked={handleChecked}
                    />
                  )
                })}
                <TableCell
                  align='left'
                  padding='none'
                  sx={{
                    ...rowProps,
                  }}
                >
                  <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    {actions.includes(ACTIONS_TABLE.VIEW) && (
                      <Tooltip title='View' arrow>
                        <Grid item>
                          <Link
                            sx={{
                              display: 'inline-block',
                              fontWeight: '700',
                              fontSize: '16px',
                              color: '#004DAA',
                              marginRight: '10px',
                            }}
                            onClick={() => handleView(row)}
                          >
                            View
                          </Link>
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.DASHBOARDEDIT) && (
                      <Tooltip title='Edit' arrow>
                        <Grid item>
                          <Link
                            sx={{
                              display: 'inline-block',
                              fontWeight: '700',
                              fontSize: '16px',
                              color: 'black',
                              marginRight: '10px',
                            }}
                            onClick={() => handleDashEdit(row)}
                          >
                            Edit
                          </Link>
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.EDIT) && (
                      <Tooltip title='Edit' arrow>
                        <Grid item>
                          <IconButton
                            onClick={() => {
                              if (!row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)) {
                                showToast('info', COMMON_MESSAGE.EditDisabled)
                              } else {
                                handleEdit(row)
                              }
                            }}
                            sx={{
                              cursor:
                                !row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)
                                  ? 'not-allowed'
                                  : 'pointer',
                            }}
                            disableRipple={!row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)}
                          >
                            <FetchSvg
                              iconName='edit1'
                              svgProp={{
                                width: 24,
                                height: 24,
                                className:
                                  !row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)
                                    ? ''
                                    : 'svgPink',
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.MAP) && (
                      <Tooltip title='Map' arrow>
                        <Grid
                          item
                          sx={{
                            cursor:
                              !row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)
                                ? 'not-allowed'
                                : 'pointer',
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (!row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)) {
                                showToast('info', COMMON_MESSAGE.MapDisabled)
                              } else {
                                handleMap(row)
                              }
                            }}
                          >
                            <FetchSvg iconName='ser' svgProp={{ width: 24, height: 24 }} />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.DELETE) && (
                      <Tooltip title='Delete' arrow>
                        <Grid
                          item
                          sx={{
                            cursor:
                              row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)
                                ? 'not-allowed'
                                : 'pointer',
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)) {
                                showToast('info', COMMON_MESSAGE.Inactive)
                              } else {
                                handleDelete(row)
                              }
                            }}
                            sx={{
                              cursor:
                                row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)
                                  ? 'not-allowed'
                                  : 'pointer',
                            }}
                            disableRipple={row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)}
                          >
                            <FetchSvg
                              iconName='delete'
                              svgProp={{
                                width: 24,
                                height: 24,
                                className:
                                  row.isActive && actions.includes(ACTIONS_TABLE.SWITCH)
                                    ? ''
                                    : 'svgRed',
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.SWITCH) && (
                      <Tooltip title='Switch' arrow>
                        <Grid item>
                          <Switch
                            onChange={(e) => {
                              handleSwitch(row, e.currentTarget.checked)
                            }}
                            checked={row.isActive}
                          />
                        </Grid>
                      </Tooltip>
                    )}
                  </Grid>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      )}
    </>
  )
}

export default TableContent
