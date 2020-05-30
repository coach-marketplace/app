import React from "react";
import PropTypes from "prop-types";
import { SideSheet } from "evergreen-ui";

import Pane from "../pane/Pane";

const SideModal = ({ children, ...props }) => {
  return (
    <SideSheet {...props}>
      <Pane marginTop={30} marginBottom={30} marginLeft={50} marginRight={50}>
        {children}
      </Pane>
    </SideSheet>
  );
};

SideModal.propTypes = {
  children: PropTypes.node,
};

export default SideModal;
