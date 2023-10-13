'use client'
// import { selectedBtnProps } from '@/store/data';
import { Avatar, Badge, Box, Button, ButtonProps, Grid, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import Cross from '@/icons/cross-select-Tag.svg'
import FileUpload from '@/icons/fileUpload.svg'
import sideBarStyle from '@/styles/global.css'
import FetchSvg from './fetchSvg'

type Props = {
  imageUrl: string | null
  setImageUrl: Dispatch<SetStateAction<string | null>>
  handleFileChange: (event: any) => void
  editable?: boolean
}

const FileUploadInput = ({ imageUrl, setImageUrl, handleFileChange, editable }: Props) => {
  const uploadInputRef = useRef<any>(null)
  const handleUploadClick = () => {
    uploadInputRef?.current.click()
  }
  return (
    <Grid display={'flex'} justifyContent={'center'} marginBottom={'20px'}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box padding={1}>
          <Avatar
            src={imageUrl ? imageUrl : ''}
            sx={{ width: 70, height: 70 }}
            // className={sideBarStyle.sidebarProfile}
          />
        </Box>
        <Button
          //   {...(selectedBtnProps as ButtonProps)}
          sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifySelf: 'end',
          }}
          onClick={handleUploadClick}
          disabled={!editable}
          color='mPink'
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
          <FetchSvg iconName='FileUpload' svgProp={{ fill: '#ffffff' }} />
          <input
            type='file'
            style={{ display: 'none' }}
            ref={uploadInputRef}
            onChange={handleFileChange}
          />
        </Button>
      </Box>
    </Grid>
  )
}

export default FileUploadInput
