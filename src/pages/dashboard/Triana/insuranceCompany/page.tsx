import { TableStates } from '@/types/common'
import React, { useState } from 'react'
import InsuranceCompanyList from './list'

type Props = {}

const InsuranceCompanyPage = (props: Props) => {
  //Modal Open and Close
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<TableStates>(undefined)

  //Modal changes function
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setType(undefined)
  }

  return (
    <InsuranceCompanyList
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      setType={setType}
      type={type}
    />
  )
}

export default InsuranceCompanyPage
