import React from "react";
import PropTypes from "prop-types";

import { StyledImage } from "./styled";

const Image = ({ src, alt, ...props }) => {
  return <StyledImage src={src} alt={alt} {...props} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Image;
