import { ReactNode } from 'react'
import { DialogContent, DialogProps, Dialog } from '@mui/material'
import { ALIGN_DIALOG } from '../utils/constants'
import { AlignDialogProp } from '../types/common'
interface Props {
  open: boolean
  handleClose: () => void
  align?: AlignDialogProp
  isFullScreen?: boolean
  maxHeight?: number
  maxWidth: DialogProps['maxWidth']
  disableClickAway?: boolean
  children: ReactNode
  header: { isHeader: boolean; component: ReactNode }
  action: { isAction: boolean; component: ReactNode }
}

const CustomDialog = ({
  open,
  handleClose,
  align,
  isFullScreen,
  maxHeight,
  maxWidth,
  disableClickAway,
  children,
  header,
  action,
}: Props) => {
  //Dialog Allignment
  const otherProps = { m: 0.5 }
  const alignFnc = (alignType: string | undefined, fScreen: boolean | undefined) => {
    if (fScreen) {
      return { PaperProps: { sx: {} } }
    } else {
      switch (alignType) {
        //Add the alignment accordingly
        case ALIGN_DIALOG.TOP_LEFT:
          return { PaperProps: { sx: { position: 'fixed', top: 10, left: 10, ...otherProps } } }
          break
        case ALIGN_DIALOG.TOP_RIGHT:
          return { PaperProps: { sx: { position: 'fixed', top: 10, right: 10, ...otherProps } } }
          break
        case ALIGN_DIALOG.BOTTOM_LEFT:
          return { PaperProps: { sx: { position: 'fixed', bottom: 10, left: 10, ...otherProps } } }
          break
        case ALIGN_DIALOG.BOTTOM_RIGHT:
          return { PaperProps: { sx: { position: 'fixed', bottom: 10, right: 10, ...otherProps } } }
          break
        default:
          return { PaperProps: { sx: {} } }
          break
      }
    }
  }
  const dialogProps: DialogProps | any = {
    ...alignFnc(align, isFullScreen),
    open: open,
    onClose: () => {
      if (disableClickAway) {
      } else {
        handleClose()
      }
    },
    scroll: 'paper',
    maxWidth: maxWidth,
    fullScreen: isFullScreen,
  }
  return (
    <Dialog
      {...dialogProps}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      {header.isHeader && header.component}
      <DialogContent
        sx={{
          maxHeight: maxHeight ?? 400,
          overflowY: 'auto',
        }}
      >
        {children}
      </DialogContent>
      {action.isAction && action.component}
    </Dialog>
  )
}

export default CustomDialog