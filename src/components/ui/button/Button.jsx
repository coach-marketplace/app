import React from "react";
import PropTypes from "prop-types";
import { Button as ButtonUI } from "evergreen-ui";

import { SIZE, SIZES } from "../../../helper/constants";

const Button = ({
  children,
  onClick,
  label,
  appearance,
  intent,
  size,
  isLoading,
  iconBefore,
  iconAfter,
  isDisabled,
  type
}) => (
  <ButtonUI
    appearance={appearance}
    height={SIZE[size.toUpperCase()]}
    onClick={onClick}
    intent={intent}
    isLoading={isLoading}
    iconBefore={iconBefore}
    iconAfter={iconAfter}
    disabled={isDisabled}
    type={type}
  >
    {children || label}
  </ButtonUI>
);

Button.propTypes = {
  appearance: PropTypes.oneOf(["default", "primary", "minimal"]),
  children: PropTypes.node,
  iconAfter: PropTypes.node,
  iconBefore: PropTypes.node,
  intent: PropTypes.oneOf(["none", "success", "warning", "danger"]),
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(SIZES)
};

Button.defaultProps = {
  appearance: "default",
  iconAfter: undefined,
  iconBefore: undefined,
  intent: "none",
  isLoading: false,
  disabled: false,
  size: "m",
  type: "text",
  isDisabled: false
};

export default Button;
