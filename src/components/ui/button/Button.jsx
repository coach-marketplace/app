import React from "react";
import { Button as ButtonUI, IconButton } from "evergreen-ui";

const Button = ({ children, label, iconBefore, ...props }) =>
  !children && !label && iconBefore ? (
    <IconButton icon={iconBefore} {...props} />
  ) : (
    <ButtonUI {...props} iconBefore={iconBefore}>
      {children || label}
    </ButtonUI>
  );

export default Button;
