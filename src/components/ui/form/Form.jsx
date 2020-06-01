import React from "react";
import styled from "styled-components";

const Form = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export default StyledForm;
