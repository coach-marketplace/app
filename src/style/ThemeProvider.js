import React from 'react'
import { ThemeProvider } from 'styled-components'

import { COLOR } from '../helper/constants'

const defaultTheme = {
  colorBorder: COLOR.BORDER,
  colorText: COLOR.TEXT,

  fontSizeXS: '0.7rem',
  fontSizeS: '0.9rem',
  fontSizeM: '1rem',

  fontWeightNormal: '300',
  fontWeightBold: '700',
}

export default ({ children }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
)
