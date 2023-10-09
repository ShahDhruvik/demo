import { Box, IconButton, Typography } from '@mui/material'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { AllowedAction, TableStates } from '@/types/common'
import FetchSvg from './fetchSvg'
import FormBtns from './FormBtn'
import { theme } from '@/context/ThemeProvider'
import { TABLE_STATES } from '@/utils/constants'

type Props = {
  handleClose: () => void
  type: TableStates
  children: ReactNode
  entityName: string
}

const ActionModal = ({ handleClose, type, children, entityName }: Props) => {
  return (
    <>
      <Box
        marginBottom={4}
        position={'sticky'}
        top={0}
        zIndex={10}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          backgroundColor: theme.palette.mMidBlue?.main,
          borderTopRightRadius: '7px',
          borderTopLeftRadius: '7px',
          boxShadow:
            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        }}
        pl={2}
      >
        <Typography
          sx={{
            textAlign: 'left',
            color: theme.palette.mDarkBlue?.main,
            fontWeight: '700',
            fontSize: '20px',
            lineHeight: '35px',
            padding: '0px 10px 0px 10px',
            width: '100%',
            letterSpacing: '0.25px',
            textTransform: 'capitalize',
          }}
        >
          {type === TABLE_STATES.ACTIVE && 'InActive' + ' ' + entityName}
          {type === TABLE_STATES.INACTIVE && 'Active' + ' ' + entityName}
          {type !== TABLE_STATES.INACTIVE &&
            type !== TABLE_STATES.ACTIVE &&
            (type?.charAt(0) as string) + type?.slice(1).toLowerCase() + '  ' + entityName}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            px: '15px',
            py: '10px',
          }}
        >
          <FetchSvg iconName='dismiss' svgProp={{ width: 30, height: 30 }} />
        </IconButton>
      </Box>
      {children}
    </>
  )
}

export default ActionModal
