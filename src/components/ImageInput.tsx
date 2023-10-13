import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useRef } from 'react'
import FetchSvg from './fetchSvg'
import { theme } from '@/context/ThemeProvider'

type Props = {
  imageUrl: string | null
  setImageUrl: Dispatch<SetStateAction<string | null>>
  handleFileChange: (event: any) => void
}

const ImageInput = ({ imageUrl, setImageUrl, handleFileChange }: Props) => {
  const uploadInputRef = useRef<any>(null)
  const handleUploadClick = () => {
    uploadInputRef?.current.click()
  }
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} maxWidth={'max-content'}>
      <Box padding={1}>
        <Avatar src={imageUrl ? imageUrl : ''} sx={{ width: 70, height: 70 }} />
      </Box>
      <Button
        color='mPink'
        sx={{
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
          justifySelf: 'end',
          minWidth: 'max-content',
        }}
        onClick={handleUploadClick}
      >
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            textTransform: 'capitalize',
          }}
        >
          Upload Image
        </Typography>
        <FetchSvg iconName='fileUpload' svgProp={{ className: 'svgWhite' }} />
        <input
          type='file'
          style={{ display: 'none' }}
          ref={uploadInputRef}
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  )
}

export default ImageInput
