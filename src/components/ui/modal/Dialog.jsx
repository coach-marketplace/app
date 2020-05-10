import React from "react";
import PropTypes from "prop-types";
import { Dialog as DialogUI } from "evergreen-ui";

import Pane from "../pane/Pane";

const Dialog = ({ children, ...props }) => {
  return (
    <DialogUI {...props}>
      <Pane>{children}</Pane>
    </DialogUI>
  );
};

Dialog.propTypes = {
  children: PropTypes.node,
};

export default Dialog;
