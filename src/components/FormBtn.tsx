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
  disable?: boolean
}

const FormBtns = ({
  cancelFnc,
  approvalFnc,
  isSubmit,
  cancelTxt,
  approvalTxt,
  formSubmitting,
  disable,
}: Props) => {
  return (
    <Box display={'flex'} justifyContent={'end'} gap={'12px'} alignItems={'end'} px={5} pt={5}>
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
      {!disable ? (
        <Button
          color='mPink'
          onClick={() => approvalFnc()}
          type={isSubmit ? 'submit' : 'button'}
          disabled={formSubmitting}
        >
          {!formSubmitting ? approvalTxt : 'Please wait ...'}
        </Button>
      ) : (
        <Button
          color='mPink'
          onClick={() => approvalFnc()}
          type={isSubmit ? 'button' : 'button'}
          disabled={formSubmitting}
          sx={{ disabled: 'true' }}
        >
          {approvalTxt}
        </Button>
      )}
    </Box>
  )
}

export default FormBtns
