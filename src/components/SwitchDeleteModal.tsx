import { Box } from '@mui/material'
import React from 'react'
import FormBtns from './FormBtn'
import { TableStates } from '@/types/common'

type Props = {
  handleClose: () => void
  actionFnc: () => void
  type: TableStates
  approvalTxt: string
}

const SwitchDeleteModal = ({ handleClose, actionFnc, type, approvalTxt }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={3}>
      <p className='text-2xl font-semibold text-center'>{`Are you sure you want to ${type?.toLowerCase()}?`}</p>
      <FormBtns
        approvalFnc={actionFnc}
        approvalTxt={approvalTxt}
        cancelFnc={handleClose}
        cancelTxt='Cancel'
        formSubmitting={false}
        isSubmit={false}
      />
    </Box>
  )
}

export default SwitchDeleteModal
