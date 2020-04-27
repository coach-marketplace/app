import { getFixedSize } from "../utils";

export const SIZE = {
  XXS: 20,
  XS: 24,
  M: 32,
  L: 40,
  XL: 48,
  XXL: 56,
};

export const SIZES = Object.keys(SIZE).map((key) => key.toLowerCase());

export const Z_INDEX = {
  DROPDOWN: 10000,
};

export const COLOR = {
  CORNFLOWER_BLUE: "#425A70",
  SUN: "#F9A409",
  WHITE_LILAC: "#EDEAF7",
  CINNABAR: "#EC4C47",
  OCEAN_GREEN: "#47B881",
  BRANDY_PUNCH: "#D9822B",
  DENIM: "#1070CA",
};

export const SYSTEM_COLOR = {
  PRIMARY: COLOR.SUN,
  BACKGROUND_LIGHT: COLOR.WHITE_LILAC,
  DANGER: COLOR.CINNABAR,
  SUCCESS: COLOR.OCEAN_GREEN,
  WARNING: COLOR.BRANDY_PUNCH,
  INFO: COLOR.DENIM,
};

export const BREAKPOINT = {
  XS: "320px",
  S: "498px",
  M: "768px",
  L: "1024px",
  XL: "1280px",
};

export const MEDIA_QUERY = {
  XS_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.XS}px)`,
  S_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.S}px)`,
  M_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.M}px)`,
  L_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.L}px)`,
  XL_AND_DOWN: `@media screen and (max-width: ${BREAKPOINT.XL}px)`,

  XS_AND_UP: `@media screen and (min-width: ${BREAKPOINT.XS}px)`,
  S_AND_UP: `@media screen and (min-width: ${BREAKPOINT.S}px)`,
  M_AND_UP: `@media screen and (min-width: ${BREAKPOINT.M}px)`,
  L_AND_UP: `@media screen and (min-width: ${BREAKPOINT.L}px)`,
  XL_AND_UP: `@media screen and (min-width: ${BREAKPOINT.XL}px)`,
};

export const SPACER = {
  NONE: "0px",
  XXS: "4px",
  XS: "8px",
  S: "12px",
  M: "16px",
  L: "20px",
  XL: "32px",
  XXL: "64px",
};

export const SPACERS = Object.values(SPACER);

export const LAYOUT = {
  FULL: `
    height: 100%;
    ${getFixedSize("100%")}
  `,
  LARGE_AND_FULL_ON_MEDIUM_AND_DOWN: `
    margin: 0 auto;
    height: auto;
    width: 90%;
    min-width: ${BREAKPOINT.L};
    ${MEDIA_QUERY.L_AND_DOWN} { // Large
      min-width: ${BREAKPOINT.M};
      max-width: ${BREAKPOINT.L};
    }
    ${MEDIA_QUERY.M_AND_DOWN} { // Medium
      min-width: ${BREAKPOINT.S};
      max-width: ${BREAKPOINT.M};
      width: 100%;
    }
    ${MEDIA_QUERY.S_AND_DOWN} { // Small
      min-width: 0;
      max-width: ${BREAKPOINT.S};
    }
  `,
};
