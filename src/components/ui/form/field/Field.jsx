import React from "react";
import PropTypes from "prop-types";
import { Label } from "evergreen-ui";
import { useField } from "formik";
import styled from "styled-components";

import Input from "../input/Input";
import Text from "../../text/Text";

const StyledWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Field = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <StyledWrapper>
      {label && (
        <Label
          htmlFor={props.id || props.name}
          marginBottom={4}
          display="block"
        >
          {label}
        </Label>
      )}

      <Input {...field} {...props} />

      {meta.touched && meta.error && (
        <Text color="danger" size={300}>
          {meta.error}
        </Text>
      )}
    </StyledWrapper>
  );
};

export default Field;

Field.displayName = "Field";

Field.propTypes = {
  label: PropTypes.string
};
