import { TableStates } from '@/types/common'
import { useState } from 'react'
import RolesList from './rolesList'

type Props = {}

const RolesPage = (props: Props) => {
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
    <RolesList
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      setType={setType}
      type={type}
    />
  )
}

export default RolesPage
