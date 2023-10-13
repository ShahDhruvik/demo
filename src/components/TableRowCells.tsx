import { HeadCell } from '@/types/common'
import { formatDate, splitDescription } from '@/utils/constants'
import { Avatar, Box, Checkbox, Fade, TableCell, Tooltip, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { theme } from '../context/ThemeProvider'

type Props = {
  x: HeadCell
  i: number
  row: any
  handleChecked: (checked: boolean, row: any) => void
  handleView: (item: any) => void
  selectedRows: any[]
}

const TableRowCell = ({ x, i, row, handleChecked, handleView, selectedRows }: Props) => {
  const rowProps = {
    paddingTop: '10px',
    paddingBottom: '10px',
    minWidth: x.width ? x.width : 180,
    [theme.breakpoints.down('xl')]: {
      minWidth: x.width ? x.width : 180,
    },
  }
  const maxLengthCharacter = 15
  switch (x.type) {
    case 'image':
      if (typeof row[x.id] === 'string' && row[x.id].length >= maxLengthCharacter) {
        return (
          <Tooltip
            key={Math.random()}
            title={row[x.id]}
            arrow
            placement='bottom-start'
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
          >
            <TableCell
              component='th'
              key={x.id}
              scope='row'
              padding='none'
              sx={{
                ...rowProps,
              }}
            >
              {row[x.id] && (
                <Box display={'flex'} alignItems={'center'} gap={2}>
                  <Avatar
                    src={
                      row[x.imageSrc as string] !== '' ? (row[x.imageSrc as string] as string) : 'a'
                    }
                    alt={String(row[x.id]).charAt(0).toUpperCase()}
                  />
                  <Typography
                    sx={{
                      fontWeight: i === 0 || x.isDark ? '700' : '500',
                      fontSize: '16px',
                      color: 'black',
                    }}
                  >
                    {splitDescription(row[x.id], maxLengthCharacter)}
                  </Typography>
                </Box>
              )}
            </TableCell>
          </Tooltip>
        )
      } else {
        return (
          <TableCell
            component='th'
            key={x.id}
            scope='row'
            padding='none'
            sx={{
              ...rowProps,
            }}
          >
            {row[x.id] && (
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <Avatar
                  src={
                    row[x.imageSrc as string] !== '' ? (row[x.imageSrc as string] as string) : 'a'
                  }
                  alt={String(row[x.id]).charAt(0).toUpperCase()}
                />
                <Typography
                  sx={{
                    fontWeight: i === 0 || x.isDark ? '700' : '500',
                    fontSize: '16px',
                    color: 'black',
                  }}
                >
                  {row[x.id] ?? ''}
                </Typography>
              </Box>
            )}
          </TableCell>
        )
      }
    case 'downlaodLink':
      return (
        <TableCell
          component='th'
          key={Math.random()}
          scope='row'
          padding='none'
          sx={{
            ...rowProps,
            cursor: row[x.linkPath.pathname] === '' ? 'not-allowed' : 'pointer',
          }}
        >
          <a href={row[x.linkPath.pathname]} download={true} target='_blank'>
            <Typography
              sx={{
                display: 'inline-block',
                fontWeight: '700',
                fontSize: '16px',
                color: row[x.linkPath.pathname] === '' ? theme.palette.mLightGray?.main : 'black',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  borderBottom: `2px solid ${
                    row[x.linkPath.pathname] === '' ? theme.palette.mLightGray?.main : 'black'
                  }`,
                  bottom: '-0.7px',
                },
              }}
            >
              {'Download'}
            </Typography>
          </a>
        </TableCell>
      )
    case 'linkTxt':
      if (typeof row[x.id] === 'string' && row[x.id].length >= maxLengthCharacter) {
        return (
          <Tooltip
            key={Math.random()}
            title={row[x.id]}
            arrow
            placement='bottom-start'
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
          >
            <TableCell
              component='th'
              key={Math.random()}
              scope='row'
              padding='none'
              sx={{
                ...rowProps,
              }}
            >
              <Link
                to={{
                  pathname: x.linkPath.pathname,
                  search: { ...x.linkPath.query },
                }}
              >
                <Typography
                  sx={{
                    display: 'inline-block',
                    fontWeight: '700',
                    fontSize: '16px',
                    color: 'black',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      borderBottom: '2px solid black',
                      bottom: '-0.7px', // Adjust this value to control the spacing
                    },
                  }}
                >
                  {row[x.id] ? splitDescription(row[x.id], maxLengthCharacter) : ''}
                </Typography>
              </Link>
            </TableCell>
          </Tooltip>
        )
      } else {
        return (
          <TableCell
            component='th'
            key={Math.random()}
            scope='row'
            padding='none'
            sx={{
              ...rowProps,
            }}
          >
            <Link
              to={{
                pathname: x.linkPath.pathname,
                search: { ...x.linkPath.query },
              }}
            >
              <Typography
                sx={{
                  display: 'inline-block',
                  fontWeight: '700',
                  fontSize: '16px',
                  color: 'black',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    borderBottom: '2px solid black',
                    bottom: '-0.7px',
                  },
                }}
              >
                {row[x.id]}
              </Typography>
            </Link>
          </TableCell>
        )
      }
    case 'linkTxtView':
      return (
        <TableCell
          component='th'
          key={Math.random()}
          scope='row'
          padding='none'
          sx={{
            ...rowProps,
          }}
        >
          <Button
            sx={{
              minWidth: '40px',
              cursor: row[x.id] === 0 ? 'not-allowed' : 'pointer',
            }}
            onClick={() => {
              if (row[x.id] !== 0) {
                x.onView?.viewFnc(row)
              }
            }}
          >
            <Typography
              sx={{
                display: 'inline-block',
                fontWeight: '700',
                fontSize: '16px',
                color:
                  row[x.id] === 0 ? theme.palette.mLightGray?.main : theme.palette.mDarkBlue?.main,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  borderBottom: `2px solid ${
                    row[x.id] === 0 ? theme.palette.mLightGray?.main : theme.palette.mDarkBlue?.main
                  }`,
                  bottom: '-0.7px', // Adjust this value to control the spacing
                },
              }}
            >
              {Number(row[x.id]) >= 0 && Number(row[x.id] && row[x.id]) <= 9
                ? `0${row[x.id]}`
                : row[x.id]}
            </Typography>
          </Button>
        </TableCell>
      )
    case 'linkNumber':
      return (
        <TableCell
          component='th'
          key={Math.random()}
          scope='row'
          padding='none'
          sx={{
            ...rowProps,
          }}
        >
          {row[x.id] > 0 && (
            <Link
              to={{
                pathname: x.linkPath.pathname,
                search: { ...x.linkPath.query },
              }}
            >
              <Typography
                sx={{
                  cursor: 'pointer',
                  display: 'inline-block',
                  fontWeight: '700',
                  fontSize: '16px',
                  color: 'black',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    borderBottom: `2px solid black`,
                    bottom: '-0.7px',
                  },
                }}
              >
                {Number(row[x.id]) >= 0 && Number(row[x.id] && row[x.id]) <= 9
                  ? `0${row[x.id]}`
                  : row[x.id]}
              </Typography>
            </Link>
          )}
          {row[x.id] === 0 && (
            <Typography
              sx={{
                cursor: 'not-allowed',
                display: 'inline-block',
                fontWeight: '700',
                fontSize: '16px',
                color: theme.palette.mLightGray?.main,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  borderBottom: `2px solid ${theme.palette.mLightGray?.main}`,
                  bottom: '-0.7px',
                },
              }}
            >
              {Number(row[x.id]) >= 0 && Number(row[x.id] && row[x.id]) <= 9
                ? `0${row[x.id]}`
                : row[x.id]}
            </Typography>
          )}
        </TableCell>
      )
    case 'date':
      return (
        <TableCell
          component='th'
          key={Math.random()}
          scope='row'
          padding='none'
          sx={{
            ...rowProps,
          }}
        >
          <Typography
            sx={{
              fontWeight: i === 0 || x.isDark ? '700' : '500',
              fontSize: '16px',
              color: 'black',
            }}
          >
            {row[x.id] ? formatDate(row[x.id]) : ''}
          </Typography>
        </TableCell>
      )

    case 'InformedStatus':
      return (
        <TableCell
          align='left'
          padding='none'
          sx={{
            ...rowProps,
          }}
        >
          {(row[x.id] === 'APPROVED' || row[x.id] === 'EXECUTED') && (
            <Typography
              sx={{
                backgroundColor: 'rgba(11, 166, 73, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: '#0BA649',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '120px',
                letterSpacing: '0.25px',
                textTransform: 'capitalize',
              }}
            >
              {row[x.id].toLowerCase()}
            </Typography>
          )}
          {(row[x.id] === 'INACTIVE' ||
            row[x.id] === 'ADD' ||
            row[x.id] === 'DELETE' ||
            row[x.id] === 'EDIT') && (
            <Typography
              sx={{
                backgroundColor: 'rgba(52, 65, 163, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: 'rgba(52, 65, 163, 1)',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '120px',
                letterSpacing: '0.25px',
                textTransform: 'capitalize',
              }}
            >
              {row[x.id].toUpperCase()}
            </Typography>
          )}
          {row[x.id] === 'PENDING' && (
            <Typography
              sx={{
                backgroundColor: 'rgba(253, 207, 43, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: '#FDCF2B',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '120px',
                letterSpacing: '0.25px',
                textTransform: 'capitalize',
              }}
            >
              {row[x.id].toLowerCase()}
            </Typography>
          )}
          {(row[x.id] === 'REJECTED' || row[x.id] === 'SKIP') && (
            <Typography
              sx={{
                backgroundColor: 'rgba(255, 103, 103, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: '#FF6767',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '120px',
                letterSpacing: '0.25px',
                textTransform: 'capitalize',
              }}
            >
              {row[x.id].toLowerCase()}
            </Typography>
          )}
          {row[x.id] === true && (
            <Typography
              sx={{
                backgroundColor: 'rgba(11, 166, 73, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: '#0BA649',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '90px',
                letterSpacing: '0.25px',
              }}
            >
              {'Active'}
            </Typography>
          )}
          {row[x.id] === false && (
            <Typography
              sx={{
                backgroundColor: 'rgba(255, 103, 103, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: '#FF6767',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '90px',
                letterSpacing: '0.25px',
              }}
            >
              {'Inactive'}
            </Typography>
          )}
        </TableCell>
      )
    case 'isFinal':
      return (
        <TableCell
          align='left'
          padding='none'
          sx={{
            ...rowProps,
          }}
        >
          {row[x.id] === true && (
            <Typography
              sx={{
                backgroundColor: 'rgba(11, 166, 73, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: '#0BA649',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '90px',
                letterSpacing: '0.25px',
              }}
            >
              {'Yes'}
            </Typography>
          )}
          {row[x.id] === false && (
            <Typography
              sx={{
                backgroundColor: 'rgba(255, 103, 103, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: '#FF6767',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '90px',
                letterSpacing: '0.25px',
              }}
            >
              {'No'}
            </Typography>
          )}
        </TableCell>
      )
    case 'actions':
      return (
        <TableCell
          align='left'
          padding='none'
          sx={{
            ...rowProps,
          }}
        >
          {(row[x.id] === 'EXECUTED' || row[x.id] === 'SKIP') && (
            <Typography
              sx={{
                backgroundColor: 'rgba(52, 65, 163, 0.15)',
                borderRadius: '27px',
                textAlign: 'center',
                color: 'rgba(52, 65, 163, 1)',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '35px',
                padding: '0px 10px 0px 10px',
                width: '120px',
                letterSpacing: '0.25px',
                textTransform: 'capitalize',
              }}
            >
              {row[x.id].toUpperCase()}
            </Typography>
          )}
        </TableCell>
      )
    // case 'Warranty':
    //   return (
    //     <TableCell
    //       align='left'
    //       padding='none'
    //       sx={{
    //         ...rowProps,
    //       }}
    //     >
    //       {row[x.id] === 12 && (
    //         <Typography
    //           sx={{
    //             backgroundColor: 'rgba(52, 65, 163, 0.15)',
    //             borderRadius: '27px',
    //             textAlign: 'center',
    //             color: 'rgba(52, 65, 163, 1)',
    //             fontWeight: '600',
    //             fontSize: '16px',
    //             lineHeight: '35px',
    //             padding: '0px 10px 0px 10px',
    //             width: '120px',
    //             letterSpacing: '0.25px',
    //             textTransform: 'capitalize',
    //           }}
    //         >
    //           {Frequencies.Yearly.toLowerCase()}
    //         </Typography>
    //       )}
    //       {row[x.id] === 6 && (
    //         <Typography
    //           sx={{
    //             backgroundColor: 'rgba(52, 65, 163, 0.15)',
    //             borderRadius: '27px',
    //             textAlign: 'center',
    //             color: 'rgba(52, 65, 163, 1)',
    //             fontWeight: '600',
    //             fontSize: '16px',
    //             lineHeight: '35px',
    //             padding: '0px 10px 0px 10px',
    //             width: '120px',
    //             letterSpacing: '0.25px',
    //             textTransform: 'capitalize',
    //           }}
    //         >
    //           {Frequencies.Half_Yearly.toLowerCase()}
    //         </Typography>
    //       )}
    //       {row[x.id] === 3 && (
    //         <Typography
    //           sx={{
    //             backgroundColor: 'rgba(52, 65, 163, 0.15)',
    //             borderRadius: '27px',
    //             textAlign: 'center',
    //             color: 'rgba(52, 65, 163, 1)',
    //             fontWeight: '600',
    //             fontSize: '16px',
    //             lineHeight: '35px',
    //             padding: '0px 10px 0px 10px',
    //             width: '120px',
    //             letterSpacing: '0.25px',
    //             textTransform: 'capitalize',
    //           }}
    //         >
    //           {Frequencies.Quartely.toLowerCase()}
    //         </Typography>
    //       )}
    //       {row[x.id] === 1 && (
    //         <Typography
    //           sx={{
    //             backgroundColor: 'rgba(52, 65, 163, 0.15)',
    //             borderRadius: '27px',
    //             textAlign: 'center',
    //             color: 'rgba(52, 65, 163, 1)',
    //             fontWeight: '600',
    //             fontSize: '16px',
    //             lineHeight: '35px',
    //             padding: '0px 10px 0px 10px',
    //             width: '120px',
    //             letterSpacing: '0.25px',
    //             textTransform: 'capitalize',
    //           }}
    //         >
    //           {Frequencies.Monthly.toLowerCase()}
    //         </Typography>
    //       )}
    //     </TableCell>
    //   )
    // case 'chechBox':
    //   if (typeof row[x.id] === 'string' && row[x.id].length >= maxLengthCharacter) {
    //     return (
    //       <Tooltip
    //         key={Math.random()}
    //         title={row[x.id]}
    //         arrow
    //         placement='bottom-start'
    //         TransitionComponent={Fade}
    //         TransitionProps={{ timeout: 500 }}
    //       >
    //         <TableCell
    //           component='th'
    //           key={Math.random()}
    //           scope='row'
    //           padding='none'
    //           sx={{
    //             ...rowProps,
    //             display: 'flex',
    //             alignItems: 'center',
    //           }}
    //         >
    //           <Checkbox
    //             checked={selectedRows.find((x) => x._id === row._id) ? true : false}
    //             onChange={(e, checked) => {
    //               if (
    //                 !(
    //                   row.disabled ||
    //                   row.status === StatusStepsEnum.approved ||
    //                   row.status === StatusStepsEnum.rejected ||
    //                   row.status === ScheduleActions.exec ||
    //                   row.status === ScheduleActions.skip
    //                 )
    //               ) {
    //                 handleChecked(checked, row)
    //               }
    //             }}
    //             sx={{
    //               '.MuiSvgIcon-root': {
    //                 fill: !(
    //                   row.disabled ||
    //                   row.status === StatusStepsEnum.approved ||
    //                   row.status === StatusStepsEnum.rejected ||
    //                   row.status === ScheduleActions.exec ||
    //                   row.status === ScheduleActions.skip
    //                 )
    //                   ? 'black'
    //                   : theme.palette.customLightGrey?.main,
    //               },
    //               cursor: !(
    //                 row.disabled ||
    //                 row.status === StatusStepsEnum.approved ||
    //                 row.status === StatusStepsEnum.rejected ||
    //                 row.status === ScheduleActions.exec ||
    //                 row.status === ScheduleActions.skip
    //               )
    //                 ? 'pointer'
    //                 : 'not-allowed',
    //             }}
    //           />
    //           <Button onClick={() => handleView(row)}>
    //             <Typography
    //               sx={{
    //                 cursor: 'pointer',
    //                 display: 'inline-block',
    //                 fontWeight: '700',
    //                 fontSize: '16px',
    //                 color: 'black',
    //                 position: 'relative',
    //                 '&::before': {
    //                   content: '""',
    //                   position: 'absolute',
    //                   width: '100%',
    //                   borderBottom: `2px solid black`,
    //                   bottom: '-0.7px',
    //                 },
    //               }}
    //             >
    //               {row[x.id] ? splitDescription(row[x.id], maxLengthCharacter) : ''}
    //             </Typography>
    //           </Button>
    //         </TableCell>
    //       </Tooltip>
    //     )
    //   } else {
    //     return (
    //       <TableCell
    //         component='th'
    //         key={Math.random()}
    //         scope='row'
    //         padding='none'
    //         sx={{
    //           ...rowProps,
    //           display: 'flex',
    //           alignItems: 'center',
    //         }}
    //       >
    //         <Checkbox
    //           checked={selectedRows.find((x) => x._id === row._id) ? true : false}
    //           onChange={(e, checked) => {
    //             if (
    //               !(
    //                 row.disabled ||
    //                 row.status === StatusStepsEnum.approved ||
    //                 row.status === StatusStepsEnum.rejected ||
    //                 row.status === ScheduleActions.exec ||
    //                 row.status === ScheduleActions.skip
    //               )
    //             ) {
    //               handleChecked(checked, row)
    //             }
    //           }}
    //           sx={{
    //             '.MuiSvgIcon-root': {
    //               fill: !(
    //                 row.disabled ||
    //                 row.status === StatusStepsEnum.approved ||
    //                 row.status === StatusStepsEnum.rejected ||
    //                 row.status === ScheduleActions.exec ||
    //                 row.status === ScheduleActions.skip
    //               )
    //                 ? 'black'
    //                 : theme.palette.customLightGrey?.main,
    //             },
    //             cursor: !(
    //               row.disabled ||
    //               row.status === StatusStepsEnum.approved ||
    //               row.status === StatusStepsEnum.rejected ||
    //               row.status === ScheduleActions.exec ||
    //               row.status === ScheduleActions.skip
    //             )
    //               ? 'pointer'
    //               : 'not-allowed',
    //           }}
    //         />
    //         <Button onClick={() => handleView(row)}>
    //           <Typography
    //             sx={{
    //               cursor: 'pointer',
    //               display: 'inline-block',
    //               fontWeight: '700',
    //               fontSize: '16px',
    //               color: 'black',
    //               position: 'relative',
    //               '&::before': {
    //                 content: '""',
    //                 position: 'absolute',
    //                 width: '100%',
    //                 borderBottom: `2px solid black`,
    //                 bottom: '-0.7px',
    //               },
    //             }}
    //           >
    //             {row[x.id] ?? ''}
    //           </Typography>
    //         </Button>
    //       </TableCell>
    //     )
    //   }
    // case 'checkBoxDate':
    //   return (
    //     <TableCell
    //       component='th'
    //       key={Math.random()}
    //       scope='row'
    //       padding='none'
    //       sx={{
    //         ...rowProps,
    //         display: 'flex',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Checkbox
    //         checked={selectedRows.find((x) => x._id === row._id) ? true : false}
    //         onChange={(e, checked) => {
    //           if (
    //             !(
    //               row.disabled ||
    //               row.status === StatusStepsEnum.approved ||
    //               row.status === StatusStepsEnum.rejected ||
    //               row.status === ScheduleActions.exec ||
    //               row.status === ScheduleActions.skip
    //             )
    //           ) {
    //             handleChecked(checked, row)
    //           }
    //         }}
    //         sx={{
    //           '.MuiSvgIcon-root': {
    //             fill: !(
    //               row.disabled ||
    //               row.status === StatusStepsEnum.approved ||
    //               row.status === StatusStepsEnum.rejected ||
    //               row.status === ScheduleActions.exec ||
    //               row.status === ScheduleActions.skip
    //             )
    //               ? 'black'
    //               : theme.palette.customLightGrey?.main,
    //           },
    //           cursor: !(
    //             row.disabled ||
    //             row.status === StatusStepsEnum.approved ||
    //             row.status === StatusStepsEnum.rejected ||
    //             row.status === ScheduleActions.exec ||
    //             row.status === ScheduleActions.skip
    //           )
    //             ? 'pointer'
    //             : 'not-allowed',
    //         }}
    //       />
    //       <Button onClick={() => handleView(row)}>
    //         <Typography
    //           sx={{
    //             cursor: 'pointer',
    //             display: 'inline-block',
    //             fontWeight: '700',
    //             fontSize: '16px',
    //             color: 'black',
    //             position: 'relative',
    //             '&::before': {
    //               content: '""',
    //               position: 'absolute',
    //               width: '100%',
    //               borderBottom: `2px solid black`,
    //               bottom: '-0.7px',
    //             },
    //           }}
    //         >
    //           {row[x.id] ? formatDate(row[x.id]) : ''}
    //         </Typography>
    //       </Button>
    //     </TableCell>
    //   )
    default:
      if (typeof row[x.id] === 'string' && row[x.id].length >= maxLengthCharacter) {
        return (
          <Tooltip
            key={Math.random()}
            title={row[x.id]}
            arrow
            placement='bottom-start'
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
          >
            <TableCell
              component='th'
              key={Math.random()}
              scope='row'
              padding='none'
              sx={{
                ...rowProps,
              }}
            >
              <Typography
                sx={{
                  display: 'inline-block',
                  fontWeight: i === 0 || x.isDark ? '700' : '500',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                {row[x.id] ? splitDescription(row[x.id], maxLengthCharacter) : ''}
              </Typography>
            </TableCell>
          </Tooltip>
        )
      } else {
        return (
          <TableCell
            component='th'
            key={Math.random()}
            scope='row'
            padding='none'
            sx={{
              ...rowProps,
            }}
          >
            <Typography
              sx={{
                display: 'inline-block',
                fontWeight: i === 0 || x.isDark ? '700' : '500',
                fontSize: '16px',
                color: 'black',
              }}
            >
              {row[x.id] ?? ''}
            </Typography>
          </TableCell>
        )
      }
  }
}

export default TableRowCell
