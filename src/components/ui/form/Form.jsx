import React from "react";
import { Form as FormUI } from "formik";
import styled from "styled-components";

/**
 * The form component is returning the Formik form
 * https://jaredpalmer.com/formik/docs/api/form
 */
const Form = ({ children, ...props }) => {
  return <FormUI {...props}>{children}</FormUI>;
};

Form.displayName = "Form";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default StyledForm;
