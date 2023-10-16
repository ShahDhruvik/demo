import { Box, Button, Typography } from '@mui/material'
import { useRef } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '@/components/MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import { debounce } from 'lodash'
import { HEADERBTNS } from '@/utils/constants'
import { HeaderBtnTypes } from '@/types/common'
import FetchSvg from './fetchSvg'
type Props = {
  heading?: string
  searchFnc: (srhTxt: string) => void
  clickFnc: () => void
  tabs?: { isTabs: boolean; tabComponent: any }
  btnTxtArray: HeaderBtnTypes
  selectedRows: any[]
  clickView: () => void
}

const TableHeaderControls = ({
  heading,
  searchFnc,
  clickFnc,
  tabs,
  btnTxtArray,
  clickView,
}: Props) => {
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
  const isView = btnTxtArray?.find((x) => x.btnType === HEADERBTNS.VIEW)

  return (
    <>
      <Box
        sx={{
          pb: 1,
          pt: 1,
          borderBottom: '4px solid',
          borderTop: tabs?.isTabs ? '1px solid' : '',
          borderColor: theme.palette.mDarkGray?.main,
          px: '16px',
          width: '100%',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
          },
        }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={heading ? 'space-between' : 'end'}
      >
        {heading && (
          <Typography
            sx={{
              color: theme.palette.mDarkBlue?.main,
              fontWeight: '600',
              fontSize: '18px',
              backgroundColor: theme.palette.mLightGray?.main,
              px: 3,
              py: 0.5,
              borderRadius: '7px',
              boxShadow: `${theme.palette.mWhite?.main} 0px 0.0625em 0.0625em, ${theme.palette.mDarkBlue?.main} 0px 0.10em 0.10em, ${theme.palette.mWhite?.main} 0px 0px 0px 1px inset`,
            }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            {heading}
          </Typography>
        )}

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
          {isView && (
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
                clickView()
              }}
            >
              {isView.btnText ?? HEADERBTNS.VIEW}
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
