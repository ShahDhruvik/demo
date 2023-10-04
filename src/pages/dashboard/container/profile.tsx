import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material'
import person from '@/assets/images/60111.jpg'
import { theme } from '@/context/ThemeProvider'
import FetchSvg from '@/components/fetchSvg'
import CustomDialog from '@/components/Dialog-custom'
type Props = {
  open: boolean
  handleClose: () => void
}

const Profile = ({ open, handleClose }: Props) => {
  return (
    <CustomDialog
      action={{ isAction: false, component: null }}
      header={{
        isHeader: false,
        component: null,
      }}
      handleClose={handleClose}
      open={open}
      maxWidth={'lg'}
      maxHeight={600}
    >
      <Avatar src={person} alt='profile' sx={{ width: 100, height: 100, mb: 4 }} />
      <Box display={'flex'} flexDirection={'row'} gap={20} mb={4}>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          <Box>
            <h1 className='text-2xl font-semibold text-darkBlue-main'>First name</h1>
            <p className='text-lg ml-1'>Dhruvik </p>
          </Box>
          <Box>
            <h1 className='text-2xl font-semibold text-darkBlue-main'>Last name</h1>
            <p className='text-lg ml-1'>Shah </p>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          <Box>
            <h1 className='text-2xl font-semibold text-darkBlue-main'>Role</h1>
            <p className='text-lg ml-1'>Admin</p>
          </Box>
          <Box>
            <h1 className='text-2xl font-semibold text-darkBlue-main'>Country</h1>
            <p className='text-lg ml-1'>India</p>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          <Box>
            <h1 className='text-2xl font-semibold text-darkBlue-main'>Email</h1>
            <p className='text-lg ml-1'>dhruvik9a03@gmail.com</p>
          </Box>
          <Box>
            <h1 className='text-2xl font-semibold text-darkBlue-main'>Contact No</h1>
            <p className='text-lg ml-1'>9090909090</p>
          </Box>
        </Box>
      </Box>
      <Box>
        <h1 className='text-2xl font-semibold text-darkBlue-main'>Address</h1>
        <p className='text-base ml-1 max-w-md'>
          Westgate, 510-511, 5th floor D Block, Near YMCA Club, SG Road, Ahmedabad - 380015 Gujarat,
          India. Ahmedabad, Gujarat 380015
        </p>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 20,
          top: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          variant='text'
          sx={{
            color: theme.palette.mDarkBlue?.main,
            minWidth: 'max-content',
            textDecoration: 'underline',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <FetchSvg iconName='edit' svgProp={{ width: 22, height: 22 }} /> Edit
        </Button>
        <Divider
          orientation='vertical'
          sx={{
            border: `1px solid ${theme.palette.mGray?.main}`,
            minHeight: '25px',
            mx: '2px',
          }}
        />
        <Button
          variant='text'
          sx={{
            color: theme.palette.mLightOrange?.main,
            minWidth: 'max-content',
            textDecoration: 'underline',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={handleClose}
        >
          <FetchSvg iconName='close' svgProp={{ width: 22, height: 22 }} /> Close
        </Button>
      </Box>
    </CustomDialog>
  )
}

export default Profile
