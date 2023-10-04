// All the context regarding the web are defined here
// This particular context states the override styles for MUI components and other sufficient style requirements
'use client'
import React, { ReactNode } from 'react'
import { createTheme, Theme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { PaletteColor } from '../types/common'

declare module '@mui/material/styles' {
  interface Palette {
    mPink?: PaletteColor
  }
  interface Palette {
    mBlack?: PaletteColor
  }
  interface Palette {
    mLightBlack?: PaletteColor
  }
  interface Palette {
    mDarkBlue?: PaletteColor
  }
  interface Palette {
    mBlue?: PaletteColor
  }
  interface Palette {
    mLightBlue?: PaletteColor
  }
  interface Palette {
    mLightGray?: PaletteColor
  }
  interface Palette {
    mGray?: PaletteColor
  }
  interface Palette {
    mMediumGray?: PaletteColor
  }
  interface Palette {
    mDarkGray?: PaletteColor
  }
  interface Palette {
    mOrange?: PaletteColor
  }
  interface Palette {
    mLightOrange?: PaletteColor
  }
  interface Palette {
    mGreen?: PaletteColor
  }
  interface Palette {
    mYellow?: PaletteColor
  }
  interface Palette {
    mWhite?: PaletteColor
  }
  interface PaletteOptions {
    mPink?: PaletteColor
  }
  interface PaletteOptions {
    mBlack?: PaletteColor
  }
  interface PaletteOptions {
    mLightBlack?: PaletteColor
  }
  interface PaletteOptions {
    mDarkBlue?: PaletteColor
  }
  interface PaletteOptions {
    mBlue?: PaletteColor
  }
  interface PaletteOptions {
    mLightBlue?: PaletteColor
  }
  interface PaletteOptions {
    mLightGray?: PaletteColor
  }
  interface PaletteOptions {
    mGray?: PaletteColor
  }
  interface PaletteOptions {
    mMediumGray?: PaletteColor
  }
  interface PaletteOptions {
    mDarkGray?: PaletteColor
  }
  interface PaletteOptions {
    mOrange?: PaletteColor
  }
  interface PaletteOptions {
    mGreen?: PaletteColor
  }
  interface PaletteOptions {
    mYellow?: PaletteColor
  }
  interface PaletteOptions {
    mWhite?: PaletteColor
  }
  interface PaletteOptions {
    mLightOrange?: PaletteColor
  }
  interface TypographyVariants {
    btnTxt: React.CSSProperties
  }
  interface TypographyVariantsOptions {}
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    '2xl': true
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true
  }
  interface ButtonPropsColorOverrides {
    mPink: true
    mLightBlack: true
    mOrange: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {}
}

type Props = {
  children: ReactNode
}

export const theme: Theme = createTheme({
  palette: {
    mPink: {
      main: '#e20074',
      dark: '#e20074',
      light: '#e20074',
    },
    mDarkBlue: {
      main: '#0a3876',
      light: '#0a3876',
      dark: '#0a3876',
    },
    mBlue: {
      main: '#00a1f1',
      light: '#00a1f1',
      dark: '#00a1f1',
    },
    mLightBlue: {
      main: '#d9e3f8',
      light: '#d9e3f8',
      dark: '#d9e3f8',
    },
    mLightGray: {
      main: '#f4f4f4',
      light: '#f4f4f4',
      dark: '#f4f4f4',
    },
    mGray: {
      main: '#d4d4d4',
      light: '#d4d4d4',
      dark: '#d4d4d4',
    },
    mMediumGray: {
      main: '#c1c1c4',
      light: '#c1c1c4',
      dark: '#c1c1c4',
    },
    mDarkGray: {
      main: '#787d78',
      light: '#787d78',
      dark: '#787d78',
    },
    mOrange: {
      main: '#db4437',
      light: '#db4437',
      dark: '#db4437',
    },
    mLightOrange: {
      main: '#de605d',
      light: '#de605d',
      dark: '#de605d',
    },
    mGreen: {
      main: '#0f9d58',
      light: '#0f9d58',
      dark: '#0f9d58',
    },
    mYellow: {
      main: '#ffbb00',
      light: '#ffbb00',
      dark: '#ffbb00',
    },
    mWhite: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#ffffff',
    },
    mLightBlack: {
      main: '#2b2a2a',
      light: '#2b2a2a',
      dark: '#2b2a2a',
    },
    mBlack: {
      main: '#000000',
      light: '#000000',
      dark: '#000000',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1000,
      xl: 1200,
      '2xl': 1536,
    },
  },
  typography: {},
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 30,
          minWidth: 200,
          maxWidth: 200,
          lineHeight: 2,
          textTransform: 'none',
          color: '#ffffff',
          ':disabled': {
            backgroundColor: '#787d78',
            color: '#ffffff',
          },
        },
      },
      defaultProps: {
        disableRipple: false,
        color: 'error',
        variant: 'contained',
      },
    },
    MuiInputBase: {},
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `2px solid black`,
            },
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `2px solid #e20074`,
            },
          },
          '&.Mui-hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid black`,
            },
          },
          borderRadius: '8px',
        },
        input: {
          padding: '8px 10px',
          width: '100%',
        },
        notchedOutline: {
          border: `1px solid #787d78`,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-root': {
            padding: '0px 5px',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTab: {},
  },
})

const AppThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default AppThemeProvider
