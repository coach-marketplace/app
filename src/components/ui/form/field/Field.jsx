import React from "react";
import PropTypes from "prop-types";

import Label from "../label/Label";
import Input from "../input/Input";
import Text from "../../text/Text";
import Pane from "../../pane/Pane";
import Switch from "../../switch/Switch";
import RadioButton from "../radio-button/RadioButton";
import Select from "../select/Select";
import { COLOR } from "../../../../helper/constants";
import { getMarginProps } from "../../../../helper/utils";

const Field = ({
  errorMessage,
  label,
  description,
  isRequired,
  type,
  children,
  ...props
}) => {
  let input;
  switch (type) {
    case "select":
      input = (
        <Select {...props} width="100%">
          {children}
        </Select>
      );
      break;
    case "switch":
      input = <Switch {...props} />;
      break;
    case "radio-button":
      input = <RadioButton {...props} />;
      break;
    default:
      input = <Input {...props} type={type} width="100%" />;
      break;
  }

  return (
    <Pane
      display="inline-flex"
      flexDirection="column"
      marginBottom={20}
      width="100%"
      {...getMarginProps(props)}
    >
      {label && (
        <Pane display="flex">
          <Label htmlFor={props.id || props.name} marginBottom={4}>
            {label}
          </Label>
          {isRequired && <Text color={COLOR.INFO}>*</Text>}
        </Pane>
      )}

      {description && (
        <Text size={300} marginBottom={10}>
          {description}
        </Text>
      )}

      {input}

      {errorMessage && (
        <Text color="danger" size={300}>
          {errorMessage}
        </Text>
      )}
    </Pane>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
};

Field.defaultProps = {
  isRequired: false,
};

export default Field;
