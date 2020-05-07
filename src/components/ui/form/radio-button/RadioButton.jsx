import React from "react";
import PropTypes from "prop-types";
import { SegmentedControl } from "evergreen-ui";

const RadioButton = ({ options, value, onChange, ...props }) => {
  return (
    <SegmentedControl
      options={options}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

RadioButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

export default RadioButton;
