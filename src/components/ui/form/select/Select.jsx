import React from "react";
import PropTypes from "prop-types";
import { Select as SelectUI } from "evergreen-ui";

const Select = ({ children, ...props }) => (
  <SelectUI {...props}>{children}</SelectUI>
);

Select.propTypes = {
  children: PropTypes.any,
};

export default Select;
