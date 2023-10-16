import {
  Box,
  Checkbox,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { StyledTableSortLabel } from '@/components/MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import { HandleControls, HeadCell } from '@/types/common'
import FetchSvg from './fetchSvg'
// import { StatusStepsEnum } from '@/backend-utils/constants'

type Props = {
  headCells: HeadCell[]
  sortFnc: (sort: string, sortOrder: string) => void
  handleControls: HandleControls
  setSelectedRows: Dispatch<SetStateAction<any[]>>
  selectedRows: any[]
  rows: any[]
  isTableWithOutAction: boolean
}

const TableHeader = ({
  headCells,
  sortFnc,
  handleControls,
  setSelectedRows,
  rows,
  selectedRows,
  isTableWithOutAction,
}: Props) => {
  return (
    <>
      <TableHead
        sx={{
          borderBottom: '2px solid ',
          borderColor: theme.palette.mDarkGray?.main,
        }}
      >
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={Math.random()}
              align={'left'}
              padding='none'
              sx={{
                paddingTop: isTableWithOutAction ? '16px' : '',
                paddingBottom: isTableWithOutAction ? '16px' : '',
                minWidth: 'max-content',
                [theme.breakpoints.down('xl')]: {
                  minWidth: headCell.width ? headCell.width : 150,
                },
              }}
            >
              <StyledTableSortLabel active={true}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={headCell.type === 'chechBox' ? '' : '4px'}
                >
                  {/* {(headCell.type === 'chechBox' || headCell.type === 'checkBoxDate') && (
                    <Checkbox
                      checked={
                        selectedRows.length ===
                          rows.filter((x) => !x.disabled && x.status === StatusStepsEnum.pending)
                            .length && selectedRows.length !== 0
                      }
                      onChange={(e, checked) => {
                        if (
                          selectedRows.length ===
                          rows.filter((x) => !x.disabled && x.status === StatusStepsEnum.pending)
                            .length
                        ) {
                          setSelectedRows([])
                        } else {
                          setSelectedRows([
                            ...rows.filter(
                              (x) => !x.disabled && x.status === StatusStepsEnum.pending,
                            ),
                          ])
                        }
                      }}
                    />
                  )} */}
                  <Typography
                    sx={{
                      color: theme.palette.mDarkBlue?.main,
                      fontWeight: '600',
                      fontSize: '16px',
                      marginRight: headCell.type === 'chechBox' ? '8px' : '1px',
                    }}
                  >
                    {`${headCell.label}`} <br /> {`${headCell.secondLineLabel ?? ''}`}
                  </Typography>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    {headCell.isSort && (
                      <IconButton
                        onClick={() => {
                          if (handleControls.sortOrder === 'asc') {
                            sortFnc(headCell.id, 'desc')
                          } else {
                            sortFnc(headCell.id, 'asc')
                          }
                        }}
                        sx={{ padding: 0 }}
                      >
                        <Box>
                          <FetchSvg
                            iconName='sortUp'
                            svgProp={{
                              fill:
                                headCell.id === handleControls?.sort &&
                                handleControls.sortOrder === 'asc'
                                  ? theme.palette.mDarkBlue?.main
                                  : theme.palette.mGray?.main,
                            }}
                            wrapperStyle='-mb-3'
                          />
                          <FetchSvg
                            iconName='sortDown'
                            svgProp={{
                              fill:
                                headCell.id === handleControls?.sort &&
                                handleControls.sortOrder === 'desc'
                                  ? theme.palette.mDarkBlue?.main
                                  : theme.palette.mGray?.main,
                            }}
                          />
                        </Box>
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </StyledTableSortLabel>
            </TableCell>
          ))}
          {!isTableWithOutAction && (
            <TableCell
              align={'center'}
              padding='none'
              sx={{
                paddingTop: '16px',
                paddingBottom: '16px',
                width: 'auto',
              }}
            >
              <StyledTableSortLabel>
                <Typography
                  sx={{
                    color: theme.palette.mDarkBlue?.main,
                    fontWeight: '600',
                    fontSize: '16px',
                  }}
                >
                  Actions
                </Typography>
              </StyledTableSortLabel>
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    </>
  )
}

export default TableHeader
