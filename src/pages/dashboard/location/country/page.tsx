import { AllowedAction, TableStates } from '@/types/common'
import React, { useState } from 'react'
import CountryList from './countryList'

type Props = {}

const CountryPage = (props: Props) => {
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
    <CountryList
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      setType={setType}
      type={type}
    />
  )
}

export default CountryPage
