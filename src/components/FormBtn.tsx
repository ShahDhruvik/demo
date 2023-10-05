import { Box, Button } from '@mui/material'
import { TableStates } from '@/types/common'
import { theme } from '@/context/ThemeProvider'
type Props = {
  cancelFnc: () => void
  approvalFnc: () => void
  isSubmit: boolean
  cancelTxt: string
  approvalTxt: string
  formSubmitting: boolean
}

const FormBtns = ({
  cancelFnc,
  approvalFnc,
  isSubmit,
  cancelTxt,
  approvalTxt,
  formSubmitting,
}: Props) => {
  return (
    <Box display={'flex'} justifyContent={'center'} gap={'12px'}>
      <div>
        <Button
          variant='outlined'
          color='mLightBlack'
          onClick={(e) => {
            cancelFnc()
          }}
          sx={{
            color: theme.palette.mLightBlack?.main,
          }}
        >
          {cancelTxt}
        </Button>
      </div>
      <Button
        color='mPink'
        onClick={() => approvalFnc()}
        type={isSubmit ? 'submit' : 'button'}
        disabled={formSubmitting}
      >
        {!formSubmitting ? approvalTxt : 'Please wait ...'}
      </Button>
    </Box>
  )
}

export default FormBtns
