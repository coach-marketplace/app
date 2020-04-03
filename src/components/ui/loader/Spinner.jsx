import React from "react";
import styled from "styled-components";

import { Spinner as SpinnerUI } from "evergreen-ui";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Spinner = (props) => (
  <StyledContainer>
    <SpinnerUI {...props} />
  </StyledContainer>
);

Spinner.displayName = "Spinner";

export default Spinner;
