import React from "react";
import PropTypes from "prop-types";

import Heading from "../heading/Heading";

const Title = ({ children, h, size, marginBottom, ...props }) => (
  <Heading size={size} is={`h${h}`} {...props} marginBottom={marginBottom}>
    {children}
  </Heading>
);

Title.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number,
  h: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};

Title.defaultProps = {
  marginBottom: 20,
  size: 800,
  h: 1,
};

export default Title;
