import PropTypes from "prop-types";

import { SPACER, SPACERS } from "../constants";

export const capitalize = (string) => {
  if (typeof string !== "string") return "";

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getMarginDefaultProps = () => ({
  marginBottom: SPACER.NONE,
  marginLeft: SPACER.NONE,
  marginRight: SPACER.NONE,
  marginTop: SPACER.NONE,
});

export const getMarginPropTypes = () => ({
  marginBottom: PropTypes.oneOf(SPACERS),
  marginLeft: PropTypes.oneOf(SPACERS),
  marginRight: PropTypes.oneOf(SPACERS),
  marginTop: PropTypes.oneOf(SPACERS),
});

export const getMarginProps = (props) => {
  const marginProps = {};
  if (props.marginBottom) {
    marginProps.marginBottom = props.marginBottom;
  }
  if (props.marginTop) {
    marginProps.marginTop = props.marginTop;
  }
  if (props.marginRight) {
    marginProps.marginRight = props.marginRight;
  }
  if (props.marginLeft) {
    marginProps.marginLeft = props.marginLeft;
  }
  return marginProps;
};

export const getStyledMarginRules = (props) => {
  let rules = "";
  if (props.marginBottom) {
    rules += `margin-bottom: ${props.marginBottom};`;
  }
  if (props.marginTop) {
    rules += `margin-top: ${props.marginTop};`;
  }
  if (props.marginRight) {
    rules += `margin-right: ${props.marginRight};`;
  }
  if (props.marginLeft) {
    rules += `margin-left: ${props.marginLeft};`;
  }
  return rules;
};

export const getFixedSize = (width = null, height = null) => {
  let widthRules = "";
  let heightRules = "";
  if (width) {
    widthRules = `
      width: ${width};
      min-width: ${width};
      max-width: ${width};
    `;
  }
  if (height) {
    heightRules = `
      height: ${height};
      min-height: ${height};
      max-height: ${height};
    `;
  }
  return `
    ${widthRules}
    ${heightRules}
  `;
};

/**
 * Locales options form
 *
 * This contain the options data for a html select > option form element for
 * locales.
 * @constant localesOptionsForm
 */
export const localesOptionsForm = [
  { label: "English", value: "en-US" },
  { label: "French", value: "fr-FR" },
];

/**
 * Get random string
 *
 * This function return a random string, this one should be unique.
 * Bese on this: https://gist.github.com/gordonbrander/2230317
 *
 * @return {string} Random string
 */
export const getRandomString = () => Math.random().toString(36).substr(2, 9);
