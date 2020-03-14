import React from "react";
import PropTypes from "prop-types";
import { TextInput, Textarea } from "evergreen-ui";

const Input = ({ type, placeholder, ...props }) => {
  if (["text", "email", "password"].includes(type)) {
    return <TextInput placeholder={placeholder} {...props} type={type} />;
  } else if (["textarea"].includes(type)) {
    return <Textarea placeholder={placeholder} {...props} />;
  }
};

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.oneOf(["text", "email", "textarea", "password"])
};

export default Input;
