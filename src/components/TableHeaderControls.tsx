import { Box, Button, Typography } from '@mui/material'
import { useRef } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '@/components/MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import { debounce } from 'lodash'
import { HEADERBTNS } from '@/utils/constants'
import { HeaderBtnTypes } from '@/types/common'
import FetchSvg from './fetchSvg'
type Props = {
  heading: string
  searchFnc: (srhTxt: string) => void
  clickFnc: () => void
  tabs?: { isTabs: boolean; tabComponent: any }
  btnTxtArray: HeaderBtnTypes
  selectedRows: any[]
}

const TableHeaderControls = ({ heading, searchFnc, clickFnc, tabs, btnTxtArray }: Props) => {
  const searchRef = useRef<HTMLInputElement>()
  const delayedSearch = useRef(
    debounce((searchQuery) => {
      searchFnc(searchQuery as string)
    }, 500),
  ).current
  const handleChange = (e: any) => {
    const searchQuery = e.target.value
    delayedSearch(searchQuery)
  }
  // const disableProps = {
  //   color: 'rgba(0, 0, 0, 0.26)',
  //   backgroundColor: 'rgba(0, 0, 0, 0.12)',
  //   boxShadow: 'none',
  //   border: 0,
  //   ':hover': {
  //     color: 'rgba(0, 0, 0, 0.26)',
  //     backgroundColor: 'rgba(0, 0, 0, 0.12)',
  //     boxShadow: 'none',
  //     border: 0,
  //   },
  // }
  const isCreate = btnTxtArray?.find((x) => x.btnType === HEADERBTNS.CREATE)
  console.log(btnTxtArray, 'cre')
  return (
    <>
      <Box
        sx={{
          pb: 2,
          pt: 2,
          borderBottom: '1px solid',
          borderTop: tabs?.isTabs ? '1px solid' : '',
          borderColor: theme.palette.mGray?.main,
          pl: '16px',
          pr: '16px',
          width: '100%',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
          },
        }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography
          sx={{
            color: theme.palette.mDarkBlue?.main,
            fontWeight: '600',
            fontSize: '20px',
          }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          {heading}
        </Typography>

        <Box
          display={'flex'}
          alignItems={'center'}
          sx={{
            gap: '12px',
            [theme.breakpoints.down('md')]: {
              flexWrap: 'wrap',
            },
          }}
        >
          <Search>
            <SearchIconWrapper type='submit'>
              <FetchSvg iconName='ser' />
            </SearchIconWrapper>
            <StyledInputBase
              // disabled={loading}
              placeholder='Search Here'
              inputRef={searchRef}
              onChange={handleChange}
            />
          </Search>
          {isCreate && (
            <Button
              color='mPink'
              sx={{
                minWidth: 100,
                borderRadius: '8px',
                maxHeight: 35,
                // cursor: disableCreateBtn ? 'not-allowed' : 'pointer',
                color: theme.palette.mWhite?.main,
                // ...(disableCreateBtn ? disableProps : {}),
              }}
              // disableRipple={disableCreateBtn}
              onClick={() => {
                clickFnc()
              }}
            >
              {isCreate.btnText ?? HEADERBTNS.CREATE}
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          pl: '16px',
          pr: '16px',
          width: '100%',
        }}
      >
        {tabs?.isTabs && tabs.tabComponent}
      </Box>
    </>
  )
}

export default TableHeaderControls
