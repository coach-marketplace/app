import { getFixedSize } from '../utils'

export const Z_INDEX = {
  DROPDOWN: 10000,
}

export const SYSTEM_COLOR = {
  AQUA_HAZE: '#F1F5F7',
  BRANDY_PUNCH: '#D9822B',
  CINNABAR: '#EC4C47',
  // CORNFLOWER_BLUE: "#425A70",
  DENIM: '#1070CA',
  OCEAN_GREEN: '#47B881',
  SILVER: '#BCBBBB',
  SUN: '#F9A409',
  STALE_GRAY: '#66788A',
}

export const COLOR = {
  PRIMARY: SYSTEM_COLOR.SUN,

  BACKGROUND_LIGHT: SYSTEM_COLOR.AQUA_HAZE,
  BORDER: SYSTEM_COLOR.SILVER,
  TEXT: SYSTEM_COLOR.STALE_GRAY,

  DANGER: SYSTEM_COLOR.CINNABAR,
  SUCCESS: SYSTEM_COLOR.OCEAN_GREEN,
  WARNING: SYSTEM_COLOR.BRANDY_PUNCH,
  INFO: SYSTEM_COLOR.DENIM,
}

export const BREAKPOINT = {
  XS: '320px',
  S: '498px',
  M: '768px',
  L: '1024px',
  XL: '1280px',
}

export const MEDIA_QUERY = {
  XS_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.XS})`,
  S_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.S})`,
  M_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.M})`,
  L_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.L})`,
  XL_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.XL})`,

  XS_AND_UP: `@media screen and (min-width: ${BREAKPOINT.XS})`,
  S_AND_UP: `@media screen and (min-width: ${BREAKPOINT.S})`,
  M_AND_UP: `@media screen and (min-width: ${BREAKPOINT.M})`,
  L_AND_UP: `@media screen and (min-width: ${BREAKPOINT.L})`,
  XL_AND_UP: `@media screen and (min-width: ${BREAKPOINT.XL})`,
}

export const SPACER = {
  NONE: '0px',
  XXS: '4px',
  XS: '8px',
  S: '12px',
  M: '16px',
  L: '20px',
  XL: '32px',
  XXL: '64px',
}

export const SPACERS = Object.values(SPACER)

export const LAYOUT = {
  FULL: `
    height: 100%;
    ${getFixedSize('100%')}
  `,
}

export const SHADOW = {
  BOX: '0 15px 45px 0 rgba(0, 0, 0, 0.1)',
}

// TODO: define gradient for backgrounds
// export const GRADIENT = {
//   FADE_BLUE: `linear-gradient(180deg, ${Color.BLUE_DODGER} 0%, ${Color.BLUE_RIBBON} 100%)`,
//   FADE_PURPLE: `linear-gradient(180deg, ${Color.CORNFLOWER_MAUVE} 0%, ${Color.CORNFLOWER_MAUVE_LIGHT} 100%)`,
// };
