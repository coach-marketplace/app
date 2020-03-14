import React from "react";
import PropTypes from "prop-types";
import { TextInput, Textarea } from "evergreen-ui";

const Input = ({ type, placeholder, ...props }) => {
  if (["text", "email"].includes(type)) {
    return <TextInput placeholder={placeholder} {...props} />;
  } else if (["textarea"].includes(type)) {
    return <Textarea placeholder={placeholder} {...props} />;
  }
};

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.oneOf(["text", "email", "textarea"])
};

export default Input;
