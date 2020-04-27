import React from "react";
import PropTypes from "prop-types";

import Label from "../label/Label";
import Input from "../input/Input";
import Text from "../../text/Text";
import Pane from "../../pane/Pane";
import { SYSTEM_COLOR } from "../../../../helper/constants";
import { getMarginProps } from "../../../../helper/utils";

const Field = ({ errorMessage, label, description, isRequired, ...props }) => {
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
          {isRequired && <Text color={SYSTEM_COLOR.INFO}>*</Text>}
        </Pane>
      )}

      {description && <Text>{description}</Text>}

      <Input {...props} width="100%" />

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
