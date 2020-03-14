import React from "react";
import { Button as ButtonUI } from "evergreen-ui";

const Button = ({ children, label, ...props }) => (
  <ButtonUI {...props}>{children || label}</ButtonUI>
);

export default Button;
