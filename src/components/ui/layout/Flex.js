import styled from "styled-components";
import PropTypes from "prop-types";

import { LAYOUT } from "../../../helper/constants";
import {
  getMarginDefaultProps,
  getMarginPropTypes,
  getStyledMarginRules,
} from "../../../helper/utils";

const getJustifyContent = (value) => {
  if (["start", "end"].includes(value)) {
    return `flex-${value}`;
  }
  if (["around", "between", "evenly"].includes(value)) {
    return `space-${value}`;
  }
  return value;
};

const getAlignItems = (value) => {
  if (["start", "end"].includes(value)) {
    return `flex-${value}`;
  }
  return value;
};

/**
 * GetLayout
 *
 * Return the correct layout style base on the layout prop
 * @param {string} value
 */
const getLayout = (value) => {
  if (!value) {
    return LAYOUT.FULL;
  }
};

const StyledFlex = styled.div`
  display: flex;
  flex-wrap: ${({ wrap }) => wrap};
  flex-grow: ${({ grow }) => grow};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => getJustifyContent(justifyContent)};
  align-items: ${({ alignItems }) => getAlignItems(alignItems)};
  overflow: ${({ overflow }) => overflow};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "inherit")};
  ${({ layout }) => getLayout(layout)}
  ${(props) => getStyledMarginRules(props)}
`;

StyledFlex.propTypes = {
  alignItems: PropTypes.oneOf([
    "start",
    "end",
    "center",
    "baseline",
    "stretch",
  ]),
  children: PropTypes.node,
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse",
  ]),
  grow: PropTypes.number,
  justifyContent: PropTypes.oneOf([
    "start",
    "center",
    "end",
    "around",
    "between",
    "evenly",
  ]),
  layout: PropTypes.string,
  onClick: PropTypes.func,
  overflow: PropTypes.oneOf(["visible", "hidden", "scroll", "auto"]),
  wrap: PropTypes.oneOf(["wrap", "nowrap", "wrap-reverse"]),
  ...getMarginPropTypes(),
};

StyledFlex.defaultProps = {
  alignItems: "stretch",
  direction: "row",
  grow: 0,
  justifyContent: "start",
  layout: "",
  wrap: "nowrap",
  ...getMarginDefaultProps(),
};

export default StyledFlex;
